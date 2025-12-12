import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      {/* Navbar đang được ẩn tạm thời */}
      {/* <Navbar /> */}
      <main className="homepage-main">
        <div className="empty-content">
          {/* Trang trống, chỉ có nội dung cơ bản */}
        </div>
      </main>
    </div>
  );
}

export default HomePage;