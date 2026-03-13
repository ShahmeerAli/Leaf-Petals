import connectDB from "@/lib/db/mongodb";
import Plant from "@/models/Plant";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }) {
    const unwrappedParams = await params;
    const { slug } = unwrappedParams;

    // Convert slug back to Category string (e.g. "pet-friendly" -> "Pet-Friendly")
    const categoryName = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // Allow for special cases or exact matches if needed, but doing simple regex match here
    let plants = [];
    try {
        await connectDB();
        plants = await Plant.find({ category: { $regex: new RegExp(`^${categoryName.replace('-', ' ')}$`, "i") } }).lean();
    } catch (error) {
        console.error("Database connection failed in CategoryPage:", error);
        // Continue running so the UI isn't fully broken, it just shows 0 plants.
    }

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Category Hero */}
            <section className="bg-green-900 text-white py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <span className="text-green-300 font-bold tracking-widest uppercase text-sm mb-2 block">Category</span>
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-sm capitalize">
                        {categoryName} Plants
                    </h1>
                    <p className="text-xl text-green-100 font-light max-w-2xl mx-auto">
                        Explore our curated collection of {categoryName.toLowerCase()} plants.
                    </p>
                </div>
            </section>

            {/* Product Grid */}
            <main className="max-w-6xl mx-auto px-6 py-16">

                <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {plants.length} {plants.length === 1 ? 'Product' : 'Products'} Found
                    </h2>
                    <Link href="/" className="text-green-600 hover:text-green-700 font-medium transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to All
                    </Link>
                </div>

                {plants.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <h3 className="text-2xl font-bold text-slate-700 mb-2">No plants found</h3>
                        <p className="text-slate-500 mb-6">We couldn't find any plants in the "{categoryName}" category.</p>
                        <Link href="/" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm">
                            Browse All Plants
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {plants.map((plant) => (
                            <Link href={`/plant/${plant._id}`} key={plant._id.toString()} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col hover:-translate-y-1">
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    <img
                                        src={plant.imageUrl}
                                        alt={plant.name}
                                        className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-green-700 transition-colors">{plant.name}</h2>
                                    </div>
                                    <p className="text-green-700 font-extrabold text-lg mt-auto pt-4 flex items-center justify-between">
                                        ${plant.price.toFixed(2)}
                                        <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </span>
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

        </div>
    );
}
