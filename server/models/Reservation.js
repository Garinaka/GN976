import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    voiture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    assurance: {
      type: String,
      default: 'Responsabilité civile',
    },
    assurancePrix: {
      type: Number,
      default: 0,
    },
    stripeSessionId: {
      type: String,
    },
    etat: {
      type: String,
      enum: ['en attente', 'confirmée', 'annulée'],
      default: 'confirmée', // ou "en attente" si tu veux approuver manuellement
    },
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
