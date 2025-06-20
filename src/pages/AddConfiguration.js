import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddConfiguration() {
  const [name, setName] = useState('');
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/components', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setComponents(res.data));
    axios.get('/api/partners', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPartners(res.data));
  }, [token]);

  const handleSelect = (id) => {
    setSelectedComponents(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handlePartnerChange = (componentId, partnerId) => {
    setSelectedPartners(prev => ({ ...prev, [componentId]: partnerId }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/configurations', {
      name,
      components: selectedComponents.map(id => ({ component: id, partner: selectedPartners[id] }))
    }, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/configurations');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer une configuration</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nom" required />
      <h3>Composants</h3>
      <ul>
        {components.map(comp => (
          <li key={comp._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedComponents.includes(comp._id)}
                onChange={() => handleSelect(comp._id)}
              />
              {comp.title} ({comp.brand})
            </label>
            {selectedComponents.includes(comp._id) && (
              <select
                value={selectedPartners[comp._id] || ''}
                onChange={e => handlePartnerChange(comp._id, e.target.value)}
                required
              >
                <option value="">Choisir un partenaire</option>
                {partners.map(partner => (
                  <option key={partner._id} value={partner._id}>{partner.name}</option>
                ))}
              </select>
            )}
          </li>
        ))}
      </ul>
      <button className="btn" type="submit">Créer</button>
    </form>
  );
}

export default AddConfiguration;