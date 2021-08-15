from django.shortcuts import render
from django.http import HttpResponse
from .models import Player

# Create your views here.


def index(request):
    players = Player.objects.all()
    return render(request, 'index.html', {'players': players})


def counter(request):
    countertext = request.POST['countertext']
    amount_of_words = len(countertext.split())
    return render(request, 'counter.html', {'amount': amount_of_words})
