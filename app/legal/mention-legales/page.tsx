import Link from 'next/link';

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-all mb-12 inline-block">
          ← Retour à l'univers
        </Link>
        
        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-16 leading-none">
          Mentions <br /><span className="text-purple-600">Légales</span>
        </h1>

        <div className="space-y-12 text-gray-600 text-sm leading-relaxed">
          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Édition du site</h2>
            <p>Le site <span className="text-purple-600 font-bold">Cmalicorne</span> est édité par :</p>
            <div className="mt-4 space-y-1">
              <p className="font-bold text-gray-900">[Ton Nom ou Nom Entreprise]</p>
              <p>[Statut : Entrepreneur Individuel / SAS / etc.]</p>
              <p>Siège social : [Ton Adresse Complète]</p>
              <p>SIRET : [Ton SIRET]</p>
              <p>Contact : [Ton Email Pro]</p>
            </div>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Hébergement</h2>
            <p>Le site est hébergé par la société <strong>Vercel Inc.</strong></p>
            <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Propriété Intellectuelle</h2>
            <p>L'intégralité du site Cmalicorne (structure, textes, logos, photographies, créations textiles) est protégée par les lois en vigueur sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord écrit préalable.</p>
          </section>
        </div>
      </div>
    </main>
  );
}