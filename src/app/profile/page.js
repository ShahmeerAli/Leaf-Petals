"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?redirect=/profile");
        } else if (status === "authenticated") {
            fetchOrders();
        }
    }, [status, router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders/user");
            const json = await res.json();
            if (json.success) {
                setOrders(json.data);
            } else {
                toast.error(json.message || "Failed to fetch orders");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred fetching orders.");
        } finally {
            setLoading(false);
        }
    }

    if (status === "loading" || loading) {
        return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading profile...</div>;
    }

    return (
        <div className="min-h-[70vh] bg-slate-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">My Profile</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* User Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                            <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                                {session?.user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">{session?.user?.name}</h2>
                            <p className="text-sm text-slate-500 mb-6">{session?.user?.email}</p>

                            <div className="space-y-3">
                                <div className="bg-slate-50 py-2 px-3 rounded-lg border border-slate-100 text-sm">
                                    <span className="block text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Account Role</span>
                                    <span className="font-semibold text-slate-700 capitalize">{session?.user?.role}</span>
                                </div>
                            </div>

                            {session?.user?.role === "admin" && (
                                <Link href="/dashboard" className="mt-6 w-full block text-center bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl transition shadow-md">
                                    Admin Dashboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Orders History */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                Order History
                                <span className="bg-slate-100 text-slate-600 text-sm py-1 px-3 rounded-full">{orders.length}</span>
                            </h2>

                            {orders.length === 0 ? (
                                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                    <p className="text-slate-500 mb-4">You haven't placed any orders yet.</p>
                                    <Link href="/" className="text-green-600 font-medium hover:underline">Start Shopping</Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order._id} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition bg-white">
                                            <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-b border-slate-200">
                                                <div>
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Order Placed</p>
                                                    <p className="text-sm font-semibold text-slate-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total</p>
                                                    <p className="text-sm font-bold text-green-700">${order.totalPrice.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="px-6 py-6">
                                                <div className="flex flex-col sm:flex-row gap-8">
                                                    <div className="flex-grow space-y-4">
                                                        {order.orderItems.map((item, index) => (
                                                            <div key={index} className="flex gap-4 items-center">
                                                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                                                                <div>
                                                                    <Link href={`/plant/${item.plant}`} className="font-bold text-slate-800 hover:text-green-600 transition text-md line-clamp-1">{item.name}</Link>
                                                                    <p className="text-slate-500 text-sm">Qty: {item.qty} &times; ${item.price.toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="sm:border-l sm:border-slate-100 sm:pl-8 flex flex-col justify-center sm:w-1/3 space-y-4">
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Delivery Status</p>
                                                            {order.isDelivered ? (
                                                                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-md text-sm border border-green-200">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                                    Delivered
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-md text-sm border border-amber-200">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                    Processing
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Paid Status</p>
                                                            {order.isPaid ? (
                                                                <span className="inline-flex flex-col text-green-700 font-semibold text-sm">
                                                                    Paid
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex text-slate-600 font-semibold text-sm">
                                                                    {order.paymentMethod}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-slate-500 pt-2 border-t border-slate-100">
                                                            <span className="block font-medium text-slate-700 mb-1">Shipping to:</span>
                                                            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
