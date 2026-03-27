import ProductCard from '../../components/ProductCard';

// C'est ici que tu vas copier-coller tes produits à la main
const PRODUITS_MANUELS = [
  {
    id: 1,
    name: "LICORNE MANGA",
    price: 18,
    image: "/licorne-manga-japon.png", // Utilise tes images locales dans /public
    taille: "M"
  },
  {
    id: 2,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 3,
    name: "LICORNE MOOD NON",
    price: 18,
    image: "/licorne-mood-non.png",
    taille: "S"
  },
  {
    id: 4,
    name: "LICORNE BEACH OR SNOW",
    price: 18,
    image: "/licorne-beach-or-snow.png",
    taille: "S"
  },
  {
    id: 5,
    name: "LICORNE CALIFORNIA DREAM",
    price: 18,
    image: "/licorne-california-dream.png",
    taille: "S"
  },
  {
    id: 6,
    name: "LICORNE DAB BOY",
    price: 18,
    image: "/licorne-enfant-dab-boy.png",
    taille: "S"
  },
  {
    id: 7,
    name: "LICORNE DAB CHILDREN",
    price: 18,
    image: "/licorne-enfant-dab-children.png",
    taille: "S"
  },
  {
    id: 8,
    name: "LICORNE QUAD",
    price: 18,
    image: "/licorne-enfant-quad.png",
    taille: "S"
  },
  {
    id: 9,
    name: "LICORNE STRASS",
    price: 22,
    image: "/licorne-enfant-strass.png",
    taille: "S"
  },
  {
    id: 10,
    name: "LICORNE VAGUE A LA MER",
    price: 18,
    image: "/licorne-enfant-vague-a-la-mer.png",
    taille: "S"
  },
  {
    id: 11,
    name: "LICORNE GAMER",
    price: 18,
    image: "/licorne-gamer.png",
    taille: "S"
  },
  {
    id: 12,
    name: "LICORNE SUPERCORN",
    price: 18,
    image: "/licorne-gamer.png",
    taille: "S"
  },
  {
    id: 13,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 14,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 15,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 16,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 17,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 18,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },
  {
    id: 19,
    name: "LICORNE MONDE",
    price: 18,
    image: "/licorne-monde.png",
    taille: "S"
  },

  // Tu peux en rajouter autant que tu veux ici...
];

export default function BoutiquePage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4">
            La Collection <span className="text-purple-600">Cmalicorne</span>
          </h1>
          <p className="text-gray-400 font-medium uppercase text-[10px] tracking-[0.3em]">
            {PRODUITS_MANUELS.length} Pièces Magiques Disponibles
          </p>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {PRODUITS_MANUELS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}