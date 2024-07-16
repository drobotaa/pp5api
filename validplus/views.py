from rest_framework import generics, permissions
from pp5_api.permissions import IsOwnerOrReadOnly
from .models import ValidPlus
from .serializers import ValidPlusSerializer


class ValidPlusList(generics.ListCreateAPIView):
    serializer_class = ValidPlusSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = ValidPlus.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ValidPlusDetail(generics.RetrieveDestroyAPIView):
    serializer_class=ValidPlusSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = ValidPlus.objects.all()
