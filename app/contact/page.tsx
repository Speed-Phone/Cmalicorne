"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnvoye(true);
    // On simule l'envoi
    setTimeout(() => setEnvoye(false), 5000);
  };

  return (
    <main className="min-h-screen bg-white pt-44 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* GAUCHE : INFOS */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 italic mb-6">
                Contacte <span className="text-purple-600">la team</span>
              </h1>
              <p className="text-gray-500 font-medium leading-relaxed max-w-md">
                Une question sur une taille ? Un projet spécial ou juste envie de nous envoyer de la magie ? On te répond en moins de 24h.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">✉️</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Officiel</p>
                  <p className="font-bold text-gray-900">contact@cmalicorne.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📸</div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Instagram</p>
                  <p className="font-bold text-gray-900">@c.malicorne_officiel</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2.5rem] text-white shadow-xl shadow-purple-100">
              <p className="font-black uppercase text-[10px] tracking-[0.3em] mb-4 opacity-80">Note de Kendrick</p>
              <p className="italic font-medium leading-relaxed text-sm">
                "Chaque commande est préparée avec soin. Si tu as le moindre doute, écris-moi directement ici."
              </p>
            </div>
          </div>

          {/* DROITE : FORMULAIRE */}
          <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100 relative overflow-hidden">
            {envoye ? (
              <div className="py-20 text-center animate-in zoom-in duration-500">
                <p className="text-6xl mb-6">✨</p>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Message envoyé !</h2>
                <p className="text-gray-500 text-sm italic">La magie est en route vers notre boîte mail.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Nom</label>
                  <input required type="text" placeholder="Kendrick Callé" className="w-full bg-white border-none rounded-2xl px-6 py-4 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Email</label>
                  <input required type="email" placeholder="magie@exemple.com" className="w-full bg-white border-none rounded-2xl px-6 py-4 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Ton Message</label>
                  <textarea required rows={4} placeholder="Raconte-nous tout..." className="w-full bg-white border-none rounded-2xl px-6 py-4 shadow-sm focus:ring-2 focus:ring-purple-300 outline-none transition-all resize-none"></textarea>
                </div>

                <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-lg hover:bg-purple-600 transition-all active:scale-95">
                  Envoyer le message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}