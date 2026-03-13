export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 px-6 mt-auto w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="font-black text-2xl text-white tracking-tighter">
                    Leaf&<span className="text-slate-500">Petal</span>
                </p>
                <div className="flex gap-4">
                    <a href="/about" className="hover:text-green-400 transition-colors">About</a>
                    <a href="/contact" className="hover:text-green-400 transition-colors">Contact</a>
                    <a href="/faq" className="hover:text-green-400 transition-colors">FAQ</a>
                </div>
                <p className="text-sm">&copy; {new Date().getFullYear()} Leaf & Petal. All rights reserved.</p>
            </div>
        </footer>
    );
}
