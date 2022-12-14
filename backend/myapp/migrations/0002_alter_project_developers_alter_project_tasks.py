# Generated by Django 4.1.3 on 2022-12-04 20:49

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='developers',
            field=models.ManyToManyField(blank=True, null=True, related_name='developers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='project',
            name='tasks',
            field=models.ManyToManyField(blank=True, null=True, related_name='tasks', to='myapp.task'),
        ),
    ]
