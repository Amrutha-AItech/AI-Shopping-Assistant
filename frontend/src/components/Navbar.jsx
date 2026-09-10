import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { clearTokens, getAccessToken } from "../utils/auth.js";

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#2A1B3D]/95 backdrop-blur-md border-b border-[#A4B3B6]/10 shadow-xl px-4 sm:px-6 py-4">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-white hover:text-[#D83F87] transition"
                >
                    My<span className="text-[#D83F87]">Store</span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3 sm:gap-6">

                    {!isLoggedIn ? (
                        <>
                            <Link
                                to="/login"
                                className="text-[#A4B3B6] hover:text-white font-medium transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-[#D83F87] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#E98074] hover:scale-105 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/orders"
                                className="text-[#A4B3B6] hover:text-white font-medium transition"
                            >
                                My Orders
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-[#A4B3B6] hover:text-[#E98074] font-medium transition"
                            >
                                Logout
                            </button>
                        </>
                    )}

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-1.5 text-[#A4B3B6] hover:text-white font-medium transition"
                    >
                        <span className="text-lg">🛒</span>
                        <span className="hidden sm:inline">
                            Cart
                        </span>

                        {cartCount > 0 && (
                            <span className="absolute -top-3 -right-3 bg-[#D83F87] text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-lg">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;