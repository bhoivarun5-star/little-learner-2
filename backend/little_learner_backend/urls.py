"""
URL configuration for little_learner_backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_status_view(request):
    return JsonResponse({
        "status": "online",
        "service": "Little Learner Backend API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health/",
            "auth_login": "/api/auth/login/",
            "auth_register": "/api/auth/register/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', root_status_view, name='root_status'),
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
]
