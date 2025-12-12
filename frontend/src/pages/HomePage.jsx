import React from 'react';
import Navbar from '../components/Navbar';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <main className="homepage-main">
        {/* Phần content đã được ẩn theo yêu cầu */}
      </main>
    </div>
  );
}

export default HomePage;