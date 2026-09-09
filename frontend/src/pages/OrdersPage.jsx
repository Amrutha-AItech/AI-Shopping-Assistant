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
            <div className="min-h-screen bg-[#C0E6ED] flex items-center justify-center pt-24">
                <div className="text-center">
                    <div className="text-5xl mb-4">📦</div>
                    <h2 className="text-xl font-semibold text-slate-700">
                        Loading your orders...
                    </h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#C0E6ED] flex items-center justify-center pt-24 px-4">
                <div className="bg-[#FFFDF8] rounded-3xl shadow-xl p-8 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-[#C45B75]">
                        {error}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#C0E6ED] pt-28 px-4 pb-12">
            <div className="max-w-6xl mx-auto lg:mr-96">

                {/* Page Heading */}
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#C45B75] mb-2">
                        Your Shopping History
                    </p>

                    <h1 className="text-4xl font-bold text-slate-800">
                        My Orders 📦
                    </h1>

                    <p className="text-slate-600 mt-2">
                        View your previous purchases and order details
                    </p>
                </div>

                {orders.length === 0 ? (
                    /* Empty Orders */
                    <div className="bg-[#FFFDF8] rounded-3xl shadow-xl p-10 text-center max-w-2xl mx-auto">
                        <div className="text-6xl mb-5">
                            🛍️
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            No orders yet
                        </h2>

                        <p className="text-slate-500">
                            You haven't placed any orders yet. Start shopping
                            and your orders will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-[#FFFDF8] rounded-3xl shadow-xl p-6 md:p-8"
                            >

                                {/* Order Header */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-200 pb-5 mb-5">

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-[#FBB7C7] flex items-center justify-center text-xl">
                                                📦
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    Order #{order.id}
                                                </h2>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    Placed on{" "}
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:text-right">
                                        <p className="text-sm text-slate-500 mb-1">
                                            Order Total
                                        </p>

                                        <p className="text-2xl font-bold text-[#C45B75]">
                                            ₹{order.total_amount}
                                        </p>
                                    </div>

                                </div>

                                {/* Items Heading */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-800">
                                        Items
                                    </h3>

                                    <span className="bg-[#FAD9D5] text-[#C45B75] px-3 py-1 rounded-full text-sm font-semibold">
                                        {order.items.length} item
                                        {order.items.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-3">

                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center gap-4 bg-[#FCE6D3] rounded-2xl px-4 py-4"
                                        >
                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {item.product_name}
                                                </p>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>

                                            <p className="font-bold text-[#C45B75] whitespace-nowrap">
                                                ₹{item.price}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                                {/* Footer */}
                                <div className="mt-6 pt-5 border-t border-slate-200 flex justify-between items-center">
                                    <span className="text-sm text-slate-500">
                                        Payment:{" "}
                                        <span className="font-semibold text-slate-700">
                                            {order.payment_method || "COD"}
                                        </span>
                                    </span>

                                    <span className="text-sm font-semibold text-[#C45B75]">
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