from rest_framework.test import APIClient
from rest_framework import status
from django.test import TestCase
from django.contrib.auth.models import User

class InterestTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()
        self.client.login(username='testuser', password='testpassword')

    def test_send_interest(self):
        url = '/api/messaging/interests/'
        data = {'some': 'data'}  # Replace with your actual data
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
