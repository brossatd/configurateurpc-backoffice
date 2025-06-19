import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/partners')
      .then(res => setPartners(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Partenaires</h1>
      <ul>
        {partners.map(partner => (
          <li key={partner.id}>{partner.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Partners;