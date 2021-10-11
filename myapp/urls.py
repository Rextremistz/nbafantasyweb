from django.conf.urls import url
from django.urls import path
from . import views
from .views import chart

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^chart/', chart, name='chart'),
]
