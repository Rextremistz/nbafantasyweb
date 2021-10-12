<h1>Run NBA-Fantasy-Backend to get raw data</h1>

<h2>PlayerStats.py</h2>

* fetch data from NBA_api
* league rules
* fantasy_df.pkl


<h2>YearlyFantasyPoints.py</h2>

* season index of start and end date
* import auction price
* season_fp.csv & fantasy_raw.csv


<h2>nba_stats_player_index.ipynb (from Frontend directory)</h2>

* run to fetch newest player and team index from NBA.com


<h2>adjustcsvforsql.py</h2>

* set recent 3 years
* generate csv in a datatable form and save in Frontend directory for csvToJson.py to use


<h1>Run NBA-Fantasy-Frontend</h1>

<h2>cvsToJson.py</h2>

* convert csv to json for datatable to read

<h2>runserver</h2>

* adjust with plot_player_points_every_game.ipynb to make changes with scatter plotting
