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
    <div className="dashboard">
  <h2>Bienvenue sur le Dashboard</h2>

  <section className="stat-boxes">
    <div className="stat-card">
      <h3>Mes configurations</h3>
      <p className="stat-number">{configs.length}</p>
      <Link to="/configurations/add"><button className="btn">Créer une configuration</button></Link>
    </div>
    {isAdmin && (
      <>
        <div className="stat-card">
          <h3>Utilisateurs</h3>
          <Link to="/users"><button className="btn">Voir</button></Link>
        </div>
        <div className="stat-card">
          <h3>Composants</h3>
          <Link to="/components"><button className="btn">Voir</button></Link>
        </div>
        <div className="stat-card">
          <h3>Partenaires</h3>
          <Link to="/partners"><button className="btn">Voir</button></Link>
        </div>
      </>
    )}
  </section>
</div>

  );
}

export default Dashboard;