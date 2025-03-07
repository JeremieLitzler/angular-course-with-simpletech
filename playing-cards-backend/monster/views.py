from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from monster.models import Monster
from monster.serializers import MonsterSerializer


class MonsterModelViewSet(ModelViewSet):

    serializer_class = MonsterSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Monster.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
