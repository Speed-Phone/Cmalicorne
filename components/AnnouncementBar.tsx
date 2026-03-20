"use client";

export default function AnnouncementBar() {
  return (
    // On ajoute 'fixed top-0 left-0 z-50 h-10'
    <div className="fixed top-0 left-0 w-full h-10 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
      
      <p className="text-center text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-white relative z-10 px-4">
        ✨ Livraison offerte dès 60€ d'achat — Édition Limitée 🦄
      </p>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}