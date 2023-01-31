# from django.conf.urls import url
from django.urls import path, re_path
from . import views
from .views import chart

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^chart/', chart, name='chart'),
]