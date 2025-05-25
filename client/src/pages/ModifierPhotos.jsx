import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ModifierPhotos() {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/voitures/${id}`)
      .then(res => setVoiture(res.data))
      .catch(err => console.error('Erreur chargement voiture', err));
  }, [id]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (voiture.images.length + files.length > 5) {
      alert('Limite de 5 images maximum.');
      return;
    }

    const uploadPromises = files.map(async (file) => {
      if (file.size > 1048576) {
        alert(`${file.name} dépasse 1 Mo`);
        return null;
      }

      const formData = new FormData();
      formData.append('image', file);

      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/upload', formData);
      return import.meta.env.VITE_API_URL + res.data.imageUrl;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    const valid = uploadedUrls.filter(Boolean);

    setVoiture((prev) => ({
      ...prev,
      images: [...prev.images, ...valid]
    }));
  };

  const supprimerImage = (index) => {
    setVoiture((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const enregistrerModifs = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/voitures/${id}/images`, {
        images: voiture.images
      });
      setMessage('Photos mises à jour ✅');
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'enregistrement ❌");
    }
  };

  if (!voiture) return <p>Chargement...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Modifier les photos du véhicule</h2>

      <input type="file" accept="image/*" multiple onChange={handleImageUpload} /><br /><br />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {voiture.images.map((url, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img src={url} alt="photo" style={{ width: '120px', borderRadius: '6px' }} />
            <button
              type="button"
              onClick={() => supprimerImage(index)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <br />
      <button onClick={enregistrerModifs}>Enregistrer les modifications</button>
      <p>{message}</p>
    </div>
  );
}

export default ModifierPhotos;
