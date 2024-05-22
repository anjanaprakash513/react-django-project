from django.db import models
import datetime

class Movies(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    language = models.CharField(max_length=500)
    release_date = models.DateField()
    director = models.CharField(max_length=500)
    actors = models.CharField(max_length=500)
    poster_url = models.URLField(max_length=500)
    price = models.DecimalField(max_digits=10,decimal_places=2,default=150)

    time_11_30 = models.CharField(max_length=500,default='00:00')
    time_2_30 = models.CharField(max_length=500, default='00:00')
    time_5 = models.CharField(max_length=500, default='00:00')
    time_9 = models.CharField(max_length=500, default='00:00')

    STATUS_CHOICES = (
        ('active', 'Active'),
        ('disabled', 'Disabled'),
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')  