"use client";

interface CheckoutProps {
  productName: string;
  price: number;
}

export default function CheckoutButton({ productName, price }: CheckoutProps) {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, price }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirection directe vers la page sécurisée de Stripe
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Erreur Stripe:", error);
      alert("La magie a eu un petit raté, réessaye !");
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      className="bg-black text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-xl active:scale-95"
    >
      Acheter maintenant — {price}€ ✨
    </button>
  );
}