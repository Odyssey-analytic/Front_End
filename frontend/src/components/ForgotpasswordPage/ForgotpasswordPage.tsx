import { useState } from "react";
import { requestPasswordReset } from "../../services/userService";
import "./ForgotpasswordPage.css";
import { Link, useNavigate } from 'react-router-dom';

import odessay_logo from '/public/icons/odessay_logo.svg';
import login_email_icon from '/public/icons/login_email_icon.svg';
import forgetpassword_sendcode_icon from "/public/icons/forgetpassword_sendcode_icon.svg";
import successful_signup_icon from "/public/icons/successful_signup_icon.svg";
import unsuccessful_signup_icon from "/public/icons/unsuccessful_signup_icon.svg";

const ForgotpasswordPage = () => {

  // ============================== State: Loading ==============================

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorKey, setEmailErrorKey] = useState(0);
  const [popupStatus, setPopupStatus] = useState<"success" | "error" | "">("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

  // ============================== State: Loading ==============================
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ====== Validate email ======
    if (!email.trim()) {
      setEmailError("لطفاً ایمیل را وارد کنید.");
      setEmailErrorKey(prev => prev + 1);
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("فرمت ایمیل صحیح نیست.");
      setEmailErrorKey(prev => prev + 1);
      return;
    }

    setEmailError("");

    setIsLoading(true);

    try {
      const res = await requestPasswordReset({ email });
      console.log("Reset request successful:", res);
      setPopupStatus("success");
    } catch (err: any) {
      console.error("Request error:", err.message);
      setPopupStatus("error");
    } finally {
      setIsLoading(false); // بعد از موفق یا ناموفق، لودینگ قطع بشه
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">
     
      {/* ====== Brand Logo ====== */}
      <div className="d-flex align-items-center position-fixed top-0 end-0 ms-4 mt-4">
        <div className="forgot-page-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={odessay_logo} alt="Odessay Logo" className="forgot-page-logo-img me-4" />
      </div>

      {/* ========== Loading ========== */}
      {isLoading && (
        <div className="forgot-loading-overlay">
          <div className="forgot-spinner"></div>
        </div>
      )}

      {/* ====== Forgot Form Box ====== */}
      <div className="forgot-box">

      <Link to="/login" className="text-end forgot-page-back-to-login text-muted small text-end">
        ← بازگشت به صفحه ورود
      </Link>

        <h2 className="fw-bold text-start mb-3 forgot-title">بازیابی رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          {/* ====== Email Field ====== */}
          <div className="mb-3 position-relative auth-input-wrapper">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control text-start pe-5 text-dark auth-input"
              placeholder="ایمیل خود را وارد کنید."
            />
            <img src={login_email_icon} alt="Email Icon" className="auth-email-icon" />

            {emailError && (
              <div className="forgot-input-error-popup" key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError("")}>×</button>
              </div>
            )}
          </div>

          <p className="text-muted small text-start ">
            ما یک پیام برای تنظیم یا بازیابی رمز عبور جدید برایتان ارسال خواهیم کرد.
          </p>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn align-items-center gap-1 forgot-btn">
              <span className="text-white fw-bold forgot-btn-text">ارسال کد</span>
              <img src={forgetpassword_sendcode_icon} alt="send icon" className="forgot-btn-sent-icon" />
            </button>
          </div>
        </form>

        {/* ====== Popup Message (Success / Error) ====== */}
        {popupStatus && (
          <div className={`forgot-password-popup-warning-overlay ${popupStatus}`}>
            <div className="forgot-password-warning-popup-card text-center">
              <button
                className="forgot-password-warning-popup-close-btn"
                onClick={() => setPopupStatus("")}
              >
                ×
              </button>
              <img
                src={popupStatus === "success" ? successful_signup_icon : unsuccessful_signup_icon}
                className="forgot-password-warning-popup-emoji"
                alt="status-icon"
              />
              <div className="forgot-password-warning-popup-line-separator"></div>
              <h5 className="fw-bold mb-2">
                {popupStatus === "success"
                  ? "ایمیل با موفقیت ارسال شد!"
                  : "ارسال ایمیل با خطا مواجه شد!"}
              </h5>
              <p className="text-muted small">
                {popupStatus === "success"
                  ? "لطفاً ایمیلت رو بررسی کن."
                  : "لطفاً اتصال اینترنت یا صحت ایمیلت رو چک کن."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotpasswordPage;
