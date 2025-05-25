import express from 'express';
import {
  creerReservation,
  getReservationsUtilisateur
} from '../controllers/reservationController.js';

const router = express.Router();

// 📌 POST /reservations/creer : créer une réservation
router.post('/creer', creerReservation);

// 📋 GET /reservations/utilisateur?utilisateur=email : voir les réservations d’un utilisateur
router.get('/utilisateur', getReservationsUtilisateur);

export default router;
