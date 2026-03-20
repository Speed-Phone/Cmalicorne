"use client";
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [chargement, setChargement] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChargement(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push('/compte'); // Redirection vers le profil
      router.refresh();
    }
    setChargement(false);
  };

  const handleSignUp = async () => {
    setChargement(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("Vérifie tes emails ou connecte-toi si la confirmation est désactivée ! ✨");
    setChargement(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-sm">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-purple-600">C. Malicorne</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Rejoins la magie</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-purple-300 outline-none transition-all text-sm"
          />
          <input 
            type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-purple-300 outline-none transition-all text-sm"
          />
          
          <button type="submit" disabled={chargement} className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-purple-600 transition-all active:scale-95 disabled:opacity-50">
            {chargement ? 'Magie en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="flex flex-col gap-3">
          <button onClick={handleSignUp} className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-purple-50 transition-all">
            Créer un compte
          </button>
          <Link href="/" className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest hover:text-purple-600">Retour à la boutique</Link>
        </div>
      </div>
    </main>
  );
}