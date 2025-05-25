import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarRegistrationForm = () => {
  const [vehicleData, setVehicleData] = useState({
    marque: '',
    modele: '',
    annee: '',
    tarif: 50, // Prix initial par défaut
    localisation: '',
    proprietaire: '',
    categorie: '',
    mileage: '', // Kilométrage sélectionné via la liste déroulante
    equipments: [], // Equipements sélectionnés par l'utilisateur
    recommendedPrice: 0,
    images: []
  });

  // Mettre à jour le prix recommandé dès que les informations du véhicule changent
  useEffect(() => {
    const getRecommendedPrice = async () => {
      try {
        const response = await axios.post('/api/payment/recommended-price', {
          mileage: vehicleData.mileage,
          year: vehicleData.annee,
          marque: vehicleData.marque,
          modele: vehicleData.modele
        });

        setVehicleData((prevState) => ({
          ...prevState,
          recommendedPrice: response.data.recommendedPrice
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération du prix recommandé', error);
      }
    };

    if (vehicleData.mileage && vehicleData.annee) {
      getRecommendedPrice();
    }
  }, [vehicleData.mileage, vehicleData.annee, vehicleData.marque, vehicleData.modele]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'equipments') {
      const selectedEquipments = Array.from(e.target.selectedOptions, (option) => option.value);
      setVehicleData((prevState) => ({
        ...prevState,
        [name]: selectedEquipments
      }));
    } else {
      setVehicleData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Soumettre les données de la voiture
    try {
      const response = await axios.post('/api/voitures', vehicleData);
      console.log('Voiture enregistrée', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la voiture', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscrire votre voiture</h2>
      <div>
        <label>Marque</label>
        <input
          type="text"
          name="marque"
          value={vehicleData.marque}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Modèle</label>
        <input
          type="text"
          name="modele"
          value={vehicleData.modele}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Année de production</label>
        <input
          type="number"
          name="annee"
          value={vehicleData.annee}
          onChange={handleChange}
          required
        />
      </div>

      {/* Liste déroulante pour le kilométrage */}
      <div>
        <label>Kilométrage</label>
        <select
          name="mileage"
          value={vehicleData.mileage}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez le kilométrage</option>
          <option value="0-50000">0-50 000 Km</option>
          <option value="50000-100000">50 000-100 000 Km</option>
          <option value="100000-150000">100 000-150 000 Km</option>
          <option value="150000-200000">150 000-200 000 Km</option>
          <option value="200000+">+ 200 000 Km</option>
        </select>
      </div>

      <div>
        <label>Localisation</label>
        <input
          type="text"
          name="localisation"
          value={vehicleData.localisation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Propriétaire</label>
        <input
          type="text"
          name="proprietaire"
          value={vehicleData.proprietaire}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Catégorie (ex: citadine, SUV, etc.)</label>
        <input
          type="text"
          name="categorie"
          value={vehicleData.categorie}
          onChange={handleChange}
          required
        />
      </div>

      {/* Liste déroulante pour les équipements */}
      <div>
        <label>Équipements du véhicule</label>
        <select
          name="equipments"
          value={vehicleData.equipments}
          onChange={handleChange}
          multiple
          required
        >
          <option value="Siège bébé">Siège bébé</option>
          <option value="Bluetooth">Bluetooth</option>
          <option value="Climatisation">Climatisation</option>
          <option value="GPS intégré">GPS intégré</option>
          <option value="Apple CarPlay">Apple CarPlay</option>
          <option value="Android Auto">Android Auto</option>
          <option value="Quatre roues motrices (4x4)">Quatre roues motrices (4x4)</option>
        </select>
      </div>

      <div>
        <label>Tarif de location (€)</label>
        <div>
          <input
            type="range"
            name="tarif"
            min="10"
            max="200"
            value={vehicleData.tarif}
            onChange={handleChange}
            step="5"
          />
          <span>{vehicleData.tarif}€</span>
        </div>
        <div>
          <p>Prix recommandé : {vehicleData.recommendedPrice}€</p>
        </div>
      </div>
      <button type="submit">Enregistrer la voiture</button>
    </form>
  );
};

export default CarRegistrationForm;
