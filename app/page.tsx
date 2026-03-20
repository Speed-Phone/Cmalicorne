"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../components/CartContext';

export default function Home() {
  const { ajouterAuPanier } = useCart();

  // --- LES PRODUITS ---
  const products = [
    { id: 1, name: "Licornette", price: 45, image: "/t shirt.png" },
    { id: 2, name: "Licorne Kid", price: 35, image: "/t shirt1.png" },
    { id: 3, name: "Licorne (Logo)", price: 45, image: "/t shirt2.png" },
    { id: 4, name: "Licorne Girly", price: 50, image: "/t shirt3.png" },
    { id: 5, name: "Licorne Manga Combat", price: 55, image: "/t shirt4.png" },
    { id: 6, name: "Licorne Moto Run", price: 55, image: "/t shirt5.png" },
  ];

  // --- GESTION DES AVIS ---
  const [reviews, setReviews] = useState([
    { id: 1, name: "Léa M.", comment: "Le hoodie est encore plus beau en vrai ! Les reflets sont incroyables.", stars: 5 },
    { id: 2, name: "Thomas R.", comment: "Envoi rapide et packaging soigné. On sent la magie !", stars: 5 },
  ]);

  const [nom, setNom] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [note, setNote] = useState(5);

  const envoyerAvis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !commentaire) return;
    const nouvelAvis = { id: Date.now(), name: nom, comment: commentaire, stars: note };
    setReviews([nouvelAvis, ...reviews]);
    setNom(""); setCommentaire(""); setNote(5);
  };

  return (
    <main className="min-h-screen bg-white font-sans antialiased">
      
      {/* 1. SECTION HERO (L'ENTRÉE) */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/t shirt.png" alt="Hero" className="w-full h-full object-cover blur-sm opacity-40" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 mt-16 text-white flex flex-col items-center">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            C. Malicorne
          </h1>
          <p className="text-lg md:text-2xl font-medium italic opacity-90 tracking-[0.3em] uppercase mb-10">Collection Magique</p>
          <Link 
            href="/boutique" 
            className="bg-white text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-2xl hover:bg-purple-600 hover:text-white hover:scale-110 transition-all active:scale-95"
          >
            Voir tout le catalogue
          </Link>
        </div>
      </section>

      {/* 2. LA GRILLE DES 6 PRODUITS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-800 underline decoration-purple-500 underline-offset-8">Nos Modèles</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-4 italic">Éditions limitées</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-sm group-hover:shadow-lg transition-all duration-300 border border-purple-50/50">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  
                  {/* SÉLECTEUR DE TAILLES AU SURVOL */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4">
                    <p className="text-white text-[9px] font-bold uppercase tracking-[0.2em] mb-3">Choisir Taille</p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {['S', 'M', 'L', 'XL'].map((t) => (
                        <button 
                          key={t}
                          onClick={() => ajouterAuPanier(p, t)}
                          className="w-8 h-8 rounded-full bg-white text-purple-900 font-black text-xs hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110 active:scale-90"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-bold text-gray-800 tracking-tight">{p.name}</h3>
                  <p className="text-purple-500 font-extrabold mt-0.5 text-xs">{p.price} €</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION AVIS & FORMULAIRE */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-purple-50 border-t border-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tight text-gray-800 mb-4">L'avis de la communauté</h2>
            <p className="text-gray-500 font-medium italic">Partage ta magie avec nous ! ✨</p>
          </div>

          {/* FORMULAIRE */}
          <form onSubmit={envoyerAvis} className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 mb-20">
            <h3 className="font-black uppercase text-sm mb-6 tracking-widest text-purple-600">Laisse un commentaire</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input type="text" placeholder="Ton nom" value={nom} onChange={(e) => setNom(e.target.value)} className="bg-gray-50 border border-purple-50 rounded-xl px-6 py-4 focus:outline-none focus:border-purple-300" />
              <select value={note} onChange={(e) => setNote(parseInt(e.target.value))} className="bg-gray-50 border border-purple-50 rounded-xl px-6 py-4 text-yellow-500 font-bold focus:outline-none">
                <option value="5">★★★★★ (Parfait)</option>
                <option value="4">★★★★☆ (Super)</option>
                <option value="3">★★★☆☆ (Pas mal)</option>
              </select>
            </div>
            <textarea placeholder="Raconte-nous ton expérience..." value={commentaire} onChange={(e) => setCommentaire(e.target.value)} rows={4} className="w-full bg-gray-50 border border-purple-50 rounded-xl px-6 py-4 focus:outline-none mb-6" />
            <button className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-lg hover:bg-purple-600 transition-all active:scale-95">
              Envoyer mon avis magique
            </button>
          </form>

          {/* LISTE DES AVIS */}
          <div className="grid grid-cols-1 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
                  {r.name[0]}
                </div>
                <div>
                  <div className="flex gap-1 mb-2 text-yellow-400 text-sm">
                    {[...Array(r.stars)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <p className="text-gray-700 italic mb-3 leading-relaxed">"{r.comment}"</p>
                  <span className="font-black text-gray-900 text-[10px] uppercase tracking-[0.2em]">— {r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}