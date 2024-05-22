from django.urls import path
from . import views

urlpatterns = [
   path('bookticket', views.bookTicket, name='book_ticket'),
   path('generate_order', views.generate_order, name='book_ticket'),
   path('send_email', views.send_email, name='sendemail'),
   path('bookinghistory/<int:user_id>', views.booking_history, name='bookinghistory'),
   path('viewconfirm/<int:pk>', views.view_confirm, name='view_confirm'),
]