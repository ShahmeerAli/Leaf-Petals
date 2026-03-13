"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function PlantDetailsPage({ params }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                const res = await fetch(`/api/plants/${id}`);
                // API doesn't have a GET by ID yet. Wait, I should add a GET by ID route. Let me assume I will add it or fetch all and filter.
                // Actually, let me create the GET by ID route in API.
                const json = await res.json();
                if (json.success) {
                    setPlant(json.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-xl font-medium text-green-700">Loading your green friend...</div>
            </div>
        );
    }

    if (!plant) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Plant Not Found</h2>
                <p className="text-slate-500 mb-8 max-w-md">We couldn't find the plant you're looking for. It might have been removed or the link is incorrect.</p>
                <Link href="/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition shadow-md">
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-slate-50">
            <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-24">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row shadow-slate-200">

                    <div className="md:w-1/2 h-96 md:h-auto bg-slate-100 relative">
                        <img
                            src={plant.imageUrl}
                            alt={plant.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1545241047-6083a36ee5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; e.target.className = "w-full h-full object-cover opacity-50" }}
                        />
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                {plant.category}
                            </span>
                            {!plant.inStock && (
                                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ml-2">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            {plant.name}
                        </h1>

                        <p className="text-slate-600 text-lg mb-8 leading-relaxed font-light">
                            {plant.description}
                        </p>

                        <div className="flex items-center justify-between mb-10 pt-8 border-t border-slate-100">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Price</span>
                                <span className="text-4xl font-black text-green-700 mt-1">
                                    <span className="text-2xl font-medium text-green-600 mr-1">$</span>
                                    {plant.price.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => addToCart(plant)}
                            disabled={!plant.inStock}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl ${plant.inStock
                                ? "bg-slate-900 hover:bg-green-700 text-white shadow-slate-300 hover:shadow-green-300 hover:-translate-y-1"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            {plant.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                        <div className="flex justify-center mt-4">
                            <span className="text-sm text-slate-400 font-medium flex items-center">
                                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Free 2-Day Shipping
                            </span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
