import React from 'react';
import Logo from './Logo';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
      </div>
    </nav>
  );
}

export default Navbar;
