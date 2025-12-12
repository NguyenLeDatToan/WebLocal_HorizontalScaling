import React from 'react';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
      </div>
      <button className="navbar-start-btn">
        Bắt đầu
      </button>
    </nav>
  );
}

export default Navbar;
