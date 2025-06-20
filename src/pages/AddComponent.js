import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddComponent() {
  const [form, setForm] = useState({ title: '', brand: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([{ partner: '', price: '' }]);
  const [partners, setPartners] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCategories(res.data));
  }, [token]);

  useEffect(() => {
    axios.get('/api/partners', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPartners(res.data));
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/components', { ...form, prices }, { headers: { Authorization: `Bearer ${token}` } });
      navigate('/components');
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'ajout');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un composant</h2>
      <input name="title" placeholder="Titre" value={form.title} onChange={handleChange} required />
      <input name="brand" placeholder="Marque" value={form.brand} onChange={handleChange} required />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Catégorie</option>
        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
      </select>
      <h3>Prix par partenaire</h3>
      {prices.map((p, idx) => (
        <div key={idx}>
          <select
            value={p.partner}
            onChange={e => {
              const newPrices = [...prices];
              newPrices[idx].partner = e.target.value;
              setPrices(newPrices);
            }}
            required
          >
            <option value="">Sélectionner un partenaire</option>
            {partners.map(partner => (
              <option key={partner._id} value={partner._id}>{partner.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={p.price}
            onChange={e => {
              const newPrices = [...prices];
              newPrices[idx].price = e.target.value;
              setPrices(newPrices);
            }}
            placeholder="Prix"
            required
          />
          <button className="btn btn-danger" type="button" onClick={() => setPrices(prices.filter((_, i) => i !== idx))}>Supprimer</button>
        </div>
      ))}
      <button className="btn" type="button" onClick={() => setPrices([...prices, { partner: '', price: '' }])}>Ajouter un prix</button>
      <button className="btn" type="submit">Ajouter</button>
    </form>
  );
}

export default AddComponent;