import { useState } from "react";
import { requestPasswordReset } from "../../services/userService";
import "./ForgotpasswordPage.css";

import logoImage from '/public/icons/odessay_logo.svg';
import loginEmailIcon from '/public/icons/login_email_icon.svg';
import sendcodeIcon from "/public/icons/forgetpassword_sendcode_icon.svg";
import successful_signup_icon from "/public/icons/successful_signup_icon.svg";
import unsuccessful_signup_icon from "/public/icons/unsuccessful_signup_icon.svg";

const ForgotpasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorKey, setEmailErrorKey] = useState(0);
  const [popupStatus, setPopupStatus] = useState<"success" | "error" | "">("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

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

    try {
      const res = await requestPasswordReset({ email });
      console.log("Reset request successful:", res);
      setPopupStatus("success");
    } catch (err: any) {
      console.error("Request error:", err.message);
      setPopupStatus("error");
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">
      {/* ====== Brand Logo ====== */}
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={logoImage} alt="Odessay Logo" className="website-logo-img me-4" />
      </div>

      {/* ====== Forgot Form Box ====== */}
      <div className="forgot-box mx-auto ms-lg-5 position-relative">
        <h2 className="fw-bold text-start mb-3 forgot-title">بازیابی رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          {/* ====== Email Field ====== */}
          <div className="mb-3 position-relative forgot-input-wrapper">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control text-start pe-5 text-dark forgot-input"
              placeholder="ایمیل خود را وارد کنید."
            />
            <img src={loginEmailIcon} alt="Email Icon" className="forgot-email-icon" />

            {emailError && (
              <div className="forgot-input-error-popup" key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError("")}>×</button>
              </div>
            )}
          </div>

          <p className="text-muted small text-start">
            ما یک پیام برای تنظیم یا بازیابی رمز عبور جدید برایتان ارسال خواهیم کرد.
          </p>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn d-flex align-items-center gap-1 forgot-btn">
              <span className="text-white fw-bold forgot-btn-text">ارسال کد</span>
              <img src={sendcodeIcon} alt="send icon" style={{ width: "30px", height: "25px" }} />
            </button>
          </div>

          {/* ====== Test Success Button (Mock) ====== */}
          <div className="text-center mt-2">
            <button type="button" className="btn btn-sm btn-outline-success" onClick={() => setPopupStatus("success")}>
              تست موفقیت (ماک)
            </button>
          </div>
        </form>

        {/* ====== Popup Message (Success / Error) ====== */}
        {popupStatus && (
          <div className={`login-popup-warning-overlay ${popupStatus}`}>
            <div className="login-warning-popup-card text-center">
              <button
                className="login-warning-popup-close-btn"
                onClick={() => setPopupStatus("")}
              >
                ×
              </button>
              <img
                src={popupStatus === "success" ? successful_signup_icon : unsuccessful_signup_icon}
                className="login-warning-popup-emoji"
                alt="status-icon"
              />
              <div className="login-warning-popup-line-separator"></div>
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
