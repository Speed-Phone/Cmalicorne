import Link from 'next/link';

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-purple-600 text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-70 transition-all mb-12 inline-block">
          ← Retour à l'univers
        </Link>
        
        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-16 leading-none">
          Politique de <br /><span className="text-purple-600">Confidentialité</span>
        </h1>

        <div className="space-y-12 text-gray-600 text-sm leading-relaxed">
          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">1. Collecte des données</h2>
            <p>Nous collectons les informations nécessaires au traitement de vos commandes (nom, adresse, email). Vos coordonnées bancaires ne sont jamais stockées sur nos serveurs et sont traitées directement par <strong>Stripe</strong>.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">2. Utilisation</h2>
            <p>Vos données servent uniquement à la gestion de vos achats, à la livraison et, si vous y avez consenti, à l'envoi de notre newsletter.</p>
          </section>

          <section className="border-l-2 border-purple-50 pl-8">
            <h2 className="text-gray-900 font-black uppercase tracking-widest text-[11px] mb-4">3. Vos Droits (RGPD)</h2>
            <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour toute demande, contactez-nous par email à : [Ton Email Pro].</p>
          </section>
        </div>
      </div>
    </main>
  );
}