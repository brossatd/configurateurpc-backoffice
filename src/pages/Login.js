import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Redirige vers le dashboard
    } catch (err) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '5rem auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#23272f', color: '#fff', border: 'none', borderRadius: 4 }}>Se connecter</button>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;