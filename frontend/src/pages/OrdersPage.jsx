import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";

const OrdersPage = () => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await authFetch(`${BASEURL}/api/orders/`);

                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Unable to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [BASEURL]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#2A1B3D] flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="text-5xl mb-4">📦</div>

                    <h2 className="text-xl font-semibold text-white">
                        Loading your orders...
                    </h2>

                    <p className="text-[#A4B3B6] mt-2">
                        Fetching your shopping history
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#2A1B3D] flex items-center justify-center pt-24 px-4">
                <div className="bg-[#44318D]/50 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-8 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h2 className="text-xl font-semibold text-[#E98074]">
                        {error}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2A1B3D] pt-28 px-4 pb-16 sm:px-6">

            {/* Background glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-80 h-80 bg-[#44318D] opacity-20 blur-3xl rounded-full" />

                <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D83F87] opacity-15 blur-3xl rounded-full" />
            </div>

            <div className="relative max-w-6xl mx-auto lg:mr-96">

                {/* Page Heading */}
                <div className="text-center mb-10">

                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E98074]">
                        Your Shopping History
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
                        My Orders 📦
                    </h1>

                    <p className="text-[#A4B3B6] mt-3">
                        View your previous purchases and order details
                    </p>

                </div>

                {orders.length === 0 ? (

                    /* Empty Orders */
                    <div className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-10 md:p-14 text-center max-w-2xl mx-auto backdrop-blur-sm">

                        <div className="text-6xl mb-5">
                            🛍️
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3">
                            No orders yet
                        </h2>

                        <p className="text-[#A4B3B6] leading-relaxed">
                            You haven't placed any orders yet. Start shopping
                            and your orders will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-6">

                        {orders.map((order) => (

                            <div
                                key={order.id}
                                className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-6 md:p-8 backdrop-blur-sm hover:border-[#D83F87]/40 transition-all duration-300"
                            >

                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 border-b border-[#A4B3B6]/20 pb-6 mb-6">

                                    <div className="flex items-center gap-4">

                                        <div className="w-12 h-12 rounded-xl bg-[#D83F87]/20 border border-[#D83F87]/30 flex items-center justify-center text-xl">
                                            📦
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold text-white">
                                                Order #{order.id}
                                            </h2>

                                            <p className="text-sm text-[#A4B3B6] mt-1">
                                                Placed on{" "}
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="sm:text-right">

                                        <p className="text-sm text-[#A4B3B6] mb-1">
                                            Order Total
                                        </p>

                                        <p className="text-2xl font-bold text-[#D83F87]">
                                            ₹{order.total_amount}
                                        </p>

                                    </div>

                                </div>

                                {/* Items Heading */}
                                <div className="flex items-center justify-between mb-4">

                                    <h3 className="text-lg font-bold text-white">
                                        Items
                                    </h3>

                                    <span className="bg-[#D83F87]/15 border border-[#D83F87]/30 text-[#E98074] px-3 py-1 rounded-full text-sm font-semibold">
                                        {order.items.length} item
                                        {order.items.length !== 1 ? "s" : ""}
                                    </span>

                                </div>

                                {/* Order Items */}
                                <div className="space-y-3">

                                    {order.items.map((item) => (

                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center gap-4 bg-[#2A1B3D]/70 border border-[#A4B3B6]/10 rounded-2xl px-4 py-4 hover:border-[#44318D] transition-all duration-300"
                                        >

                                            <div>

                                                <p className="font-semibold text-white">
                                                    {item.product_name}
                                                </p>

                                                <p className="text-sm text-[#A4B3B6] mt-1">
                                                    Quantity: {item.quantity}
                                                </p>

                                            </div>

                                            <p className="font-bold text-[#E98074] whitespace-nowrap">
                                                ₹{item.price}
                                            </p>

                                        </div>

                                    ))}

                                </div>

                                {/* Footer */}
                                <div className="mt-6 pt-5 border-t border-[#A4B3B6]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

                                    <span className="text-sm text-[#A4B3B6]">
                                        Payment:{" "}
                                        <span className="font-semibold text-white">
                                            {order.payment_method === "OnlinePayment"
                                               ? "Online Payment"
                                                : order.payment_method || "COD"}
                                        </span>
                                    </span>

                                    <span className="text-sm font-semibold text-[#CDEDDD] bg-[#CDEDDD]/10 border border-[#CDEDDD]/20 px-3 py-1.5 rounded-full">
                                        Order Confirmed ✓
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default OrdersPage;