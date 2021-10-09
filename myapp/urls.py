from django.conf.urls import url
from django.urls import path
from . import views
from .views import chart

urlpatterns = [
    path('', views.index, name='index'),
    # path('', TaskList.as_view(), name='task_list_url')
    url(r'^chart/', chart, name='chart'),
]
