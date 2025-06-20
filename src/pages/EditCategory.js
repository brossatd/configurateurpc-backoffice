import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setName(res.data.name));
  }, [id, token]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/categories/${id}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier une catégorie</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom" required />
      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
}

export default EditCategory;