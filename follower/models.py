from django.db import models
from django.contrib.auth.models import User


class Follower(models.Model):
    """
    Users will be able to follow store pages
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    followed = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followed')
    followed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-followed_at"]
        unique_together = ['owner', 'followed']

    def __str__(self):
        return f'{self.owner} {self.followed}'
