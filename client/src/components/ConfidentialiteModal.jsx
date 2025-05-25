import React from 'react';

function ConfidentialiteModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <h2>Politique de confidentialité</h2>
        <p>Cette politique décrit la manière dont Gari Naka collecte, utilise et protège vos données personnelles.</p>
        <h3>1. Données collectées</h3>
        <p>Nous collectons les informations que vous fournissez lors de l'inscription, des réservations, et de la gestion de votre compte.</p>
        <h3>2. Utilisation</h3>
        <p>Vos données sont utilisées uniquement pour fournir les services de la plateforme et ne sont jamais revendues.</p>
        <h3>3. Sécurité</h3>
        <p>Nous utilisons des mesures techniques et organisationnelles pour protéger vos données.</p>
        <h3>4. Vos droits</h3>
        <p>Vous pouvez accéder, corriger ou supprimer vos données en nous contactant via le formulaire.</p>
        <h3>5. Contact</h3>
        <p>Pour toute question, contactez-nous à : contact@garinaka.yt</p>

        <button onClick={onClose} style={{ marginTop: '1rem' }}>Fermer</button>
      </div>
    </div>
  );
}

export default ConfidentialiteModal;
