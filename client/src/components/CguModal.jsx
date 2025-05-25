import React from 'react';

function CguModal({ visible, onClose }) {
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
        <h2>Conditions Générales d’Utilisation</h2>
        <p>Bienvenue sur Gari Naka. En utilisant ce site, vous acceptez les CGU suivantes :</p>
        <h3>1. Objet</h3>
        <p>La plateforme Gari Naka permet la location de voitures entre particuliers et professionnels à Mayotte.</p>
        <h3>2. Utilisation</h3>
        <p>Tout utilisateur doit fournir des informations exactes et respecter les engagements de réservation.</p>
        <h3>3. Responsabilités</h3>
        <p>Gari Naka ne peut être tenue responsable des litiges entre les utilisateurs.</p>
        <h3>4. Données personnelles</h3>
        <p>Les données sont utilisées uniquement à des fins liées au service. Voir notre politique de confidentialité.</p>
        <h3>5. Modifications</h3>
        <p>Ces CGU peuvent être modifiées. Dernière mise à jour : Mai 2025.</p>

        <button onClick={onClose} style={{ marginTop: '1rem' }}>Fermer</button>
      </div>
    </div>
  );
}

export default CguModal;
