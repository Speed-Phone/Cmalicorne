import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const origin = req.headers.get('origin') || 'https://cmalicorne.netlify.app';

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    const line_items = items.map((item: any) => {
      const unitAmount = Math.round(parseFloat(item.price) * 100);

      // --- LE FIX TYPESCRIPT ICI ---
      // On dit explicitement que c'est un tableau de chaines de caractères
      let stripeImage: string[] = []; 
      
      if (item.image) {
        const fullImageUrl = item.image.startsWith('http') 
          ? item.image 
          : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
        stripeImage = [fullImageUrl];
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name.toUpperCase(),
            images: stripeImage,
            description: `Taille: ${item.taille || 'Unique'}`,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantite || 1, 
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/commander`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Erreur Stripe détaillée:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}