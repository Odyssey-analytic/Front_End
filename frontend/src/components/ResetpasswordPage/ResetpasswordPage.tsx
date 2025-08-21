import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ResetpasswordPage.module.css";

import signupPadlockIcon from "/public/icons/signup_padlock_icon.svg";
import OdessayLogo from "/public/icons/odessay_logo.svg";
import forgetpassword_sendcode_icon from "/public/icons/forgetpassword_sendcode_icon.svg";
import successful_signup_icon from "/public/icons/successful_signup_icon.svg";
import unsuccessful_signup_icon from "/public/icons/unsuccessful_signup_icon.svg";

const ResetpasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [popupStatus, setPopupStatus] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!password.trim()) {
      setPasswordError("رمز عبور را وارد کنید.");
      valid = false;
    } else {
      setPasswordError("");
    }

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
      const res = await fetch(
        `https://odysseyanalytics.ir/api/api/reset-password/${token}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password,
            confirm_password: confirmPassword,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.message || errData.detail || "خطا در تغییر رمز عبور"
        );
      }

      setPopupStatus("success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error("Reset error:", err.message);
      setErrorMessage(err.message);
      setPopupStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Logo */}
      <div className="d-flex align-items-center position-fixed top-0 end-0 ms-4 mt-4">
        <div className={`${styles.brandText} english-text text-white me-3`}>
          ODESSAY
        </div>
        <img src={OdessayLogo} alt="Odessay Logo" className={`${styles.logoImg} me-4`} />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {/* Form Box */}
      <div className={styles.box}>
        <Link to="/login" className={`text-muted d-block text-end ${styles.backToLogin}`}>
          ← بازگشت به صفحه ورود
        </Link>

        <h2 className={styles.title}>تغییر رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          {/* Password */}
          <div className={styles.inputWrapper}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} form-control text-start text-dark`}
              placeholder="رمز عبور جدید"
            />
            <img src={signupPadlockIcon} alt="lock icon" className={styles.signupPadlockIcon} />
            {passwordError && (
              <div className={styles.inputErrorPopup}>
                <span>{passwordError}</span>
                <button type="button" onClick={() => setPasswordError("")}>×</button>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputWrapper}>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} form-control text-start text-dark`}
              placeholder="تأیید رمز عبور جدید"
            />
            <img src={signupPadlockIcon} alt="lock icon" className={styles.signupPadlockIcon} />
            {confirmPasswordError && (
              <div className={styles.inputErrorPopup}>
                <span>{confirmPasswordError}</span>
                <button type="button" onClick={() => setConfirmPasswordError("")}>×</button>
              </div>
            )}
          </div>

          {errorMessage && <div className="alert alert-danger text-center my-2">{errorMessage}</div>}

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className={styles.btn}>
              <span className={styles.btnText}>ثبت رمز جدید</span>
              <img src={forgetpassword_sendcode_icon} alt="send icon" className={styles.btnSentIcon} />
            </button>
          </div>
        </form>

        {/* Popup */}
        {popupStatus && (
          <div className={`${styles.popupOverlay} ${popupStatus}`}>
            <div className={styles.popupCard}>
              <button className={styles.popupCloseBtn} onClick={() => setPopupStatus("")}>×</button>
              <img
                src={popupStatus === "success" ? successful_signup_icon : unsuccessful_signup_icon}
                className={styles.popupEmoji}
                alt="status-icon"
              />
              <div className={styles.popupLineSeparator}></div>
              <h5 className={popupStatus === "success" ? styles.successTitle : styles.errorTitle}>
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
