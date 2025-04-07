import React from 'react';
import './SignupPage.css';

const SignupPage = () => {
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 signup-page-container px-3">
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
          </div>

          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control text-start pe-5 signup-input"
              placeholder="رمز عبور"
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type="password"
              className="form-control text-start pe-5 signup-input"
              placeholder="تایید رمز عبور"
              required
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
