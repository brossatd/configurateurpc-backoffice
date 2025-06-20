import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditConfiguration() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedPartners, setSelectedPartners] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/configurations/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setName(res.data.name);
        setSelectedComponents(res.data.components.map(c => c.component._id));
        const partnersMap = {};
        res.data.components.forEach(c => {
          partnersMap[c.component._id] = c.partner ? c.partner._id : '';
        });
        setSelectedPartners(partnersMap);
      });
    axios.get('/api/components', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setComponents(res.data));
    axios.get('/api/partners', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPartners(res.data));
  }, [id, token]);

  const handleSelect = (cid) => {
    setSelectedComponents(prev =>
      prev.includes(cid) ? prev.filter(id => id !== cid) : [...prev, cid]
    );
  };

  const handlePartnerChange = (cid, partnerId) => {
    setSelectedPartners(prev => ({ ...prev, [cid]: partnerId }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/configurations/${id}`, {
      name,
      components: selectedComponents.map(id => ({ component: id, partner: selectedPartners[id] }))
    }, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/configurations');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Modifier la configuration</h2>
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
      <button className="btn" type="submit">Enregistrer</button>
    </form>
  );
}

export default EditConfiguration;