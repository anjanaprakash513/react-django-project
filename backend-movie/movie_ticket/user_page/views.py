

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


from .models import ticketBooking
from .forms import ticketForm
from .serializers import ticketSerializer

@api_view(['POST'])
@permission_classes((AllowAny,))
def bookTicket(request):
    form = ticketForm(request.data)
    if form.is_valid():
        movie = form.save()
        return Response({'id': movie.id}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Payment
from .serializers import PaymentSerializer
import razorpay

@api_view(['POST'])
@permission_classes((AllowAny,))
def generate_order(request):
    client = razorpay.Client(auth=('rzp_test_cAHU0nyqJ4tMOB', 'ONihTh0ABtEJWvudoJPfiMuT'))
    amount = int(request.data.get('amount')) # Assume amount is provided in the request data
    order = client.order.create({'amount': amount * 100, 'currency': 'INR'})  # Convert amount to paise
    payment = Payment.objects.create(order_id=order['id'], amount=amount)
    serializer = PaymentSerializer(payment)
    return Response(serializer.data)


# sign up

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes((AllowAny,))
def send_email(request):
    if request.method == 'POST':
        recipient_email = request.data.get('recipient_email')
        subject = request.data.get('subject')
        message = request.data.get('message')

        if recipient_email and subject and message:
            try:
                # Send email
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[recipient_email],
                    fail_silently=False,
                )
                return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': 'Failed to send email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({'error': 'Missing required data in request'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    


# booking history

@api_view(['GET'])
@permission_classes((AllowAny,))
def booking_history(request, user_id):
    try:
        # Fetch the movie objects based on the provided user_id
        movies = ticketBooking.objects.filter(user_id=user_id)
        if not movies:
            return Response({"message": "no previous booking"}, status=404)
    except ticketBooking.DoesNotExist:
        return Response({"message": "no previous booking"}, status=404)
    
    # Serialize the movie objects
    serializer = ticketSerializer(movies, many=True)
   
    # Return the serialized movie data in the response
    return Response(serializer.data)



# confrim_view
@api_view(['GET'])
@permission_classes((AllowAny,))
def view_confirm(request, pk):
    try:
        # Fetch the movie object based on the provided primary key
        movie = ticketBooking.objects.get(pk=pk)
    except ticketBooking.DoesNotExist:
        return Response({"message": "Movie not found"}, status=404)
    
    # Serialize the movie object
    serializer = ticketSerializer(movie)
    
    # Return the serialized movie data in the response
    return Response(serializer.data)
