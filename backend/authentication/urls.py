from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/social/', views.social_login_view, name='social_login'),
    path('auth/logout/', views.logout_view, name='logout'),
]
