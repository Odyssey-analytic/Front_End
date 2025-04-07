import React from 'react';
import { Link } from 'react-router-dom'; 

import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 login-page-container px-3">  
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>
      <div className="login-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 login-title">ورود</h2>
        <p className=" text-muted text-start login-subtitle">ورود با استفاده از ایمیل</p>
        <form>
          <div className="mb-3 position-relative">
            <input
              type="email"
              className="form-control text-start pe-5 text-dark login-input"
              placeholder=".ایمیل خود را وارد کنید"
              required
            />
            <img
              src="/src/assets/icons/login_email_icon.svg"
              alt="email icon"
              className="login-email-icon"
            />
            </div>
            <button type="submit" className="btn w-100 login-btn">
              ورود
            </button>

            <div className="text-muted small px-2 my-3 text-start login-non-register-remember-password">
              <span className="login-non-register-remember-password">
                ثبت‌نام نکرده‌اید؟{' '}
                <Link
                  to="/signup"
                  className="fw-bold text-decoration-none login-non-register-remember-password">
                  ایجاد حساب
                </Link>
              </span> <div>
                <Link
                to="/forgot-password"
                className="fw-bold text-decoration-none login-non-register-remember-password"
              >
                فراموشی رمز عبور
              </Link></div>
            </div>
    
            <hr className="my-4" />

            <button type="button" className="btn login-google-btn d-flex align-items-center w-80 px-4 mx-auto">
              <span className="fw-bold text-white ms-auto me-4 login-google-btn-enter-text">ورود با استفاده از</span>
              <div className="d-flex align-items-center gap-2 me-auto">
                <span className="fw-bold text-white login-google-btn-google-text">Google</span>
                <img src="/src/assets/icons/login_google_icon.svg" alt="Google" width="23" />
              </div>
            </button>


          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


