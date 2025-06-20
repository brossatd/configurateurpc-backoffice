import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [configs, setConfigs] = useState([]);
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;

  useEffect(() => {
    axios.get('/api/configurations', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setConfigs(res.data));
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ marginBottom: '2rem' }}>
        <h3>Mes configurations</h3>
        <p>{configs.length}</p>
        <ul>
          {configs.map(config => (
            <li key={config._id}>
              <Link to={`/configurations/${config._id}`}>{config.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/configurations/add"><button className="btn">Créer une configuration</button></Link>
      </div>
      {isAdmin && (
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h3>Utilisateurs</h3>
            <Link to="/users"><button className="btn">Voir les utilisateurs</button></Link>
          </div>
          <div>
            <h3>Composants</h3>
            <Link to="/components"><button className="btn">Voir les composants</button></Link>
          </div>
          <div>
            <h3>Partenaires</h3>
            <Link to="/partners"><button className="btn">Voir les partenaires</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;