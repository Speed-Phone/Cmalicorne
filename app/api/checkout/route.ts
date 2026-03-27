import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // On prépare les articles pour Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.name} - Taille ${item.taille}`,
        },
        unit_amount: Math.round(item.price * 100), // Conversion en centimes
      },
      quantity: item.quantite,
    }));

    // Création de la session de paiement
    // ... (garde le début pareil)
    const session = await stripe.checkout.sessions.create({
      // ... (tes paramètres)
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/boutique`,
    });

    // CHANGE ICI : renvoie l'url directement
    return NextResponse.json({ url: session.url }); 
// ...

  } catch (err: any) {
    console.error("Erreur Stripe:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}