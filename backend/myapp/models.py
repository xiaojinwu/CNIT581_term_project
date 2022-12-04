from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# define Task model
class Task(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    detection_model = models.CharField(max_length=50)
    data_type = models.CharField(max_length=50) 
    project=models.ForeignKey('Project', on_delete=models.CASCADE,  related_name='parent_project',null=True, blank=True)
    results = models.ManyToManyField('Result', related_name='results',null=True, blank=True)
 

    def __str__(self):
        return self.name

# define Project model
class Project(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    tasks = models.ManyToManyField(Task, related_name='tasks',null=True, blank=True) 
    developers = models.ManyToManyField(User, related_name='developers',null=True, blank=True)


    def __str__(self):
        return self.name

# define Result model
class Result(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE) 

    def __str__(self):
        return self.name