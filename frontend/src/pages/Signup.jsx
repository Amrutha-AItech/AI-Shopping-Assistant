import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const [msg, setMsg] = useState("");
    const nav = useNavigate();

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
            const res = await fetch(`${BASE}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                setMsg("Account created. Redirecting to login...");

                setTimeout(() => nav("/login"), 1200);
            } else {
                setMsg(
                    data.username ||
                    data.password ||
                    data.password2 ||
                    JSON.stringify(data)
                );
            }
        } catch (err) {
            console.error(err);
            setMsg("Signup failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#2A1B3D] flex items-center justify-center px-4 pt-28 pb-12 relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute top-10 left-10 w-80 h-80 bg-[#44318D] opacity-20 blur-3xl rounded-full pointer-events-none" />

            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#D83F87] opacity-15 blur-3xl rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md">

                {/* Signup Card */}
                <div className="bg-[#44318D]/40 border border-[#A4B3B6]/20 rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">

                    {/* Heading */}
                    <div className="text-center mb-8">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D83F87]/20 border border-[#D83F87]/30 flex items-center justify-center text-3xl mb-4">
                            🛍️
                        </div>

                        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#E98074]">
                            Create Your Account
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-2">
                            Sign Up
                        </h2>

                        <p className="text-[#A4B3B6] text-sm mt-2">
                            Join us and start shopping
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
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
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
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Confirm Password
                            </label>

                            <input
                                name="password2"
                                type="password"
                                value={form.password2}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[#A4B3B6]/20 bg-[#2A1B3D] text-white placeholder-[#A4B3B6] outline-none focus:border-[#D83F87] focus:ring-2 focus:ring-[#D83F87]/20 transition"
                            />
                        </div>

                        {/* Create Account */}
                        <button
                            type="submit"
                            className="w-full bg-[#D83F87] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#E98074] hover:scale-[1.01] transition-all duration-300"
                        >
                            Create Account →
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

                    {/* Login */}
                    <div className="mt-7 pt-6 border-t border-[#A4B3B6]/20 text-center text-sm text-[#A4B3B6]">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-[#D83F87] hover:text-[#E98074] transition"
                        >
                            Login
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

export default Signup;