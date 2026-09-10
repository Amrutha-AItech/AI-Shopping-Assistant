import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Login() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const response = await fetch(`${BASE}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                saveToken(data);

                setMsg("Login successful! Redirecting...");

                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                setMsg(
                    data.detail ||
                    "Login failed. Please try again."
                );
            }
        } catch {
            setMsg("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#2A1B3D] flex items-center justify-center px-4 py-28 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-10 left-10 w-80 h-80 bg-[#44318D] opacity-20 blur-3xl rounded-full pointer-events-none" />

            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D83F87] opacity-15 blur-3xl rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md">

                {/* Login Card */}
                <div className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">

                    {/* Header */}
                    <div className="text-center mb-8">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D83F87]/20 border border-[#D83F87]/30 flex items-center justify-center text-3xl mb-4">
                            🛍️
                        </div>

                        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E98074]">
                            Welcome Back
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-2">
                            Sign In
                        </h2>

                        <p className="text-[#A4B3B6] mt-2">
                            Sign in to continue shopping
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Username
                            </label>

                            <input
                                name="username"
                                type="text"
                                onChange={handleChange}
                                value={form.username}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={form.password}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#D83F87] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#E98074] hover:scale-[1.01] transition-all duration-300"
                        >
                            Login →
                        </button>

                    </form>

                    {/* Message */}
                    {msg && (
                        <div className="mt-5 bg-[#CDEDDD]/10 border border-[#CDEDDD]/20 rounded-xl p-3 text-center">
                            <p className="text-sm text-[#CDEDDD] font-medium">
                                {msg}
                            </p>
                        </div>
                    )}

                    {/* Signup */}
                    <div className="mt-7 pt-6 border-t border-[#A4B3B6]/20 text-center text-sm text-[#A4B3B6]">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-[#D83F87] font-semibold hover:text-[#E98074] transition"
                        >
                            Sign up
                        </Link>

                    </div>

                </div>

                {/* Decorative text */}
                <p className="text-center text-[#A4B3B6] text-xs mt-5">
                    Shop smarter with AI ✨
                </p>

            </div>

        </div>
    );
}

export default Login;