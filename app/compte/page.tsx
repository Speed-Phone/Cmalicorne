"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'commandes' | 'profil'>('commandes');
  const router = useRouter();

  // 1. RÉCUPÉRER L'UTILISATEUR CONNECTÉ
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login'); // Si pas connecté, hop, retour au login
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  // 2. FONCTION DE DÉCONNEXION RÉELLE
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center italic text-purple-600 font-bold animate-pulse">
      Magie en cours... 🦄
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pt-44 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 italic">
            Mon Espace <span className="text-purple-600">Privé</span>
          </h1>
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Bienvenue, {user?.email}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* MENU LATÉRAL */}
          <aside className="w-full lg:w-72 space-y-3">
            <button 
              onClick={() => setTab('commandes')}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm ${tab === 'commandes' ? 'bg-black text-white scale-105' : 'bg-white text-gray-400 hover:bg-purple-50'}`}
            >
              📦 Mes Commandes
            </button>
            <button 
              onClick={() => setTab('profil')}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-sm ${tab === 'profil' ? 'bg-black text-white scale-105' : 'bg-white text-gray-400 hover:bg-purple-50'}`}
            >
              👤 Profil & Sécurité
            </button>
            
            <div className="pt-8">
              <button 
                onClick={handleLogout}
                className="w-full text-center px-8 py-4 rounded-2xl font-black uppercase text-[9px] tracking-widest text-red-500 border border-red-100 hover:bg-red-50 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </aside>

          {/* CONTENU DYNAMIQUE */}
          <div className="flex-1">
            {tab === 'commandes' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 text-center lg:text-left">Historique des achats</h2>
                
                {/* Message si aucune commande */}
                <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                  <p className="text-4xl mb-4">🛍️</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tu n'as pas encore passé de commande magique.</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-purple-50 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-10">Tes Informations</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 mb-2">Email du compte</label>
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900">
                      {user?.email}
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-400 italic">Tes informations de livraison seront demandées lors de ta prochaine commande.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}