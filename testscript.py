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
    test_data = 24,
    test_datasource = "Douglas Adams"
)

data_to_add.save()
