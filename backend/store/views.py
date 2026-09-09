from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializer import RegisterSerializer, UserSerializer
from rest_framework import status
from .models import Product, Category, Cart, CartItem, Order, OrderItem
from .serializer  import ProductSerializer, CategorySerializer, CartSerializer, CartItemSerializer, OrderSerializer
from .ai_service import generate_shopping_response


@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)


@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'Product added to cart', 'cart': CartSerializer(cart).data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_add_to_cart(request):
    product_id = request.data.get('product_id')

    if not product_id:
        return Response(
            {'error': 'Product ID is required'},
            status=400
        )

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response(
            {'error': 'Product not found in catalog'},
            status=404
        )

    cart, created = Cart.objects.get_or_create(
        user=request.user
    )

    item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        item.quantity += 1
        item.save()

    return Response({
        'message': f'{product.name} added to cart',
        'product': product.name,
        'price': str(product.price),
        'quantity': item.quantity
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cartquantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=400)

    try:
        item = CartItem.objects.get(id=item_id,cart__user=request.user)
        qty = int(quantity)
        if qty < 1:
            item.delete()
            return Response({'error': 'Quantity must be at least 1'}, status=400)

        item.quantity = qty
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=400)
    except ValueError:
        return Response({'error': 'Quantity must be a valid integer'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id,cart__user=request.user
).delete()
    return Response({'message': 'Item removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method','COD')

        #validate Phone Number
        if not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)

        # Get user's cart
        cart , created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        total = sum([item.product.price * item.quantity for item in cart.items.all()])

        order = Order.objects.create(
    user=request.user,
    name=name,
    address=address,
    phone=phone,
    payment_method=payment_method,
    total_amount=total
)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        # Clear the cart
        cart.items.all().delete()
        return Response({'message': 'Order created successfully', 'order_id': order.id})
    except Exception as e:
        return Response({'error': str(e)}, status=400) 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
  

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User created successfully", "user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_shopping_assistant(request):
    user_message = request.data.get('message', '').strip()

    if not user_message:
        return Response(
            {'error': 'Message is required'},
            status=400
        )

    try:
        cart = Cart.objects.filter(user=request.user).first()

        cart_items = []

        if cart:
            cart_items = [
                {
                    "product": item.product.name,
                    "quantity": item.quantity,
                    "price": str(item.product.price),
                }
                for item in cart.items.select_related("product")
            ]

        reply = generate_shopping_response(
            user_message,
            cart_items=cart_items
        )

        return Response(reply)

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=500
        )