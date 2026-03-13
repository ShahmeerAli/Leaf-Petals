"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { data: session } = useSession();
    const { getCartCount } = useCart();

    return (
        <nav className="bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm border-b border-green-100 flex justify-between items-center sticky top-0 z-50 transition-all">
            <Link href="/" className="text-2xl font-black text-green-700 tracking-tighter hover:scale-105 transition-transform">
                Leaf&<span className="text-slate-800">Petal</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/" className="text-slate-600 hover:text-green-700 font-medium transition-colors hidden md:block">Shop</Link>
                {session ? (
                    <>
                        <Link href="/profile" className="text-slate-600 hover:text-green-700 font-medium transition-colors hidden sm:block">Profile</Link>
                        {session.user?.role === "admin" && (
                            <Link href="/dashboard" className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm text-sm">
                                Admin
                            </Link>
                        )}
                        <Link href="/api/auth/signout" className="text-red-500 hover:text-red-700 font-medium transition-colors text-sm border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg">
                            Logout
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-slate-600 hover:text-green-700 font-medium transition-colors border border-transparent hover:border-green-200 px-4 py-2 rounded-lg">Login</Link>
                        <Link href="/register" className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm shadow-green-200">Sign Up</Link>
                    </>
                )}
                <Link href="/cart" className="relative p-2 text-slate-600 hover:text-green-700 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    {getCartCount() > 0 && (
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{getCartCount()}</span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
