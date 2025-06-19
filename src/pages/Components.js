import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Components() {
  const [components, setComponents] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/components', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setComponents(res.data));
  }, [token]);

  const handleDelete = async (id) => {
    if(window.confirm('Supprimer ce composant ?')) {
      await axios.delete(`/api/components/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setComponents(components.filter(c => c._id !== id));
    }
  };

  return (
    <div>
      <h1>Composants</h1>
      <ul>
        {components.map(comp => (
          <li key={comp.id}>
            {comp.name}
            <button onClick={() => navigate(`/components/edit/${comp._id}`)}>Modifier</button>
            <button onClick={() => handleDelete(comp._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Components;