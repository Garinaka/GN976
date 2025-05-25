import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importer Leaflet pour personnaliser les icônes
import 'leaflet/dist/leaflet.css'; // Importer les styles de Leaflet

function ListeVoitures() {
  const [voitures, setVoitures] = useState([]);
  const [filtre, setFiltre] = useState({
    marque: '',
    annee: '',
    tarifMax: '',
    equipments: [], // Ajouter le champ pour les équipements
    localisation: '' // Localisation ajoutée
  });

  const [center, setCenter] = useState([12.8275, 45.1662]); // Position initiale sur Mayotte
  const [zoom, setZoom] = useState(12); // Niveau de zoom initial

  // Fonction pour récupérer les voitures
  const fetchVoitures = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/voitures/liste', {
        params: filtre  // Envoyer les filtres en tant que paramètres dans la requête
      });
      setVoitures(res.data);
    } catch (error) {
      console.error('❌ Erreur chargement voitures :', error);
    }
  };

  useEffect(() => {
    fetchVoitures();
  }, [filtre]);  // Relancer la recherche lorsque le filtre change

  // Fonction pour gérer le changement des filtres
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFiltre((prevFiltre) => {
        const newEquipments = checked
          ? [...prevFiltre.equipments, value]
          : prevFiltre.equipments.filter((equipment) => equipment !== value);

        return { ...prevFiltre, [name]: newEquipments };
      });
    } else {
      setFiltre((prevFiltre) => ({
        ...prevFiltre,
        [name]: value,
      }));
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(filtre).toString();
    // Lancer la recherche des voitures filtrées
    fetchVoitures();
  };

  const voituresFiltrees = voitures.filter((car) => {
    return (
      (filtre.marque === '' || car.marque.toLowerCase().includes(filtre.marque.toLowerCase())) &&
      (filtre.annee === '' || car.annee === Number(filtre.annee)) &&
      (filtre.tarifMax === '' || car.tarif <= Number(filtre.tarifMax)) &&
      (filtre.equipments.length === 0 || filtre.equipments.every((equipment) => car.equipments.includes(equipment)))
    );
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Liste des voitures</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filtrer par marque"
          name="marque"
          value={filtre.marque}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          placeholder="Filtrer par année"
          name="annee"
          value={filtre.annee}
          onChange={handleFilterChange}
          style={{ marginLeft: '1rem' }}
        />
        <input
          type="number"
          placeholder="Tarif max (€)"
          name="tarifMax"
          value={filtre.tarifMax}
          onChange={handleFilterChange}
          style={{ marginLeft: '1rem' }}
        />
        <input
          type="text"
          placeholder="Localisation"
          name="localisation"
          value={filtre.localisation}
          onChange={handleFilterChange}
          style={{ marginLeft: '1rem' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>Rechercher</button>
      </div>

      {/* Affichage de la carte Leaflet */}
      <div style={{ height: '500px' }}>
        <MapContainer center={center} zoom={zoom} style={{ height: '100%' }} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Marqueurs pour chaque voiture */}
          {voituresFiltrees.map((car) => (
            <Marker
              key={car._id}
              position={[car.latitude, car.longitude]}  // Assurez-vous que ces coordonnées existent dans les données
              icon={new L.Icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Icône de base
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>
                {car.marque} {car.modele} <br />
                Tarif: {car.tarif}€/jour
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {voituresFiltrees.length === 0 ? (
        <p>Aucune voiture trouvée.</p>
      ) : (
        voituresFiltrees.map((car) => (
          <div key={car._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <img src={car.image} alt={car.marque} style={{ width: '300px', height: '180px', objectFit: 'cover' }} />
            <h3>{car.marque} {car.modele}</h3>
            <p>
              Année : {car.annee} • Tarif : {car.tarif}€/jour <br />
              Localisation : {car.localisation}
            </p>
            <p><strong>Propriétaire :</strong> {car.proprietaire}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ListeVoitures;
