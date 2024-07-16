from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


class ValidPlus(models.Model):
    """
    Valid Plus model, related to owner and post.
    With this instance the users can "Validate if
    a post offer is valid or not"
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="valid")
    validated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-validated_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'
