import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-purple-50 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase text-purple-600 mb-6 inline-block">C. Malicorne</Link>
            <p className="text-gray-500 text-sm mb-6">Maison de mode dédiée à la magie du quotidien.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/cmalicorne10" target="_blank" className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.tiktok.com/@cmalicorne" target="_blank" className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Explorer</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/boutique">Boutique</Link></li>
              <li><Link href="/concept">Concept</Link></li>
            </ul>
          </div>
          <div><h4 className="font-bold uppercase tracking-widest text-xs mb-6">Aide</h4><p className="text-gray-500 text-sm">Livraison & Retours</p></div>
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
            <div className="flex gap-2"><input type="email" placeholder="Email..." className="bg-gray-50 border border-purple-50 rounded-xl px-4 py-2 w-full focus:outline-none"/><button className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold">OK</button></div>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            © {currentYear} C. Malicorne — Fait avec magie par <span className="text-purple-400 font-extrabold">Kendrick Callé</span> 🦄
          </p>
        </div>
      </div>
    </footer>
  );
}