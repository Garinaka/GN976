import Reservation from '../models/Reservation.js';
import Car from '../models/Car.js';
import { sendConfirmationEmail, sendEmailAuProprietaire } from '../utils/sendEmail.js';

export const creerReservation = async (req, res) => {
  const { voiture, utilisateur, dateDebut, dateFin } = req.body;

  try {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    // Vérification si le véhicule est déjà réservé pendant la période demandée
    const conflit = await Reservation.findOne({
      voiture,
      $or: [
        { dateDebut: { $lt: fin }, dateFin: { $gt: debut } }
      ]
    });

    if (conflit) {
      return res.status(400).json({ message: 'Ce véhicule est déjà réservé sur cette période ❌' });
    }

    // Récupérer le véhicule et le marquer comme indisponible
    const voitureDetails = await Car.findById(voiture);
    voitureDetails.disponible = false; // Le véhicule devient indisponible
    await voitureDetails.save();

    // Créer la réservation
    const reservation = new Reservation({ voiture, utilisateur, dateDebut: debut, dateFin: fin });
    await reservation.save();

    // Envoyer des emails de confirmation
    await sendConfirmationEmail(utilisateur, voitureDetails, debut, fin);
    await sendEmailAuProprietaire(voitureDetails.proprietaire, voitureDetails, utilisateur, debut, fin);

    res.status(201).json({ message: 'Réservation réussie ✅', reservation });
  } catch (error) {
    console.error('❌ Erreur création réservation :', error.message);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const getReservationsUtilisateur = async (req, res) => {
  const { utilisateur } = req.query;

  try {
    const reservations = await Reservation.find({ utilisateur }).populate('voiture');
    res.status(200).json(reservations);
  } catch (error) {
    console.error('❌ Erreur chargement réservations :', error.message);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Nouvelle fonction pour marquer un véhicule comme disponible après la fin de la réservation
export const retourReservation = async (req, res) => {
  const { reservationId } = req.params;

  try {
    // Récupérer la réservation
    const reservation = await Reservation.findById(reservationId).populate('voiture');
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }

    // Récupérer le véhicule associé à la réservation
    const voiture = reservation.voiture;
    voiture.disponible = true; // Le véhicule devient disponible
    await voiture.save();

    // Supprimer la réservation ou mettre à jour son statut
    await reservation.remove(); // Si tu veux supprimer la réservation après son retour

    res.status(200).json({ message: 'Véhicule marqué comme disponible et réservation supprimée' });
  } catch (error) {
    console.error('❌ Erreur retour réservation :', error.message);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
