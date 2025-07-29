from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('news/', views.news_list, name='news_list'),
    path('news/refresh/', views.refresh_news, name='refresh_news'),
    path('profile/', views.user_profile, name='user_profile'),
]