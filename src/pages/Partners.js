import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/partners', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPartners(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer ce composant ?')) {
      await axios.delete(`/api/partners/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPartners(partners.filter(c => c._id !== id));
    }
  };

  if (loading) return <p>Chargement...</p>;

  // Filtrage
  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Partenaires</h2>
      {isAdmin && (
        <>
          <Link to="/partners/add">
            <button className="btn">Ajouter un partenaire</button>
          </Link>
        </>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Rechercher par nom de partenaire..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>
      <ul>
        {filteredPartners.map(partner => (
          <li key={partner._id} className="list-item">
            <span>{partner.name}</span>
            {isAdmin && (
              <>
                <button className="btn" onClick={() => navigate(`/partners/edit/${partner._id}`)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDelete(partner._id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Partners;