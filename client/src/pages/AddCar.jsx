import { useState } from 'react';
import axios from 'axios';

function AddCar() {
  const [form, setForm] = useState({
    marque: '',
    modele: '',
    annee: '',
    tarif: '',
    localisation: '',
    proprietaire: '',
    categorie: '',
    images: [],
    disponible: true, // Ajout du champ de disponibilité
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    // Vérification du nombre d’images
    if (form.images.length + files.length > 5) {
      alert('Vous pouvez télécharger jusqu’à 5 images maximum.');
      return;
    }

    try {
      const uploadPromises = files.map(async (file) => {
        // Taille max : 1 Mo (1 048 576 octets)
        if (file.size > 1048576) {
          alert(`Le fichier "${file.name}" dépasse la taille maximale autorisée (1 Mo).`);
          return null;
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post(import.meta.env.VITE_API_URL + '/api/upload', formData);
        return import.meta.env.VITE_API_URL + res.data.imageUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(Boolean); // retirer les null
      setForm((prev) => ({ ...prev, images: [...prev.images, ...validUrls] }));
    } catch (err) {
      console.error('❌ Erreur upload image :', err);
      setMessage('Erreur lors de l’upload des images');
    }
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/voitures/ajouter', {
        ...form,
        annee: parseInt(form.annee),
        tarif: parseFloat(form.tarif),
        disponible: form.disponible, // Inclure la disponibilité
      });
      console.log('✅ Réponse ajout :', response.data);
      setMessage('Voiture ajoutée ✅');
    } catch (err) {
      console.error('❌ Erreur ajout voiture :', err.response?.data || err.message);
      setMessage('Erreur lors de l’ajout ❌');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Ajouter une voiture</h2>
      <form onSubmit={handleAddCar}>
        {/* Champ Marque */}
        <div>
          <label>Marque :</label>
          <input
            type="text"
            name="marque"
            value={form.marque}
            onChange={handleChange}
            placeholder="Marque de la voiture"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Champ Modèle */}
        <div>
          <label>Modèle :</label>
          <input
            type="text"
            name="modele"
            value={form.modele}
            onChange={handleChange}
            placeholder="Modèle de la voiture"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Champ Année */}
        <div>
          <label>Année :</label>
          <input
            type="number"
            name="annee"
            value={form.annee}
            onChange={handleChange}
            placeholder="Année de la voiture"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Champ Tarif */}
        <div>
          <label>Tarif par jour (€) :</label>
          <input
            type="number"
            name="tarif"
            value={form.tarif}
            onChange={handleChange}
            placeholder="Tarif/jour (€)"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Champ Localisation */}
        <div>
          <label>Localisation :</label>
          <input
            type="text"
            name="localisation"
            value={form.localisation}
            onChange={handleChange}
            placeholder="Localisation de la voiture"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Champ Propriétaire */}
        <div>
          <label>Email du propriétaire :</label>
          <input
            type="email"
            name="proprietaire"
            value={form.proprietaire}
            onChange={handleChange}
            placeholder="Email du propriétaire"
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </div>

        {/* Liste déroulante pour la catégorie */}
        <div>
          <label>Catégorie :</label>
          <select
            name="categorie"
            value={form.categorie}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Citadine">Citadine</option>
            <option value="Berline">Berline</option>
            <option value="SUV / 4x4">SUV / 4x4</option>
            <option value="Utilitaire">Utilitaire</option>
          </select>
        </div>

        {/* Sélectionner la disponibilité */}
        <div>
          <label>Disponible :</label>
          <select
            name="disponible"
            value={form.disponible}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <option value={true}>Oui</option>
            <option value={false}>Non</option>
          </select>
        </div>

        {/* Upload des images */}
        <div>
          <label>Photos du véhicule (5 max, 1 Mo max chacune) :</label><br />
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} /><br /><br />

          {/* Affichage des images téléchargées */}
          {form.images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
              {form.images.map((url, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img src={url} alt="aperçu" style={{ width: '100px', borderRadius: '4px' }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      lineHeight: '20px',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Ajouter
        </button>
      </form>

      {/* Message de confirmation */}
      <p>{message}</p>
    </div>
  );
}

export default AddCar;
