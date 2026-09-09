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
        <div className="min-h-screen bg-[#C0E9ED] flex items-center justify-center px-4 pt-24 pb-12">

            <div className="w-full max-w-md">

                {/* Signup Card */}
                <div className="bg-[#FFFDF8] rounded-3xl shadow-xl p-8">

                    {/* Heading */}
<div className="text-center mb-8">

    <div className="text-4xl mb-3">
        🛍️
    </div>

    <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#C45B75]">
        Create your account
    </p>

    <h2 className="text-3xl font-bold text-slate-800 mt-2">
        Sign Up
    </h2>

    <p className="text-slate-500 text-sm mt-2">
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Username
                            </label>

                            <input
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FAD9D5] transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FAD9D5] transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FAD9D5] transition"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                name="password2"
                                type="password"
                                value={form.password2}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-[#FB87C7] focus:ring-2 focus:ring-[#FAD9D5] transition"
                            />
                        </div>

                        {/* Create Account */}
                        <button
                            type="submit"
                            className="w-full bg-[#FB87C7] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:shadow-lg transition-all duration-300"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Message */}
                    {msg && (
                        <p className="mt-4 text-center text-sm text-slate-600">
                            {msg}
                        </p>
                    )}

                    {/* Login */}
                    <div className="mt-7 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-[#C45B75] hover:text-[#FB87C7] transition"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;