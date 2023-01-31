from matplotlib import pyplot as plt

import matplotlib.pyplot as plt
import base64
from io import BytesIO

import pandas as pd
import numpy as np
import seaborn as sns
sns.set_theme(color_codes=True)


def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph


def get_plot(player_id):
    plt.switch_backend('AGG')
    plt.figure(figsize=(4, 8))
    plt.style.use('seaborn-whitegrid')

    raw_df = pd.read_csv("./fantasy_raw.csv")

    last_season = '2021-2022'
    season_start_date = '2021-10-19'
    season_end_date = '2022-04-11'

    plot_columns = ['id', 'name', 'game_date', 'fp', 'season']
    filtered_plot_df = raw_df.loc[raw_df['season'] ==
                                  last_season][raw_df['id'] == player_id][plot_columns]
    filter = filtered_plot_df[['game_date', 'fp']]
    filter.set_index('game_date', inplace=True)

    datelist = pd.date_range(start=season_start_date,
                             end=season_end_date).tolist()

    # create all days for last season
    plot_df = pd.DataFrame()
    plot_df['game_date'] = datelist
    plot_df['game_date'] = pd.to_datetime(
        plot_df['game_date']).dt.strftime('%Y-%m-%d')
    plot_df.set_index('game_date', inplace=True)

    # fill in nan for all days
    plot_df['fp'] = 0

    # update with actual matches
    plot_df.update(filter)
    # sort by date order
    plot_df.sort_values(by=['game_date'], inplace=True, ascending=True)

    # reset index for plotting
    plot_df = plot_df.reset_index()

    plt.clf()

    plot_df['fp'] = plot_df['fp'].replace(0, np.nan)
    plot_df.insert(plot_df.shape[1],
                   'row_count',
                   plot_df.index.value_counts().sort_index().cumsum())
    fig = sns.regplot(data=plot_df, x='row_count',
                      y=plot_df['fp'], color='#2a9d8f')
    fig.axes.get_xaxis().set_visible(False)
    fig.axes.get_yaxis().get_label().set_visible(False)

    graph = get_graph()
    return graph
