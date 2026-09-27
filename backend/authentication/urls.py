from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='health_check'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/social/', views.social_login_view, name='social_login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('students/', views.students_view, name='students_list_create'),
    path('students/<str:student_id>/', views.student_detail_view, name='student_detail'),
    path('students/<str:student_id>/progress/', views.record_progress_view, name='record_student_progress'),
]
