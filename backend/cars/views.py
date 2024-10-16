from django.utils.dateparse import parse_date
from rest_framework import status, generics
from rest_framework.response import Response
from datetime import date
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import datetime 
from .permissions import IsCustomer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from users.models import User

from .models import Location, Car, Customer, Booking, Review, Insurance, Maintenance, Payment
from .serializers import LocationSerializer, CarSerializer, CustomerSerializer, BookingSerializer, ReviewSerializer, InsuranceSerializer, MaintenanceSerializer, PaymentSerializer, LocationNameSerializer

@api_view(["POST"])
@permission_classes([IsCustomer])
def get_customer(request):
    return Response({"message": "You are a customer!"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def getCustomerDetails(request):
    user = User.objects.get(email=request.data.get("email"))
    customer = Customer.objects.get(user = user.id)
    customer = CustomerSerializer(customer)
    return Response({"customer":customer.data,"firstname":user.first_name,"lastname":user.last_name,"email":user.email})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    return Response({"first_name": user.first_name, "email": user.email, "last_name":user.last_name}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_locations(request): # view locations with name and id using LocationNameSerializer
    if request.method == 'GET':
        locations = Location.objects.all() # model objects
        locations = LocationNameSerializer(locations, many=True) # convert model object -> dictionary
        return Response({'locations': locations.data}, status=status.HTTP_200_OK)
    
@api_view(['GET', 'POST'])
def get_car(request): # get cars by location, id or all
    if request.method == 'POST':
        pickup = request.data.get('pickup')
        location = request.data.get('location')
        if location and pickup:
            unavailable_car_ids = Booking.objects.filter(end_date__gte=pickup).values_list('car_id', flat=True)
            car = Car.objects.filter(pickup_location__name=location)
            available_cars = car.exclude(id__in=unavailable_car_ids)
            available_cars =  CarSerializer(available_cars, many=True)
            return Response({'car': available_cars.data}, status=status.HTTP_200_OK)
        elif location:
            car = Car.objects.filter(pickup_location__name=location)
            car =  CarSerializer(car, many=True)
            return Response({'car': car.data}, status=status.HTTP_200_OK)
        # else:
    if request.method == 'POST' and request.data.get('id'):
        car_id = request.data.get('id')
        print(car_id)
        car = Car.objects.get(id=car_id)
        car =  CarSerializer(car, many=False)
        return Response({'car': car.data}, status=status.HTTP_200_OK)
    else:
        car = Car.objects.all()
        car =  CarSerializer(car, many=True)
        return Response({'car': car.data}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def available_cars(request):
    date_provided = parse_date(request.data.get('pickup_date'))
    unavailable_cars = Booking.objects.filter(pickup_date__lte=date_provided, end_date__gte=date_provided)
    if unavailable_cars:
        available_cars = Car.objects.exclude(id__in=unavailable_cars.values_list('car_id', flat=True))
        unavailable_cars = Car.objects.filter(id__in=unavailable_cars.values_list('car_id', flat=True))
        unavailable_cars = CarSerializer(unavailable_cars, many=True)
        car_serializer = CarSerializer(available_cars, many=True)
        return Response({'available': car_serializer.data, 'unavailable': unavailable_cars.data}, status=status.HTTP_200_OK)
    else:
        car_serializer = CarSerializer(Car.objects.all(), many=True)
        return Response({'available': car_serializer.data, 'unavailable': {}}, status=status.HTTP_200_OK)

@api_view(['GET'])
def view_bookings(request):
    if request.method == 'GET':
        bookings = Booking.objects.all()
        bookings = BookingSerializer(bookings, many=True)   
        return Response({'bookings': bookings.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def check_or_create_customer_and_book(request):
    email = request.data.get('email')
    phone_number = request.data.get('phone_number')
    address = request.data.get('address')
    driving_license_number = request.data.get('driving_license_number')
    license_expiry_date = request.data.get('license_expiry_date')
    city = request.data.get('city')
    pincode = request.data.get('pincode')
    
    # Booking details
    car_name = request.data.get('car_name')
    pickup_date = request.data.get('pickup_date')
    end_date = request.data.get('end_date')
    total_price = request.data.get('total_price')
    status1 = request.data.get('status')

    # Check if the customer exists
    try:
        user = User.objects.get(email=email)  # Assuming you're using Django's User model
        customer, created = Customer.objects.get_or_create(
            user=user,
            defaults={
                'phone_number': phone_number,
                'address': address,
                'driving_license_number': driving_license_number,
                'license_expiry_date': license_expiry_date,
                'city': city,
                'pincode': pincode
            }
        )
    except User.DoesNotExist:
        return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Find the car by name
    try:
        car = Car.objects.get(model=car_name)  # Assuming 'name' is a field in your Car model
    except Car.DoesNotExist:
        return Response({'detail': 'Car not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Create the booking
    booking = Booking.objects.create(
        customer=customer,
        car=car,
        pickup_date=pickup_date,
        end_date=end_date,
        total_price=total_price,
        status=status1
    )

    return Response({'detail': 'Booking created successfully!', 'booking_id': booking.id}, status=status.HTTP_201_CREATED)

class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class CarListCreateView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

class CustomerListCreateView(generics.ListCreateAPIView):
    serializer_class = CustomerSerializer
    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user, user__is_active=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        customer = self.request.user.customer
        car = serializer.validated_data.get('car')

        if not Booking.objects.filter(customer=customer, car=car, end_date__lt=timezone.now()).exists():
            raise serializers.ValidationError("You can only review cars you have previously booked.")
        
        serializer.save(customer=customer)

class InsuranceListCreateView(generics.ListCreateAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class MaintenanceListCreateView(generics.ListCreateAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer

class PaymentListCreateView(generics.ListCreateAPIView):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
