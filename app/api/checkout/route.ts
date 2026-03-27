import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Données reçues du client :", body); // Ça s'affichera dans tes logs Netlify

    // On récupère les infos. Si c'est vide, on met des valeurs par défaut pour éviter le crash.
    const productName = body.productName || "Article Cmalicorne ✨";
    const price = body.price || 45; // On met 45 par défaut si rien n'est reçu

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
            },
            unit_amount: Math.round(price * 100), // En centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/boutique`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur Stripe :", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}