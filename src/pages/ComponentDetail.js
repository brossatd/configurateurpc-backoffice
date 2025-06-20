import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ComponentDetail() {
  const { id } = useParams();
  const [comp, setComp] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/api/components/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setComp(res.data));
  }, [id, token]);

  if (!comp) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{comp.title}</h2>
      <p>Marque : {comp.brand}</p>
      <p>Catégorie : {comp.category?.name}</p>
      <h3>Prix par partenaire :</h3>
      <ul>
        {comp.prices && comp.prices.length > 0 ? (
          comp.prices.map((p, idx) => (
            <li key={idx}>
              {p.partner?.name || 'Partenaire inconnu'} : {p.price} €
            </li>
          ))
        ) : (
          <li>Aucun prix renseigné</li>
        )}
      </ul>
    </div>
  );
}

export default ComponentDetail;