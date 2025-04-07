import React from 'react';
import { Link } from 'react-router-dom'; 

import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 login-page-container px-3">
      <div className="login-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 login-title">ورود</h2>
        <p className=" text-muted text-start login-subtitle">ورود با استفاده از ایمیل</p>
        <form>
          <div className="mb-3 position-relative">
            <input
              type="email"
              className="form-control text-start pe-5 login-input text-dark"
              placeholder=".ایمیل خود را وارد کنید"
              required
            />
            {/* <img
              src="/src/assets/icons/email_icon.svg"
              alt="email icon"
              className="login-input-email-icon"
            /> */}
            <button type="submit" className="btn w-100 login-btn">
              ورود
            </button>

            <div className="text-muted small px-2 my-3 text-start login-non-register-remember-password">
              <span className="login-non-register-remember-password">
                ثبت‌نام نکرده‌اید؟{' '}
                <Link
                  to="/signup"
                  className="fw-bold text-decoration-none login-non-register-remember-password"
                >
                  ایجاد حساب
                </Link>
              </span> <div>
              <a className="fw-bold text-decoration-none login-non-register-remember-password">فراموشی رمز عبور</a></div>
            </div>
    
            <hr className="my-4" />

            <button type="button" className="btn login-google-btn d-flex align-items-center w-80 px-4 mx-auto">
              <span className="fw-bold text-white ms-auto me-4 login-google-btn-enter-text">ورود با استفاده از</span>
              <div className="d-flex align-items-center gap-2 me-auto">
                <span className="fw-bold text-white login-google-btn-google-text">Google</span>
                <img src="/src/assets/icons/google_icon.svg" alt="Google" width="23" />
              </div>
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


