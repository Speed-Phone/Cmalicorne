"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartContext';

export default function CheckoutPage() {
  const { items } = useCart(); 
  const [mode, setMode] = useState<'choix' | 'invite' | 'compte'>('choix');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Calcul du total
  const totalCommande = items.reduce((acc: number, item: any) => acc + (item.price * item.quantite), 0);

  // --- FONCTION DE PAIEMENT ---
  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirection magique vers Stripe
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Erreur lors de la création de la session");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Oups ! La connexion avec Stripe a échoué.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white font-sans">
        <p className="text-6xl mb-6">🦄</p>
        <h1 className="text-2xl font-black uppercase mb-4 text-gray-900 tracking-tighter">Ton panier est vide</h1>
        <Link href="/boutique" className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg hover:bg-black transition-all">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-40 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLONNE GAUCHE : INFOS */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-purple-50">
          {mode === 'choix' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Paiement sécurisé</h2>
              <div className="grid gap-4">
                <button onClick={() => setMode('invite')} className="w-full border-2 border-gray-100 p-8 rounded-3xl text-left hover:border-purple-600 hover:bg-purple-50/30 transition-all">
                  <p className="font-black uppercase text-xs tracking-widest mb-1">Commander en invité</p>
                  <p className="text-gray-400 text-xs italic">Pas de compte, juste la magie.</p>
                </button>
                <button onClick={() => setMode('compte')} className="w-full bg-gray-900 text-white p-8 rounded-3xl text-left hover:bg-purple-600 transition-all">
                  <p className="font-black uppercase text-xs tracking-widest mb-1">Se connecter</p>
                  <p className="text-purple-200 text-xs italic">Accède à tes points fidélité.</p>
                </button>
              </div>
            </div>
          )}

          {(mode === 'invite' || mode === 'compte') && (
            <div className="animate-in fade-in zoom-in duration-300">
              <button onClick={() => setMode('choix')} className="text-[10px] font-black uppercase text-gray-400 mb-8 hover:text-purple-600">← Retour</button>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">{mode === 'invite' ? "Livraison" : "Connexion"}</h2>
              
              <form onSubmit={handleStripeCheckout} className="space-y-6">
                <input required type="email" placeholder="email@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 focus:border-purple-300 text-sm" />
                
                <button disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
                  {loading ? "Chargement..." : `Payer — ${totalCommande} €`}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* COLONNE DROITE : RÉSUMÉ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="font-black uppercase text-[10px] tracking-[0.3em] text-gray-400 mb-6">Ton Panier</h3>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-center">
                  <img src={item.image} className="w-12 h-16 object-cover rounded-lg border border-gray-100" />
                  <div className="flex-1">
                    <p className="font-bold text-[11px] text-gray-900 leading-tight uppercase">{item.name}</p>
                    <p className="text-[9px] text-gray-400 font-black mt-1">TAILLE {item.taille} (x{item.quantite})</p>
                  </div>
                  <p className="font-black text-sm">{item.price * item.quantite} €</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-50">
              <div className="flex justify-between items-end">
                <span className="font-black uppercase text-xs tracking-widest text-gray-900">Total TTC</span>
                <span className="text-3xl font-black text-purple-600">{totalCommande} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}