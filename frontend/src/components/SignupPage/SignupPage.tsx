import React, { useState } from 'react';
import './SignupPage.css';


const SignupPage = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 signup-page-container px-3">
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>
      <div className="mx-auto ms-lg-5 signup-box">
        <h2 className="fw-bold text-start mb-3 signup-title">ثبت‌نام</h2>

        <form>
          <div className="mb-3 position-relative">
            <input
              type="text"
              className="form-control text-start pe-5 signup-input"
              placeholder="نام کاربری یا ایمیل"
              required
            />
            <img
              src="/src/assets/icons/signup_user_icon.svg"
              alt="user icon"
              className="signup-user-icon"
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control text-start pe-5 signup-input"
              placeholder="رمز عبور"
              required
            />
             <img
              src="/src/assets/icons/signup_padlock_icon.svg"
              alt="lock icon"
              className="signup-padlock-icon"
            />
            <img
              src={showPassword ? '/src/assets/icons/signup_eye_off_icon.svg' : '/src/assets/icons/signup_eye_icon.svg'}
              alt="toggle password"
              className="signup-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control text-start pe-5 signup-input"
              placeholder="تایید رمز عبور"
              required
            />
             <img
              src="/src/assets/icons/signup_padlock_icon.svg"
              alt="lock icon"
              className="signup-padlock-icon"
            />
            <img
              src={showPassword ? '/src/assets/icons/signup_eye_off_icon.svg' : '/src/assets/icons/signup_eye_icon.svg'}
              alt="toggle password"
              className="signup-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <button type="submit" className="btn w-100 signup-btn">
            ثبت نام
          </button>

          <p className="text-muted small mt-3">
            با ثبت‌نام، شما با <a href="#" className="signup-agreement-text">قوانین و شرایط</a> ما موافقت می‌کنید.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
