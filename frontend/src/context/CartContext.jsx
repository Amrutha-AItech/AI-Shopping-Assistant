/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { authFetch } from "../utils/auth";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);

    const total = cartItems.reduce((sum, item) => {
    const price = Number(
        item?.product_price ??
        item?.product?.price ??
        item?.price ??
        0
    );

    const quantity = Number(item?.quantity ?? 1);

    return sum + price * quantity;
}, 0);

    //Fetch Cart from BE
    const fetchCart = useCallback(async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/cart/`);

            const data = await res.json();
            console.log("Cart API response:", data);
            console.log("Product image:", data.items?.[0]?.product_image);
            setCartItems(data.items || [])
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }, [BASEURL]);

    useEffect(() => {
    // Fetch cart when the app loads
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCart();

    // Fetch cart again whenever the AI changes it
    const handleCartChange = () => {
        fetchCart();
    };

    window.addEventListener("cart-change", handleCartChange);

    return () => {
        window.removeEventListener("cart-change", handleCartChange);
    };
}, [fetchCart]);
    // Add Product to Cart
    const addToCart = async (productid) => {
    try {
        const res = await authFetch(`${BASEURL}/api/cart/add/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: productid }),
        });

        if (!res.ok) {
            const errorData = await res.text();
            console.error("Add to cart failed:", res.status, errorData);
            return;
        }

        await fetchCart();
        console.log("Product added to cart successfully");
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

    //Remove Product from Cart
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId }),
            });
            fetchCart(); // Refresh cart after removal
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    //Update Quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        try {
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId, quantity }),
            });
            fetchCart(); // Refresh cart after updating quantity
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider
            value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart, }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
