"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-slate-50">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center max-w-lg w-full">
                    <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
                    <p className="text-slate-500 mb-8">Looks like you haven't added any beautiful plants to your cart yet.</p>
                    <Link href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-4 rounded-xl transition shadow-md shadow-green-200">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[70vh] bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Your Cart</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-center">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow flex flex-col text-center sm:text-left">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-slate-800">{item.name}</h3>
                                        <p className="font-black text-green-700 hidden sm:block">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-4">{item.category}</p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-8 h-8 rounded hover:bg-white flex items-center justify-center text-slate-600 transition"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center font-medium text-slate-800">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-8 h-8 rounded hover:bg-white flex items-center justify-center text-slate-600 transition"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="font-black text-green-700 sm:hidden block">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end pt-4">
                            <button onClick={clearCart} className="text-slate-500 hover:text-red-600 text-sm font-medium transition">
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 text-slate-600">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-800">${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="font-medium text-slate-800">${(getCartTotal() * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                                    <span className="font-bold text-slate-800">Total</span>
                                    <span className="text-3xl font-black text-green-700">${(getCartTotal() * 1.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href={session ? "/checkout" : "/login?redirect=/checkout"}
                                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg"
                            >
                                Proceed to Checkout
                            </Link>

                            {!session && (
                                <p className="text-center text-sm text-slate-500 mt-4">
                                    You will be asked to <Link href="/login" className="text-green-600 hover:underline">login</Link> before checkout.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
