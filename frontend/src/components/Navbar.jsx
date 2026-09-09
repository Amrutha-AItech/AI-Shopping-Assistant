import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

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
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAD9D5] shadow-md px-6 py-4 flex justify-between items-center">

            {/* Logo */}
            <Link
                to="/"
                className="text-2xl font-bold text-slate-800 hover:text-[#C45B75] transition"
            >
                MyStore
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-6">

                {!isLoggedIn ? (
                    <>
                        <Link
                            to="/login"
                            className="text-slate-700 hover:text-[#C45B75] font-medium transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="text-slate-700 hover:text-[#C45B75] font-medium transition"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/orders"
                            className="text-slate-700 hover:text-[#C45B75] font-medium transition"
                        >
                            My Orders
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-slate-700 hover:text-[#C45B75] font-medium transition"
                        >
                            Logout
                        </button>
                    </>
                )}

                {/* Cart */}
                <Link
                    to="/cart"
                    className="relative text-slate-700 hover:text-[#C45B75] font-medium transition"
                >
                    🛒 Cart

                    {cartCount > 0 && (
                        <span className="absolute -top-3 -right-4 bg-[#FBB7C7] text-slate-800 text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;