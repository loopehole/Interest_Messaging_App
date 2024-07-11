from django.urls import path, include
from .views import RegisterView, LoginView, UserListView, ChangePasswordView, AcceptInterestView, RejectInterestView, MessageViewSet, InterestViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'interests', InterestViewSet, basename='interest')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('interests/<int:pk>/accept/', AcceptInterestView.as_view(), name='accept_interest'),
    path('interests/<int:pk>/reject/', RejectInterestView.as_view(), name='reject_interest'),
    path('api/', include(router.urls)),
]
