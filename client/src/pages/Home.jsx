import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoituresAccueil from '../components/VoituresAccueil'; // ✅ à ajouter

function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    localisation: '',
    dateDebut: '',
    heureDebut: '',
    dateFin: '',
    heureFin: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    navigate(`/recherche?${params}`);
  };

  const backgroundImage = 'https://images.pexels.com/photos/12871827/pexels-photo-12871827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  return (
    <>
      {/* Section d’accueil avec fond et recherche */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '1px 1px 3px black',
        }}
      >
        <h1 style={{ fontSize: '2.5rem' }}>Bienvenue sur Gari Naka</h1>
        <p style={{ fontSize: '1.2rem' }}>Louez une voiture facilement partout à Mayotte.</p>

        <form
          onSubmit={handleSearch}
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: '2rem',
            borderRadius: '10px',
            marginTop: '2rem',
            width: '90%',
            maxWidth: '700px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* Localisation */}
          <input
            type="text"
            name="localisation"
            value={form.localisation}
            onChange={handleChange}
            placeholder="Localisation"
            required
            style={{ width: '48%', marginBottom: '1rem' }}
          />

          {/* Date et heure de début */}
          <div style={{ width: '48%' }}>
            <label>Début de location :</label><br />
            <input
              type="date"
              name="dateDebut"
              value={form.dateDebut}
              onChange={handleChange}
              required
              style={{ width: '48%', marginRight: '4%' }}
            />
            <input
              type="time"
              name="heureDebut"
              value={form.heureDebut}
              onChange={handleChange}
              required
              step="1800" // Intervalle de 30 minutes (1800 secondes)
              style={{ width: '48%' }}
            />
          </div>

          {/* Date et heure de fin */}
          <div style={{ width: '48%' }}>
            <label>Fin de location :</label><br />
            <input
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
              required
              style={{ width: '48%', marginRight: '4%' }}
            />
            <input
              type="time"
              name="heureFin"
              value={form.heureFin}
              onChange={handleChange}
              required
              step="1800" // Intervalle de 30 minutes (1800 secondes)
              style={{ width: '48%' }}
            />
          </div>

          {/* Bouton de recherche */}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '10px 0',
              borderRadius: '5px',
              fontSize: '1rem',
              marginTop: '1rem',
            }}
          >
            Rechercher une voiture
          </button>
        </form>
      </div>

      {/* ✅ Section dynamique des véhicules */}
      <VoituresAccueil />
    </>
  );
}

export default Home;
