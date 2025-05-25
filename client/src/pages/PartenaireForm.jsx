import React, { useState } from 'react';
import axios from 'axios';

function PartenaireForm() {
  const [form, setForm] = useState({
    nom: '',
    description: '',
    logo: null,
    siteWeb: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('logo', file);
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL + '/api/upload', formData);
        setForm((prev) => ({ ...prev, logo: response.data.imageUrl }));
      } catch (err) {
        setMessage('Erreur lors du téléchargement du logo');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/partenaires/ajouter', form);
      setMessage('Partenaire ajouté avec succès');
      console.log('Réponse ajout partenaire :', response.data);
    } catch (err) {
      setMessage('Erreur lors de l’ajout du partenaire');
      console.error('Erreur ajout partenaire :', err);
    }
  };

  return (
    <div>
      <h2>Devenir Partenaire</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            placeholder="Nom de l'entreprise"
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description de votre entreprise"
          />
        </div>
        <div>
          <label>Logo :</label>
          <input type="file" name="logo" onChange={handleLogoUpload} />
        </div>
        <div>
          <label>Site Web :</label>
          <input
            type="url"
            name="siteWeb"
            value={form.siteWeb}
            onChange={handleChange}
            required
            placeholder="URL de votre site web"
          />
        </div>
        <button type="submit">S'inscrire comme partenaire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PartenaireForm;
