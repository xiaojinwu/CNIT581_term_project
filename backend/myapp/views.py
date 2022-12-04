 
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from myapp.models import Task
from .serializers import TaskSerializer
from django.db import models
from rest_framework import routers, serializers, viewsets

router = routers.DefaultRouter()

# Create your views here.
 
class task(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=False, methods=['GET'], name='get count of tasks')
    def get_count(self, request):
        return JsonResponse({'count': Task.objects.count()})



 
router.register(r'task', task) 
