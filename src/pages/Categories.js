import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCategories(res.data));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer cette catégorie ?')) {
      await axios.delete(`/api/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setCategories(categories.filter(c => c._id !== id));
    }
  };

  return (
    <div>
      <h2>Catégories</h2>
      {isAdmin && (
        <Link to="/categories/add"><button className="btn">Ajouter une catégorie</button></Link>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <ul>
        {categories
          .filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()))
          .map(cat => (
            <li key={cat._id} className="list-item">
              <span>{cat.name}</span>
              {isAdmin && (
                <>
                  <button className="btn" onClick={() => navigate(`/categories/edit/${cat._id}`)}>Modifier</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(cat._id)}>Supprimer</button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;