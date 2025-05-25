import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Reservation from '../models/Reservation.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('❌ Signature Stripe invalide :', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      try {
        // 🔍 Vérifie si la réservation existe déjà
        const existing = await Reservation.findOne({ stripeSessionId: session.id });
        if (existing) {
          console.log('🔁 Réservation déjà enregistrée, on ignore.');
          return res.status(200).send('Déjà traité');
        }

        // ✅ Crée une nouvelle réservation
        const reservation = new Reservation({
          voiture: session.metadata.voitureId,
          utilisateur: session.metadata.utilisateurId,
          dateDebut: session.metadata.dateDebut,
          dateFin: session.metadata.dateFin,
          prix: session.amount_total / 100,
          stripeSessionId: session.id,
        });

        await reservation.save();
        console.log('✅ Réservation enregistrée via Stripe webhook');
      } catch (error) {
        console.error('❌ Erreur lors de la création :', error);
        return res.status(500).send('Erreur serveur');
      }
    }

    res.status(200).json({ received: true });
  }
);

export default router;
