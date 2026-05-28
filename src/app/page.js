import Link from "next/link";
import connectDB from "@/lib/db/mongodb";
import Plant from "@/models/Plant";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const getPlants = async () => {
    try {
      await connectDB();
      const plants = await Plant.find({}).sort({ createdAt: -1 }).lean();
      // lean() returns plain JS objects; convert _id from ObjectId to string
      return plants.map((p) => ({ ...p, _id: p._id.toString() }));
    } catch (error) {
      console.error("Failed to fetch plants:", error);
      return [];
    }
  };

  const plants = await getPlants();

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Beautiful indoor plants"
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 font-bold text-sm mb-6 shadow-2xl">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Spring Collection Has Arrived
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.05] drop-shadow-xl">
              Breathe Life <br /><span className="text-green-500">Into Your Space.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-xl leading-relaxed font-medium">
              Elevate your interior with our curated selection of premium, rare, and easy-care botanical companions. Delivered fresh to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#plants" className="px-8 py-4 bg-green-500 hover:bg-green-400 text-slate-900 font-black text-lg rounded-full transition-all duration-300 shadow-[0_0_40px_-10px_rgba(34,197,94,0.5)] hover:shadow-[0_0_60px_-15px_rgba(34,197,94,0.8)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Shop Collection
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
              <Link href="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full transition-all duration-300 flex items-center justify-center hover:-translate-y-1">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-green-900 py-10 relative z-20 -mt-12 mx-6 max-w-6xl xl:mx-auto rounded-3xl shadow-2xl shadow-slate-900/20 border border-green-800 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 md:px-12 divide-y md:divide-y-0 md:divide-x divide-green-800/50">
          <div className="flex items-center gap-5 pt-4 md:pt-0">
            <div className="w-16 h-16 bg-green-800/80 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-1 mt-1">Free Shipping</h3>
              <p className="text-green-300/80 font-medium text-sm">On all orders over $75</p>
            </div>
          </div>
          <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-10">
            <div className="w-16 h-16 bg-green-800/80 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-1 mt-1">30-Day Guarantee</h3>
              <p className="text-green-300/80 font-medium text-sm">Healthy plant promise</p>
            </div>
          </div>
          <div className="flex items-center gap-5 pt-6 md:pt-0 md:pl-10">
            <div className="w-16 h-16 bg-green-800/80 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-1 mt-1">Expert Support</h3>
              <p className="text-green-300/80 font-medium text-sm">Lifetime botany advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Discover Content */}
      <main id="plants" className="max-w-7xl mx-auto px-6 py-20 md:py-32 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 selection:bg-green-200">Latest Botanical Finds</h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium">Discover our newest additions, hand-picked by our botany experts for their unparalleled beauty and resilience.</p>
          </div>
        </div>

        {/* Thick, stylish Category Pills */}
        <div className="flex flex-wrap gap-4 mb-14 pb-8 border-b-2 border-slate-200/60">
          <Link href="/" className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1">View All Plants</Link>
          <Link href="/category/indoor" className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 font-bold hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">Indoor</Link>
          <Link href="/category/succulents" className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 font-bold hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">Succulents</Link>
          <Link href="/category/flowering" className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 font-bold hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">Flowering</Link>
          <Link href="/category/pet-friendly" className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 font-bold hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all shadow-sm hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1">Pet-Friendly</Link>
        </div>

        {plants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto flex flex-col items-center">
            <div className="bg-green-50 w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4">Our greenhouse is empty</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md">We're curating new plants right now. Check back soon or visit the admin panel to add some test products.</p>
            <a href="/dashboard" className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-slate-900/30 hover:-translate-y-1 hover:bg-slate-800 transition-all">Go to Admin Dashboard</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {plants.map((plant) => (
              <a href={`/plant/${plant._id}`} key={plant._id} className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 flex flex-col h-full relative border border-slate-100">
                {!plant.inStock && (
                  <div className="absolute top-5 left-5 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
                    Out of Stock
                  </div>
                )}
                <div className="h-72 w-full overflow-hidden relative p-4 bg-white z-10">
                  <div className="w-full h-full rounded-3xl overflow-hidden bg-slate-50 relative isolate">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 z-10"></div>
                  </div>
                </div>
                <div className="px-8 pb-8 pt-2 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-bold mb-2 tracking-wide uppercase">{plant.category}</p>
                    <h4 className="font-black text-2xl text-slate-900 line-clamp-1 group-hover:text-green-600 transition-colors leading-tight mb-6">{plant.name}</h4>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Price</span>
                      <span className="text-3xl font-black text-slate-900 flex items-start">
                        <span className="text-lg font-bold text-slate-400 mt-1 mr-1">$</span>
                        {plant.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-slate-50 group-hover:bg-green-500 group-hover:text-white text-slate-600 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-green-500/40 group-hover:-translate-y-1">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
