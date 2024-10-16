from django.db import models
from users.models import User
from datetime import datetime

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()
    contact_number = models.CharField(max_length=20)

    class Meta:
        db_table = 'locations'

    def __str__(self):
        return f"{self.name} - {self.address}"

class Car(models.Model):
    FUEL_TYPE_CHOICES = [
        ('Petrol', 'Petrol'),
        ('Diesel', 'Diesel'),
        ('Electric', 'Electric'),
        ('Hybrid', 'Hybrid'),
    ]

    TYPE_CHOICES = [
        ('Suv', 'SUV'),
        ('Sedan', 'Sedan'),
        ('Hatchback', 'Hatchback'),
        ('Convertible', 'Convertible'),
        ('Coupe', 'Coupe'),
        ('Wagon', 'Wagon'),
        ('Pickup', 'Pickup Truck'),
        ('Minivan', 'Minivan'),
        ('Sports', 'Sports Car'),
        ('Luxury', 'Luxury'),
        ('Cross_over', 'Crossover'),
        ('Roadster', 'Roadster'),
        ('Coupe_suv', 'Coupe SUV'),
    ]

    TRANSMISSION_CHOICES = [
        ('Automatic', 'Automatic'),
        ('Manual', 'Manual'),
    ]

    pickup_location = models.ForeignKey(Location, related_name='pickup_cars', on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    kms_driven = models.PositiveBigIntegerField()
    description = models.TextField(blank=True)
    mileage = models.DecimalField(decimal_places=2, null=True, max_digits=4)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    fuel_type = models.CharField(max_length=50, choices=FUEL_TYPE_CHOICES)
    transmission = models.CharField(max_length=50, choices=TRANSMISSION_CHOICES)
    image = models.ImageField(upload_to='car_images/')
    is_Available = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'cars'

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    driving_license_number = models.CharField(max_length=50)
    license_expiry_date = models.DateField()
    city = models.CharField(max_length=100, default="Unknown")
    pincode = models.CharField(max_length=10, default="000000")

    class Meta:
        db_table = 'customers'

    def __str__(self):
        return self.user.email

class Booking(models.Model):
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    pickup_date = models.DateTimeField()
    end_date = models.DateTimeField(default=datetime(2024, 8, 4))
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)

    @property
    def pickup_location(self):
        return self.car.pickup_location

    class Meta:
        db_table = 'bookings'

    def __str__(self):
        return f"Booking {self.id} by {self.customer.user.email} for {self.car}"

class Review(models.Model):
    RATING_CHOICES = [(i, i) for i in range(1, 6)]  # Ratings from 1 to 5

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reviews'

    def __str__(self):
        return f"Review by {self.customer.user.email} for {self.car}"

class Insurance(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    insurance_company = models.CharField(max_length=100)
    policy_number = models.CharField(max_length=100)
    coverage_details = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        db_table = 'insurances'

    def __str__(self):
        return f"Policy {self.policy_number} by {self.insurance_company}"

class Maintenance(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    service_type = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'maintenances'

    def __str__(self):
        return f"Maintenance {self.id} for {self.car}"

class Payment(models.Model):
    booking = models.OneToOneField('Booking', on_delete=models.CASCADE)
    payment_date = models.DateTimeField(auto_now_add=True)
    
    PAYMENT_METHOD_CHOICES = [
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
        ('Bank Transfer', 'Bank Transfer'),
    ]
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    
    PAYMENT_STATUS_CHOICES = [
        ('Success', 'Success'),
        ('Failed', 'Failed'),
        ('Pending', 'Pending'),
    ]
    payment_status = models.CharField(max_length=50, choices=PAYMENT_STATUS_CHOICES)

    class Meta:
        db_table = 'payment'

    def __str__(self):
        return f"Payment for Booking {self.booking.id}"
