from django.urls import path
from .views import InterestCreateView, InterestListView, InterestUpdateView

urlpatterns = [
    path('interests/', InterestCreateView.as_view(), name='interest-create'),
    path('interests/received/', InterestListView.as_view(), name='interest-list'),
    path('interests/<int:pk>/', InterestUpdateView.as_view(), name='interest-update'),
]
