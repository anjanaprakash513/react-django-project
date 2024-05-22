from django import forms
from .models import Movies
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class Moviesform(forms.ModelForm):
    class Meta:
        model = Movies
        fields = '__all__'


class signUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username','email','password1','password2']