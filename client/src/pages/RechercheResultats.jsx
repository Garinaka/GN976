import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function RechercheResultats() {
  const [voitures, setVoitures] = useState([]);
  const [voitureFiltrée, setVoitureFiltrée] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const voitureId = params.get('voitureId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (voitureId) {
          // Cas 1 : une seule voiture est ciblée
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/voitures/${voitureId}`);
          setVoitureFiltrée(res.data);
        } else {
          // Cas 2 : recherche normale avec d'autres paramètres (date, etc.)
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/voitures`);
          setVoitures(res.data);
        }
      } catch (err) {
        console.error('Erreur chargement résultats', err);
      }
    };

    fetchData();
  }, [voitureId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Résultats de recherche</h2>

      {voitureFiltrée ? (
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
          <h3>{voitureFiltrée.marque} {voitureFiltrée.modele}</h3>
          <img src={voitureFiltrée.image} alt="voiture" style={{ width: '100%', maxWidth: '400px', borderRadius: '6px' }} />
          <p><strong>Localisation :</strong> {voitureFiltrée.localisation}</p>
          <p><strong>Tarif :</strong> {voitureFiltrée.tarif} € / jour</p>
          <p><strong>Catégorie :</strong> {voitureFiltrée.categorie}</p>
          <p><strong>Valeur :</strong> {voitureFiltrée.valeur} €</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          {voitures.map((v) => (
            <div key={v._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '300px', borderRadius: '8px' }}>
              <img src={v.image} alt={v.marque} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{v.marque} {v.modele}</h3>
              <p><strong>Localisation :</strong> {v.localisation}</p>
              <p><strong>Tarif :</strong> {v.tarif} € / jour</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RechercheResultats;
