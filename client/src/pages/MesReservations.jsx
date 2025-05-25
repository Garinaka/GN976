import { useEffect, useState } from 'react';
import axios from 'axios';

function MesReservations() {
  const [reservations, setReservations] = useState([]);
  const utilisateur = 'client@example.com'; // à remplacer par l’utilisateur connecté (via contexte)

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/reservations/utilisateur', {
          params: { utilisateur },
        });
        console.log('Réservations récupérées :', res.data);
        setReservations(res.data);
      } catch (err) {
        console.error('❌ Erreur récupération réservations :', err);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes réservations</h2>

      {reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        reservations.map((r) => (
          <div
            key={r._id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          >
            <h3>
              {r.voiture?.marque} {r.voiture?.modele}
            </h3>
            <p><strong>Du :</strong> {new Date(r.dateDebut).toLocaleString()}</p>
            <p><strong>Au :</strong> {new Date(r.dateFin).toLocaleString()}</p>
            <p><strong>Lieu :</strong> {r.voiture?.localisation}</p>

            {r.assurance && (
              <>
                <p><strong>Assurance :</strong> {r.assurance}</p>
                <p><strong>Prix assurance :</strong> {r.assurancePrix} €</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MesReservations;
