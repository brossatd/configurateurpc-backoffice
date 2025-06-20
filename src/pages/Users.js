import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Users() {
  const [users, setUsers] = useState([]);
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

  return (
    <div>
      <h2>Utilisateurs</h2>
      {isAdmin && <Link to="/users/add"><button className="btn">Ajouter un utilisateur</button></Link>}
      <ul>
        {users.map(user => (
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