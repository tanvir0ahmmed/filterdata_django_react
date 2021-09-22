from django.urls import path,include
from rest_framework.routers import DefaultRouter
from api import views
router = DefaultRouter()
router.register(r'users', views.UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('login/',views.LogInViewSet.as_view()),
    path('logout/',views.LogOutViewSet.as_view()),
    path('input/',views.InputView.as_view()),
    path('all-input/',views.InputAllView.as_view()),
    path('input/<int:pk>/<slug:st>/<slug:ed>/',views.InputDetail.as_view()),

]