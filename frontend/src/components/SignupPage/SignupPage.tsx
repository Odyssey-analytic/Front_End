import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/userService';
import './SignupPage.css';

// Importing icons
import odessay_logo from '/public/icons/odessay_logo.svg';
import login_email_icon from '/public/icons/login_email_icon.svg';
import signup_user_icon from '/public/icons/signup_user_icon.svg';
import signup_eye_icon from '/public/icons/signup_eye_icon.svg';
import signup_eye_off_icon from '/public/icons/signup_eye_off_icon.svg';
import successful_signup_icon from '/public/icons/successful_signup_icon.svg';
import unsuccessful_signup_icon from '/public/icons/unsuccessful_signup_icon.svg';
import signup_padlock_icon from '/public/icons/signup_padlock_icon.svg';

const SignupPage = () => {
  const navigate = useNavigate();

  // ============================== State: Loading ==============================
  const [isLoading, setIsLoading] = useState(false);

  // ========================== Form state ==========================
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // ========================== Error state ==========================
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailErrorType, setEmailErrorType] = useState<'empty' | 'invalid' | ''>('');
  const [emailErrorKey, setEmailErrorKey] = useState(0);

  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorType, setUsernameErrorType] = useState<'empty' | 'invalid' | ''>('');
  const [usernameErrorKey, setUsernameErrorKey] = useState(0);

  const [passwordError, setPasswordError] = useState('');
  const [passwordErrorKey, setPasswordErrorKey] = useState(0);

  // const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // const [confirmPasswordErrorKey, setConfirmPasswordErrorKey] = useState(0);




  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordErrorKey, setConfirmPasswordErrorKey] = useState(0);

  // ========================== Popup state ==========================
  const [signupStatus, setSignupStatus] = useState<'success' | 'error' | ''>('');

  // ========================== Validation functions ==========================
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);

  const isValidUsername = (username: string) =>
    /^(?=[a-zA-Z0-9._]{3,15}$)(?=.*[a-zA-Z])[a-zA-Z0-9._]+$/.test(username);

  // ========================== Input change handlers ==========================
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if ((emailErrorType === 'invalid' && isValidEmail(value)) || (emailErrorType === 'empty' && value.trim())) {
      setEmailError('');
      setEmailErrorType('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if ((usernameErrorType === 'invalid' && isValidUsername(value)) || (usernameErrorType === 'empty' && value.trim())) {
      setUsernameError('');
      setUsernameErrorType('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (confirmPasswordError && value === password) {
      setConfirmPasswordError('');
    }
  };

  // ========================== Submit handler ==========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('ایمیل را وارد کنید.');
      setEmailErrorType('empty');
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('فرمت ایمیل صحیح نیست.');
      setEmailErrorType('invalid');
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    }

    // Username validation
    if (!username.trim()) {
      setUsernameError('نام کاربری را وارد کنید.');
      setUsernameErrorType('empty');
      setUsernameErrorKey(prev => prev + 1);
      valid = false;
    } else if (!isValidUsername(username)) {
      setUsernameError('نام کاربری بین ۳ تا ۱۵ کاراکتر و شامل حروف باشد.');
      setUsernameErrorType('invalid');
      setUsernameErrorKey(prev => prev + 1);
      valid = false;
    }

    // Password match validation
    // if (confirmPassword !== password) {
    //   setConfirmPasswordError('رمز عبور و تأیید آن یکی نیستند.');
    //   setConfirmPasswordErrorKey(prev => prev + 1);
    //   valid = false;
    // }

    // Password validation
    if (!password.trim()) {
      setPasswordError('رمز عبور را وارد کنید.');
      setPasswordErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setPasswordError('');
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('تأیید رمز عبور را وارد کنید.');
      setConfirmPasswordErrorKey(prev => prev + 1);
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('رمز عبور و تأیید آن مطابقت ندارند.');
      setConfirmPasswordErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setConfirmPasswordError('');
    }



    if (!valid) return;

    setIsLoading(true);

    // API call to register
    try {
      const data = { username, email, password, confirm_password: confirmPassword };
      const result = await signup(data);

      console.log('Signup successful:', result);
      setSignupStatus('success');

      // Redirect after success
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      setErrorMessage('');
      setSignupStatus('error');
    } finally {
      setIsLoading(false); // بعد از موفق یا ناموفق، لودینگ قطع بشه
    }
  };

  return (
    <div className="signup-page-container">

      {/* Logo */}
      <div className="d-flex align-items-center position-fixed top-0 end-0 ms-4 mt-4">
        <div className="signup-page-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={odessay_logo} alt="Odessay Logo" className="signup-page-logo-img me-4" />
      </div>

      {/* ========== Loading ========== */}
      {isLoading && (
        <div className="signup-loading-overlay">
          <div className="signup-spinner"></div>
        </div>
      )}

      {/* Signup Form */}
      <div className="signup-page-box">

        <Link to="/login" className="text-end signup-page-back-to-login text-muted small text-end">
          ← بازگشت به صفحه ورود
        </Link>

        <h2 className="signup-page-title fw-bold text-start mb-3">ثبت‌نام</h2>

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="signup-input-wrapper mb-3 position-relative">
          
            <input type="text" className="signup-page-input form-control text-start text-dark pe-5" placeholder="ایمیل" value={email} onChange={handleEmailChange} />
            <img src={login_email_icon} alt="email icon" className="signup-email-icon" />
          
            {emailError && (
              <div className="signup-input-error-popup" key={emailErrorKey}>
                <span>{emailError}</span>
                <button type="button" onClick={() => setEmailError('')}>×</button>
              </div>
            )}
          </div>


          
          {/* <div className="signup-input-wrapper mb-3 position-relative">
            <input type="text" className="signup-page-input form-control no-focus-style" value={username} onChange={handleUsernameChange} />
            {!username && (
              <div className="signup-page-input-custom-placeholder text-muted">
                نام کاربری <span className="hint">(بین ۳ تا ۱۵ کاراکتر و شامل حروف، عدد، . یا _)</span>
              </div>
            )}
            <img src={signup_user_icon} alt="username icon" className="signup-user-icon" />
            {usernameError && (
              <div className="signup-input-error-popup" key={usernameErrorKey}>
                <span>{usernameError}</span>
                <button type="button" onClick={() => setUsernameError('')}>×</button>
              </div>
            )}
          </div> */}

          {/* Username field */}
          {/* <div className="signup-input-wrapper mb-3 position-relative">
            <input type="text" className="signup-page-input form-control no-focus-style" value={username} onChange={handleUsernameChange} />
            {!username && (
              <div className="signup-page-input-custom-placeholder text-muted">
                نام کاربری <span className="hint">(بین ۳ تا ۱۵ کاراکتر و شامل حروف، عدد، . یا _)</span>
              </div>
            )}
            <img src={signup_user_icon} alt="username icon" className="signup-user-icon" />
            {usernameError && (
              <div className="signup-input-error-popup" key={usernameErrorKey}>
                <span>{usernameError}</span>
                <button type="button" onClick={() => setUsernameError('')}>×</button>
              </div>
            )}
          </div> */}

          <div className="signup-input-wrapper mb-3 position-relative">
            <input type="text" className="signup-page-input form-control no-focus-style" placeholder="نام کاربری" value={username} onChange={handleUsernameChange} />
            
            <img src={signup_user_icon} alt="username icon" className="signup-user-icon" />
                        
            {!username && (
              <div className="signup-page-user-placeholder text-muted">
                <span className="hint">(بین ۳ تا ۱۵ کاراکتر و شامل حروف، عدد، . یا _)</span>
              </div>
            )}  
            {usernameError && (
              <div className="signup-input-error-popup" key={usernameErrorKey}>
                <span>{usernameError}</span>
                <button type="button" onClick={() => setUsernameError('')}>×</button>
              </div>
            )}
          </div>

          {/* Password field */}
          {/* <div className="mb-3 position-relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="signup-page-input form-control" placeholder="رمز عبور" />
            <img src={signup_padlock_icon} alt="password icon" className="signup-padlock-icon" />
            <img src={showPassword ? signup_eye_icon : signup_eye_off_icon} alt="toggle password" className="signup-eye-icon" onClick={() => setShowPassword((prev) => !prev)} />
          </div> */}

          {/* Password field */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-page-input form-control"
              placeholder="رمز عبور"
            />

            <img src={signup_padlock_icon} alt="password icon" className="signup-padlock-icon" />
            <img
              src={showPassword ? signup_eye_icon : signup_eye_off_icon}
              alt="toggle password"
              className="signup-eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            />

            {passwordError && (
              <div className="signup-input-error-popup" key={passwordErrorKey}>
                <span>{passwordError}</span>
                <button type="button" onClick={() => setPasswordError('')}>×</button>
              </div>
            )}
          </div>


          {/* Confirm password field */}
          <div className="mb-3 position-relative">
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              value={confirmPassword} onChange={handleConfirmPasswordChange} 
              className="signup-page-input form-control" 
              placeholder="تأیید رمز عبور" 
            />
            
            <img src={signup_padlock_icon} alt="confirm password icon" className="signup-padlock-icon" />
            <img
              src={showConfirmPassword ? signup_eye_icon : signup_eye_off_icon} 
              alt="toggle confirm password" 
              className="signup-eye-icon" 
              onClick={() => setShowConfirmPassword((prev) => !prev)} 
            />
            
            {confirmPasswordError && (
              <div className="signup-input-error-popup" key={`confirm-password-error-${confirmPasswordErrorKey}`}>
                <span>{confirmPasswordError}</span>
                <button type="button" onClick={() => setConfirmPasswordError('')}>×</button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="signup-btn btn w-100">ثبت نام</button>

          <p className="text-muted small mt-3">
            با ثبت‌نام، شما با <a href="#" className="signup-agreement-text">قوانین و شرایط</a> ما موافقت می‌کنید.
          </p>

          {/* Success/Error Popup */}
          {signupStatus && (
            <div className={`signup-popup-warning-overlay ${signupStatus}`}>
              <div className="signup-warning-popup-card text-center">
                <button className="signup-warning-popup-close-btn" onClick={() => setSignupStatus('')}>×</button>
                <img src={signupStatus === 'success' ? successful_signup_icon : unsuccessful_signup_icon} className="signup-warning-popup-emoji" alt="status-icon" />
                <div className="signup-warning-popup-line-separator"></div>
                <h5 className="fw-bold mb-2">
                  {signupStatus === 'success' ? 'ثبت‌نام با موفقیت انجام شد!' : 'خطایی رخ داده است!'}
                </h5>
                <p className="text-muted small">
                  {signupStatus === 'success'
                    ? 'حالا می‌تونی وارد حساب کاربریت بشی.'
                    : 'لطفاً اطلاعات وارد شده را بررسی کن و دوباره امتحان کن.'}
                </p>
              </div>
            </div>
          )}
        </form>


        {/* Mock test button */}
        {/* <button type="button" className="btn btn-sm btn-outline-success mt-3" onClick={() => setSignupStatus('success')}>
          تست موفقیت (ماک)
        </button> */}

      </div>
    </div>
  );
};

export default SignupPage;
