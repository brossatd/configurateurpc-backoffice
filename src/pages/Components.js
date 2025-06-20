import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Components() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/components', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setComponents(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer ce composant ?')) {
      await axios.delete(`/api/components/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setComponents(components.filter(c => c._id !== id));
    }
  };

  return (
    <div>
      <h2>Composants</h2>
      {isAdmin && <Link to="/components/add"><button className="btn">Ajouter un composant</button></Link>}
      {loading ? <p>Chargement...</p> : (
        <ul>
          {components.map(comp => (
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