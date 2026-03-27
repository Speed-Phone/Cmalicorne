"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import { useCart } from '../../../components/CartContext';
import Link from 'next/link';

export default function FicheProduit() {
  const { id } = useParams();
  const { ajouterAuPanier } = useCart();
  const [produit, setProduit] = useState<any>(null);
  const [taille, setTaille] = useState('M');
  const [chargement, setChargement] = useState(true);

useEffect(() => {
    async function getProduit() {
      const { data, error } = await supabase
        .from('produits')
        .select('*') // <--- AJOUTE CETTE LIGNE ICI !
        .eq('id', id)
        .single();

      if (!error) setProduit(data);
      setChargement(false);
    }
    getProduit();
  }, [id]);

  // Nettoyage de l'image comme sur la boutique
  const nettoyerImage = (url: string) => {
    if (!url) return "/t-shirt.png";
    let propre = url.trim().replace(/^\/+/, '');
    return `/${propre}`;
  };

  if (chargement) return <div className="min-h-screen flex items-center justify-center">Magie en cours...</div>;
  if (!produit) return <div className="min-h-screen flex items-center justify-center">Produit introuvable.</div>;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* BOUTON RETOUR */}
        <Link href="/boutique" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors mb-12 inline-block">
          ← Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* IMAGE DU PRODUIT */}
          <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-purple-50">
            <img 
              src={nettoyerImage(produit.image_url)} 
              alt={produit.nom}
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFOS DU PRODUIT */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-purple-600 font-black uppercase tracking-[0.3em] text-[10px]">{produit.categorie}</span>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 mt-2">
                {produit.nom.replace('C. Malicorne', 'Cmalicorne')}
              </h1>
              <p className="text-3xl font-light text-gray-400 mt-4">{produit.prix} €</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg italic">
              {produit.description || "Une pièce unique signée Cmalicorne, conçue pour apporter une touche de magie à votre quotidien."}
            </p>

            {/* SÉLECTION TAILLE */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Choisir votre taille</p>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTaille(t)}
                    className={`w-14 h-14 rounded-2xl font-black transition-all border-2 
                      ${taille === t ? 'bg-black border-black text-white scale-110' : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* BOUTON PANIER */}
            <button 
              onClick={() => ajouterAuPanier({id: produit.id, name: produit.nom, price: produit.prix, image: produit.image_url}, taille)}
              className="w-full bg-purple-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-200 hover:bg-black hover:shadow-none transition-all active:scale-95"
            >
              Ajouter au panier — {produit.prix} €
            </button>

            <p className="text-[9px] text-center text-gray-400 uppercase font-bold tracking-widest">
              ✨ Livraison offerte dès 60€ d'achat ✨
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}