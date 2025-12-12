import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
      </div>
      <button className="navbar-start-btn" onClick={handleStartClick}>
        Bắt đầu
      </button>
    </nav>
  );
}

export default Navbar;
