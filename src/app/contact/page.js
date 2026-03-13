"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending an email
        setTimeout(() => {
            setLoading(false);
            toast.success("Message sent! We'll get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-6">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">

                {/* Contact Info */}
                <div className="md:w-2/5 md:bg-green-800 text-white p-10 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-extrabold mb-4 text-green-800 md:text-white">Get in Touch</h2>
                        <p className="text-slate-500 md:text-green-100 mb-10 text-lg font-light">
                            We'd love to hear from you. Our friendly team is always here to chat.
                        </p>

                        <div className="space-y-6 text-slate-700 md:text-green-50">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 md:bg-green-700 p-3 rounded-full shrink-0 text-green-600 md:text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email</h4>
                                    <p className="opacity-80">hello@leafandpetal.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 md:bg-green-700 p-3 rounded-full shrink-0 text-green-600 md:text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Office</h4>
                                    <p className="opacity-80">123 Botanical Ave.<br />Green City, CA 90210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 md:bg-green-700 p-3 rounded-full shrink-0 text-green-600 md:text-white">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                                    <p className="opacity-80">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="md:w-3/5 p-10 md:p-14">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50"
                                    placeholder="Jane"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                            <textarea
                                required
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-slate-50/50"
                                placeholder="How can we help you today?"
                            ></textarea>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-slate-300 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
