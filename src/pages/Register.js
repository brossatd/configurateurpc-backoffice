import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      // On force isAdmin à false côté front
      const res = await axios.post('/api/auth/register', { ...form, isAdmin: false });
      localStorage.setItem('token', res.data.token);
      navigate('/'); // Redirige vers le dashboard
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '5rem auto', background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8 }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: 16, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#23272f', color: '#fff', border: 'none', borderRadius: 4 }}>S'inscrire</button>
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
}

export default Register;