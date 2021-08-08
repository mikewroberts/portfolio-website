import os
import django

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'mikewroberts.settings'
)
django.setup()

from portfolio.models import Test

# get length of list to use as indexer
current_count_data_objects = len(Test.objects.all())

# use length index to create data
data_to_add = Test(
    test_id = current_count_data_objects + 1,
    test_data = (current_count_data_objects+1)*10,
    test_datasource = "Scheduler_"+str(current_count_data_objects+1)
)

# add new data to end of table
data_to_add.save()
