from django.db import models
from django.contrib.auth.models import User



class Monster(models.Model):

    name = models.TextField()
    image = models.TextField()
    type = models.TextField()
    hp = models.IntegerField()
    figure_caption = models.TextField()
    attack_name = models.TextField()
    attack_strength = models.IntegerField()
    attack_description = models.TextField()

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
