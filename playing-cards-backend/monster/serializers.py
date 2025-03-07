from rest_framework import serializers
from monster.models import Monster


class MonsterSerializer(serializers.ModelSerializer):

    figureCaption = serializers.CharField(source="figure_caption")
    attackName = serializers.CharField(source="attack_name")
    attackStrength = serializers.IntegerField(source="attack_strength")
    attackDescription = serializers.CharField(source="attack_description")

    class Meta:
        model = Monster
        exclude = ('figure_caption', "attack_name", "attack_strength", "attack_description", "owner")
