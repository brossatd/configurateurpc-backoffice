import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ConfigurationDetail() {
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/api/configurations/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setConfig(res.data))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <p>Chargement...</p>;
  if (!config) return <p>Configuration introuvable.</p>;

  const total = config.components.reduce((sum, item) => {
    const priceObj = item.component.prices.find(p => p.partner === item.partner._id);
    return sum + (priceObj ? priceObj.price : 0);
  }, 0);

  return (
    <div>
      <h2>{config.name}</h2>
      <h3>Composants sélectionnés :</h3>
      <ul>
        {config.components.map((item, idx) => (
          <li key={idx}>
            {item.component?.title} ({item.component?.brand})
            {item.partner && <> - Partenaire : {item.partner.name}</>}
            {item.component.prices && (
              <> - Prix : {
                item.component.prices.find(p => p.partner === item.partner._id)?.price ?? 'N/A'
              } €</>
            )}
          </li>
        ))}
      </ul>
      <h3>Coût total : {total} €</h3>
    </div>
  );
}

export default ConfigurationDetail;