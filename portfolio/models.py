from django.db import models

# Create your models here.
class Name(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)

class Age(models.Model):
    years_old = models.IntegerField(default=0)


class Test(models.Model):
    test_id = models.IntegerField(default = 0)
    test_data = models.IntegerField(default=0)
    test_datasource = models.CharField(max_length=500, default="")

class Covid(models.Model):
    # data =  {
    #             'totalCases'    :   0,
    #             'newDailyCases' :   0,
    #             'totalDeaths'   :   0,
    #             'newDailyDeaths':   0,
    #             'yesterdaysCases':  0,
    #             'rateIncrease'  :   0,
    #             'daysLeft'      :   0
    #         }
    totalCases = models.IntegerField(default = 0)
    newDailyCases = models.IntegerField(default = 0)
    totalDeaths = models.IntegerField(default = 0)
    newDailyDeaths = models.IntegerField(default = 0)
    yesterdaysCases = models.IntegerField(default = 0)
    rateIncrease = models.DecimalField(max_digits=7, decimal_places = 4)
    daysLeft = models.IntegerField(default = 0)
