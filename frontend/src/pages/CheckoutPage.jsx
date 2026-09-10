import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Order placed successfully! 🎉");

                fetch(`${BASEURL}/api/cart/`);
                clearCart();

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setMessage(
                    data.error ||
                    "Failed to place order. Please try again."
                );
            }
        } catch {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#2A1B3D] px-4 pt-28 pb-16 sm:px-6">

            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-80 h-80 bg-[#44318D] opacity-20 blur-3xl rounded-full" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D83F87] opacity-15 blur-3xl rounded-full" />
            </div>

            <div className="relative max-w-6xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-10">

                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E98074]">
                        Almost There
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
                        Checkout 🛍️
                    </h1>

                    <p className="text-[#A4B3B6] mt-3">
                        Enter your details to complete your order
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                    {/* Checkout Form */}
                    <div className="lg:col-span-2 bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-sm">

                        <div className="mb-8">

                            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E98074]">
                                Delivery Information
                            </p>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                                Delivery Details
                            </h2>

                            <p className="text-[#A4B3B6] text-sm mt-2">
                                We'll use these details to deliver your order.
                            </p>

                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Full Name */}
                            <div>

                                <label className="block text-sm font-semibold text-white mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/30 transition"
                                />

                            </div>

                            {/* Address */}
                            <div>

                                <label className="block text-sm font-semibold text-white mb-2">
                                    Delivery Address
                                </label>

                                <textarea
                                    name="address"
                                    placeholder="Enter your complete delivery address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none resize-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/30 transition"
                                />

                            </div>

                            {/* Phone */}
                            <div>

                                <label className="block text-sm font-semibold text-white mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/30 transition"
                                />

                            </div>

                            {/* Payment Method */}
                            <div>

                                <label className="block text-sm font-semibold text-white mb-2">
                                    Payment Method
                                </label>

                                <select
                                    name="payment_method"
                                    value={form.payment_method}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/30 transition"
                                >

                                    <option
                                        value="COD"
                                        className="bg-[#2A1B3D]"
                                    >
                                        Cash On Delivery
                                    </option>

                                    <option
                                        value="Online Payment"
                                        className="bg-[#2A1B3D]"
                                    >
                                        Online Payment
                                    </option>

                                </select>

                            </div>

                            {/* Place Order */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D83F87] text-white py-3.5 rounded-xl font-semibold shadow-lg hover:bg-[#E98074] hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading
                                    ? "Processing Order..."
                                    : "Place Order →"}
                            </button>

                            {/* Message */}
                            {message && (
                                <div
                                    className={`rounded-xl p-4 text-center font-semibold border ${
                                        message.includes("successfully")
                                            ? "bg-[#CDEDDD]/10 text-[#CDEDDD] border-[#CDEDDD]/30"
                                            : "bg-[#E98074]/10 text-[#E98074] border-[#E98074]/30"
                                    }`}
                                >
                                    {message}
                                </div>
                            )}

                        </form>
                    </div>

                    {/* Order Information */}
                    <div className="bg-[#44318D]/50 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-6 md:p-7 h-fit backdrop-blur-sm">

                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#E98074]">
                            Secure Checkout
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-2 mb-7">
                            Your Order
                        </h2>

                        <div className="space-y-6">

                            {/* Cart */}
                            <div className="flex gap-4">

                                <div className="w-11 h-11 rounded-xl bg-[#D83F87]/20 border border-[#D83F87]/30 flex items-center justify-center text-xl flex-shrink-0">
                                    🛒
                                </div>

                                <div>
                                    <p className="font-semibold text-white">
                                        Your Cart
                                    </p>

                                    <p className="text-sm text-[#A4B3B6] mt-1 leading-relaxed">
                                        Your selected products will be included.
                                    </p>
                                </div>

                            </div>

                            {/* Delivery */}
                            <div className="flex gap-4">

                                <div className="w-11 h-11 rounded-xl bg-[#E98074]/20 border border-[#E98074]/30 flex items-center justify-center text-xl flex-shrink-0">
                                    🚚
                                </div>

                                <div>
                                    <p className="font-semibold text-white">
                                        Delivery
                                    </p>

                                    <p className="text-sm text-[#A4B3B6] mt-1 leading-relaxed">
                                        Your order will be delivered to the
                                        address provided.
                                    </p>
                                </div>

                            </div>

                            {/* Secure */}
                            <div className="flex gap-4">

                                <div className="w-11 h-11 rounded-xl bg-[#44318D] border border-[#A4B3B6]/20 flex items-center justify-center text-xl flex-shrink-0">
                                    🔒
                                </div>

                                <div>
                                    <p className="font-semibold text-white">
                                        Secure
                                    </p>

                                    <p className="text-sm text-[#A4B3B6] mt-1 leading-relaxed">
                                        Your checkout request is securely
                                        processed.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t border-[#A4B3B6]/20 mt-8 pt-5">

                            <p className="text-sm text-[#A4B3B6] text-center">
                                Thank you for shopping with{" "}
                                <span className="text-[#D83F87] font-semibold">
                                    MyStore
                                </span>{" "}
                                ✨
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default CheckoutPage;