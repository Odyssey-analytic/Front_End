import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';
import './LoginPage.css';

// ============================== Icon Imports ==============================
import OdessayLogo from '/public/icons/odessay_logo.svg';
import login_padlock_icon from '/public/icons/login_padlock_icon.svg';
import login_eye_icon from '/public/icons/login_eye_icon.svg';
import login_eye_off_icon from '/public/icons/login_eye_off_icon.svg';
import login_email_icon from '/public/icons/login_email_icon.svg';
import login_google_icon from '/public/icons/login_google_icon.svg';
import successful_signup_icon from '/public/icons/successful_signup_icon.svg';
import unsuccessful_signup_icon from '/public/icons/unsuccessful_signup_icon.svg';

const LoginPage = () => {
  const navigate = useNavigate();

  // ============================== State: Form Fields ==============================
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ============================== State: Validation Errors ==============================
  const [emailError, setEmailError] = useState('');
  const [emailErrorType, setEmailErrorType] = useState<'empty' | 'invalid' | ''>('');
  const [emailErrorKey, setEmailErrorKey] = useState(0);

  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorType, setPasswordErrorType] = useState<'empty' | ''>('');
  const [passwordErrorKey, setPasswordErrorKey] = useState(0);

  // ============================== State: Login Result Popup ==============================
  const [loginStatus, setLoginStatus] = useState<'success' | 'error' | ''>('');
  const [errorMessage, setErrorMessage] = useState('');

  // ============================== Helper: Email Validation ==============================
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  // ============================== Input Handlers ==============================
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if ((emailErrorType === 'empty' && value.trim()) || (emailErrorType === 'invalid' && isValidEmail(value))) {
      setEmailError('');
      setEmailErrorType('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (passwordErrorType === 'empty' && value.trim()) {
      setPasswordError('');
      setPasswordErrorType('');
    }
  };

  // ============================== Submit Handler ==============================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Validate email field
    if (!email.trim()) {
      setEmailError('لطفاً ایمیل یا نام کاربری را وارد کنید.');
      setEmailErrorType('empty');
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('فرمت ورودی صحیح نیست.');
      setEmailErrorType('invalid');
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setEmailError('');
      setEmailErrorType('');
    }

    // Validate password field
    if (!password.trim()) {
      setPasswordError('لطفاً رمز عبور را وارد کنید.');
      setPasswordErrorType('empty');
      setPasswordErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setPasswordError('');
      setPasswordErrorType('');
    }

    if (!valid) return;

    try {
      const data = { identifier: email, password };
      const result = await login(data);

      localStorage.setItem('accessToken', result.access);
      localStorage.setItem('username', result.user.username);

      setLoginStatus('success');

      setTimeout(() => {
        if (result.user.is_first_login) {
          navigate('/welcome');
        } else {
          navigate('/login/dashboard');
        }
      }, 2000);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      setErrorMessage('نام کاربری یا رمز عبور نادرست است.');
      setLoginStatus('error');
    }
  };

  // ============================== JSX ==============================
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 login-page-container px-3">

      {/* ========== Brand Logo ========== */}
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={OdessayLogo} alt="Odessay Logo" className="website-logo-img me-4" />
      </div>


      {/* ========== Login Box ========== */}
      <div className="login-box mx-auto ms-lg-5 position-relative">
        <Link to="/" className="login-back-to-home text-muted small">
            ← بازگشت به صفحه اصلی
        </Link>

        <h2 className="fw-bold text-start mb-3 login-title">ورود</h2>
        <p className="text-muted text-start login-subtitle">ورود با استفاده از ایمیل</p>

        <form onSubmit={handleLogin}>
          {/* ========== Email Input ========== */}
          <div className="mb-3 position-relative login-input-wrapper">
            <input
              type="text"
              className="form-control text-start pe-5 text-dark login-input"
              placeholder="ایمیل یا نام کاربری خود را وارد کنید."
              value={email}
              onChange={handleEmailChange}
            />
            <img src={login_email_icon} alt="email icon" className="login-email-icon" />
            {emailError && (
              <div className="login-input-error-popup" key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError('')}>×</button>
              </div>
            )}
          </div>

          {/* ========== Password Input ========== */}
          <div className="mb-3 position-relative login-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control text-start pe-5 text-dark login-input"
              placeholder="رمز عبور خود را وارد کنید."
              value={password}
              onChange={handlePasswordChange}
            />
            <img src={login_padlock_icon} alt="password icon" className="login-password-icon" />
            <img
              src={showPassword ? login_eye_icon : login_eye_off_icon}
              alt="toggle password"
              className="login-eye-icon"
              onClick={() => setShowPassword(prev => !prev)}
            />
            {passwordError && (
              <div className="login-input-error-popup" key={passwordErrorKey}>
                <span>{passwordError}</span>
                <button type="button" onClick={() => setPasswordError('')}>×</button>
              </div>
            )}
          </div>

          {/* ========== Submit Button ========== */}
          <button type="submit" className="btn w-100 login-btn">ورود</button>

          {/* ========== Links ========== */}
          <div className="text-muted small px-2 my-3 text-start login-non-register-remember-password">
            <span>ثبت‌نام نکرده‌اید؟{' '}
              <Link to="/signup" className="fw-bold text-decoration-none login-non-register-remember-password">
                ایجاد حساب
              </Link>
            </span>
            <div>
              <Link to="/forgot-password" className="fw-bold text-decoration-none login-non-register-remember-password">
                فراموشی رمز عبور
              </Link>
            </div>
          </div>

          <hr className="my-4" />

          {/* ========== Popup Result ========== */}
          {loginStatus && (
            <div className={`login-popup-warning-overlay ${loginStatus}`}>
              <div className="login-warning-popup-card text-center">
                <button className="login-warning-popup-close-btn" onClick={() => setLoginStatus('')}>×</button>
                <img
                  src={loginStatus === 'success' ? successful_signup_icon : unsuccessful_signup_icon}
                  className="login-warning-popup-emoji"
                  alt="status-icon"
                />
                <div className="login-warning-popup-line-separator"></div>
                <h5 className="fw-bold mb-2">
                  {loginStatus === 'success' ? 'ورود با موفقیت انجام شد!' : 'خطایی رخ داده است!'}
                </h5>
                <p className="text-muted small">
                  {loginStatus === 'success'
                    ? 'در حال انتقال به حساب کاربری...'
                    : errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* ========== Mock Test Button ========== */}
          <button type="button" className="btn btn-sm btn-outline-success mt-1" onClick={() => setLoginStatus('success')}>
            تست موفقیت (ماک)
          </button>

          {/* ========== Google Login Placeholder ========== */}
          <button type="button" className="btn login-google-btn d-flex align-items-center w-80 px-4 mx-auto">
            <span className="fw-bold text-white ms-auto me-4 login-google-btn-enter-text">ورود با استفاده از</span>
            <div className="d-flex align-items-center gap-2 me-auto">
              <span className="fw-bold text-white login-google-btn-google-text">Google</span>
              <img src={login_google_icon} alt="Google" width="23" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
