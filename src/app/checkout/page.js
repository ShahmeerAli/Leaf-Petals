"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?redirect=/checkout");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
    }

    if (cart.length === 0) {
        router.push("/cart");
        return null;
    }

    const itemsPrice = getCartTotal();
    const taxPrice = itemsPrice * 0.08;
    const shippingPrice = 0; // Free shipping
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            orderItems: cart.map((item) => ({
                name: item.name,
                qty: item.quantity,
                image: item.imageUrl,
                price: item.price,
                plant: item._id,
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        };

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            const json = await res.json();
            if (json.success) {
                toast.success("Order Placed Successfully!");
                clearCart();
                router.push("/profile");
            } else {
                toast.error(json.message || "Failed to place order.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form Section */}
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Shipping Address
                            </h2>
                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Address</label>
                                    <input required name="address" value={shippingAddress.address} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50" placeholder="123 Plant Street, Suite 4B" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                        <input required name="city" value={shippingAddress.city} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50" placeholder="New York" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                                        <input required name="postalCode" value={shippingAddress.postalCode} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50" placeholder="10001" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                                    <input required name="country" value={shippingAddress.country} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50" placeholder="United States" />
                                </div>
                            </form>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <span className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Payment Method
                            </h2>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 border border-green-200 rounded-xl bg-green-50/50 cursor-pointer">
                                    <input type="radio" value="Cash on Delivery" checked={paymentMethod === "Cash on Delivery"} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-green-600 focus:ring-green-500" />
                                    <span className="ml-3 font-medium text-slate-800">Cash on Delivery</span>
                                </label>
                                <label className="flex items-center p-4 border border-slate-200 rounded-xl opacity-50 cursor-not-allowed">
                                    <input disabled type="radio" value="Credit Card" className="w-5 h-5 text-green-600 focus:ring-green-500" />
                                    <span className="ml-3 font-medium text-slate-800">Credit Card (Coming soon)</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Review Order</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex gap-4 items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                                            <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-green-700">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-3 text-slate-600 text-sm">
                                <div className="flex justify-between">
                                    <span>Items</span>
                                    <span className="font-medium text-slate-800">${itemsPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (8%)</span>
                                    <span className="font-medium text-slate-800">${taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
                                    <span className="font-bold text-slate-800 text-base">Order Total</span>
                                    <span className="text-3xl font-black text-green-700">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading}
                                className="mt-8 w-full block text-center bg-slate-900 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
