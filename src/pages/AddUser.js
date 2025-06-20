import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [form, setForm] = useState({ username: '', email: '', password: '', isAdmin: false });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/auth/register', form, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un utilisateur</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mot de passe" required />
      <label>
        <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
        Administrateur
      </label>
      <button className="btn" type="submit">Ajouter</button>
    </form>
  );
}

export default AddUser;