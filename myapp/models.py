from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default='Healthy')
    lastseasonttl = models.FloatField(default=0)
