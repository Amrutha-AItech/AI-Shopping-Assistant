import { useState } from "react";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

const ShoppingAssistant = () => {
    const { fetchCart } = useCart();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
                        cartData.error || "Could not add product to cart"
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
        {!isOpen && (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-gray-800 transition"
            >
                🛍️ AI Assistant
            </button>
        )}

        {isOpen && (
            <div className="fixed bottom-5 right-5 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                
                <div className="bg-gray-900 text-white px-5 py-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold">
                            🛍️ AI Shopping Assistant
                        </h2>

                        <p className="text-sm text-gray-300">
                            Ask me about our products
                        </p>
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-300 hover:text-white text-xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="h-80 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">
                            <p className="font-medium">
                                Hi! 👋
                            </p>

                            <p className="text-sm mt-2">
                                Ask me about products, prices or recommendations.
                            </p>
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
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    item.role === "user"
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {item.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="text-sm text-gray-500">
                            AI is thinking...
                        </div>
                    )}
                </div>

                <form
                    onSubmit={sendMessage}
                    className="border-t p-3 flex gap-2"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask about a product..."
                        className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg disabled:opacity-50"
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