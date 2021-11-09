from django.db import models
from django.db.models.base import Model

# Create your models here.
class UserProfile(models.Model):
    name = models.CharField(max_length=256)
    avatar = models.ImageField(upload_to='avatar')

    def __str__(self):
        return self.name
   
    

