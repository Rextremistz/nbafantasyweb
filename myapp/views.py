from django.shortcuts import render
from .models import Player, Season
from .utils import get_plot
from django.views.generic import View

# Create your views here.


def index(request):
    players = Player.objects.all()

    y1 = Season()
    y1.season = "2020-21"
    y2 = Season()
    y2.season = "2019-20"
    y3 = Season()
    y3.season = "2018-19"

    return render(request, 'index.html', {'players': players, 'y1': y1, 'y2': y2, 'y3': y3})


def chart(request):
    player_id = request.GET.get('player_id')
    player_name = request.GET.get('player_name')
    player_team = request.GET.get('player_team')
    player_position = request.GET.get('player_position')
    chart = get_plot(int(player_id))
    return render(request, 'chart.html', {'chart': chart, 'player_id': player_id, 'player_name': player_name,
                                          'player_team': player_team, 'player_position': player_position})
