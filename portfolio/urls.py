from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('maps', views.maps, name='maps'),
    path('maps/feature01', views.mapfeature01, name='mapfeature01'),
    path('maps/feature02', views.mapfeature02, name='mapfeature02'),
    path('maps/feature03', views.mapfeature03, name='mapfeature03'),
    path('maps/feature04', views.mapfeature04, name='mapfeature04'),

    path('code', views.code, name='code'),
    path('code/test', views.codetest, name='codetest'),
    path('code/covid', views.covid, name='covid'),
    path('code/mortgage', views.mortgage, name='mortgage'),
    path('code/co2map', views.co2map, name='co2map'),
    path('about', views.about, name='about'),
    path('resume', views.resume, name='resume'),
    path('contact', views.contact, name='contact')
]
