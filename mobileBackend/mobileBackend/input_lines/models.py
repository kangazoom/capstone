from django.db import models
# Create your models here.

class InputLine(models.Model):
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=500)
    description = models.TextField()
    speaking_character = models.CharField(max_length=500)
    user_character = models.CharField(max_length=500)
    line_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
