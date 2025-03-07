from django.urls import path, include
from rest_framework import routers
from user_management.views import LoginView, LogoutView, MeView

router = routers.DefaultRouter()
router.register(r'sessions/login', LoginView, basename='users/login')
router.register(r'sessions/logout', LogoutView, basename='users/logout')
router.register(r'sessions/me', MeView, basename='me')

urlpatterns = [
    path('', include(router.urls))
]