"use client";
import { useCart } from './CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { ajouterAuPanier } = useCart();

  return (
    <div className="group relative">
      <div className="aspect-[3/4] overflow-hidden rounded-[2rem] bg-gray-100 mb-6 border border-gray-50 transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <button 
          onClick={() => ajouterAuPanier(product, "M")} // On utilise ajouterAuPanier
          className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest opacity-0 translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0 hover:bg-black hover:text-white"
        >
          Ajouter au panier +
        </button>
      </div>

      <div className="px-2">
        <h3 className="text-sm font-black uppercase tracking-tight text-gray-900 mb-1">
          {product.name}
        </h3>
        <p className="text-purple-600 font-black text-lg">{product.price} €</p>
      </div>
    </div>
  );
}