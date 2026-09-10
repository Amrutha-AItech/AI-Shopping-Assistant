import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

const ShoppingAssistant = () => {
    const { fetchCart } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openAssistant = () => {
            setIsOpen(true);
        };

        window.addEventListener("open-ai-assistant", openAssistant);

        return () => {
            window.removeEventListener(
                "open-ai-assistant",
                openAssistant
            );
        };
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        const userMessage = message.trim();

        setMessages((previousMessages) => [
            ...previousMessages,
            { role: "user", text: userMessage },
        ]);

        setMessage("");
        setLoading(true);

        try {
            // Step 1: Ask the AI
            const response = await authFetch(`${BASEURL}/api/ai/chat/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Step 2: Check whether AI requested an action
            if (
                data.action === "add_to_cart" &&
                data.product_id
            ) {
                // Step 3: Execute the cart action
                const cartResponse = await authFetch(
                    `${BASEURL}/api/ai/cart/add/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            product_id: data.product_id,
                        }),
                    }
                );

                const cartData = await cartResponse.json();

                if (!cartResponse.ok) {
                    throw new Error(
                        cartData.error ||
                        "Could not add product to cart"
                    );
                }

                // Tell the rest of the application that the cart changed
                await fetchCart();

                setMessages((previousMessages) => [
                    ...previousMessages,
                    {
                        role: "assistant",
                        text: cartData.message,
                    },
                ]);

                return;
            }

            // Normal AI response
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    text: data.reply,
                },
            ]);
        } catch (error) {
            console.error("AI Assistant Error:", error);

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    role: "assistant",
                    text: "Sorry, I couldn't process your request.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating AI Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#D83F87] text-white px-5 py-3 rounded-full shadow-2xl border border-[#E98074]/30 hover:bg-[#E98074] hover:scale-105 transition-all duration-300"
                >
                    <span className="text-lg">🤖</span>
                    <span className="font-semibold">
                        AI Assistant
                    </span>
                </button>
            )}

            {/* AI Chat Window */}
            {isOpen && (
                <div className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-[#2A1B3D] rounded-2xl shadow-2xl border border-[#A4B3B6]/20 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#44318D] to-[#D83F87] text-white px-5 py-4 flex justify-between items-start">

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                                    🤖
                                </div>

                                <div>
                                    <h2 className="text-base font-bold">
                                        AI Shopping Assistant
                                    </h2>

                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-2 h-2 rounded-full bg-[#CDEDDD]" />
                                        <p className="text-xs text-white/80">
                                            Online • Ready to help
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/70 hover:text-white text-xl leading-none transition"
                        >
                            ✕
                        </button>

                    </div>

                    {/* Messages */}
                    <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#2A1B3D]">

                        {messages.length === 0 && (
                            <div className="text-center mt-10 px-4">

                                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#D83F87]/15 border border-[#D83F87]/30 flex items-center justify-center text-3xl mb-4">
                                    🤖
                                </div>

                                <p className="font-semibold text-white">
                                    Hi! 👋
                                </p>

                                <p className="text-sm text-[#A4B3B6] mt-2 leading-relaxed">
                                    I'm your AI shopping partner. Ask me about
                                    products, prices or recommendations.
                                </p>

                                <div className="flex flex-wrap justify-center gap-2 mt-5">
                                    <span className="text-xs text-[#E98074] bg-[#E98074]/10 border border-[#E98074]/20 px-3 py-1.5 rounded-full">
                                        Product search
                                    </span>

                                    <span className="text-xs text-[#E98074] bg-[#E98074]/10 border border-[#E98074]/20 px-3 py-1.5 rounded-full">
                                        Recommendations
                                    </span>

                                    <span className="text-xs text-[#E98074] bg-[#E98074]/10 border border-[#E98074]/20 px-3 py-1.5 rounded-full">
                                        Add to cart
                                    </span>
                                </div>

                            </div>
                        )}

                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                        item.role === "user"
                                            ? "bg-[#D83F87] text-white rounded-br-md"
                                            : "bg-[#44318D]/70 border border-[#A4B3B6]/10 text-white rounded-bl-md"
                                    }`}
                                >
                                    {item.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#44318D]/70 border border-[#A4B3B6]/10 rounded-2xl rounded-bl-md px-4 py-3">

                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-[#D83F87] animate-bounce" />
                                        <span className="w-2 h-2 rounded-full bg-[#E98074] animate-bounce [animation-delay:150ms]" />
                                        <span className="w-2 h-2 rounded-full bg-[#A4B3B6] animate-bounce [animation-delay:300ms]" />
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>

                    {/* Input */}
                    <form
                        onSubmit={sendMessage}
                        className="border-t border-[#A4B3B6]/10 p-3 bg-[#44318D]/30 flex gap-2"
                    >

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask about a product..."
                            disabled={loading}
                            className="flex-1 min-w-0 bg-[#2A1B3D] border border-[#A4B3B6]/20 text-white placeholder-[#A4B3B6] rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition disabled:opacity-60"
                        />

                        <button
                            type="submit"
                            disabled={loading || !message.trim()}
                            className="bg-[#D83F87] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#E98074] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>

                    </form>

                </div>
            )}
        </>
    );
};

export default ShoppingAssistant;