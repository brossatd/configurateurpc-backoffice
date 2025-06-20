import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState({ username: '', email: '', isAdmin: false });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm({ username: res.data.username, email: res.data.email, isAdmin: res.data.isAdmin }));
  }, [id, token]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/users/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier un utilisateur</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Nom d'utilisateur" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <label>
        <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
        Administrateur
      </label>
      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
}
export default EditUser;