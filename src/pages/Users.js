import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token)?.isAdmin : false;

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUsers(users.filter(user => user._id !== id)))
      .catch(err => console.error(err));
  };

  // Filtrage
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) &&
    user.username?.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Utilisateurs</h2>
      {isAdmin && <Link to="/users/add"><button className="btn">Ajouter un utilisateur</button></Link>}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 2 }}
        />
        <input
          type="text"
          placeholder="Filtrer par nom d'utilisateur..."
          value={usernameFilter}
          onChange={e => setUsernameFilter(e.target.value)}
          style={{ flex: 1 }}
        />
      </div>
      <ul>
        {filteredUsers.map(user => (
          <li key={user._id} className="list-item">
            <span>{user.email}</span>
            {isAdmin && (
              <>
                <button className="btn" onClick={() => navigate(`/users/edit/${user._id}`)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;