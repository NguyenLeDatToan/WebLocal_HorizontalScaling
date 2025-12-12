import React from 'react';
import logoImg from '../utils/img/logo.png';
import './Logo.css';

function Logo() {
  return (
    <div className="logo-container">
      <img 
        src={logoImg} 
        alt="WebLocal Logo" 
        className="logo-icon"
      />
    </div>
  );
}

export default Logo;
