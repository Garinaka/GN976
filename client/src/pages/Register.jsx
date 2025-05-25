import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('🔧 URL API :', import.meta.env.VITE_API_URL);
      await axios.post(import.meta.env.VITE_API_URL + '/auth/register', {
        fullname,
        email,
        password,
      });
      setMessage('Inscription réussie ✅');
    } catch (error) {
      console.error('Erreur inscription :', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription ❌');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nom complet" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        <br /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">S'inscrire</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
