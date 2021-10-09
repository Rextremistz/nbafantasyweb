import matplotlib.pyplot as plt
import base64
from io import BytesIO


import pandas as pd
import numpy as np
from datetime import datetime as dt
import matplotlib.dates as mdates
from matplotlib import pyplot as plt
from matplotlib.dates import DateFormatter
from sklearn.linear_model import LinearRegression


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
    plt.style.use('ggplot')

    raw_df = pd.read_csv("./fantasy_raw.csv")

    last_season = '2020-2021'
    season_start_date = '2020-12-22'
    season_end_date = '2021-05-16'

    plot_columns = ['id', 'name', 'game_date', 'fp', 'season']
    filtered_plot_df = raw_df.loc[raw_df['season'] ==
                                  last_season][raw_df['id'] == player_id][plot_columns]
    filter = filtered_plot_df[['game_date', 'fp']]
    filter.set_index('game_date', inplace=True)

    plt.scatter(filtered_plot_df['game_date'],
                filtered_plot_df['fp'], 2, 'g', linewidth=1, marker='D', ).axes.get_xaxis().set_visible(False)

    # plt.title('per game points')
    # plt.xticks(rotation=45)
    # plt.xlabel('player_id')
    # plt.ylabel('points')
    # plt.tight_layout()
    graph = get_graph()
    return graph
