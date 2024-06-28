# Members

-   Antoine OTEGUI
-   Clément GALIOT
-   Louis PAINTER

# Project Info

Snoezelen! Have you heard of it? It is a multisensory approach designed to gently and controlledly stimulate the senses, often used for individuals with developmental disorders, disabilities, or special needs. It typically takes place in a room equipped with soft lights, soothing sounds, and tactile objects, creating a relaxing and secure environment.

# How to run

```
git clone https://gitlab.imt-atlantique.fr/l23paint/snoezelen.git
cd snoezelen
npm install
npm run dev
```

The website should be available in your browser at http://localhost:5173/snoezelen

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
