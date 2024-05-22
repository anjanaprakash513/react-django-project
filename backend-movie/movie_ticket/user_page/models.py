from django.db import models
import uuid
from django.contrib.auth.models import User

class ticketBooking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=1)
    booking_id = models.UUIDField(default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=500)
    date = models.DateField()
    time = models.CharField(max_length=500)
    seat = models.CharField(max_length=500)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10,decimal_places=2,default=150)
    total_price = models.DecimalField(max_digits=10,decimal_places=2,default=150)

class Payment(models.Model):
    order_id = models.CharField(max_length=100,  default='')
    amount = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Order ID: {self.order_id}, Amount: {self.amount}, Status: {self.status}"