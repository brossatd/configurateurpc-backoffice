import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaMicrochip, FaThList, FaHandshake } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside style={{ width: '200px', background: '#eee', padding: '1rem', height: '100vh' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
              <FaTachometerAlt style={{ marginRight: '10px' }} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaUsers style={{ marginRight: '10px' }} />
              Utilisateurs
            </NavLink>
          </li>
          <li>
            <NavLink to="/components" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaMicrochip style={{ marginRight: '10px' }} />
              Composants
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaThList style={{ marginRight: '10px' }} />
              Catégories
            </NavLink>
          </li>
          <li>
            <NavLink to="/partners" className={({ isActive }) => isActive ? 'active' : ''}>
              <FaHandshake style={{ marginRight: '10px' }} />
              Partenaires
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;