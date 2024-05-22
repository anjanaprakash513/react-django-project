from django import forms
from .models import ticketBooking

class ticketForm(forms.ModelForm):
    class Meta:
        model = ticketBooking
        fields = '__all__'