# Generated by Django 5.0.3 on 2024-04-10 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_page', '0005_movies_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movies',
            name='time',
        ),
        migrations.AddField(
            model_name='movies',
            name='time_11_30',
            field=models.CharField(default='00:00', max_length=500),
        ),
        migrations.AddField(
            model_name='movies',
            name='time_2_30',
            field=models.CharField(default='00:00', max_length=500),
        ),
        migrations.AddField(
            model_name='movies',
            name='time_5',
            field=models.CharField(default='00:00', max_length=500),
        ),
        migrations.AddField(
            model_name='movies',
            name='time_9',
            field=models.CharField(default='00:00', max_length=500),
        ),
    ]
