import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ResetpasswordPage.css";
import "../AuthPages/AuthPages.css"

import odessay_logo from '/public/icons/odessay_logo.svg';
import signup_padlock_icon from '/public/icons/signup_padlock_icon.svg';
import forgetpassword_sendcode_icon from '/public/icons/forgetpassword_sendcode_icon.svg';
import successful_signup_icon from '/public/icons/successful_signup_icon.svg';
import unsuccessful_signup_icon from '/public/icons/unsuccessful_signup_icon.svg';

const ResetpasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [popupStatus, setPopupStatus] = useState<'success' | 'error' | ''>('');

  // ============================== State: Loading ==============================
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    // ===== Validate password =====
    if (!password.trim()) {
      setPasswordError("رمز عبور را وارد کنید.");
      valid = false;
    } else {
      setPasswordError("");
    }

    // ===== Validate confirm password =====
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("تأیید رمز عبور را وارد کنید.");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("رمز عبور و تأیید آن یکسان نیستند.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      const response = await fetch(`https://odysseyanalytics.ir/api/api/reset-password/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirm_password: confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.detail || "Reset password failed.");
      }

      setPopupStatus('success');
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      console.error("Reset error:", error.message);
      // setErrorMessage(error.message || "Failed to reset password. Please try again.");
      setPopupStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 auth-page-container px-3">
      {/* ===== Brand ===== */}
      <div className="d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="auth-page-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={odessay_logo} alt="Odessay Logo" className="auth-page-logo-img me-4" />
      </div>

      {isLoading && (
        <div className="auth-loading-overlay">
          <div className="auth-spinner"></div>
        </div>
      )}
      
      {/* ===== Reset Form Box ===== */}
      <div className="reset-box mx-auto ms-lg-5 position-relative">
        <h2 className="fw-bold text-start mb-3 auth-title">تغییر رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          {/* ===== Password Field ===== */}
          <div className="mb-3 position-relative auth-input-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control text-start pe-5 text-dark auth-input"
              placeholder="رمز عبور جدید"
            />
            <img src={signup_padlock_icon} alt="lock icon" className="signup-form-container-padlock-icon" />
            {passwordError && (
              <div className="auth-input-error-popup">
                <span>{passwordError}</span>
                <button type="button" onClick={() => setPasswordError("")}>×</button>
              </div>
            )}
          </div>

          {/* ===== Confirm Password Field ===== */}
          <div className="mb-3 position-relative reset-input-wrapper">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control text-start pe-5 text-dark auth-input"
              placeholder="تأیید رمز عبور جدید"
            />
            <img src={signup_padlock_icon} alt="lock icon" className="signup-form-container-padlock-icon" />
            {confirmPasswordError && (
              <div className="auth-input-error-popup">
                <span>{confirmPasswordError}</span>
                <button type="button" onClick={() => setConfirmPasswordError("")}>×</button>
              </div>
            )}
          </div>

          {/* ===== General Server Error ===== */}
          {errorMessage && (
            <div className="alert alert-danger text-center my-2">{errorMessage}</div>
          )}

          <Link to="/login" className="auth-back-to-home text-muted small">
              ← بازگشت به صفحه ورود
          </Link>

          {/* ===== Submit Button ===== */}
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn d-flex align-items-center gap-1 reset-btn">
              <span className="text-white fw-bold reset-btn-text">ثبت رمز جدید</span>
              <img src={forgetpassword_sendcode_icon} alt="send icon" style={{ width: '30px', height: '25px' }} />
            </button>
          </div>
          
          {/* ===== Test Success Button (Mock) ===== */}
          {/* <div className="text-center mt-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => setPopupStatus("success")}
            >
              تست موفقیت (ماک)
            </button>
          </div>
           */}
        </form>

        {/* ===== Popup Overlay ===== */}
        {popupStatus && (
          <div className={`reset-popup-warning-overlay ${popupStatus}`}>
            <div className="reset-warning-popup-card text-center">
              <button
                className="reset-warning-popup-close-btn"
                onClick={() => setPopupStatus("")}
              >
                ×
              </button>
              <img src={popupStatus === "success" ? successful_signup_icon : unsuccessful_signup_icon} className="reset-warning-popup-emoji" alt="status-icon"/>
              <div className="reset-warning-popup-line-separator"></div>
              <h5 className="fw-bold mb-2">
                {popupStatus === "success"
                  ? "رمز عبور با موفقیت تغییر کرد!"
                  : "تغییر رمز عبور با خطا مواجه شد!"}
              </h5>
              <p className="text-muted small">
                {popupStatus === "success"
                  ? "اکنون می‌توانید وارد حساب کاربری شوید."
                  : "لطفاً اتصال اینترنت یا لینک بازیابی را بررسی کنید."}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResetpasswordPage;
