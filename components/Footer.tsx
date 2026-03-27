import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-purple-50 pt-24 pb-12 px-6 mt-20 font-sans text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* GRILLE 4 COLONNES (HAUT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase text-purple-600 inline-block">
              Cmalicorne
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[250px]">
              Maison de mode dédiée à la magie du quotidien et à l'élégance mystique.
            </p>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-900 mb-8">Explorer</h4>
            <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <li><Link href="/boutique" className="hover:text-purple-600 transition-colors">La Boutique</Link></li>
              <li><Link href="/concept" className="hover:text-purple-600 transition-colors">Notre Concept</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-900 mb-8">Assistance & Légal</h4>
            <ul className="space-y-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <li><Link href="/legal/mentions-legales" className="hover:text-purple-600">Mentions Légales</Link></li>
              <li><Link href="/legal/cgv" className="hover:text-purple-600">Conditions de Vente</Link></li>
              <li><Link href="/legal/confidentialite" className="hover:text-purple-600">Confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-[0.2em] text-[10px] text-gray-900 mb-8">Newsletter</h4>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="TON EMAIL..." className="bg-gray-50 border border-purple-50 rounded-2xl px-5 py-4 w-full text-[10px] font-bold uppercase focus:outline-none" />
              <button className="bg-black text-white px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-lg active:scale-95">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* BARRE DE BAS DE PAGE (CENTRÉE) */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 text-center">
          
          {/* Copyright */}
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            © {currentYear} Cmalicorne — Design par <span className="text-purple-600 font-black">Kendrick Callé</span> 🦄
          </p>

          {/* Section Paiement ramenée vers le centre */}
          <div className="flex items-center gap-8">
             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Paiement Sécurisé :</span>
             
             <div className="flex items-center gap-10">
                {/* VISA */}
                <img src="/icons/visa.svg" alt="Visa" className="h-9 w-auto block object-contain" />
                
                {/* MASTERCARD : Gros chiffre car c'est un cercle */}
                <img src="/icons/mastercard.svg" alt="Mastercard" className="h-16 w-auto block object-contain" />
                
                {/* STRIPE : Petit chiffre car il est très long */}
                <img src="/icons/stripe.svg" alt="Stripe" className="h-6 w-auto block object-contain" />
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}