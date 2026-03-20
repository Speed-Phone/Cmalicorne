"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { supabase } from '../../lib/supabase';

export default function Boutique() {
  const { ajouterAuPanier } = useCart();
  const [produits, setProduits] = useState<any[]>([]);
  const [chargement, setChargement] = useState(true);
  const [recherche, setRecherche] = useState("");
  const [categorieActive, setCategorieActive] = useState("Tous");

  const categories = ["Tous", "T-shirts", "Sweats", "Accessoires"];

  // RÉCUPÉRATION DES PRODUITS DEPUIS SUPABASE
  useEffect(() => {
    async function getProduits() {
      setChargement(true);
      const { data, error } = await supabase
        .from('produits')
        .select('*');

      if (error) {
        console.error("Erreur Supabase:", error.message);
      } else {
        setProduits(data || []);
      }
      setChargement(false);
    }
    getProduits();
  }, []);

  // FILTRE DYNAMIQUE
  const produitsFiltres = produits.filter(p => {
    const matchCategorie = categorieActive === "Tous" || p.categorie === categorieActive;
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase());
    return matchCategorie && matchRecherche;
  });

  if (chargement) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 animate-pulse">Chargement Cmalicorne...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-white pt-44 pb-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* EN-TÊTE */}
        <header className="text-center mb-16 space-y-8">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 italic">
            Le <span className="text-purple-600">Catalogue</span>
          </h1>
          
          <div className="max-w-md mx-auto relative group">
            <input 
              type="text" 
              placeholder="Rechercher un modèle..." 
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-full px-8 py-4 focus:outline-none focus:border-purple-300 transition-all shadow-inner text-sm text-gray-800 font-medium"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategorieActive(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 shadow-sm
                  ${categorieActive === cat 
                    ? 'bg-purple-600 border-purple-600 text-white scale-110 shadow-purple-200' 
                    : 'bg-white border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>
        
        {/* GRILLE DYNAMIQUE */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {produitsFiltres.map((p) => {
            // SÉCURITÉ CHEMIN IMAGE : On force le "/" au début
            const imagePath = p.image_url?.trim();
            const finalSrc = imagePath?.startsWith('/') ? imagePath : `/${imagePath}`;

            return (
              <div key={p.id} className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-purple-50">
                  <img 
                    src={finalSrc} 
                    alt={p.nom} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">Choisir Taille</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['S', 'M', 'L', 'XL'].map((t) => (
                        <button 
                          key={t}
                          onClick={() => ajouterAuPanier({id: p.id, name: p.nom, price: p.prix, image: finalSrc}, t)}
                          className="w-10 h-10 rounded-full bg-white text-purple-900 font-black text-xs hover:bg-purple-600 hover:text-white transition-all transform hover:scale-125 active:scale-90 shadow-xl"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-[9px] uppercase font-black text-gray-300 tracking-[0.2em]">{p.categorie}</span>
                  <h3 className="text-xs font-bold text-gray-800 tracking-tight leading-tight uppercase">
                    {p.nom.replace('C. Malicorne', 'Cmalicorne')}
                  </h3>
                  <p className="text-purple-600 font-black text-sm">{p.prix} €</p>
                </div>
              </div>
            );
          })}
        </div>

        {produitsFiltres.length === 0 && (
          <div className="py-32 text-center animate-in fade-in">
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Aucun trésor trouvé chez Cmalicorne...</p>
          </div>
        )}
      </div>
    </main>
  );
}