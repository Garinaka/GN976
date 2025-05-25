import express from 'express';
import Partenaire from '../models/Partenaire.js';
import { isAdmin } from '../middleware/authMiddleware.js';  // Vérifier les droits administrateur

const router = express.Router();

// ➕ Ajouter un partenaire
router.post('/ajouter', isAdmin, async (req, res) => {
  try {
    const { nom, description, logo, siteWeb } = req.body;

    // Créer un nouveau partenaire
    const partenaire = new Partenaire({
      nom,
      description,
      logo,
      siteWeb
    });

    await partenaire.save();
    res.status(201).json({ message: 'Partenaire ajouté avec succès', partenaire });
  } catch (error) {
    console.error('❌ Erreur ajout partenaire :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🗑 Supprimer un partenaire (uniquement pour les admins)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const partenaire = await Partenaire.findByIdAndDelete(req.params.id);
    if (!partenaire) {
      return res.status(404).json({ message: 'Partenaire non trouvé' });
    }
    res.status(200).json({ message: 'Partenaire supprimé avec succès' });
  } catch (error) {
    console.error('❌ Erreur suppression partenaire :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🖼 Afficher tous les partenaires
router.get('/liste', async (req, res) => {
  try {
    const partenaires = await Partenaire.find({ actif: true });
    res.status(200).json(partenaires);
  } catch (error) {
    console.error('❌ Erreur récupération partenaires :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

export default router;
