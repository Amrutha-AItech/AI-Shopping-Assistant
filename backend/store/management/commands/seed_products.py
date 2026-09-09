from django.core.management.base import BaseCommand
from store.models import Product, Category


class Command(BaseCommand):
    help = "Seed products into the database"

    def handle(self, *args, **options):

        products = [
            # Electric
            {
                "category": "Electric",
                "name": "LED Desk Lamp",
                "description": "Adjustable LED desk lamp suitable for studying, working, and reading.",
                "price": 799,
            },
            {
                "category": "Electric",
                "name": "Smart LED Bulb",
                "description": "Energy-efficient smart LED bulb with adjustable brightness for home use.",
                "price": 499,
            },
            {
                "category": "Electric",
                "name": "Table Fan",
                "description": "Compact table fan with multiple speed settings for comfortable cooling.",
                "price": 1299,
            },
            {
                "category": "Electric",
                "name": "USB Night Light",
                "description": "Small USB-powered night light suitable for bedrooms and study tables.",
                "price": 249,
            },
            {
                "category": "Electric",
                "name": "Extension Board",
                "description": "Multi-socket extension board for safely connecting everyday electronic devices.",
                "price": 599,
            },

            # Household
            {
                "category": "household",
                "name": "Wall Clock",
                "description": "Modern wall clock with a clean design suitable for home and office spaces.",
                "price": 699,
            },
            {
                "category": "household",
                "name": "Cushion Set",
                "description": "Set of comfortable decorative cushions designed for sofas and beds.",
                "price": 899,
            },
            {
                "category": "household",
                "name": "Storage Box",
                "description": "Durable storage box for organizing clothes, accessories, and household items.",
                "price": 549,
            },
            {
                "category": "household",
                "name": "Table Organizer",
                "description": "Compact organizer for keeping stationery and small desk accessories neatly arranged.",
                "price": 399,
            },
            {
                "category": "household",
                "name": "Artificial Plant",
                "description": "Low-maintenance decorative artificial plant for desks, shelves, and living rooms.",
                "price": 499,
            },

            # Wooden
            {
                "category": "Wooden",
                "name": "Wooden Photo Frame",
                "description": "Classic wooden photo frame suitable for displaying memorable photographs.",
                "price": 449,
            },
            {
                "category": "Wooden",
                "name": "Wooden Wall Shelf",
                "description": "Simple wooden wall shelf for books, decorations, and small household items.",
                "price": 999,
            },
            {
                "category": "Wooden",
                "name": "Wooden Pen Stand",
                "description": "Handcrafted-style wooden pen stand for organizing stationery on a desk.",
                "price": 299,
            },
            {
                "category": "Wooden",
                "name": "Wooden Serving Tray",
                "description": "Elegant wooden serving tray suitable for serving snacks, tea, and beverages.",
                "price": 799,
            },

            # Cloths
            {
                "category": "cloths",
                "name": "Men's Casual Shirt",
                "description": "Comfortable casual shirt suitable for everyday wear and casual outings.",
                "price": 1199,
            },
            {
                "category": "cloths",
                "name": "Men's Cotton T-Shirt",
                "description": "Soft cotton T-shirt designed for comfortable everyday use.",
                "price": 699,
            },
            {
                "category": "cloths",
                "name": "Women's Kurti",
                "description": "Comfortable women's kurti suitable for casual and everyday wear.",
                "price": 999,
            },
            {
                "category": "cloths",
                "name": "Women's Casual Top",
                "description": "Stylish casual top suitable for college, outings, and everyday wear.",
                "price": 799,
            },
            {
                "category": "cloths",
                "name": "Denim Jeans",
                "description": "Classic denim jeans designed for comfortable everyday styling.",
                "price": 1499,
            },

            # Kitchen utensils
            {
                "category": "kitchen utensils",
                "name": "Non-Stick Pan",
                "description": "Non-stick cooking pan suitable for everyday frying, sautéing, and cooking.",
                "price": 899,
            },
            {
                "category": "kitchen utensils",
                "name": "Stainless Steel Bottle",
                "description": "Reusable stainless steel bottle suitable for school, college, office, and travel.",
                "price": 499,
            },
            {
                "category": "kitchen utensils",
                "name": "Kitchen Knife Set",
                "description": "Essential kitchen knife set designed for everyday food preparation.",
                "price": 799,
            },
            {
                "category": "kitchen utensils",
                "name": "Lunch Box",
                "description": "Compact reusable lunch box suitable for carrying meals to college or work.",
                "price": 599,
            },

            # Makeup
            {
                "category": "Makeup",
                "name": "Liquid Foundation",
                "description": "Lightweight liquid foundation designed for an even-looking makeup finish.",
                "price": 799,
            },
            {
                "category": "Makeup",
                "name": "Volumizing Mascara",
                "description": "Mascara designed to enhance the appearance of eyelashes with added volume.",
                "price": 599,
            },
            {
                "category": "Makeup",
                "name": "Compact Powder",
                "description": "Compact face powder suitable for setting makeup and reducing visible shine.",
                "price": 499,
            },

            # Skincare
            {
                "category": "Skincare",
                "name": "Gentle Face Wash",
                "description": "Gentle daily face wash designed to remove dirt and excess oil.",
                "price": 399,
            },
            {
                "category": "Skincare",
                "name": "Daily Moisturizer",
                "description": "Lightweight daily moisturizer designed to keep skin feeling hydrated.",
                "price": 549,
            },
        ]

        # Unique image for each product
        product_images = {
            "LED Desk Lamp": "products/led_desk_lamp.png",
            "Smart LED Bulb": "products/smart_led_bulb.png",
            "Table Fan": "products/table_fan.png",
            "USB Night Light": "products/usb_night_light.png",
            "Extension Board": "products/extension_board.png",

            "Wall Clock": "products/wall_clock.png",
            "Cushion Set": "products/cushion_set.png",
            "Storage Box": "products/storage_box.png",
            "Table Organizer": "products/table_organizer.png",
            "Artificial Plant": "products/artificial_plant.png",

            "Wooden Photo Frame": "products/wooden_photo_frame.png",
            "Wooden Wall Shelf": "products/wooden_wall_shelf.png",
            "Wooden Pen Stand": "products/wooden_pen_stand.png",
            "Wooden Serving Tray": "products/wooden_serving_tray.png",

            "Men's Casual Shirt": "products/mens_casual_shirt.png",
            "Men's Cotton T-Shirt": "products/mens_cotton_tshirt.png",
            "Women's Kurti": "products/womens_kurti.png",
            "Women's Casual Top": "products/womens_casual_top.png",
            "Denim Jeans": "products/denim_jeans.png",

            "Non-Stick Pan": "products/non_stick_pan.png",
            "Stainless Steel Bottle": "products/stainless_steel_bottle.png",
            "Kitchen Knife Set": "products/kitchen_knife_set.png",
            "Lunch Box": "products/lunch_box.png",

            "Liquid Foundation": "products/liquid_foundation.png",
            "Volumizing Mascara": "products/volumizing_mascara.png",
            "Compact Powder": "products/compact_powder.png",

            "Gentle Face Wash": "products/gentle_face_wash.png",
            "Daily Moisturizer": "products/daily_moisturizer.png",
        }

        added_count = 0
        image_count = 0

        for item in products:

            category = Category.objects.get(
                name=item["category"]
            )

            product, created = Product.objects.get_or_create(
                name=item["name"],
                defaults={
                    "Category": category,
                    "description": item["description"],
                    "price": item["price"],
                },
            )

            # Update each product with its unique image
            image_path = product_images.get(product.name)

            if image_path:
                product.image = image_path
                product.save(update_fields=["image"])

                image_count += 1

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Image updated: {product.name}"
                    )
                )

            if created:
                added_count += 1

                self.stdout.write(
                    self.style.SUCCESS(
                        f"Added: {product.name}"
                    )
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone! Added {added_count} new products."
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Unique images assigned: {image_count}"
            )
        )