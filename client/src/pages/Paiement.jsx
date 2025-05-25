
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import assuranceOptions from '../data/assuranceOptions';

function Paiement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservationData } = location.state || {};
  const [assurance, setAssurance] = useState(null);
  const [prixTotal, setPrixTotal] = useState(reservationData?.prix || 0);

  useEffect(() => {
    if (!reservationData?.voiture) return;
    const categorie = reservationData.voiture.categorie;
    const offreParDefaut = assuranceOptions.find((opt) =>
      opt.categorie.includes(categorie)
    );
    setAssurance(offreParDefaut || null);
  }, [reservationData]);

  useEffect(() => {
    if (reservationData?.prix != null) {
      setPrixTotal(reservationData.prix + (assurance?.prix || 0));
    }
  }, [assurance, reservationData]);

  const handleStripePayment = async () => {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reservationData,
          prix: prixTotal,
          assurance: assurance?.nom || 'Responsabilité civile',
          assurancePrix: assurance?.prix || 0,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Erreur : URL Stripe non reçue.');
      }
    } catch (error) {
      console.error('Erreur paiement Stripe :', error);
      alert('Échec du paiement. Veuillez réessayer.');
    }
  };

  if (!reservationData || !reservationData.voiture) {
    return (
      <div className="text-center mt-10 text-red-600">
        Erreur : données de réservation manquantes ou incomplètes.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Paiement de la réservation</h2>
      <p><strong>Véhicule :</strong> {reservationData.voiture.nom}</p>
      <p><strong>Date de début :</strong> {reservationData.dateDebut}</p>
      <p><strong>Date de fin :</strong> {reservationData.dateFin}</p>
      <p><strong>Prix de base :</strong> {reservationData.prix} €</p>
      <p><strong>Assurance incluse :</strong> Responsabilité civile (0 €)</p>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Options d’assurance complémentaire</h3>
        {assuranceOptions
          .filter(opt => opt.categorie.includes(reservationData.voiture.categorie))
          .map(opt => (
            <label key={opt.id} className="block mb-2">
              <input
                type="radio"
                name="assurance"
                checked={assurance?.id === opt.id}
                onChange={() => setAssurance(opt)}
              />
              {' '}
              {opt.nom} (+{opt.prix} €) — {opt.description}
            </label>
        ))}
      </div>

      <p className="mt-4 font-bold">Total à payer : {prixTotal} €</p>

      <button
        onClick={handleStripePayment}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        Payer avec Stripe
      </button>
    </div>
  );
}

export default Paiement;
