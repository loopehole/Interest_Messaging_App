from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Interest

User = get_user_model()

class AccountTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='alice', password='alice@12345', email='decent.jai1995@gmail.com')

    def test_register_user(self):
        response = self.client.post('/api/accounts/register/', {'username': 'Ram', 'password': 'Ram@12345', 'email': 'ram@example.com'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        response = self.client.post('/api/accounts/login/', {'username': 'alice', 'password': 'alice@12345'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_change_password(self):
        self.client.login(username='alice', password='alice@12345')
        response = self.client.post('/api/accounts/change-password/', {'old_password': 'alice@12345', 'new_password': 'Alice@12345'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)