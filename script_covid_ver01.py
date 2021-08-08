import os
import django
os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'mikewroberts.settings'
)
django.setup()
from portfolio.models import Covid
from datetime import datetime
import requests
from bs4 import BeautifulSoup


data =  {
            'totalCases'    :   0,
            'newDailyCases' :   0,
            'totalDeaths'   :   0,
            'newDailyDeaths':   0,
            'yesterdaysCases':  0,
            'rateIncrease'  :   0
        }

############################
##  WEB SCRAPING
############################

def scrape(data):
    #  data from :
    #  https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html
    result = requests.get("https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html")
    print("HTTPRequest status_code : " + str(result.status_code))
    src = result.content
    soup = BeautifulSoup(src, 'lxml')   # "soupify"

    # get total US cases of covid19
    data['totalCases'] = soup.find_all("section")[0].find_all("span")[0].text # locate text in HTML
    data['totalCases'] = int(data['totalCases'].replace(",",""))      # convert to integer

    # get new cases since yesterday
    data['newDailyCases'] = soup.find_all("section")[0].find_all("span")[1].text    # locate text in HTML
    data['newDailyCases'] = data['newDailyCases'].split(' ')[0]     # isolate number from mixed string
    data['newDailyCases'] = int(data['newDailyCases'].replace(",",""))  # convert to integer

    # get total deaths
    data['totalDeaths'] = int(soup.find_all("section")[0].find_all("span")[2].text.replace(",",""))

    # get new deaths
    data['newDailyDeaths'] = int(soup.find_all("section")[0].find_all("span")[3].text.split(' ')[0].replace(",",""))

    return data


# scrape(data)

####################################||
## CALCULATE RATE OF INCREASE      ||
####################################||
def calcRate(data):
    data['yesterdaysCases'] = data['totalCases'] - data['newDailyCases']
    data['rateIncrease'] = (data['newDailyCases'] / data['yesterdaysCases'])
    return data

# calcRate(data)

#######################################||
## END CALCULATE RATE OF INCREASE     ||
#######################################||


#####################################
## EXTRAPOLATE
#####################################

def extrap(data):

    totalPopulation = 310000000
    days = 0
    totalCases = data['totalCases']
    rateIncrease = data['rateIncrease']

    while totalCases <= totalPopulation:
        days += 1
        totalCases += (totalCases*rateIncrease)
        # print(totalCases)

    data['daysLeft'] = days


# extrap(data)

##############################################
## END EXTRAPOLATE ###########################
##############################################

## Print Results ###########
############################

def printResults(data):

    print("Time: " + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    print("Today's Total Cases : " + '{:,}'.format(data['totalCases']))
    print("Yesterday's Total Cases : " + '{:,}'.format(data['yesterdaysCases']))
    print("Today's New Cases : " + '{:,}'.format(data['newDailyCases']))
    print("Rate of Increase : " + str(round((data['rateIncrease']*100),2))  + "%")
    print("Days Until Population Saturation: " + str(data['daysLeft']))
    print("Weeks Until Population Saturation: " + str(round((data['daysLeft']/7),1)))
    print("Months Until Population Saturation: " + str((data['daysLeft']/30)))
    print("\n\n\n")

# printResults(data)

## Upload Results to Database
##############################
def uploadToDatabase(data):
    ## count current objects
    current_count = len(Covid.objects.all())
    data_to_add = Covid(
        totalCases = data['totalCases'],
        newDailyCases = data['newDailyCases'],
        totalDeaths = data['totalDeaths'],
        newDailyDeaths = data['newDailyDeaths'],
        yesterdaysCases = data['yesterdaysCases'],
        rateIncrease = data['rateIncrease'],
        daysLeft = data['daysLeft']
    )
    data_to_add.save()


def script(data):
    scrape(data)
    calcRate(data)
    extrap(data)
    printResults(data)
    uploadToDatabase(data)

#run script
script(data)

# schedule.every(5).seconds.do(script, data)
# schedule.every(10).minutes.do(script, data)

# while True:
#     schedule.run_pending()
#     time.sleep(1)


# print(data)

### TIME OF UPDATE : 10:11:22 - 10:21:23
