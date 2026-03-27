import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-10">
        
        {/* L'ICÔNE MAGIQUE */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-purple-200 blur-3xl opacity-30 rounded-full scale-150"></div>
          <span className="relative text-6xl animate-bounce inline-block">🦄</span>
        </div>

        {/* MESSAGE DE SUCCÈS */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Commande <br />
            <span className="text-purple-600 italic">Confirmée</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
            La magie est en route vers toi.
          </p>
        </div>

        {/* DÉTAILS DE RÉASSURANCE */}
        <div className="bg-gray-50 rounded-3xl p-8 space-y-6 border border-purple-50">
          <p className="text-gray-600 text-sm leading-relaxed">
            Merci d'avoir rejoint l'univers <span className="font-black text-purple-600">Cmalicorne</span>. 
            Un email de confirmation vient d'être envoyé à ton adresse avec les détails de ton rituel de mode.
          </p>
          
          <div className="pt-4 border-t border-purple-100">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Numéro de commande</p>
            <p className="text-sm font-mono font-bold text-gray-900">#CM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/boutique" 
            className="bg-black text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95"
          >
            Continuer l'exploration
          </Link>
          <Link 
            href="/" 
            className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-purple-600 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* SIGNATURE DISCRÈTE */}
        <p className="pt-12 text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">
          © 2026 Cmalicorne — Design par Kendrick Callé 🦄
        </p>
      </div>
    </main>
  );
}