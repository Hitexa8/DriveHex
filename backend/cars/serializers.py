from rest_framework import serializers
from .models import Location, Car, Customer, Booking, Review, Insurance, Maintenance, Payment

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
        
class LocationNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['name', 'id']

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    customer_email = serializers.EmailField(write_only=True)
    car_name = serializers.CharField(write_only=True)

    class Meta:
        model = Booking
        fields = ['customer_email', 'car_name', 'pickup_date', 'end_date', 'total_price', 'status']

    def create(self, validated_data):
        customer_email = validated_data.pop('customer_email')
        car_name = validated_data.pop('car_name')
        try:
            customer = Customer.objects.get(user__email=customer_email)
        except Customer.DoesNotExist:
            raise serializers.ValidationError({'customer_email': 'Customer with this email does not exist.'})
        try:
            car = Car.objects.get(model=car_name)
        except Car.DoesNotExist:
            raise serializers.ValidationError({'car_name': 'Car with this name does not exist.'})
        
        price_per_day = car.price_per_day
        pickup_date = validated_data.get('pickup_date')
        end_date = validated_data.get('end_date')
        total_price = (end_date - pickup_date).days * price_per_day
        total_price += 0.6*total_price
        
        validated_data['total_price'] = total_price
        
        booking = Booking.objects.create(customer=customer, car=car, **validated_data)
        return booking

    def get_pickup_location(self, obj):
        return obj.car.pickup_location.name if obj.car.pickup_location else None


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = '__all__'

class MaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
