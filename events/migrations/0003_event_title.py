# Generated by Django 4.2 on 2024-11-06 04:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_alter_event_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='title',
            field=models.CharField(max_length=155, null=True),
        ),
    ]