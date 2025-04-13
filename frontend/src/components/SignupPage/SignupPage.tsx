import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/userService';
import './SignupPage.css';


const SignupPage = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
    
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


  useEffect(() => {
    if (emailError) {
      const timer = setTimeout(() => {
        setEmailError('');
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [emailErrorKey]);
  

  useEffect(() => {
    if (usernameErrorType === 'empty' && usernameError) {
      const timer = setTimeout(() => {
        setUsernameError('');
        setUsernameErrorType('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [usernameErrorKey]);
  

  useEffect(() => {
    if (confirmPasswordError) {
      const timer = setTimeout(() => setConfirmPasswordError(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [confirmPasswordErrorKey]);
  

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  const isValidUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9._]{3,20}$/;
    return regex.test(username);
  };
  

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  
    if (emailErrorType === 'invalid' && (value.trim() === '' || isValidEmail(value))) {
      setEmailError('');
      setEmailErrorType('');
    }
  
    if (emailErrorType === 'empty' && value.trim() !== '') {
      setEmailError('');
      setEmailErrorType('');
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  
    if (usernameErrorType === 'invalid' && (value.trim() === '' || isValidUsername(value))) {
      setUsernameError('');
      setUsernameErrorType('');
    }
  
    if (usernameErrorType === 'empty' && value.trim() !== '') {
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
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (email.trim() === '') {
      setEmailError('لطفاً ایمیل خود را وارد کنید.');
      setEmailErrorType('empty'); 
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('ایمیل وارد شده معتبر نیست.');
      setEmailErrorType('invalid'); 
      setEmailErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setEmailError('');
      setEmailErrorType('');
    }
    

    if (username.trim() === '') {
      setUsernameError('لطفاً نام کاربری را وارد کنید.');
      setUsernameErrorType('empty');
      setUsernameErrorKey(prev => prev + 1);
      valid = false;
    } else if (!isValidUsername(username)) {
      setUsernameError('نام کاربری باید بین ۳ تا ۲۰ حرف و شامل حروف، عدد، نقطه یا زیرخط باشد.');
      setUsernameErrorType('invalid');
      setUsernameErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setUsernameError('');
      setUsernameErrorType('');
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('رمز عبور و تکرار آن یکسان نیستند.');
      setConfirmPasswordErrorKey(prev => prev + 1);
      valid = false;
    } else {
      setConfirmPasswordError('');
    }    

    if (!valid) return;

    try {

      const data = {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      };
      const result = await signup(data);
      console.log('Signup successful:', result);

      navigate('/login');
    
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      setErrorMessage(error.message || 'Something went wrong');
    }
    
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 signup-page-container px-3">
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>
      <div className="mx-auto ms-lg-5 signup-box">
        <h2 className="fw-bold text-start mb-3 signup-title">ثبت‌نام</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
            <div className="mb-3 position-relative">
              <input
              // type="email" --> the error box is default from HTML5
                type="text"
                className="form-control text-start pe-5 signup-input"
                placeholder="ایمیل"
                value={email}
                onChange={handleEmailChange}
              />
              <img
                src="/src/assets/icons/login_email_icon.svg"
                alt="email icon"
                className="signup-email-icon"
              />
              {emailError && (
                <div className="input-error-popup" key={emailErrorKey}>
                  {emailError}
                </div>
              )}
            </div>

            {/* Username */}
            <div className="mb-3 position-relative ">
              <input
                type="text"
                className="form-control signup-input"
                value={username}
                onChange={handleUsernameChange}
              />
              {!username && (
                <div className="signup-custom-placeholder">
                  نام کاربری
                  <span className="hint"> (۳–۲۰ کاراکتر، فقط a-z، 0–9، . یا _)</span>
                </div>
              )}
              <img
                src="/src/assets/icons/signup_user_icon.svg"
                alt="username icon"
                className="signup-user-icon"
              />
              {usernameError && (
                <div className="input-error-popup" key={usernameErrorKey}>
                  {usernameError}
                </div>
              )}
            </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control signup-input"
              placeholder="رمز عبور"
            />
            <img
              src={showPassword ? '/src/assets/icons/signup_eye_icon.svg' : '/src/assets/icons/signup_eye_off_icon.svg'}
              alt="toggle password"
              className="signup-eye-icon"
              onClick={() => setShowPassword(prev => !prev)}
            />

          </div>

          {/* Confirm Password */}
          <div className="mb-3 position-relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="form-control signup-input"
            placeholder="تأیید رمز عبور"
          />
          <img
            src={showConfirmPassword ? '/src/assets/icons/signup_eye_icon.svg' : '/src/assets/icons/signup_eye_off_icon.svg'}
            alt="toggle confirm password"
            className="signup-eye-icon"
            onClick={() => setShowConfirmPassword(prev => !prev)}
          />
          {confirmPasswordError && (
            <div className="input-error-popup" key={confirmPasswordErrorKey}>
              {confirmPasswordError}
            </div>
          )}
          </div>


          {errorMessage && (
              <div className="alert alert-danger text-center mt-2">
                {errorMessage}
              </div>
          )}

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
