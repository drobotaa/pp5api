from rest_framework import generics, permissions, filters
from pp5_api.permissions import IsOwnerOrReadOnly 
from .models import Event
from .serializers import EventSerializer

class EventList(generics.ListCreateAPIView):
    """
    View to list and create events.
    """
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Event.objects.all()
    filter_backends = [
        filters.SearchFilter
    ]
    search_fields = [
        'title',
        'description',
        'location',
        'date',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete an event.
    """
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Event.objects.all()
