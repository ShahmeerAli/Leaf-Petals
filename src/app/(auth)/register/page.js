"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("An error occurred during registration");
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative bg-slate-900 order-2 lg:order-1">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                    alt="Beautiful shop interior with plants"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 xl:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                <div className="absolute inset-x-12 bottom-12 p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 text-white shadow-2xl">
                    <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h2 className="text-3xl font-black mb-3">Begin Your Journey</h2>
                    <p className="text-slate-200 text-lg font-medium leading-relaxed max-w-md">Create an account today to track orders, save your favorites, and get exclusive access to rare plant drops.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 lg:p-24 bg-white relative order-1 lg:order-2">
                <div className="absolute top-8 right-8">
                    <Link href="/" className="text-2xl font-black text-slate-800 tracking-tighter hover:text-green-600 transition-colors flex items-center gap-2">
                        <svg className="w-6 h-6 fill-green-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L9 8h6l-3-6zm-4 8H2l6 7-2 7 6-5 6 5-2-7 6-7h-6l-4 6-4-6z" /></svg>
                        Leaf & Petal.
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-black mb-2 text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mb-8 font-medium">Join us and start building your indoor garden.</p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 mb-6 rounded-xl border border-red-100 flex items-start gap-3">
                            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-slate-50 text-slate-900 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                            <input
                                type="text"
                                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-slate-50 text-slate-900 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                            <input
                                type="password"
                                className="w-full px-5 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-slate-50 text-slate-900 transition-all font-medium placeholder:text-slate-400"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="pt-4">
                            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-green-700 hover:shadow-lg hover:shadow-green-700/30 transition-all duration-300">
                                Create My Account
                            </button>
                        </div>
                    </form>
                    <p className="mt-8 text-center text-slate-500 font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-green-600 font-bold hover:text-green-700 transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
