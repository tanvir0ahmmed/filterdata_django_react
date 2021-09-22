from django.urls import path,include
from rest_framework.routers import DefaultRouter
from api import views
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('login/',views.LogInViewSet.as_view()),#use this api endpoint for login
    path('logout/',views.LogOutViewSet.as_view()),#use this api endpoint for logout
    path('input/',views.InputView.as_view()),#use this api endpoint for view authenticated user input data
    path('all-input/',views.InputAllView.as_view()),#use this api endpoint for get all user data
    path('input/<int:pk>/<slug:st>/<slug:ed>/',views.InputDetail.as_view()),#use this api endpoint for get user input data based on user id, start datetime, & end datetime

]