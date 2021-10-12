# NBA-Fantasy-Frontend

1. Run NBA-Fantasy-Backend to get raw data
a. PlayerStats.py
  - fetch data from NBA_api
  - league rules
  - fantasy_df.pkl
b. YearlyFantasyPoints.py
  - season index of start and end date
  - import auction price
  - season_fp.csv & fantasy_raw.csv
c. nba_stats_player_index.ipynb (from Frontend directory)
  - run to fetch newest player and team index from NBA.com
d. adjustcsvforsql.py
  - set recent 3 years
  - generate csv in a datatable form and save in Frontend directory for csvToJson.py to use
2. Run NBA-Fantasy-Frontend
a. cvsToJson.py
  - convert csv to json for datatable to read
b. runserver
  
  
*adjust with plot_player_points_every_game.ipynb to make changes with scatter plotting
