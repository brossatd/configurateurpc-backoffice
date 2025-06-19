import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={{ background: '#222', color: '#fff', padding: '1rem' }}>
      <h1>Configurateur PC - Backoffice</h1>
      <button onClick={handleLogout} style={{ float: 'right', marginTop: '-2.5rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Déconnexion
      </button>
    </header>
  );
}

export default Header;