import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Chào mừng bạn đến với WebLocal</h1>
        <p>Vui lòng đăng nhập để tiếp tục</p>
        <div className="login-form">
          <input type="text" placeholder="Tên người dùng hoặc email" />
          <input type="password" placeholder="Mật khẩu" />
          <button className="login-btn">Đăng nhập</button>
          <div className="login-options">
            <a href="#">Quên mật khẩu?</a>
            <a href="#">Tạo tài khoản mới</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;