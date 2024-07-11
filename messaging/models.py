from django.conf import settings
from django.db import models

class Interest(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='messaging_sent_interests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='messaging_received_interests', on_delete=models.CASCADE)
    message = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f'Interest from {self.sender} to {self.receiver}'
