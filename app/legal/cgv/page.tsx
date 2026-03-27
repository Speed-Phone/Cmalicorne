import Link from 'next/link';

export default function CGV() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-all mb-12 inline-block">
          ← Retour à l'univers
        </Link>
        
        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-16 leading-none">
          Conditions <br /><span className="text-purple-600">Générales de Vente</span>
        </h1>

        <div className="space-y-12 text-gray-600 text-sm leading-relaxed">
          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Article 1 : Objet</h2>
            <p>Les présentes CGV régissent les ventes de produits de mode et accessoires sur la boutique en ligne <strong>Cmalicorne</strong>. Toute commande passée sur le site implique l'adhésion totale du client aux présentes conditions.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Article 2 : Prix et Paiement</h2>
            <p>Les prix sont indiqués en Euros TTC. Le paiement est sécurisé et s'effectue via la plateforme <strong>Stripe</strong> par carte bancaire. Les produits restent la propriété de Cmalicorne jusqu'au paiement complet.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Article 3 : Livraison</h2>
            <p>Les produits sont livrés à l'adresse indiquée par le client. Cmalicorne s'engage à expédier les commandes dans les meilleurs délais, mais ne peut être tenu responsable des retards liés au transporteur.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8 text-gray-900 bg-purple-50/30 p-8 rounded-r-xl">
            <h2 className="font-black uppercase tracking-widest text-[11px] mb-4">Article 4 : Rétractation (Loi Hamon)</h2>
            <p>Conformément à la loi, vous disposez d'un délai de <strong>14 jours</strong> calendaires à compter de la réception pour nous retourner un article. L'article doit être dans son état d'origine (non porté, non lavé) avec ses étiquettes. Les frais de retour sont à la charge de l'acheteur.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">Article 5 : Responsabilité</h2>
            <p>La marque Cmalicorne décline toute responsabilité en cas de mauvaise utilisation des produits ou de dommages indirects liés à l'achat.</p>
          </section>
        </div>
      </div>
    </main>
  );
}