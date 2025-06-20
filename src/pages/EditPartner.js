import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPartner() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', url: '', commission: '', conditions: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/partners/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setForm({
          name: res.data.name || '',
          url: res.data.url || '',
          commission: res.data.commission || '',
          conditions: res.data.conditions || '', // sera ignoré si non présent dans le modèle
        });
      });
  }, [id, token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/partners/${id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/partners');
    } catch (err) {
      alert("Erreur lors de la modification !");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier un partenaire</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
      <input name="url" value={form.url} onChange={handleChange} placeholder="URL" />
      <input name="commission" value={form.commission} onChange={handleChange} placeholder="Commission" />
      <input name="conditions" value={form.conditions} onChange={handleChange} placeholder="Conditions" />
      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
}

export default EditPartner;