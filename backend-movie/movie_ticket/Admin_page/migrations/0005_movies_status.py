# Generated by Django 5.0.3 on 2024-04-09 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin_page', '0004_movies_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='movies',
            name='status',
            field=models.CharField(choices=[('active', 'Active'), ('disabled', 'Disabled')], default='active', max_length=20),
        ),
    ]
