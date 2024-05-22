from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('signup',views.signup,name='signup_api'),
    path('login', views.login, name='login_api'),
    path('addmovies', views.addMovies, name='add_movie'),
    path('listmovies', views.list_movies, name='list_movie'),
    path('updatemovie/<int:pk>', views.update_movie, name='update_movie'),
    path('viewonemovie/<int:pk>', views.view_one_movie, name='view_one_movie'),
    path('deletemovie/<int:pk>', views.delete_movie, name='deletemovie'),
    path('logout/', views.logout, name='Logout'),
    path('disable-enable/<int:movie_id>',views.disable_enable),
]