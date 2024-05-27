# About burn charts: https://docs.gitlab.com/14.10/ee/user/project/milestones/burndown_and_burnup_charts.html
# Modified script from https://gist.github.com/goatsweater/b31f5d2ff43798f8e10e227900786744
import datetime
import logging
from pathlib import Path
import random
import time
from typing import Any, List, Optional

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import requests
import typer
from pydantic import BaseModel, HttpUrl, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


# Configure a logger
logging.basicConfig(level=logging.INFO, format='[%(levelname)s] %(message)s')
logger = logging.getLogger('glcharts')

app = typer.Typer()


# Avoid hardcoding common variables
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8')
    token: SecretStr

    base_project: int
    gitlab_api: str

    report_dir: Path
    
    @property
    def base_groups_url(self) -> str:
        return "/".join([self.gitlab_api, "projects"])
    
    def milestones_url(self, group_id: int) -> str:
        return "/".join([self.base_groups_url, str(group_id), "milestones"])
    
    def issues_url(self, group_id: int) -> str:
        return "/".join([self.base_groups_url, str(group_id), "issues"])
    
    def descendent_groups(self, group_id: int) -> str:
        return "/".join([self.base_groups_url, str(group_id), 'descendant_groups'])

# API Models
class GitlabIssueMilestone(BaseModel):
    project_id: Optional[int]
    iid: int
    title: str
    id: int
    state: str

class GitlabIssue(BaseModel):
    project_id: int
    state: str
    iid: int
    labels: List[str]
    merge_requests_count: int
    id: int
    title: str
    created_at: datetime.datetime
    closed_at: Optional[datetime.datetime]
    due_date: Optional[datetime.date]
    milestone: Optional[GitlabIssueMilestone]

class GitlabMilestone(BaseModel):
    id: int
    iid: int
    project_id: int
    title: str
    due_date: Optional[datetime.date]
    start_date: Optional[datetime.date]
    state: str
    expired: bool


# API interaction
def get_api_data(url: str, token: SecretStr, cls: Any) -> List[Any]:
    """Fetch details of all milestones under a group."""
    logger.info("Fetching data for group at %s", url)

    # Ask the API for all the milestones
    headers = {'PRIVATE-TOKEN': token.get_secret_value()}
    resp = requests.get(url, headers=headers)
    logger.info("API response code: %s", resp.status_code)

    # Parse the response objects into a milestone list
    items = [cls.parse_obj(m) for m in resp.json()]
    logger.debug("Compiled info for %d objects", len(items))

    # Results could be paginated, so follow links to next page
    if 'next' in resp.links:
        logger.debug("Following next header to %s", resp.links['next']['url'])
        # Introduce a delay to avoid overloading the API
        time.sleep(random.random())
        additional = get_api_data(url=resp.links['next']['url'], token=token, cls=cls)
        items.extend(additional)
    
    return items


# Data generators
def get_issue_counts_for_milestone(milestone: GitlabMilestone, issues: List[GitlabIssue]) -> pd.DataFrame:
    """Generate a dataframe of issue counts for each day of the milestone."""
    logger.info("Counting issues in milestone %s", milestone.title)

    # Generate a list of every date in the milestone
    milestone_days = pd.date_range(milestone.start_date, milestone.due_date, freq='D', tz='UTC').to_list()

    def issue_exists_on_date(issue: GitlabIssue, date: pd.Timestamp) -> bool:
        """Check if an issue exists on a given date."""
        return issue.created_at <= date

    def issue_is_active_on_date(issue: GitlabIssue, date: pd.Timestamp) -> bool:
        """Check if an issue is active on a given date."""
        # Did the issue even exist?
        if issue.created_at> date:
            return False
        # Was it closed?
        if issue.closed_at and issue.closed_at < date:
            return False
        # It exists and isn't closed
        return True
    
    total_issues_by_date = []
    total_active_by_date = []
    milestones = []
    for date in milestone_days:
        issues_on_date = filter(lambda x: issue_exists_on_date(x, date), issues)
        total_on_date = len(list(issues_on_date))
        total_issues_by_date.append(total_on_date)

        active_on_date = filter(lambda x: issue_is_active_on_date(x, date), issues)
        total_active_on_date = len(list(active_on_date))
        total_active_by_date.append(total_active_on_date)

        milestones.append(milestone.title)
    
    df = pd.DataFrame({
        'date': milestone_days,
        'total_issues': total_issues_by_date,
        'active_issues': total_active_by_date,
        'closed_issues': np.array(total_issues_by_date) - np.array(total_active_by_date),
        'milestone': milestones
    })
    return df


def generate_burnup_html(df: pd.DataFrame, fname: Path):
    """Generate a plotly plot for the data."""
    logger.info("Creating burnup chart as %s", fname)
    fig = go.Figure()

    # Draw the traces
    fig.add_trace(go.Scatter(x=df['date'], y=df['total_issues'], mode='lines', name="Total Issues"))
    fig.add_trace(go.Scatter(x=df['date'], y=df['closed_issues'], mode='lines', name="Closed Issues"))

    # Add some labels
    fig.update_layout(
        title="Project Burnup Chart by issue counts",
        xaxis_title="Date",
        yaxis_title="Issues"
    )

    fig.write_html(fname)


def generate_burndown_html(df: pd.DataFrame, fname: Path):
    """Generate a plotly burndown chart."""
    logger.info("Creating burndown chart as %s", fname)

    # Number the days in each sprint on a consistent scale
    df['sprint_day'] = df.groupby('milestone').cumcount()

    # Build the figure
    fig = px.line(df, x='sprint_day', y='active_issues', color='milestone')

    # Add some labels
    fig.update_layout(
        title="Sprint burndown chart by issue counts",
        xaxis_title="Sprint day",
        yaxis_title="Issue count",
    )

    # Show the x-axis from highest to lowest day
    # fig.update_xaxes(autorange="reversed")

    fig.write_html(fname)


@app.command()
def main():
    config = Settings()

    # Get all the milestones in the group
    project_id = config.base_project
    logger.info("Gathering milestone data for group %s", project_id)
    base_milestone_url = config.milestones_url(project_id)
    milestones = get_api_data(url=base_milestone_url, token=config.token, cls=GitlabMilestone)
    if not milestones:
        logger.error("Count not find any milestones under group %d", project_id)
        raise typer.Exit(code=1)
    logger.info("Collected %d milestones", len(milestones))

    # Get all the issues in the group
    logger.info("Gathering issue data for group %s", config.base_project)
    base_issues_url = config.issues_url(config.base_project)
    issues = get_api_data(url=base_issues_url, token=config.token, cls=GitlabIssue)
    logger.info("Collected %d issues", len(issues))

    # Get counts for each milestone
    dfs = [get_issue_counts_for_milestone(m, issues) for m in milestones]
    df = pd.concat(dfs).drop_duplicates(keep='first').sort_values(by='date')
    logger.info("Total data points: %d", df.shape[0])

    # Make sure the destination path exists
    report_dir = config.report_dir
    report_dir.mkdir(parents=True, exist_ok=True)

    generate_burnup_html(df, fname=report_dir.joinpath('burnup.html'))
    generate_burndown_html(df.dropna(), fname=report_dir.joinpath('burndown.html'))


if __name__ == '__main__':
    app()