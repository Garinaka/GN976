import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Pour récupérer l'ID du véhicule et la navigation

function ModifierVoiture() {
  const { id } = useParams(); // Récupère l'ID du véhicule à modifier depuis l'URL
  const [vehicle, setVehicle] = useState(null); // Stocker les données du véhicule
  const [loading, setLoading] = useState(true); // Gérer l'état de chargement
  const [error, setError] = useState(''); // Gérer les erreurs de récupération des données
  const navigate = useNavigate(); // Utilisé pour naviguer après la modification

  // Utilisation de useEffect pour charger les données du véhicule
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`/voitures/${id}`); // API pour récupérer les données du véhicule
        setVehicle(response.data); // Stocker les données dans l'état
        setLoading(false); // Fin du chargement
      } catch (err) {
        console.error('Erreur lors de la récupération du véhicule:', err);
        setError('Erreur lors de la récupération des données');
        setLoading(false); // Fin du chargement même en cas d'erreur
      }
    };

    fetchVehicleData(); // Appel de la fonction pour récupérer les données
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/voitures/${id}`, vehicle); // Requête PUT pour mettre à jour le véhicule
      console.log('Réponse mise à jour :', response.data);
      navigate('/admin/voitures'); // Rediriger après la modification
    } catch (err) {
      console.error('Erreur lors de la mise à jour :', err);
      setError('Erreur lors de la mise à jour');
    }
  };

  return (
    <div>
      <h2>Modifier le véhicule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Marque :</label>
          <input
            type="text"
            name="marque"
            value={vehicle.marque || ''}
            onChange={(e) => setVehicle({ ...vehicle, marque: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Modèle :</label>
          <input
            type="text"
            name="modele"
            value={vehicle.modele || ''}
            onChange={(e) => setVehicle({ ...vehicle, modele: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Année :</label>
          <input
            type="number"
            name="annee"
            value={vehicle.annee || ''}
            onChange={(e) => setVehicle({ ...vehicle, annee: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Tarif :</label>
          <input
            type="number"
            name="tarif"
            value={vehicle.tarif || ''}
            onChange={(e) => setVehicle({ ...vehicle, tarif: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Localisation :</label>
          <input
            type="text"
            name="localisation"
            value={vehicle.localisation || ''}
            onChange={(e) => setVehicle({ ...vehicle, localisation: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Email propriétaire :</label>
          <input
            type="email"
            name="proprietaire"
            value={vehicle.proprietaire || ''}
            onChange={(e) => setVehicle({ ...vehicle, proprietaire: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Catégorie :</label>
          <select
            name="categorie"
            value={vehicle.categorie || ''}
            onChange={(e) => setVehicle({ ...vehicle, categorie: e.target.value })}
            required
          >
            <option value="Citadine">Citadine</option>
            <option value="Berline">Berline</option>
            <option value="SUV / 4x4">SUV / 4x4</option>
            <option value="Utilitaire">Utilitaire</option>
          </select>
        </div>

        <button type="submit">Sauvegarder les modifications</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default ModifierVoiture;
