
import React from 'react';

function Confirmation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-green-700">
      <h1 className="text-3xl font-bold mb-4">✅ Paiement réussi</h1>
      <p className="text-lg">Merci pour votre réservation sur Gari Naka !</p>
      <p className="mt-2">Un email de confirmation vous sera envoyé prochainement.</p>
    </div>
  );
}

export default Confirmation;
