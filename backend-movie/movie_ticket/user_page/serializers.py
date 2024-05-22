from rest_framework import serializers
from .models import ticketBooking
from .models import Payment

class ticketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ticketBooking
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'