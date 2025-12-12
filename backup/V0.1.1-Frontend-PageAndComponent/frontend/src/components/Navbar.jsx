import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>📋 Hệ Thống</h2>
      </div>
      <ul className="navbar-menu">
        <li><a href="/">🏠 Trang Chủ</a></li>
        <li><a href="/dashboard">📊 Bảng Điều Khiển</a></li>
        <li><a href="/status">🔄 Trạng Thái</a></li>
        <li><a href="/settings">⚙️ Cài Đặt</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;