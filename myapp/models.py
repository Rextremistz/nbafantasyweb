from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField('Name', max_length=100)
    team = models.CharField('Team', max_length=100)
    season = models.CharField(max_length=100, blank=True, null=True)
    games = models.IntegerField(blank=True, null=True)
    points = models.FloatField(max_length=100, blank=True, null=True)
    average = models.FloatField(max_length=100, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name
