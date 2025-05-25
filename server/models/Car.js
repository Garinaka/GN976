import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  marque: { type: String, required: true },
  modele: { type: String, required: true },
  annee: { type: Number, required: true },
  tarif: { type: Number, required: true },
  localisation: { type: String, required: true },
  proprietaire: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  images: { type: [String], default: [] }, // ✅ tableau de photos
  categorie: { type: String, required: true }, // ex: "citadine", "SUV"
  valeur: { type: Number, required: false },    // Rendre 'valeur' optionnel
  equipments: { type: [String], default: [] }, // ✅ tableau pour les équipements sélectionnés
  validé: { type: Boolean, default: false },  // ✅ champ pour la validation
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;
