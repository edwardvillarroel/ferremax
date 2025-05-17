import React from 'react';
import './sidebar.css'; 
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <ul>
        <li>
          <Link to="/admin/productos" onClick={onClose}>
            Gestionar inventario
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
