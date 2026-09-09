from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView

urlpatterns = [ 
    path('register/', views.register_view),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshSlidingView.as_view(), name='token_refresh'),
    path('products/', views.get_products),
    path('products/<int:pk>/', views.get_product),
    path('categories/', views.get_categories),
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),
    path('cart/update/', views.update_cartquantity),
    path('orders/create/',views.create_order),
    path('orders/', views.get_orders),
    path('ai/chat/', views.ai_shopping_assistant),
    path('ai/cart/add/', views.ai_add_to_cart),
]
