"use client";
import { useCart } from './CartContext';

export default function ProductCard({ product }: { product: any }) {
  // ON UTILISE LE BON NOM ICI :
  const { ajouterAuPanier } = useCart(); 

  const price = parseFloat(product.price);
  const image = product.images[0]?.src || '/placeholder.png';

  return (
    // ... reste du code ...
    <button 
      onClick={() => ajouterAuPanier({
        id: product.id,
        name: product.name,
        price: price,
        image: image
      }, "M")} // On ajoute la taille par défaut
      className="..."
    >
      Ajouter au panier +
    </button>
  );
}