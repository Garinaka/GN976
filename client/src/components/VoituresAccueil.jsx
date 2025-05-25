import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function VoituresAccueil() {
  const [voitures, setVoitures] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/voitures')
      .then(res => setVoitures(res.data))
      .catch(err => console.error('Erreur chargement voitures', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>🚗 Véhicules disponibles à la location</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {voitures.slice(0, 6).map((v) => (
          <Link
            to={`/voiture/${v._id}`}
            key={v._id}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '300px',
              backgroundColor: '#fff',
              transition: 'box-shadow 0.3s',
            }}
          >
            <img
              src={v.image}
              alt={`${v.marque} ${v.modele}`}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <h3 style={{ margin: '0.5rem 0' }}>{v.marque} {v.modele}</h3>
            <p><strong>📍 Localisation :</strong> {v.localisation}</p>
            <p><strong>💰 Tarif :</strong> {v.tarif} € / jour</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VoituresAccueil;
