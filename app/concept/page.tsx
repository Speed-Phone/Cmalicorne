"use client";
import Link from 'next/link';

export default function Concept() {
  return (
    <main className="min-h-screen bg-white font-sans antialiased pt-20">
      
      {/* Section 1 : Hero Concept */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent italic">
          Au-delà du vêtement
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
          C. Malicorne n'est pas une simple boutique. C'est un portail vers un quotidien où la magie est réelle.
        </p>
      </section>

      {/* Section 2 : Tes Photos & Ton Récit */}
      <section className="py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
        
        {/* Grille pour les deux photos (concept.png et concept2.png) */}
        <div className="relative flex flex-col items-center md:items-start">
          {/* Première photo (Le Stand) */}
          <div className="relative w-4/5 aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500 border-8 border-white z-0">
            <img 
              src="/concept.png" 
              alt="Notre Stand C. Malicorne" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Deuxième photo (Licorne Quad) - Elle chevauche la première */}
          <div className="relative w-3/5 aspect-square rounded-3xl overflow-hidden shadow-2xl -mt-32 ml-auto md:ml-32 rotate-[5deg] hover:rotate-0 transition-transform duration-500 border-8 border-white z-10">
            <img 
              src="/concept2.png" 
              alt="Licorne Quad" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Le Texte */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tight text-gray-800 underline decoration-purple-500 underline-offset-8">
            L'origine du Sortilège
          </h2>
          <p className="text-gray-600 leading-loose text-lg">
            Tout a commencé par une envie simple : celle de ne plus choisir entre l'élégance et le fantastique. Nos pièces sont conçues pour ceux qui gardent les yeux ouverts sur l'invisible, pour les rêveurs urbains et les esprits libres.
          </p>
          <div className="h-px w-20 bg-gradient-to-r from-pink-400 to-purple-500"></div>
          <p className="text-gray-600 leading-loose text-lg">
            Chaque textile est sélectionné pour ses reflets, chaque coupe pour son mouvement. Porter du C. Malicorne, c'est porter une armure de lumière, une célébration de votre propre éclat magique.
          </p>
        </div>
      </section>

      {/* Section 3 : Les Valeurs */}
      <section className="py-24 bg-purple-50/50 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-purple-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl mb-6 block">✨</span>
            <h3 className="font-bold uppercase mb-4 text-purple-600 tracking-widest text-xs">Matières Éthérées</h3>
            <p className="text-gray-500 text-sm">Nous privilégions des tissus aux reflets changeants et aux textures sensorielles.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-purple-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl mb-6 block">🦄</span>
            <h3 className="font-bold uppercase mb-4 text-purple-600 tracking-widest text-xs">Fait avec Amour</h3>
            <p className="text-gray-500 text-sm">Pas de surproduction. Nos collections sont des éditions limitées, presque rares.</p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-purple-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl mb-6 block">🔮</span>
            <h3 className="font-bold uppercase mb-4 text-purple-600 tracking-widest text-xs">Vision Unique</h3>
            <p className="text-gray-500 text-sm">Un design qui mêle le streetwear moderne et les légendes oubliées.</p>
          </div>
        </div>
      </section>

      {/* Section 4 : Appel à l'action */}
      <section className="py-32 text-center px-6">
        <h2 className="text-4xl font-black uppercase mb-8 text-gray-800">Prêt à briller ?</h2>
        <Link 
          href="/" 
          className="inline-block bg-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl transition-all duration-300 hover:bg-purple-600 hover:scale-105 active:scale-95"
        >
          Retourner à la boutique
        </Link>
      </section>

    </main>
  );
}