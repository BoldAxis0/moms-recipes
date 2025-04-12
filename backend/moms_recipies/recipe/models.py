from django.db import models
import uuid

# Create your models here.

class Recipe(models.Model):
    title = models.CharField(max_length=300)
    description = models.CharField(null=True, blank=True, max_length=10000)
    # audio = models.FileField()
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pic = models.ImageField(upload_to="pics/recipes", blank = True, null=True)
    
    
    