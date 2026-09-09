import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    return (
        <div className="pt-28 min-h-screen bg-[#C0E6ED] px-4 py-10">
            <div className="max-w-6xl mx-auto lg:mr-96">

                {/* Page Heading */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#C45B75] mb-2">
                        Your Shopping Bag
                    </p>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Your Cart 🛒
                    </h1>

                    <p className="text-slate-600 mt-2">
                        Review your items before checkout
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart */
                    <div className="bg-[#FFFDF8] rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto">
                        <div className="text-6xl mb-5">
                            🛍️
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Your cart is empty
                        </h2>

                        <p className="text-slate-500 mb-7">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/"
                            className="inline-block bg-[#FBB7C7] text-slate-800 px-7 py-3 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:text-white hover:shadow-lg transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Cart Items */}
                        <div className="xl:col-span-2 bg-[#FFFDF8] rounded-3xl shadow-xl p-5 md:p-7">

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">
                                    Cart Items
                                </h2>

                                <span className="bg-[#FAD9D5] text-[#C45B75] px-4 py-2 rounded-full text-sm font-semibold">
                                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            <div className="space-y-5">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-slate-200 pb-5 last:border-b-0"
                                    >
                                        {/* Product */}
                                        <div className="flex items-center gap-4">
                                            {item.product_image && (
                                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FCE6D3] shrink-0">
                                                    <img
                                                        src={`${BASEURL}${item.product_image}`}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-800">
                                                    {item.product_name}
                                                </h3>

                                                <p className="text-[#C45B75] font-bold mt-1">
                                                    ₹{item.product_price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity + Remove */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center bg-[#FAD9D5] rounded-xl overflow-hidden">
                                                <button
                                                    className="w-9 h-9 text-slate-700 font-bold hover:bg-[#FBB7C7] transition"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span className="w-9 text-center font-semibold text-slate-800">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    className="w-9 h-9 text-slate-700 font-bold hover:bg-[#FBB7C7] transition"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                className="text-sm font-semibold text-[#C45B75] hover:text-red-600 transition"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-[#FCE6D3] rounded-3xl shadow-xl p-6 h-fit">
                            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C45B75] mb-2">
                                Summary
                            </p>

                            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                                Order Summary
                            </h2>

                            <div className="flex justify-between text-slate-600 mb-4">
                                <span>Subtotal</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-slate-600 mb-5">
                                <span>Delivery</span>
                                <span className="text-[#C45B75] font-semibold">
                                    Free
                                </span>
                            </div>

                            <div className="border-t border-slate-300 pt-5 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-[#C45B75]">
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                className="block text-center mt-7 bg-[#FBB7C7] text-slate-800 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:text-white hover:shadow-lg transition-all duration-300"
                            >
                                Proceed to Checkout →
                            </Link>

                            <Link
                                to="/"
                                className="block text-center mt-4 text-sm font-semibold text-[#C45B75] hover:underline"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;