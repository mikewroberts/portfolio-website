
# This script does not work, but the same script does when put in the same directory level as manage.py

#  will be leaving this here for further experimentation.

import os
import django

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE',
    'mikewroberts.settings'
)
django.setup()

from portfolio.models import Test

## add string to Test.objects
## will be index objects[1]

data_to_add = Test(
    test_id = 2,
    test_data = "The Answer to Everything",
    test_datasource = "Douglas Adams"
)

data_to_add.save()
