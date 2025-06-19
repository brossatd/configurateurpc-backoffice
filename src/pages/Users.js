import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;