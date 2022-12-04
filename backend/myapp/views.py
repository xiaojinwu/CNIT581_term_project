 
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from django.contrib.auth.models import User
from myapp.models import Task, Project, Result
from .serializers import TaskSerializer, ProjectSerializer, ResultSerializer,UserSerializer
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
    
    @action(detail=False, methods=['POST'], name='create a task under a project')
    def create_task(self, project_id, name, description, detection_model, data_type):
        project = Project.objects.get(id=project_id)
        task = Task.objects.create(project=project, name=name, description=description, detection_model=detection_model, data_type=data_type)
        return JsonResponse({'task_id': task.id})

class project(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    @action(detail=False, methods=['GET'], name='get count of projects')
    def get_count(self, request):
        return JsonResponse({'count': Project.objects.count()})
    @action(detail=False, methods=['POST'], name='assign developers to project')
    def assign_developer(self, user_id_set, project_id):
        project = Project.objects.get(id=project_id)
        for user_id in user_id_set:
            user = User.objects.get(id=user_id)
            if user not in project.developers.all():
                project.developers.add(user)
        return JsonResponse({'status': 'success'})
    @action(detail=False, methods=['GET'], name='get all projects ')
    def get_all_projects(self, request):
        projects = Project.objects.all() 
      
        return JsonResponse({'projects': projects})


class user(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['GET'], name='get all users')
    def get_all_users(self, request):
        users=User.objects.all()
        return JsonResponse({'users': users})
    
    @action(detail=False, methods=['GET'], name='get current user')
    def get_current_user(self, request):
        print(request.user) 
        user=User.objects.filter(id=request.user.id)
        return JsonResponse({'user': user})
    

class result(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    @action(detail=False, methods=['POST'], name='generate result')
    def generate_result(self, task_id):
        task = Task.objects.get(id=task_id)
        result = Result.objects.create(name=task.name, description=task.description, task=task)
        return JsonResponse({'status': 'success'})
 
router.register(r'task', task)
router.register(r'project', project)
router.register(r'result', result)
router.register(r'user', user)
