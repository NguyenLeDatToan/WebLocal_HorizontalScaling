import React from 'react';
import logoImg from '../utils/img/logo.png';
import './Logo.css';

function Logo({ variant = 'default' }) {
  const logoClass = `logo-icon ${variant === 'navbar' ? 'logo-icon-navbar' : ''} ${variant === 'login' ? 'logo-icon-login' : ''}`;

  return (
    <div className="logo-container">
      {variant === 'login' ? (
        <div className={logoClass}>
          <img
            src={logoImg}
            alt="WebLocal Logo"
            className="logo-img"
          />
        </div>
      ) : (
        <img
          src={logoImg}
          alt="WebLocal Logo"
          className={logoClass}
        />
      )}
    </div>
  );
}

export default Logo;
