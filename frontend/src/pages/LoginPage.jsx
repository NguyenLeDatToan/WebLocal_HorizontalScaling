import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import CustomDatePicker from '../components/CustomDatePicker';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [registerStep, setRegisterStep] = useState(1);

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setRegisterStep(1); // Reset về bước 1 khi chuyển đổi giữa login và register
  };

  const goToStep2 = () => {
    setRegisterStep(2);
  };

  const goToStep1 = () => {
    setRegisterStep(1);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo-large">
          <div className="login-logo-image" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <Logo variant="login" />
          </div>
        </div>
        <p>{isLogin ? 'Vui lòng đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}</p>
        {isLogin ? (
          <div className="login-form">
            <input type="text" placeholder="Tên người dùng hoặc email" />
            <input type="password" placeholder="Mật khẩu" />
            <button className="login-btn">Đăng nhập</button>
            <div className="login-options">
              <a href="#">Quên mật khẩu?</a>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Tạo tài khoản mới</a>
            </div>
          </div>
        ) : (
          <div className="register-form-container">
            <div className={`register-step ${registerStep === 1 ? 'active' : ''}`}>
              <input type="text" placeholder="Tên người dùng" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Mật khẩu" />
              <input type="password" placeholder="Xác nhận mật khẩu" />
              <button className="register-btn" onClick={goToStep2}>Kế tiếp</button>
              <div className="register-options">
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Đã có tài khoản? Đăng nhập</a>
              </div>
            </div>
            <div className={`register-step ${registerStep === 2 ? 'active' : ''}`}>
              <input type="text" placeholder="Họ và tên" />
              <CustomDatePicker />
              <input type="tel" placeholder="Số điện thoại" />
              <div className="register-btn-group">
                <button className="register-btn secondary" onClick={goToStep1}>Quay lại</button>
                <button className="register-btn">Đăng ký</button>
              </div>
              <div className="register-options">
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>Đã có tài khoản? Đăng nhập</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;