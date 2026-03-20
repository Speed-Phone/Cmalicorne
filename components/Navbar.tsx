"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { supabase } from '../lib/supabase'; // Import de ta connexion Supabase
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  // Récupération des infos du panier
  const { items, modifierQuantite, supprimerDuPanier } = useCart();

  // 1. GESTION DE L'AUTHENTIFICATION (Temps réel)
  useEffect(() => {
    // Vérifier la session actuelle au chargement
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    // Écouter les changements (Connexion / Déconnexion)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Calculs pour le panier
  const nombreArticles = items.reduce((acc: number, item: any) => acc + item.quantite, 0);
  const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantite), 0);

  // Style commun pour les boutons à contours (Outline)
  const btnOutline = "px-5 py-2 border-2 border-purple-600 text-purple-600 font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap";

  return (
    <>
      {/* HEADER fixé à top-10 pour l'AnnouncementBar */}
      <header className="fixed top-10 w-full z-40 bg-white/90 backdrop-blur-md border-b p-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          
          {/* GAUCHE : Logo */}
          <Link href="/" className="text-lg md:text-xl font-black uppercase text-purple-600 italic tracking-tighter flex-shrink-0 hover:scale-105 transition-transform">
            Cmalicorne
          </Link>

          {/* CENTRE : Navigation (Style Contour) */}
          <nav className="hidden md:flex items-center gap-3">
            <Link href="/boutique" className={btnOutline}>Boutique</Link>
            <Link href="/concept" className={btnOutline}>Concept</Link>
            <Link href="/contact" className={btnOutline}>Contact</Link>
          </nav>

          {/* DROITE : Espace Client & Panier */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* BOUTON COMPTE / CONNEXION */}
            <Link 
              href={user ? "/compte" : "/login"} 
              className="group flex items-center gap-2 px-4 py-2 border-2 border-gray-100 rounded-full hover:border-purple-600 transition-all duration-300 shadow-sm"
            >
              <span className="text-xs">👤</span>
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-purple-600">
                {user ? "Mon Compte" : "Connexion"}
              </span>
            </Link>

            {/* BOUTON PANIER */}
            <button 
              onClick={() => setOuvert(true)} 
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95"
            >
              <span className="hidden sm:inline">Panier</span> 
              <span className="bg-white text-purple-600 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black">
                {nombreArticles}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* TIROIR DU PANIER (Drawer) */}
      {ouvert && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm animate-in fade-in duration-300" 
          onClick={() => setOuvert(false)} 
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-50 shadow-2xl transition-transform duration-500 flex flex-col ${ouvert ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="font-black uppercase tracking-tight text-lg italic">Ton <span className="text-purple-600">Panier</span></h2>
          <button onClick={() => setOuvert(false)} className="text-2xl p-2 hover:rotate-90 transition-transform">✕</button>
        </div>

        {/* LISTE ARTICLES */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 text-center">
              <p className="text-5xl mb-4 opacity-30">🦄</p>
              <p className="font-black uppercase text-[10px] tracking-widest">Ton panier est vide</p>
            </div>
          ) : (
            items.map((item: any) => (
              <div key={`${item.id}-${item.taille}`} className="flex gap-4 items-center">
                <img src={item.image} className="w-16 h-20 object-cover rounded-xl border border-gray-100 shadow-sm" alt={item.name} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-gray-800 leading-tight">{item.name}</p>
                    <span className="bg-purple-100 text-purple-600 text-[9px] font-black px-2 py-0.5 rounded uppercase">
                      {item.taille}
                    </span>
                  </div>
                  <p className="text-purple-600 font-black text-sm mb-3">{item.price} €</p>
                  
                  <div className="flex items-center gap-3 bg-gray-100 w-fit rounded-lg px-2 py-1">
                    <button onClick={() => modifierQuantite(item.id, item.taille, -1)} className="hover:text-purple-600 font-black px-1">−</button>
                    <span className="text-xs font-black w-4 text-center">{item.quantite}</span>
                    <button onClick={() => modifierQuantite(item.id, item.taille, 1)} className="hover:text-purple-600 font-black px-1">+</button>
                  </div>
                </div>

                <button 
                  onClick={() => supprimerDuPanier(item.id, item.taille)} 
                  className="text-gray-300 hover:text-red-500 text-[9px] font-black uppercase underline"
                >
                  Suppr
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER PANIER */}
        <div className="p-8 border-t bg-gray-50 mt-auto">
          <div className="flex justify-between items-center mb-8">
            <span className="font-black text-gray-400 uppercase text-xs tracking-[0.2em]">Total</span>
            <span className="text-3xl font-black text-gray-900 tracking-tighter">{total} €</span>
          </div>
          
          <Link 
            href="/commander"
            onClick={() => setOuvert(false)}
            className="block text-center w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:bg-purple-600 transition-all active:scale-95"
          >
            Valider la commande
          </Link>
        </div>
      </div>
    </>
  );
}