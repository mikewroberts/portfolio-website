from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    context= {

    }
    return render(request, 'portfolio/index.html', context)

def about(request):
    context= {

    }
    return render(request, 'portfolio/about.html', context)

def resume(request):
    context= {

    }
    return render(request, 'portfolio/resume.html', context)

def contact(request):
    context= {

    }
    return render(request, 'portfolio/contact.html', context)


def prj_featured_01(request):
    context= {    }
    return render(request, 'portfolio/projects/featured_01.html', context)


################################
from .models import Test

def codetest(request):
    all_data = []
    for item in Test.objects.all():
        all_data.append(item.test_data)
    data_from_db = Test.objects.all()[0].test_data
    context= {  'data_from_db' : data_from_db,
                'all_data' : all_data
      }
    return render(request, 'portfolio/codepages/test.html', context)

from portfolio.models import Covid
def covid(request):
    current_count_data = len(Covid.objects.all())
    indexer = current_count_data - 1

    totalCases = Covid.objects.all()[indexer].totalCases
    newDailyCases = Covid.objects.all()[indexer].newDailyCases
    totalDeaths = Covid.objects.all()[indexer].totalDeaths
    newDailyDeaths = Covid.objects.all()[indexer].newDailyDeaths
    yesterdaysCases = Covid.objects.all()[indexer].yesterdaysCases
    rateIncrease = Covid.objects.all()[indexer].rateIncrease*100
    daysLeft = Covid.objects.all()[indexer].daysLeft

    context= {  'totalCases' : f'{totalCases:,}',
                'newDailyCases' : f'{newDailyCases:,}',
                'totalDeaths' : f'{totalDeaths:,}',
                'newDailyDeaths' : f'{newDailyDeaths:,}',
                'yesterdaysCases' : f'{yesterdaysCases:,}',
                'rateIncrease' : f'{rateIncrease:,}',
                'daysLeft' : f'{daysLeft:,}'
      }
    return render(request, 'portfolio/codepages/covid.html', context)


################################
