import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Components() {
  const [components, setComponents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/components', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setComponents(res.data))
      .finally(() => setLoading(false));

    axios.get('/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCategories(res.data));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer ce composant ?')) {
      await axios.delete(`/api/components/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setComponents(components.filter(c => c._id !== id));
    }
  };

  const filteredComponents = components.filter(comp => {
    return (
      comp.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? comp.category._id === categoryFilter : true) &&
      (brandFilter ? comp.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true)
    );
  });

  return (
    <div>
      <h2>Composants</h2>
      {isAdmin && <Link to="/components/add"><button className="btn">Ajouter un composant</button></Link>}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 2 }}
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="">Toutes catégories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Filtrer par marque..."
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {filteredComponents.map(comp => (
            <li key={comp._id} className="list-item">
              <span>{comp.title} ({comp.brand})</span>
              {isAdmin && (
                <>
                  <button className="btn" onClick={() => navigate(`/components/edit/${comp._id}`)}>Modifier</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(comp._id)}>Supprimer</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Components;