import Car from '../models/Car.js';
import Reservation from '../models/Reservation.js';

// ➕ Ajouter une voiture
export const ajouterVoiture = async (req, res) => {
  try {
    const voiture = new Car(req.body);
    await voiture.save();
    res.status(201).json({ message: 'Voiture ajoutée avec succès ✅', voiture });
  } catch (error) {
    console.error('❌ Erreur ajout voiture :', error.message);
    res.status(500).json({ message: 'Erreur serveur ❌', error: error.message });
  }
};

// 📋 Lister toutes les voitures
export const listerVoitures = async (req, res) => {
  try {
    const voitures = await Car.find().sort({ createdAt: -1 });
    res.status(200).json(voitures);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur ❌', error: error.message });
  }
};

// 🔍 Rechercher les voitures disponibles (en fonction des dates)
export const rechercherVoituresDisponibles = async (req, res) => {
  const { dateDebut, heureDebut, dateFin, heureFin } = req.query;

  if (!dateDebut || !dateFin || !heureDebut || !heureFin) {
    return res.status(400).json({ message: 'Paramètres date/heure manquants' });
  }

  try {
    const debut = new Date(`${dateDebut}T${heureDebut}`);
    const fin = new Date(`${dateFin}T${heureFin}`);

    if (debut >= fin) {
      return res.status(400).json({ message: 'La date de fin doit être après la date de début.' });
    }

    // Trouver les réservations qui se chevauchent avec la période demandée
    const reservations = await Reservation.find({
      $or: [
        {
          dateDebut: { $lt: fin },
          dateFin: { $gt: debut }
        }
      ]
    });

    const idsIndisponibles = reservations.map(r => r.voiture.toString());

    // Retourner uniquement les voitures non réservées
    const voituresDisponibles = await Car.find({
      _id: { $nin: idsIndisponibles },
      disponible: true
    });

    res.status(200).json(voituresDisponibles);
  } catch (error) {
    console.error('❌ Erreur recherche dispo :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export const mettreAJourImagesVoiture = async (req, res) => {
  try {
    const voitureId = req.params.id;
    const { images } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      voitureId,
      { images },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Véhicule introuvable" });
    }

    res.json(updatedCar);
  } catch (err) {
    console.error("❌ Erreur mise à jour des images :", err);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour des images." });
  }
};
