import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/userService";
import styles from "./LoginPage.module.css";

// ============================== Icon Imports ==============================
import OdessayLogo from "/public/icons/odessay_logo.svg";
import login_padlock_icon from "/public/icons/login_padlock_icon.svg";
import login_eye_icon from "/public/icons/login_eye_icon.svg";
import login_eye_off_icon from "/public/icons/login_eye_off_icon.svg";
import login_email_icon from "/public/icons/login_email_icon.svg";
import login_google_icon from "/public/icons/login_google_icon.svg";
import successful_signup_icon from "/public/icons/successful_signup_icon.svg";
import unsuccessful_signup_icon from "/public/icons/unsuccessful_signup_icon.svg";

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [emailErrorType, setEmailErrorType] = useState<
    "empty" | "invalid" | ""
  >("");
  const [emailErrorKey, setEmailErrorKey] = useState(0);

  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorType, setPasswordErrorType] = useState<"empty" | "">("");
  const [passwordErrorKey, setPasswordErrorKey] = useState(0);

  const [loginStatus, setLoginStatus] = useState<"success" | "error" | "">("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (
      (emailErrorType === "empty" && value.trim()) ||
      (emailErrorType === "invalid" && isValidEmail(value))
    ) {
      setEmailError("");
      setEmailErrorType("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (passwordErrorType === "empty" && value.trim()) {
      setPasswordError("");
      setPasswordErrorType("");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id:
            "23562081971-et56bvsvn60pfca9th7vh3c4h1pot0ob.apps.googleusercontent.com",
          ux_mode: "popup",
          callback: (response: any) => {
            fetch("https://odysseyanalytics.ir/api/api/auth-receiver", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential: response.credential }),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("username", data.username);
                // بررسی مقدار is_first_login و هدایت به صفحه مناسب
                if (data.is_first_login) {
                  window.location.href = "/welcome"; // اگر اولین ورود بود به صفحه خوشامدگویی برو
                } else {
                  window.location.href = "/dashboard"; // اگر اولین ورود نبود به داشبورد برو
                }
              });
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById("g_id_signin") as HTMLElement,
          {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "pill",
            logo_alignment: "left",
          }
        );
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!email.trim()) {
      setEmailError("لطفاً ایمیل یا نام کاربری را وارد کنید.");
      setEmailErrorType("empty");
      setEmailErrorKey((prev) => prev + 1);
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("فرمت ورودی صحیح نیست.");
      setEmailErrorType("invalid");
      setEmailErrorKey((prev) => prev + 1);
      valid = false;
    } else {
      setEmailError("");
      setEmailErrorType("");
    }

    if (!password.trim()) {
      setPasswordError("لطفاً رمز عبور را وارد کنید.");
      setPasswordErrorType("empty");
      setPasswordErrorKey((prev) => prev + 1);
      valid = false;
    } else {
      setPasswordError("");
      setPasswordErrorType("");
    }

    if (!valid) return;

    setIsLoading(true);

    try {
      const result = await login({ identifier: email, password });
      localStorage.setItem("accessToken", result.access);
      localStorage.setItem("username", result.username);
      setLoginStatus("success");

      setTimeout(() => {
        navigate("/welcome");
      }, 2000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const serverMessage = error.response.data.error;
        if (serverMessage === "Invalid password")
          setErrorMessage("رمز عبور معتبر نمی‌باشد.");
        else if (serverMessage === "Invalid username/email")
          setErrorMessage("نام کاربری یا ایمیل موجود نیست.");
        else setErrorMessage("خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      } else {
        setErrorMessage(
          "خطایی رخ داده است. لطفاً اتصال اینترنت را بررسی کنید."
        );
      }
      setLoginStatus("error");
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div
        className={`d-flex align-items-center position-fixed top-0 end-0 ms-4 mt-4`}
      >
        <div className={`${styles.loginBrandText} text-white me-3`}>
          ODESSAY
        </div>
        <img
          src={OdessayLogo}
          alt="Odessay Logo"
          className={`${styles.loginLogoImg} me-4`}
        />
      </div>

      {isLoading && (
        <div className={styles.loginLoadingOverlay}>
          <div className={styles.loginSpinner}></div>
        </div>
      )}

      <div className={styles.loginBox}>
        <Link
          to="/"
          className={`text-muted d-block text-end ${styles.loginBackToHome}`}
        >
          ← بازگشت به صفحه اصلی
        </Link>
        <h2 className={`fw-bold mb-3 ${styles.loginTitle}`}>ورود</h2>
        <p className={`text-muted ${styles.loginSubtitle}`}>
          ورود با استفاده از ایمیل
        </p>

        <form onSubmit={handleLogin}>
          <div className={`mb-3 position-relative ${styles.loginInputWrapper}`}>
            <input
              type="text"
              className={`form-control ${styles.loginInput}`}
              placeholder="ایمیل یا نام کاربری خود را وارد کنید."
              value={email}
              onChange={handleEmailChange}
            />
            <img
              src={login_email_icon}
              alt="email icon"
              className={styles.loginEmailIcon}
            />
            {emailError && (
              <div className={styles.loginInputErrorPopup} key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError("")}>
                  ×
                </button>
              </div>
            )}
          </div>

          <div className={`mb-3 position-relative ${styles.loginInputWrapper}`}>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${styles.loginInput}`}
              placeholder="رمز عبور خود را وارد کنید."
              value={password}
              onChange={handlePasswordChange}
            />
            <img
              src={login_padlock_icon}
              alt="password icon"
              className={styles.loginPasswordIcon}
            />
            <img
              src={showPassword ? login_eye_icon : login_eye_off_icon}
              alt="toggle password"
              className={styles.loginEyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            />
            {passwordError && (
              <div
                className={styles.loginInputErrorPopup}
                key={passwordErrorKey}
              >
                <span>{passwordError}</span>
                <button type="button" onClick={() => setPasswordError("")}>
                  ×
                </button>
              </div>
            )}
          </div>

          <button type="submit" className={`btn ${styles.loginBtn}`}>
            ورود
          </button>

          <div
            className={`text-muted small px-2 my-3 ${styles.loginNonRegisterRememberPassword}`}
          >
            <span>
              ثبت‌نام نکرده‌اید؟{" "}
              <Link
                to="/signup"
                className={`fw-bold text-decoration-none ${styles.loginNonRegisterRememberPassword}`}
              >
                ایجاد حساب
              </Link>
            </span>
            <div>
              <Link
                to="/forgot-password"
                className={`fw-bold text-decoration-none ${styles.loginNonRegisterRememberPassword}`}
              >
                فراموشی رمز عبور
              </Link>
            </div>
          </div>

          <hr className="my-3" />

          {loginStatus && (
            <div
              className={`${styles.loginPopupWarningOverlay} ${
                loginStatus === "success"
                  ? styles.loginPopupWarningOverlaySuccess
                  : styles.loginPopupWarningOverlayError
              }`}
            >
              <div className={styles.loginWarningPopupCard}>
                <button
                  className={styles.loginWarningPopupCloseBtn}
                  onClick={() => setLoginStatus("")}
                >
                  ×
                </button>
                <img
                  src={
                    loginStatus === "success"
                      ? successful_signup_icon
                      : unsuccessful_signup_icon
                  }
                  className={styles.loginWarningPopupEmoji}
                  alt="status-icon"
                />
                <div className={styles.loginWarningPopupLineSeparator}></div>
                <h5>
                  {loginStatus === "success"
                    ? "ورود با موفقیت انجام شد!"
                    : "خطایی رخ داده است!"}
                </h5>
                <p className="text-muted small">
                  {loginStatus === "success"
                    ? "در حال انتقال به حساب کاربری..."
                    : errorMessage}
                </p>
              </div>
            </div>
          )}

          <div id="g_id_signin"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
