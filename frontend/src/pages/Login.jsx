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
        <div className="min-h-screen bg-[#C0E9ED] flex items-center justify-center px-4 py-28">

            <div className="w-full max-w-md">

                {/* Login Card */}
                <div className="bg-[#FFFDF8] rounded-3xl shadow-xl p-8 md:p-10">

                    {/* Header */}
                    <div className="text-center mb-8">

                        <div className="text-4xl mb-3">
                            🛍️
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            Welcome Back
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Sign in to continue shopping
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Username
                            </label>

                            <input
                                name="username"
                                type="text"
                                onChange={handleChange}
                                value={form.username}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FB87C7]/20 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                value={form.password}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FB87C7]/20 transition"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#FB87C7] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:shadow-lg transition-all duration-300"
                        >
                            Login
                        </button>

                    </form>

                    {/* Message */}
                    {msg && (
                        <p className="mt-4 text-center text-sm text-[#C45B75] font-medium">
                            {msg}
                        </p>
                    )}

                    {/* Signup */}
                    <div className="mt-7 text-center text-sm text-slate-600">

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="text-[#C45B75] font-semibold hover:underline"
                        >
                            Sign up
                        </Link>

                    </div>

                </div>

                {/* Small decorative text */}
                <p className="text-center text-slate-600 text-xs mt-5">
                    Discover something you'll love ✨
                </p>

            </div>

        </div>
    );
}

export default Login;