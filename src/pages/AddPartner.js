import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPartner() {
  const [form, setForm] = useState({ name: '', url: '', commission: '', conditions: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/partners', form, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/partners');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un partenaire</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
      <input name="url" value={form.url} onChange={handleChange} placeholder="URL" />
      <input name="commission" value={form.commission} onChange={handleChange} placeholder="Commission" />
      <input name="conditions" value={form.conditions} onChange={handleChange} placeholder="Conditions" />
      <button className="btn" type="submit">Ajouter</button>
    </form>
  );
}

export default AddPartner;