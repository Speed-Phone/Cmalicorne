import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover' as any, 
});

// C'est le secret que Stripe te donnera pour ton Webhook
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text(); // On récupère le corps brut
  const sig = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // VÉRIFICATION : Est-ce que ce message vient vraiment de Stripe ?
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`❌ Erreur de signature: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // 2. Si la vérification passe, on traite l'événement
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // --- ICI TU FAIS TA MAGIE ---
    // 1. Mettre à jour ta base de données (ex: statut "payé")
    // 2. Envoyer un mail de confirmation
    // 3. Vider le panier du client (si besoin)
    
    console.log(`✅ Paiement réussi pour la session : ${session.id}`);
  }

  return NextResponse.json({ received: true });
}