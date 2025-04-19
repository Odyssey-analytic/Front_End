import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/userService';
import './SignupPage.css';

import odessay_logo from '/public/icons/odessay_logo.svg';
import login_email_icon from '/public/icons/login_email_icon.svg';
import signup_user_icon from '/public/icons/signup_user_icon.svg';
import signup_eye_icon from '/public/icons/signup_eye_icon.svg';
import signup_eye_off_icon from '/public/icons/signup_eye_off_icon.svg';
import successful_signup_icon from '/public/icons/successful_signup_icon.svg';
import unsuccessful_signup_icon from '/public/icons/unsuccessful_signup_icon.svg';

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailErrorKey, setEmailErrorKey] = useState(0);
  const [emailErrorType, setEmailErrorType] = useState<'empty' | 'invalid' | ''>('');

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorType, setUsernameErrorType] = useState<'empty' | 'invalid' | ''>('');
  const [usernameErrorKey, setUsernameErrorKey] = useState(0);

  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [confirmPasswordErrorKey, setConfirmPasswordErrorKey] = useState(0);

  // Status for popup
  const [signupStatus, setSignupStatus] = useState<'success' | 'error' | ''>('');

  // Timed hiding for email error
  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => setEmailError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [emailErrorKey]);

  // Timed hiding for username error
  useEffect(() => {
    if (usernameErrorType === 'empty' && usernameError) {
      const timer = setTimeout(() => {
        setUsernameError('');
        setUsernameErrorType('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [usernameErrorKey]);

  // Timed hiding for password confirmation error
  useEffect(() => {
    if (confirmPasswordError) {
      const timer = setTimeout(() => setConfirmPasswordError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [confirmPasswordErrorKey]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
  const isValidUsername = (username: string) => /^[a-zA-Z0-9._]{3,20}$/.test(username);

  // Input handlers with error cleaning
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

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // if (!email.trim()) {
    //   setEmailError('لطفاً ایمیل خود را وارد کنید.');
    //   setEmailErrorType('empty');
    //   setEmailErrorKey(prev => prev + 1);
    //   valid = false;
    // } else if (!isValidEmail(email)) {
    //   setEmailError('ایمیل وارد شده معتبر نیست.');
    //   setEmailErrorType('invalid');
    //   setEmailErrorKey(prev => prev + 1);
    //   valid = false;
    // }

    // if (!username.trim()) {
    //   setUsernameError('لطفاً نام کاربری را وارد کنید.');
    //   setUsernameErrorType('empty');
    //   setUsernameErrorKey(prev => prev + 1);
    //   valid = false;
    // } else if (!isValidUsername(username)) {
    //   setUsernameError('نام کاربری باید بین ۳ تا ۲۰ حرف و شامل حروف، عدد، نقطه یا زیرخط باشد.');
    //   setUsernameErrorType('invalid');
    //   setUsernameErrorKey(prev => prev + 1);
    //   valid = false;
    // }

    // if (confirmPassword !== password) {
    //   setConfirmPasswordError('رمز عبور و تکرار آن یکسان نیستند.');
    //   setConfirmPasswordErrorKey(prev => prev + 1);
    //   valid = false;
    // }

    if (!valid) return;

    try {
      const data = { username, email, password, confirm_password: confirmPassword };
      const result = await signup(data);
      console.log('Signup successful:', result);
      setSignupStatus('success');
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      setErrorMessage('');
      setSignupStatus('error');
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 signup-page-container px-3">
      {/* Brand section */}
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src={odessay_logo} alt="Odessay Logo" className="website-logo-img me-4" />
      </div>

      <div className="mx-auto ms-lg-5 signup-box position-relative">
        <div className={`signup-form-wrapper ${signupStatus ? 'blurred' : ''}`}>
          <h2 className="fw-bold text-start mb-3 signup-title">ثبت‌نام</h2>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="mb-3 position-relative">
              <input type="text" className="form-control text-start pe-5 signup-input" placeholder="ایمیل" value={email} onChange={handleEmailChange} />
              <img src={login_email_icon} alt="email icon" className="signup-email-icon" />
              {emailError && <div className="input-error-popup" key={emailErrorKey}>{emailError}</div>}
            </div>

            {/* Username field */}
            <div className="mb-3 position-relative ">
              <input type="text" className="form-control signup-input" value={username} onChange={handleUsernameChange} />
              {!username && <div className="signup-custom-placeholder">نام کاربری<span className="hint"> (۳–۲۰ کاراکتر، فقط a-z، 0–9، . یا _)</span></div>}
              <img src={signup_user_icon} alt="username icon" className="signup-user-icon" />
              {usernameError && <div className="input-error-popup" key={usernameErrorKey}>{usernameError}</div>}
            </div>

            {/* Password field */}
            <div className="mb-3 position-relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="form-control signup-input" placeholder="رمز عبور" />
              <img src={showPassword ? signup_eye_icon : signup_eye_off_icon} alt="toggle password" className="signup-eye-icon" onClick={() => setShowPassword(prev => !prev)} />
            </div>

            {/* Confirm password field */}
            <div className="mb-3 position-relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={handleConfirmPasswordChange} className="form-control signup-input" placeholder="تأیید رمز عبور" />
              <img src={showConfirmPassword ? signup_eye_icon : signup_eye_off_icon} alt="toggle confirm password" className="signup-eye-icon" onClick={() => setShowConfirmPassword(prev => !prev)} />
              {confirmPasswordError && <div className="input-error-popup" key={confirmPasswordErrorKey}>{confirmPasswordError}</div>}
            </div>

            {/* General error */}
            {errorMessage && <div className="alert alert-danger text-center mt-2">{errorMessage}</div>}

            {/* Submit button */}
            <button type="submit" className="btn w-100 signup-btn">ثبت نام</button>

            <p className="text-muted small mt-3">
              با ثبت‌نام، شما با <a href="#" className="signup-agreement-text">قوانین و شرایط</a> ما موافقت می‌کنید.
            </p>

            {/* Popup feedback */}
            {signupStatus && (
  <div className={`signup-popup-overlay ${signupStatus}`}>
    <div className="signup-popup-card text-center">
      <button className="close-btn" onClick={() => setSignupStatus('')}>×</button>

      {/* آیکون */}
      <img
        src={signupStatus === 'success' ? successful_signup_icon : unsuccessful_signup_icon}
        className="popup-image"
        alt="status-icon"
      />

      {/* خط جداکننده */}
      <div className="popup-separator"></div>

      {/* عنوان و متن */}
      <h5 className="fw-bold mb-2">
        {signupStatus === 'success' ? 'ثبت‌نام با موفقیت انجام شد!' : 'خطایی رخ داده است!'}
      </h5>
      <p className="text-muted small">
        {signupStatus === 'success'
          ? 'حالا می‌تونی وارد حساب کاربریت بشی.'
          : 'لطفاً اطلاعات وارد شده رو بررسی کن و دوباره امتحان کن.'}
      </p>
    </div>
  </div>
)}

          </form>

          {/* Mock success button for local testing */}
          <button type="button" className="btn btn-sm btn-outline-success mt-3" onClick={() => setSignupStatus('success')}>
            تست موفقیت (ماک)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
