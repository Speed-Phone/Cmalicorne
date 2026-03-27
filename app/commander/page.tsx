import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    // On récupère l'objet { items } envoyé par ton frontend
    const { items } = await req.json();

    // Sécurité : si le panier est vide
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 });
    }

    // On transforme tes items en "line_items" pour Stripe
    const line_items = items.map((item: any) => {
      // Nettoyage du prix pour être sûr que c'est un nombre
      const unitAmount = Math.round(parseFloat(item.price) * 100);

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name.toUpperCase(), // On met en majuscule pour le style Cmalicorne
            images: item.image ? [item.image] : [],
            description: `Taille: ${item.taille}`, // On ajoute la taille dans la description Stripe
          },
          unit_amount: unitAmount,
        },
        // IMPORTANT : Ton code utilise "quantite" avec un 'e'
        quantity: item.quantite || 1, 
      };
    });

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/boutique`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("Erreur Stripe détaillée:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}