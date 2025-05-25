import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCar from './pages/AddCar';  // Importer la page d'ajout de voiture
import RechercheResultats from './pages/RechercheResultats';
import MesReservations from './pages/MesReservations';
import ListeVoitures from './pages/ListeVoitures';
import Paiement from './pages/Paiement';
import Confirmation from './pages/Confirmation';
import Annulation from './pages/Annulation';
import FicheVoiture from './pages/FicheVoiture';
import ModifierPhotos from './pages/ModifierPhotos';
import AdminVoitures from './pages/AdminVoitures';
import { useAuth } from './contexts/AuthContext';
import CguModal from './components/CguModal';
import ConfidentialiteModal from './components/ConfidentialiteModal';

function App() {
  const { user, logout } = useAuth();
  const [cguVisible, setCguVisible] = useState(false);
  const [confVisible, setConfVisible] = useState(false);

  return (
    <div>
      {/* Barre de navigation */}
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem', backgroundColor: '#eee' }}>
        <Link to="/">Accueil</Link>

        {/* Affichage conditionnel selon que l'utilisateur est connecté ou non */}
        {!user ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: '1rem' }}>Bienvenue, {user.fullname}</span>
            <button onClick={logout}>Déconnexion</button>
          </>
        )}

        {/* Liens supplémentaires pour les utilisateurs connectés */}
        <Link to="/louer-ma-voiture">Louer ma voiture</Link>
        <Link to="/mes-reservations">Mes réservations</Link>

        {/* Lien Admin visible uniquement si l’utilisateur connecté est toi */}
        {user?.email === 'contact.luxuryp976@gmail.com' && (
          <Link to="/admin/voitures">Admin Voitures</Link>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/louer-ma-voiture" element={<AddCar />} />  {/* Route pour l'ajout de voiture */}
        <Route path="/recherche" element={<RechercheResultats />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/voitures" element={<ListeVoitures />} />
        <Route path="/paiement" element={<Paiement />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/annulation" element={<Annulation />} />
        <Route path="/voiture/:id" element={<FicheVoiture />} />
        <Route path="/voiture/:id/modifier-photos" element={<ModifierPhotos />} />
        <Route path="/admin/voitures" element={<AdminVoitures />} />
      </Routes>

      {/* Pied de page */}
      <footer style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f1f1f1', marginTop: '2rem' }}>
        <button onClick={() => setCguVisible(true)} style={buttonStyle}>CGU</button>
        <button onClick={() => setConfVisible(true)} style={buttonStyle}>Politique de confidentialité</button>
        <button onClick={() => alert('Fonctionnalité partenaire à venir')} style={buttonStyle}>Devenir partenaire</button>
        <button onClick={() => alert('Contactez-nous à contact@garinaka.yt')} style={buttonStyle}>Contact</button>
      </footer>

      {/* Modals pour les CGU et Politique de confidentialité */}
      <CguModal visible={cguVisible} onClose={() => setCguVisible(false)} />
      <ConfidentialiteModal visible={confVisible} onClose={() => setConfVisible(false)} />
    </div>
  );
}

const buttonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  textDecoration: 'underline',
  cursor: 'pointer',
  margin: '0 1rem',
};

export default App;
