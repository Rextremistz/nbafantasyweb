from django.contrib import admin
from .models import PerGamePoints, Player, Season

# Register your models here.
admin.site.register(Player)
admin.site.register(Season)
admin.site.register(PerGamePoints)
