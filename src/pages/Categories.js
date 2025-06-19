import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Catégories</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;