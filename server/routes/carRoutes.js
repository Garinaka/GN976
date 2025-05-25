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
    const { marque, annee, tarifMax, equipments } = req.query;  // Récupérer les filtres depuis les paramètres de la requête

    // Construire les critères de filtrage
    const filters = {};
    if (marque) filters.marque = { $regex: marque, $options: 'i' };  // Recherche insensible à la casse
    if (annee) filters.annee = Number(annee);
    if (tarifMax) filters.tarif = { $lte: Number(tarifMax) };
    if (equipments && equipments.length > 0) {
      filters.equipments = { $all: equipments.split(',') };  // Rechercher tous les équipements correspondants
    }

    // Récupérer les voitures filtrées
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

// ✅ Valider un véhicule (accessible uniquement aux administrateurs)
router.put('/valider/:id', isAdmin, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    // Mettre à jour l'état de validation
    car.validé = true;
    await car.save();

    res.json({ message: 'Véhicule validé avec succès', car });
  } catch (error) {
    console.error('Erreur lors de la validation du véhicule', error);
    res.status(500).send('Erreur serveur');
  }
});

// 🔎 Récupérer un véhicule spécifique pour la modification (par ID)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);  // Cherche un véhicule avec cet ID
    if (!car) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }
    res.json(car);  // Si trouvé, retourne les données du véhicule
  } catch (err) {
    console.error('Erreur lors de la récupération du véhicule:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔄 Modifier un véhicule spécifique (par ID)
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { marque, modele, annee, tarif, localisation, proprietaire, categorie, images } = req.body;

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Véhicule non trouvé' });
    }

    // Mettre à jour les champs du véhicule
    car.marque = marque || car.marque;
    car.modele = modele || car.modele;
    car.annee = annee || car.annee;
    car.tarif = tarif || car.tarif;
    car.localisation = localisation || car.localisation;
    car.proprietaire = proprietaire || car.proprietaire;
    car.categorie = categorie || car.categorie;
    car.images = images || car.images;  // Permettre la mise à jour des images

    // Sauvegarder le véhicule mis à jour
    await car.save();

    res.json({ message: 'Véhicule mis à jour avec succès', car });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du véhicule:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
