import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <main className="homepage-main">
        <div className="content">
          <h1>🏠 Trang Chủ</h1>
          <p>Chào mừng đến với hệ thống WebLocal!</p>
          <div className="empty-content">
            {/* Nội dung trang chủ sẽ được phát triển thêm */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;