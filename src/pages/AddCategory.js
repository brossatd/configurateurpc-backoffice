import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/categories', { name }, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une catégorie</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom" required />
      <button className="btn" type="submit">Ajouter</button>
    </form>
  );
}

export default AddCategory;