export const metadata = {
    title: "About Us | Leaf & Petal",
    description: "Learn more about Leaf & Petal, our mission, and our passion for bringing nature indoors.",
};

export default function AboutPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Our Story</h1>
                    <p className="text-xl text-slate-500 font-light">Rooted in passion, growing with purpose.</p>
                </div>

                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row mb-12">
                    <div className="md:w-1/2 h-80 md:h-auto">
                        <img
                            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Greenhouse"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">How It Started</h2>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Leaf & Petal was born out of a simple idea: everyone deserves a little slice of nature in their home.
                            Our founder, a lifelong botanist, realized how intimidating plant care can be for beginners, and set out to curate a selection of beautiful, resilient plants.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Today, we operate a sustainable greenhouse and ship directly to your door, ensuring every plant arrives healthy and ready to thrive.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Eco-Friendly</h3>
                        <p className="text-slate-500">We use biodegradable packaging and sustainable soil mixes.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Happy Customers</h3>
                        <p className="text-slate-500">Over 10,000 homes transformed with our beautiful indoor jungles.</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Fast Growth</h3>
                        <p className="text-slate-500">Curated plants that are easy to care for and guaranteed to grow.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
