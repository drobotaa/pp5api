from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=155, null=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return f'{self.title}'
