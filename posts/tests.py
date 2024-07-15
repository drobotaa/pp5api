from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username="andrei", password="pass")

    def test_posts_list(self):
        andrei= User.objects.get(username="andrei")
        Post.objects.create(owner=andrei, title="Test title")
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # console.log(response.data)


    def test_loggedin_user_can_post(self):
        self.client.login(username="andrei", password="pass")
        response = self.client.post('/posts/', {'title': 'Test Title'})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_loggedout_user_cant_post(self):
        response = self.client.post('/posts/', {'title': 'Test Title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
