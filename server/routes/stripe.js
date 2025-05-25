import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { voiture, dateDebut, dateFin, prix, utilisateurId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Réservation : ${voiture.nom}`,
              description: `Du ${dateDebut} au ${dateFin}`,
            },
            unit_amount: prix * 100, // en centimes
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/confirmation`,
      cancel_url: `http://localhost:3000/annulation`,
      metadata: {
        voitureId: voiture._id,
        utilisateurId,
        dateDebut,
        dateFin,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Erreur Stripe :', err);
    res.status(500).json({ error: 'Erreur de création de session de paiement.' });
  }
});

export default router;