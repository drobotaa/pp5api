from django.urls import path
from events import views


urlpatterns = [
    path('event/', views.EventList.as_view()),
    path('event/<int:pk>/', views.EventDetail.as_view()),
]