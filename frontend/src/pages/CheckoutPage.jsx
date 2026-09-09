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
        <div className="min-h-screen bg-[#C0E6ED] px-4 pt-28 pb-12">
            <div className="max-w-6xl mx-auto lg:mr-96">

                {/* Heading */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#C45B75] mb-2">
                        Almost There
                    </p>

                    <h1 className="text-4xl font-bold text-slate-800">
                        Checkout 🛍️
                    </h1>

                    <p className="text-slate-600 mt-2">
                        Enter your details to complete your order
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Checkout Form */}
                    <div className="lg:col-span-2 bg-[#FFFDF8] rounded-3xl shadow-xl p-6 md:p-10">

                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-slate-800">
                                Delivery Details
                            </h2>

                            <p className="text-slate-500 text-sm mt-1">
                                We'll use these details to deliver your order.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FBB7C7] focus:ring-2 focus:ring-[#FBB7C7]/30 transition"
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Delivery Address
                                </label>

                                <textarea
                                    name="address"
                                    placeholder="Enter your complete delivery address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none resize-none focus:border-[#FBB7C7] focus:ring-2 focus:ring-[#FBB7C7]/30 transition"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FBB7C7] focus:ring-2 focus:ring-[#FBB7C7]/30 transition"
                                />
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Payment Method
                                </label>

                                <select
                                    name="payment_method"
                                    value={form.payment_method}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FBB7C7] focus:ring-2 focus:ring-[#FBB7C7]/30 transition"
                                >
                                    <option value="COD">
                                        Cash On Delivery
                                    </option>

                                    <option value="CreditCard">
                                        Online Payment
                                    </option>
                                </select>
                            </div>

                            {/* Place Order */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#FBB7C7] text-slate-800 py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:text-white hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Processing Order..."
                                    : "Place Order →"}
                            </button>

                            {/* Message */}
                            {message && (
                                <div className="bg-[#CDEDDD] text-slate-700 rounded-xl p-4 text-center font-semibold">
                                    {message}
                                </div>
                            )}

                        </form>
                    </div>

                    {/* Order Information */}
                    <div className="bg-[#FCE6D3] rounded-3xl shadow-xl p-6 h-fit">

                        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C45B75] mb-2">
                            Secure Checkout
                        </p>

                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            Your Order
                        </h2>

                        <div className="space-y-4">

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FBB7C7] flex items-center justify-center">
                                    🛒
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Your Cart
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        Your selected products will be included.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#CDEDDD] flex items-center justify-center">
                                    🚚
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Delivery
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        Your order will be delivered to the
                                        address provided.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#FAD9D5] flex items-center justify-center">
                                    🔒
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-800">
                                        Secure
                                    </p>

                                    <p className="text-sm text-slate-600">
                                        Your checkout request is securely
                                        processed.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="border-t border-slate-300 mt-7 pt-5">
                            <p className="text-sm text-slate-600 text-center">
                                Thank you for shopping with MyStore ✨
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;