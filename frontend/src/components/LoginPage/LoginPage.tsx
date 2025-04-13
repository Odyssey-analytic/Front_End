import { Link , useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import { login } from '../../services/userService';
import './LoginPage.css';

const LoginPage = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const data = {
        identifier: email,
        password: password,
      };
  
      const result = await login(data);
      console.log('Login successful:', result);
  
      localStorage.setItem('accessToken', result.access);
      navigate('/login/dashboard');

      console.log(JSON.stringify(data));

    } catch (error: any) {
      console.error('Login failed:', error.message);
      setErrorMessage(error.message || 'Something went wrong');
    }

  };
  

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 login-page-container px-3">  
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>
      <div className="login-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 login-title">ورود</h2>
        <p className=" text-muted text-start login-subtitle">ورود با استفاده از ایمیل</p>
        
        <form onSubmit={handleLogin}>
          {/* Username Or Email */}
          <div className="mb-3 position-relative">
            <input
              type="email"
              className="form-control text-start pe-5 text-dark login-input"
              placeholder=".ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              src="/src/assets/icons/login_email_icon.svg"
              alt="email icon"
              className="login-email-icon"
            />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control text-start pe-5 text-dark login-input"
                placeholder="رمز عبور خود را وارد کنید."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}     
              />
              <img
                src="/src/assets/icons/email_padlock_icon.svg"
                alt="password icon"
                className="login-password-icon"
              />
              <img
                src={showPassword ? '/src/assets/icons/login_eye_icon.svg' : '/src/assets/icons/login_eye_off_icon.svg'}
                alt="toggle password"
                className="login-eye-icon"
                onClick={() => setShowPassword(prev => !prev)}
              />
            </div>


            <button type="submit" className="btn w-100 login-btn">
              ورود
            </button>

            <div className="text-muted small px-2 my-3 text-start login-non-register-remember-password">
              <span className="login-non-register-remember-password">
                ثبت‌نام نکرده‌اید؟{' '}
                <Link
                  to="/signup"
                  className="fw-bold text-decoration-none login-non-register-remember-password">
                  ایجاد حساب
                </Link>
              </span> <div>
                <Link
                to="/forgot-password"
                className="fw-bold text-decoration-none login-non-register-remember-password"
              >
                فراموشی رمز عبور
              </Link></div>
            </div>
    
            <hr className="my-4" />

            {errorMessage && (
              <div className="alert alert-danger text-center mt-2">
                {errorMessage}
              </div>
            )}

            <button type="button" className="btn login-google-btn d-flex align-items-center w-80 px-4 mx-auto">
              <span className="fw-bold text-white ms-auto me-4 login-google-btn-enter-text">ورود با استفاده از</span>
              <div className="d-flex align-items-center gap-2 me-auto">
                <span className="fw-bold text-white login-google-btn-google-text">Google</span>
                <img src="/src/assets/icons/login_google_icon.svg" alt="Google" width="23" />
              </div>
            </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;


