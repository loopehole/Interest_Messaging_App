from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

class Interest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='accounts_sent_interests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='accounts_received_interests', on_delete=models.CASCADE)
    message = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    class Meta:
        unique_together = ('sender', 'receiver')

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender} -> {self.recipient}: {self.content}'
