import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartPage() {
    const {
        cartItems,
        total,
        removeFromCart,
        updateQuantity,
    } = useCart();

    return (
        <div className="min-h-screen bg-[#2A1B3D] pt-28 pb-16 px-4 sm:px-6">

            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#44318D] opacity-20 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D83F87] opacity-15 blur-3xl rounded-full" />
            </div>

            <div className="relative max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E98074]">
                        Your Shopping Bag
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
                        Your Cart
                    </h1>

                    <p className="text-[#A4B3B6] mt-3">
                        Review your products before checking out.
                    </p>
                </div>

                {cartItems.length === 0 ? (

                    /* Empty cart */
                    <div className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl p-12 text-center backdrop-blur-sm">
                        <div className="text-6xl mb-5">
                            🛒
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">
                            Your cart is empty
                        </h2>

                        <p className="text-[#A4B3B6] mb-7">
                            Discover something you love and add it to your cart.
                        </p>

                        <Link
                            to="/"
                            className="inline-block bg-[#D83F87] text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#E98074] hover:scale-105 transition-all duration-300"
                        >
                            Explore Products →
                        </Link>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

                        {/* Cart items */}
                        <div className="space-y-5">

                            {cartItems.map((item) => {

                                const price = Number(
                                    item?.product_price ??
                                    item?.product?.price ??
                                    item?.price ??
                                    0
                                );

                                const quantity = Number(
                                    item?.quantity ?? 1
                                );

                                const image =
                                    item?.product_image ||
                                    item?.product?.image;

                                const imageUrl = image
                                    ? image.startsWith("http")
                                        ? image
                                        : `${import.meta.env.VITE_DJANGO_BASE_URL}${image}`
                                    : null;

                                return (
                                    <div
                                        key={item.id}
                                        className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-2xl p-4 sm:p-5 backdrop-blur-sm hover:border-[#D83F87]/50 transition-all duration-300"
                                    >

                                        <div className="flex flex-col sm:flex-row gap-5">

                                            {/* Product image */}
                                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-[#2A1B3D] flex-shrink-0">

                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={item.product_name}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-3xl">
                                                        🛍️
                                                    </div>
                                                )}

                                            </div>

                                            {/* Product information */}
                                            <div className="flex-1 flex flex-col justify-between">

                                                <div>
                                                    <h2 className="text-xl font-semibold text-white">
                                                        {item.product_name}
                                                    </h2>

                                                    <p className="text-[#E98074] font-bold text-lg mt-2">
                                                        ₹{price.toFixed(2)}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-4 mt-5">

                                                    {/* Quantity controls */}
                                                    <div className="flex items-center bg-[#2A1B3D] border border-[#A4B3B6]/20 rounded-xl overflow-hidden">

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    quantity - 1
                                                                )
                                                            }
                                                            className="w-10 h-10 text-white text-xl hover:bg-[#D83F87] transition"
                                                        >
                                                            −
                                                        </button>

                                                        <span className="w-10 text-center text-white font-semibold">
                                                            {quantity}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    quantity + 1
                                                                )
                                                            }
                                                            className="w-10 h-10 text-white text-xl hover:bg-[#D83F87] transition"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                    {/* Remove */}
                                                    <button
                                                        onClick={() =>
                                                            removeFromCart(item.id)
                                                        }
                                                        className="text-[#E98074] hover:text-white hover:bg-[#E98074]/20 px-4 py-2 rounded-lg transition"
                                                    >
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                        {/* Order summary */}
                        <div className="lg:sticky lg:top-28 h-fit">

                            <div className="bg-[#44318D]/50 border border-[#A4B3B6]/20 rounded-3xl p-6 sm:p-7 backdrop-blur-sm shadow-2xl">

                                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E98074]">
                                    Order Summary
                                </p>

                                <h2 className="text-2xl font-bold text-white mt-2 mb-7">
                                    Ready to checkout?
                                </h2>

                                <div className="flex justify-between text-[#A4B3B6] mb-4">
                                    <span>Items</span>
                                    <span>{cartItems.length}</span>
                                </div>

                                <div className="border-t border-[#A4B3B6]/20 pt-5 mt-5">

                                    <div className="flex justify-between items-center">
                                        <span className="text-white font-semibold">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-[#D83F87]">
                                            ₹{Number(total).toFixed(2)}
                                        </span>
                                    </div>

                                </div>

                                <Link
                                    to="/checkout"
                                    className="block text-center w-full bg-[#D83F87] text-white px-6 py-3.5 rounded-xl font-semibold mt-7 shadow-lg hover:bg-[#E98074] hover:scale-[1.02] transition-all duration-300"
                                >
                                    Proceed to Checkout →
                                </Link>

                                <Link
                                    to="/"
                                    className="block text-center w-full border border-[#44318D] text-[#A4B3B6] px-6 py-3 rounded-xl font-semibold mt-3 hover:bg-[#44318D] hover:text-white transition-all duration-300"
                                >
                                    ← Continue Shopping
                                </Link>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}

export default CartPage;