from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Interest
from .serializers import InterestSerializer

class InterestCreateView(generics.CreateAPIView):
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class InterestListView(generics.ListAPIView):
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Interest.objects.filter(receiver=self.request.user, accepted=False, rejected=False)

class InterestUpdateView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        interest_id = self.kwargs.get('pk')
        return self.queryset.filter(receiver=self.request.user, id=interest_id).first()

    def patch(self, request, *args, **kwargs):
        interest = self.get_object()
        action = request.data.get('action')

        if action == 'accept':
            interest.status = 'accepted'
        elif action == 'reject':
            interest.status = 'rejected'

        interest.save()
        return self.partial_update(request, *args, **kwargs)

class InterestAcceptView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        interest_id = self.kwargs.get('pk')
        return self.queryset.filter(receiver=self.request.user, id=interest_id).first()

    def patch(self, request, *args, **kwargs):
        interest = self.get_object()
        interest.status = 'accepted'
        interest.save()
        return self.partial_update(request, *args, **kwargs)

class InterestRejectView(generics.UpdateAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        interest_id = self.kwargs.get('pk')
        return self.queryset.filter(receiver=self.request.user, id=interest_id).first()

    def patch(self, request, *args, **kwargs):
        interest = self.get_object()
        interest.status = 'rejected'
        interest.save()
        return self.partial_update(request, *args, **kwargs)

class SendInterestAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = InterestSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(sender=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
