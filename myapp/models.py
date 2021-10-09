from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    team = models.CharField(max_length=100, blank=True, null=True)
    y1_points = models.FloatField(blank=True, null=True)
    y2_points = models.FloatField(blank=True, null=True)
    y3_points = models.FloatField(blank=True, null=True)
    y1_average = models.FloatField(blank=True, null=True)
    y2_average = models.FloatField(blank=True, null=True)
    y3_average = models.FloatField(blank=True, null=True)
    y1_games = models.IntegerField(blank=True, null=True)
    y2_games = models.IntegerField(blank=True, null=True)
    y3_games = models.IntegerField(blank=True, null=True)
    y1_price = models.IntegerField(blank=True, null=True)
    y2_price = models.IntegerField(blank=True, null=True)
    y3_price = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name


class Season(models.Model):
    season = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.season


class PerGamePoints(models.Model):
    player_id = models.CharField(max_length=100, blank=True, null=True)
    points = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.player_id
