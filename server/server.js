import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import stripeRoutes from './routes/stripe.js';
import stripeWebhook from './routes/stripeWebhook.js';
import uploadRoutes from './routes/uploadRoutes.js'; // ✅ ajout de la route pour les uploads

// Configuration de dotenv pour charger les variables d'environnement
dotenv.config();
console.log('🧪 URI lue :', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;  // Port par défaut 5000

// Stripe Webhook
// Utilisé pour recevoir les événements de Stripe (avant l'utilisation d'express.json)
app.use('/api/stripe/webhook', stripeWebhook);

// Middleware pour gérer les requêtes
app.use(cors());  // Permet les requêtes CORS
app.use(express.json());  // Middleware pour analyser les données JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Middleware pour analyser les données des formulaires HTML

// 👉 Statique pour les images
// Cela permet de servir les images stockées dans le dossier 'uploads'
app.use('/uploads', express.static('uploads'));

// Routes de l'application
app.use('/auth', authRoutes);  // Routes d'authentification
app.use('/voitures', carRoutes);  // Routes des voitures
app.use('/reservations', reservationRoutes);  // Routes des réservations
app.use('/api/stripe', stripeRoutes);  // Routes pour gérer Stripe
app.use('/api/upload', uploadRoutes);  // ✅ Route pour l'upload des images

// Connexion à MongoDB
console.log('Tentative de connexion à MongoDB...');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connecté avec succès');
  app.listen(PORT, () => console.log(`🚀 Serveur en cours sur le port ${PORT}`));
})
.catch((err) => {
  console.error('❌ Erreur MongoDB :', err.message);
  process.exit(1);  // Arrêter le processus si la connexion échoue
});
