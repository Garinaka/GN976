import express from 'express';
import {
  ajouterVoiture,
  listerVoitures,
  rechercherVoituresDisponibles,
  mettreAJourImagesVoiture
} from '../controllers/carController.js';
import Car from '../models/Car.js';  // Pour la suppression directe
import { isAdmin } from '../middleware/authMiddleware.js';  // Middleware pour vérifier les droits d'administrateur

const router = express.Router();

// ➕ Ajouter une voiture
router.post('/ajouter', ajouterVoiture);

// 📋 Lister toutes les voitures
router.get('/liste', async (req, res) => {
  try {
    const { marque, annee, tarifMax, equipments } = req.query;
    const filters = {};

    if (marque) filters.marque = { $regex: marque, $options: 'i' };
    if (annee) filters.annee = Number(annee);
    if (tarifMax) filters.tarif = { $lte: Number(tarifMax) };
    if (equipments && equipments.length > 0) {
      filters.equipments = { $all: equipments.split(',') };
    }

    const cars = await Car.find(filters);
    res.json(cars);
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures filtrées', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔍 Rechercher selon dates
router.get('/rechercher', rechercherVoituresDisponibles);

// 🖼 Modifier les images
router.put('/:id/images', mettreAJourImagesVoiture);

// 🗑 Supprimer une voiture
router.delete('/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Voiture supprimée ✅' });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression ❌" });
  }
});

export default router;
