import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Configurations() {
  const [configs, setConfigs] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/configurations', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setConfigs(res.data));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer cette configuration ?')) {
      await axios.delete(`/api/configurations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setConfigs(configs.filter(c => c._id !== id));
    }
  };

  const handleExportPDF = async (id) => {
    try {
      const res = await axios.get(`/api/configurations/${id}/pdf`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `configuration_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Erreur lors de l'export PDF");
    }
  };

  const total = configs.reduce((sum, config) => {
    return sum + config.components.reduce((acc, item) => {
      // Trouve le prix du composant pour le partenaire sélectionné
      const priceObj = item.component.prices.find(p => p.partner === item.partner._id);
      return acc + (priceObj ? priceObj.price : 0);
    }, 0);
  }, 0);

  return (
    <div>
      <h2>Mes configurations</h2>
      <Link to="/configurations/add"><button className="btn">Créer une configuration</button></Link>
      <ul>
        {configs.map(config => (
          <li key={config._id}>
            {config.name}
            <button className="btn" onClick={() => navigate(`/configurations/${config._id}`)}>Détail</button>
            <button className="btn" onClick={() => navigate(`/configurations/edit/${config._id}`)}>Modifier</button>
            <button className="btn btn-danger" onClick={() => handleDelete(config._id)}>Supprimer</button>
            <button className="btn" onClick={() => handleExportPDF(config._id)}>Exporter PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Configurations;