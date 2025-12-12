import React from 'react';
import './Logo.css';

function Logo() {
  return (
    <div className="logo-container">
      <svg 
        className="logo-icon" 
        viewBox="0 0 100 40" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hình tròn lớn - tượng trưng cho hệ thống cục bộ */}
        <circle cx="20" cy="20" r="12" fill="none" stroke="white" strokeWidth="2" />
        
        {/* Hình tròn nhỏ bên trong - tượng trưng cho máy chủ cục bộ */}
        <circle cx="20" cy="20" r="6" fill="white" />
        
        {/* Các đường kết nối - tượng trưng cho mạng nội bộ */}
        <line x1="32" y1="20" x2="42" y2="20" stroke="white" strokeWidth="2" />
        <line x1="42" y1="20" x2="52" y2="15" stroke="white" strokeWidth="2" />
        <line x1="42" y1="20" x2="52" y2="25" stroke="white" strokeWidth="2" />
        
        {/* Hình chữ nhật - tượng trưng cho website */}
        <rect x="55" y="12" width="35" height="16" rx="3" fill="none" stroke="white" strokeWidth="2" />
        
        {/* Dòng chữ WebLocal */}
        <text x="72.5" y="24" fill="white" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="Arial, sans-serif">
          WebLocal
        </text>
      </svg>
    </div>
  );
}

export default Logo;