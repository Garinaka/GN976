import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListePartenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/partenaires/liste');
        setPartenaires(response.data);
      } catch (error) {
        console.error('❌ Erreur récupération partenaires :', error);
        setMessage('Erreur lors du chargement des partenaires');
      }
    };

    fetchPartenaires();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Nos Partenaires</h2>

      {message && <p>{message}</p>}

      <div>
        {partenaires.length === 0 ? (
          <p>Aucun partenaire trouvé.</p>
        ) : (
          partenaires.map((partenaire) => (
            <div key={partenaire._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <img src={partenaire.logo} alt={partenaire.nom} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h3>{partenaire.nom}</h3>
              <p>{partenaire.description}</p>
              <a href={partenaire.siteWeb} target="_blank" rel="noopener noreferrer">Visitez leur site</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListePartenaires;
