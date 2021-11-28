from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about', views.about, name='about'),
    path('resume', views.resume, name='resume'),
    path('contact', views.contact, name='contact'),

    path('projects/featured_01', views.prj_featured_01,
    name='prj_featured_01'),
    path('projects/featured_02', views.prj_featured_01,
    name='prj_featured_02'),
    path('projects/featured_03', views.prj_featured_01,
    name='prj_featured_03'),
    path('projects/featured_04', views.prj_featured_01,
    name='prj_featured_04')
]
