from django.db import models

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


    def __str__(self):
        return self.name