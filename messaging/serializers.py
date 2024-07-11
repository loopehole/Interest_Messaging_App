from rest_framework import serializers
from .models import Interest

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'sender', 'receiver', 'message', 'accepted', 'rejected', 'timestamp']
        read_only_fields = ['id', 'sender', 'status', 'timestamp']
