import mongoose from 'mongoose';

const partenaireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },  // URL du logo
  siteWeb: { type: String, required: true }, // URL du site web
  actif: { type: Boolean, default: true }, // Définir si le partenaire est actif ou non
}, { timestamps: true });

const Partenaire = mongoose.model('Partenaire', partenaireSchema);
export default Partenaire;
