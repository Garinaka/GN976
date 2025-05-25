
import React from 'react';

function Annulation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
      <h1 className="text-3xl font-bold mb-4">❌ Paiement annulé</h1>
      <p className="text-lg">Votre réservation n'a pas été finalisée.</p>
      <p className="mt-2">Vous pouvez réessayer à tout moment depuis votre compte.</p>
    </div>
  );
}

export default Annulation;
