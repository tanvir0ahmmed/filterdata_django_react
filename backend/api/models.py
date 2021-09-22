from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class InputData(models.Model):
    inp = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE)
    class Meta:
            ordering = ('created_at',)
            
    def __str__(self):
        return str(self.created_at)
            

#next_day = active_on + datetime.timedelta(1)
#queryset = queryset.filter(date_created__range=(active_on, next_day) )

''' 
from django.conf import settings
from django.utils.timezone import make_aware

naive_datetime = datetime.datetime.now()
naive_datetime.tzinfo  # None

settings.TIME_ZONE  # 'UTC'
aware_datetime = make_aware(naive_datetime)
aware_datetime.tzinfo  # <UTC>
'''