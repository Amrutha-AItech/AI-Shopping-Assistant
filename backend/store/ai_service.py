import json

from google import genai
from google.genai import types
from django.conf import settings

from .models import Product


client = genai.Client(api_key=settings.GEMINI_API_KEY)


def generate_shopping_response(user_message, cart_items= None):
    products = Product.objects.select_related("Category").all()

    product_context = "\n".join(
        [
            f"ID: {product.id} | "
            f"Name: {product.name} | "
            f"Category: {product.Category.name} | "
            f"Price: ₹{product.price} | "
            f"Description: {product.description}"
            for product in products
        ]
    )

    cart_context = "\n".join(
        [
            f"{item['product']} | Quantity: {item['quantity']} | Price: ₹{item['price']}"
            for item in (cart_items or [])
        ]
    )

    if not cart_context:
        cart_context = "Cart is currently empty."

    prompt = f"""
You are an AI Shopping Assistant for an e-commerce website.

Your job is to help customers find products and understand their shopping requests.

AVAILABLE PRODUCTS:
{product_context}

CURRENT CART:
{cart_context}

CUSTOMER MESSAGE:
{user_message}

IMPORTANT RULES:

1. The AVAILABLE PRODUCTS section is the ONLY source of truth.
2. Never invent products, product IDs, prices, features, brands, or specifications.
3. Recommend products only from the available catalog.
4. Use the exact product ID from the catalog.
5. If the customer asks to add a specific product to their cart:
   - Set action to "add_to_cart"
   - Set product_id to the ID of that product.
6. If the customer is only asking a question or recommendation:
   - Set action to "none"
   - Set product_id to null.
7. If the requested product does not exist in the catalog:
   - Set action to "none"
   - Set product_id to null.
8. For product features, only use information explicitly present in the catalog.

Return ONLY valid JSON in exactly this format:

{{
    "reply": "Your helpful response to the customer",
    "action": "none",
    "product_id": null
}}

The action must be either:
- "none"
- "add_to_cart"

If action is "add_to_cart", product_id must be the exact catalog ID.
If action is "none", product_id must be null.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )

    return json.loads(response.text)