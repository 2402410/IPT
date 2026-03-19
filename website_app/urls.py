from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, register, login
from django.urls import path

router = DefaultRouter()
router.register('todos', TodoViewSet)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
]

urlpatterns += router.urls  # include your Todo API routes