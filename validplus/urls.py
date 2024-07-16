from django.urls import path
from validplus import views


urlpatterns = [
    path('validplus/', views.ValidPlusList.as_view()),
    path('validplus/<int:pk>', views.ValidPlusDetail.as_view()),
]
