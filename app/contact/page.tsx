"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourras ajouter l'envoi réel de l'email plus tard
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <span className="text-5xl">✨</span>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900">Message <span className="text-purple-600">Envoyé</span></h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
            Ton message a bien été transmis aux astres. On te répondra très vite.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] hover:underline"
          >
            Envoyer un autre message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* COLONNE GAUCHE : INFOS */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
              Contact <br />
              <span className="text-purple-600 italic">& Support</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Une question sur une commande, un guide des tailles ou simplement envie de nous saluer ? Écris-nous, la magie commence ici.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-l-2 border-purple-50 pl-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Email</h3>
              <p className="text-gray-500 text-sm font-bold">contact@cmalicorne.fr</p>
            </div>
            <div className="border-l-2 border-purple-50 pl-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900 mb-2">Réseaux Sociaux</h3>
              <div className="flex gap-4 mt-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <a href="https://instagram.com/cmalicorne10" className="hover:text-purple-600 transition-colors">Instagram</a>
                <span>/</span>
                <a href="https://tiktok.com/@cmalicorne" className="hover:text-purple-600 transition-colors">TikTok</a>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE */}
        <div className="bg-gray-50 p-8 md:p-12 rounded-[40px] border border-purple-50 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Nom</label>
                <input required type="text" placeholder="NOM COMPLET" className="w-full bg-white border border-purple-50 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase focus:outline-none focus:border-purple-300 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Email</label>
                <input required type="email" placeholder="EMAIL@ADRESSE.COM" className="w-full bg-white border border-purple-50 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase focus:outline-none focus:border-purple-300 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Objet</label>
              <input required type="text" placeholder="Sujet de ton message" className="w-full bg-white border border-purple-50 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase focus:outline-none focus:border-purple-300 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Message</label>
              <textarea required rows={5} placeholder="Comment pouvons-nous t'aider ?" className="w-full bg-white border border-purple-50 rounded-2xl px-6 py-4 text-[10px] font-bold uppercase focus:outline-none focus:border-purple-300 transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95">
              Envoyer le message ✨
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}