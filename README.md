# Members

-   Antoine OTEGUI
-   Clément GALIOT
-   Louis PAINTER

# Project Info

# Charts

To generate project burnup and burndown charts, create a `.env` file in the `utils` folder with the following content:

-   token
-   base_project
-   gitlab_api
-   report_dir

Then run the following commands :

```
$ cd utils
$ pip3 install numpy panda plotly requests typer pydantic pydantic_settings
$ python3 charts.py
```

The charts will be generated in the `report_dir` folder as html files.
