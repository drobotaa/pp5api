from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    category_choice_filter = [
        ('clothing', 'Clothing'), ('housekeeping', 'Housekeeping'),
        ('food', 'Food'),('electronics', 'Electronics'),
        ('services', 'Services'), ('tourism', 'Tourism')
    ]
    image_filter_choices = [
    ('_1977', '1977'), ('brannan', 'Brannan'),
    ('earlybird', 'Earlybird'), ('hudson', 'Hudson'),
    ('inkwell', 'Inkwell'), ('lofi', 'Lo-Fi'),
    ('kelvin', 'Kelvin'), ('normal', 'Normal'),
    ('nashville', 'Nashville'), ('rise', 'Rise'),
    ('toaster', 'Toaster'), ('valencia', 'Valencia'),
    ('walden', 'Walden'), ('xpro2', 'X-pro II')
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to = 'images/', default='../Placeholder_jjfvap', blank=True
    )
    image_filter = models.CharField(
        max_length=35, choices=image_filter_choices, default='Normal'
    )
    category_filter = models.CharField(
        max_length=40, choices=category_choice_filter, default='None'
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
