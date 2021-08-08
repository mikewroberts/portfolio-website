import os
import django
os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'mikewroberts.settings'
)
django.setup()
from portfolio.models import Covid

from datetime import datetime
from datetime import timedelta
import schedule
import time
import requests
from bs4 import BeautifulSoup

# initialize data to zero each time script is run to avoid runaway additions
data =  {
            'totalCases'    :   0,
            'newDailyCases' :   0,
            'totalDeaths'   :   0,
            'newDailyDeaths':   0,
            'yesterdaysCases':  0,
            'rateIncrease'  :   0
        }

# list of states for excluding "territories" in CDC dataset
US_States = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI",
            "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS",
            "MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR",
            "PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]


############################
## UTILITY FUNCTIONS
############################

def is_state(US_States, state):
    if state in US_States:
        return True
    else:
        return False

def initialize_data(data):
    data['totalCases'] = 0
    data['newDailyCases'] = 0
    data['totalDeaths'] = 0
    data['newDailyDeaths'] = 0
    data['yesterdaysCases'] = 0
    data['rateIncrease'] = 0

############################
##  WEB SCRAPING
############################

def scrape(data):
    yesterday = datetime.today()-timedelta(days=1)
    yesterday = yesterday.strftime("%Y-%m-%d")
    print(yesterday)

    #  data from CDC API Endpoint :
    #  https://data.cdc.gov/resource/9mfq-cb36.json
    url = f'https://data.cdc.gov/resource/9mfq-cb36.json?submission_date={yesterday}'
    print(url)
    result = requests.get(url).json()
    # print("HTTPRequest status_code : " + str(result.status_code))
    # src = result.content
    print(result[0]["state"])
    print(result[0]["tot_cases"])
    for i in range(0,60):
        if is_state(US_States, result[i]["state"]):
            data['totalCases'] += int(result[i]["tot_cases"])
            data['newDailyCases'] += int(float(result[i]["new_case"]))
            data['totalDeaths'] += int(result[i]["tot_death"])
            data['newDailyDeaths'] += int(float(result[i]["new_death"]))


    print("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    # soup = BeautifulSoup(result, 'lxml')   # "soupify"
    # print(soup)


    print(data['totalCases'])
    print(data['newDailyCases'])
    print(data['totalDeaths'])
    print(data['newDailyDeaths'])
    return data

####################################||
## CALCULATE RATE OF INCREASE      ||
####################################||
def calcRate(data):
    data['yesterdaysCases'] = data['totalCases'] - data['newDailyCases']
    data['rateIncrease'] = (data['newDailyCases'] / data['yesterdaysCases'])
    return data

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

###################################
## Print Results
###################################

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
    initialize_data(data)
    scrape(data)
    calcRate(data)
    extrap(data)
    printResults(data)
    uploadToDatabase(data)

script(data)


#
# schedule.every(5).seconds.do(script, data)
# schedule.every(10).minutes.do(script, data)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)


# print(data)

### TIME OF UPDATE : 10:11:22 - 10:21:23
