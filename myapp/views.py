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

    # get player_id from main.js ajax
    # player_id = request.GET.get('player_id')

    # print('sent')
    # print(player_id)
    # print()

    return render(request, 'index.html', {'players': players, 'y1': y1, 'y2': y2, 'y3': y3})


# class TaskList(View):
#     def get(self, request):
#         return render(request, 'myapp/task_list.html')

def chart(request):
    player_id = request.GET.get('player_id')
    chart = get_plot(int(player_id))
    return render(request, 'chart.html', {'chart': chart, 'player_id': player_id})
