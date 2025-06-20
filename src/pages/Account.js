import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Account() {
  const [form, setForm] = useState({ username: '', email: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm({ username: res.data.username, email: res.data.email }));
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put('/api/users/me', form, { headers: { Authorization: `Bearer ${token}` } });
    alert('Compte mis à jour !');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mon compte</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
}

export default Account;