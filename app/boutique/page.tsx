"use client";
import Link from 'next/link';
import ProductCard from '../../components/ProductCard'; // On va le créer juste après

async function getProducts() {
  const res = await fetch(
    `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CK}&consumer_secret=${process.env.WC_CS}&per_page=100`,
    { next: { revalidate: 3600 } } // Ça met à jour les produits toutes les heures
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function BoutiquePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4">
            La Collection <span className="text-purple-600">Cmalicorne</span>
          </h1>
          <p className="text-gray-400 font-medium uppercase text-[10px] tracking-[0.3em]">
            {products.length} Pièces Magiques Disponibles
          </p>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}