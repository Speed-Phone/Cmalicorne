"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartContext';

export default function CheckoutPage() {
  // On ne récupère que 'items' du panier
  const { items } = useCart(); 
  const [mode, setMode] = useState<'choix' | 'invite' | 'compte'>('choix');
  const [email, setEmail] = useState("");

  // On calcule le total localement pour éviter les erreurs
  const totalCommande = items.reduce((acc: number, item: any) => acc + (item.price * item.quantite), 0);

  const handleValidation = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Merci ! Une confirmation et ta facture seront envoyées à : ${email}`);
    window.location.href = "/"; 
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
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
        
        {/* COLONNE GAUCHE (8 colonnes sur 12) */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-purple-50">
          {mode === 'choix' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">Paiement rapide</h2>
                <p className="text-gray-400 text-sm font-medium">Choisis comment tu souhaites finaliser ta commande.</p>
              </div>
              
              <div className="grid gap-4">
                <button 
                  onClick={() => setMode('invite')}
                  className="w-full border-2 border-gray-100 p-8 rounded-3xl text-left hover:border-purple-600 hover:bg-purple-50/30 transition-all group relative overflow-hidden"
                >
                  <p className="font-black uppercase text-xs tracking-widest mb-1 group-hover:text-purple-600">Commander en invité</p>
                  <p className="text-gray-400 text-xs italic">Pas besoin de mot de passe, juste ton mail.</p>
                </button>

                <button 
                  onClick={() => setMode('compte')}
                  className="w-full bg-gray-900 text-white p-8 rounded-3xl text-left hover:bg-purple-600 transition-all shadow-xl"
                >
                  <p className="font-black uppercase text-xs tracking-widest mb-1">Se connecter / S'inscrire</p>
                  <p className="text-purple-200 text-xs italic">Gagne des points magie et suis ton colis.</p>
                </button>
              </div>
            </div>
          )}

          {(mode === 'invite' || mode === 'compte') && (
            <div className="animate-in fade-in zoom-in duration-300">
              <button onClick={() => setMode('choix')} className="text-[10px] font-black uppercase text-gray-400 mb-8 hover:text-purple-600 flex items-center gap-2">
                <span>←</span> Retour aux choix
              </button>
              
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">
                {mode === 'invite' ? "Infos de livraison" : "Connexion membre"}
              </h2>
              
              <form onSubmit={handleValidation} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Ton Adresse Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="kendrick@magie.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm font-medium"
                  />
                </div>
                
                {mode === 'compte' && (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 focus:outline-none focus:border-purple-300 focus:bg-white transition-all text-sm"
                    />
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] shadow-2xl shadow-purple-200 mt-8 hover:scale-[1.02] transition-transform active:scale-95">
                  Confirmer et recevoir ma facture
                </button>
              </form>
            </div>
          )}
        </div>

        {/* COLONNE DROITE (4 colonnes sur 12) : RÉSUMÉ */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-black uppercase text-[10px] tracking-[0.3em] text-gray-400">Ton Récapitulatif</h3>
          
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6 mb-8 custom-scrollbar">
              {items.map((item: any) => (
                <div key={`${item.id}-${item.taille}`} className="flex gap-4 items-center">
                  <div className="relative">
                    <img src={item.image} className="w-16 h-20 object-cover rounded-xl border border-gray-50" />
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black">
                      {item.quantite}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xs text-gray-900 leading-tight">{item.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-black mt-1">Taille {item.taille}</p>
                  </div>
                  <p className="font-black text-sm text-gray-900">{item.price * item.quantite} €</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-50 space-y-4">
              <div className="flex justify-between text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <span>Livraison</span>
                <span className="text-green-500">Gratuite ✨</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="font-black uppercase text-xs tracking-widest text-gray-900">Total TTC</span>
                <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                  {totalCommande} €
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-4">
            <span className="text-2xl">🛡️</span>
            <p className="text-[10px] text-purple-800 font-bold uppercase leading-relaxed tracking-tighter">
              Paiement 100% sécurisé via SSL. Vos données magiques sont protégées.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}