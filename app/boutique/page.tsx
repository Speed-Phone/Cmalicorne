"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function Boutique() {
  const { ajouterAuPanier } = useCart();
  const [produits, setProduits] = useState<any[]>([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("Tous");

  const categories = ["Tous", "T-shirts", "Sweats", "Accessoires"];

  useEffect(() => {
    async function getProduits() {
      setChargement(true);
      const { data, error } = await supabase.from('produits').select('*');
      if (error) {
        console.error("Erreur Supabase:", error.message);
      } else {
        setProduits(data || []);
      }
      setChargement(false);
    }
    getProduits();
  }, []);

  // --- NETTOYAGE DU LIEN IMAGE ---
  const nettoyerImage = (url: string) => {
    if (!url) return "/t-shirt.png";
    let propre = url.trim().replace(/^\/+/, '');
    return `/${propre}`;
  };

  const produitsFiltres = produits.filter(p => {
    const matchCategorie = categorieActive === "Tous" || p.categorie === categorieActive;
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchCategorie && matchRecherche;
  });

  if (chargement) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-purple-600">Chargement Cmalicorne...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-44 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 space-y-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 italic">
            Le <span className="text-purple-600">Catalogue</span>
          </h1>
          
          <div className="max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-full px-8 py-4 focus:outline-none focus:border-purple-300 text-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorieActive(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                  ${categorieActive === cat ? 'bg-purple-600 text-white scale-110' : 'bg-white border-2 border-purple-600 text-purple-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {produitsFiltres.map((p) => {
            const imagePropre = nettoyerImage(p.image_url);

            return (
              <div key={p.id} className="group cursor-pointer">
                {/* LIEN VERS LA PAGE PRODUIT */}
                <Link href={`/boutique/${p.id}`} className="block">
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-purple-50">
                    <img 
                      src={imagePropre} 
                      alt={p.nom} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    
                    {/* OVERLAY AU SURVOL */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6">
                      <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center">Aperçu rapide</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['S', 'M', 'L', 'XL'].map((t) => (
                          <button 
                            key={t}
                            onClick={(e) => {
                              e.preventDefault(); // Empêche d'aller sur la page produit
                              e.stopPropagation(); // Empêche de déclencher le lien parent
                              ajouterAuPanier({id: p.id, name: p.nom, price: p.prix, image: imagePropre}, t);
                            }}
                            className="w-10 h-10 rounded-full bg-white text-purple-900 font-black text-xs hover:bg-purple-600 hover:text-white transition-all transform hover:scale-125 shadow-xl"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="text-center space-y-1">
                  <span className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em]">{p.categorie}</span>
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-tight">{p.nom}</h3>
                  <p className="text-purple-600 font-black text-sm">{p.prix} €</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}