import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminVoitures() {
  const [voitures, setVoitures] = useState([]);
  const [message, setMessage] = useState('');

  const fetchVoitures = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/voitures/liste');
      setVoitures(res.data);
    } catch (err) {
      console.error('Erreur récupération voitures', err);
    }
  };

  useEffect(() => {
    fetchVoitures();
  }, []);

  const handleSupprimer = async (id) => {
    if (confirm('Supprimer définitivement ce véhicule ?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/voitures/${id}`);
        setMessage('Voiture supprimée ✅');
        fetchVoitures();
      } catch (err) {
        console.error('Erreur suppression', err);
        setMessage('Erreur lors de la suppression ❌');
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔧 Gestion des voitures (Admin)</h2>
      {message && <p>{message}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {voitures.map((v) => (
          <div
            key={v._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '300px',
              background: '#fff',
            }}
          >
            <img
              src={v.images[0] || 'https://via.placeholder.com/300x180?text=Voiture'}
              alt="voiture"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <h3>{v.marque} {v.modele}</h3>
            <p><strong>Catégorie :</strong> {v.categorie}</p>
            <p><strong>Valeur :</strong> {v.valeur} €</p>
            <p><strong>Tarif :</strong> {v.tarif} € / jour</p>

            <Link to={`/voiture/${v._id}/modifier-photos`} style={{ display: 'block', marginTop: '1rem' }}>
              Modifier les photos
            </Link>

            <button
              onClick={() => handleSupprimer(v._id)}
              style={{
                marginTop: '0.5rem',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVoitures;
