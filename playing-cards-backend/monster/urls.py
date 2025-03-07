from django.urls import path, include
from rest_framework import routers

from monster.views import MonsterModelViewSet

router = routers.DefaultRouter()
router.register(r'monsters', MonsterModelViewSet, basename='monster')

urlpatterns = [
    path('', include(router.urls))
]