from rest_framework import generics, status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView  # Add this import
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.core import serializers
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, InterestSerializer, MessageSerializer  # Ensure MessageSerializer is imported
from .models import Interest, Message

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class AcceptInterestView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.accepted = True
        instance.rejected = False
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RejectInterestView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.accepted = False
        instance.rejected = True
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = request.user
            old_password = serializer.validated_data.get('old_password')
            new_password = serializer.validated_data.get('new_password')

            if not user.check_password(old_password):
                return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InterestViewSet(viewsets.ModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        sender = self.request.user
        receiver = serializer.validated_data.get('receiver')

        if Interest.objects.filter(sender=sender, receiver=receiver).exists():
            raise serializers.ValidationError('Interest already sent.')

        serializer.save(sender=sender)

    def get_queryset(self):
        user = self.request.user
        return Interest.objects.filter(sender=user) | Interest.objects.filter(receiver=user)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # Ensure user object is extracted correctly
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "username": user.username,
                "email": user.email
            }
        })
