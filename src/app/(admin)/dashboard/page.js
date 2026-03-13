"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [plants, setPlants] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        // We can also add a check for session.user.role === "admin" here.
        fetchPlants();
    }, [status, router]);

    const fetchPlants = async () => {
        try {
            const res = await fetch("/api/plants");
            const json = await res.json();
            if (json.success) {
                setPlants(json.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddPlant = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/plants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, price: Number(formData.price) }),
            });
            if (res.ok) {
                setFormData({ name: "", description: "", price: "", imageUrl: "", category: "" });
                fetchPlants();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePlant = async (id) => {
        try {
            const res = await fetch(`/api/plants/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPlants();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (status === "loading") return <div className="text-center mt-10 text-green-700">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Admin Dashboard</h1>
                    <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-slate-600 border border-slate-200">
                        Welcome, {session?.user?.name || "Admin"}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Add Plant Form */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1 h-fit">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="bg-green-100 text-green-700 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            </span>
                            Add New Plant
                        </h2>
                        <form onSubmit={handleAddPlant} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Plant Name</label>
                                <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                                    <input required type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                                <input required name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all" />
                            </div>
                            <button disabled={loading} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 rounded-xl transition-colors shadow-md disabled:bg-slate-400 mt-2">
                                {loading ? "Adding..." : "Save Plant"}
                            </button>
                        </form>
                    </section>

                    {/* Plant List */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                            </span>
                            Manage Plants
                        </h2>
                        {plants.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p className="text-slate-500">No plants found. Add your first plant above!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {plants.map((plant) => (
                                    <div key={plant._id} className="group relative border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
                                        <div className="h-40 w-full overflow-hidden bg-slate-100">
                                            <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{plant.name}</h3>
                                                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">${plant.price}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-3 line-clamp-2">{plant.description}</p>
                                            <div className="mt-auto flex justify-between items-center text-sm pt-3 border-t border-slate-100">
                                                <span className="text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded-md">{plant.category}</span>
                                                <button
                                                    onClick={() => handleDeletePlant(plant._id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-medium text-xs flex items-center gap-1"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
