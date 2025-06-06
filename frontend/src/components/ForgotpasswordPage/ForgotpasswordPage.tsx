import { useState } from "react";
import { requestPasswordReset } from "../../services/userService";
import styles from './ForgotpasswordPage.module.css';
import { Link } from 'react-router-dom';

import OdessayLogo from '/public/icons/odessay_logo.svg';
import login_email_icon from '/public/icons/login_email_icon.svg';
import forgetpassword_sendcode_icon from "/public/icons/forgetpassword_sendcode_icon.svg";
import successful_signup_icon from "/public/icons/successful_signup_icon.svg";
import unsuccessful_signup_icon from "/public/icons/unsuccessful_signup_icon.svg";

const ForgotpasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorKey, setEmailErrorKey] = useState(0);
  const [popupStatus, setPopupStatus] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Brand Logo */}

      <div className={`d-flex align-items-center position-fixed top-0 end-0 ms-4 mt-4`}>
        <div className={`${styles.brandText} english-text text-white me-3`}>ODESSAY</div>
        <img src={OdessayLogo} alt="Odessay Logo" className={`${styles.logoImg} me-4`} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* Forgot Form Box */}
      <div className={styles.box}>
        <Link to="/login" className={`text-muted d-block text-end ${styles.backToLogin}`}>
          ← بازگشت به صفحه ورود
        </Link>

        <h2 className={styles.title}>بازیابی رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} form-control text-start text-dark`}
              placeholder="ایمیل خود را وارد کنید."
            />
            <img src={login_email_icon} alt="Email Icon" className={styles.emailIcon} />

            {emailError && (
              <div className={styles.inputErrorPopup} key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError("")}>×</button>
              </div>
            )}
          </div>

          <p className={styles.infoText}>
            ما یک پیام برای تنظیم یا بازیابی رمز عبور جدید برایتان ارسال خواهیم کرد.
          </p>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className={styles.btn}>
              <span className={styles.btnText}>ارسال کد</span>
              <img src={forgetpassword_sendcode_icon} alt="send icon" className={styles.btnSentIcon} />
            </button>
          </div>
        </form>

        {/* Popup Message (Success / Error) */}
        {popupStatus && (
          <div className={`${styles.popupOverlay} ${popupStatus}`}>
            <div className={styles.popupCard}>
              <button
                className={styles.popupCloseBtn}
                onClick={() => setPopupStatus("")}
              >
                ×
              </button>
              <img
                src={popupStatus === "success" ? successful_signup_icon : unsuccessful_signup_icon}
                className={styles.popupEmoji}
                alt="status-icon"
              />
              <div className={styles.popupLineSeparator}></div>
              <h5 className={popupStatus === "success" ? styles.successTitle : styles.errorTitle}>
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