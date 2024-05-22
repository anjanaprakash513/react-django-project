from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.forms import UserCreationForm
from rest_framework.permissions import AllowAny

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Movies
from .forms import Moviesform
from .serializers import MovieSerializer

from .forms import signUpForm, UserCreationForm

@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    form = signUpForm(data=request.data)
    if form.is_valid():
        user = form.save()
        return Response("account created successfully", status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt 
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'userId':user.id, 'email':user.email, 'token': token.key},status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny,))
def addMovies(request):
    form = Moviesform(request.data)
    if form.is_valid():
        movie = form.save()
        return Response({'id': movie.id}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def view_one_movie(request, pk):
    try:
        # Fetch the movie object based on the provided primary key
        movie = Movies.objects.get(pk=pk)
    except Movies.DoesNotExist:
        return Response({"message": "Movie not found"}, status=404)
    
    # Serialize the movie object
    serializer = MovieSerializer(movie)
    
    # Return the serialized movie data in the response
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes((AllowAny,))
def list_movies(request):
    movie = Movies.objects.all()
    serializer = MovieSerializer(movie, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes((AllowAny,))
def update_movie(request, pk):
    movie = get_object_or_404(Movies, pk=pk)
    form = Moviesform(request.data, instance=movie)
    if form.is_valid():
        form.save()
        serializer = MovieSerializer(movie)
        return Response(serializer.data)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
@permission_classes((AllowAny,))
def delete_movie(request, pk):
    try:
        movie = Movies.objects.get(pk=pk)
    except Movies.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    movie.delete()
    return Response("deleted successfully")




from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

# Dummy list to store invalidated access tokens
invalid_access_tokens = []

@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
    access_token = request.data.get('access_token')

    if access_token:
        if access_token in invalid_access_tokens:
            return Response({"error": "Access token already invalidated."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Add the access token to the list of invalidated tokens
            invalid_access_tokens.append(access_token)
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Access token not provided."}, status=status.HTTP_400_BAD_REQUEST)



#disable and inable
@api_view(['PUT'])
@permission_classes([AllowAny])
def disable_enable(request, movie_id):
    try:
        movie = Movies.objects.get(pk=movie_id)
    except Movies.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if movie.status == 'active':
        movie.status = 'disabled'
    else:
        movie.status = 'active'
    movie.save()

    return Response({'message': 'Movie status toggled successfully'}, status=status.HTTP_200_OK)