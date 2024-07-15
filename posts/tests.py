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


class PostDetailViewTests(APITestCase):
    def setUp(self):
        andrei = User.objects.create_user(username="andrei", password="pass")
        drobota = User.objects.create_user(username="drobota", password="pass")
        Post.objects.create(
            owner=andrei, title="Test title 1", description="Etc 1"
        )
        Post.objects.create(
            owner=drobota, title="Test Title 2", description="Etc 2"
        )

    def test_retreive_post_by_valid_id(self):
        response = self.client.get('/posts/1/')
        self.assertEqual(response.data['title'], 'Test title 1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_post_retreival(self):
        response = self.client.get('/posts/invalid/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_own_post(self):
        self.client.login(username="andrei", password="pass")
        response = self.client.put('/posts/1/', {'title': 'a modified title'})
        post = Post.objects.filter(pk=1).first()
        self.assertEqual(post.title, 'a modified title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_notowned_post(self):
        self.client.login(username="andrei", password="pass")
        response = self.client.put('/posts/2/', {'title':'syke'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

