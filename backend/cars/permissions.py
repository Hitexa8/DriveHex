from rest_framework.permissions import IsAuthenticated
from cars.models import Customer

class IsCustomer(IsAuthenticated):
    def has_permission(self, request, view):
        is_authenticated = super().has_permission(request, view)  
        if not is_authenticated:
            return False
        try:
            customer = Customer.objects.get(user=request.user)
            return True
        except Customer.DoesNotExist:
            return False