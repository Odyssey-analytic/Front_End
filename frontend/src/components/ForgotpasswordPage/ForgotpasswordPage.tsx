import { useState } from "react";
import { requestPasswordReset } from "../../services/userService"; 
import './ForgotpasswordPage.css';

import logoImage from '/public/icons/odessay_logo.svg';
import loginEmailIcon from '/public/icons/login_email_icon.svg';
import sendcodeIcon from "/public/icons/forgetpassword_sendcode_icon.svg";



const ForgotpasswordPage = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    console.log("in the handle submit:", email);

    e.preventDefault();
    console.log("Submitting forgot password form with email:", email);
  
    try {
      const res = await requestPasswordReset({ email });
      console.log("Reset request successful:", res);
      alert("A password reset link has been sent to your email.");
    } catch (err: any) {
      console.error("Request error:", err.message);
      alert("Failed to send the reset email. Please try again.");
    }
  }
  
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">  
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        {/* <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" /> */}
        <img src={logoImage} alt="Odessay Logo" className="website-logo-img me-4" />

      </div>

      <div className="forgot-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 forgot-title">بازیابی رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control text-start pe-5 text-dark forgot-input"
              placeholder=".ایمیل خود را وارد کنید"
              required
            />
            {/* <img
              src="/src/assets/icons/login_email_icon.svg"
              alt="email icon"
              className="forgot-email-icon"
            /> */}
            <img src={loginEmailIcon} alt="Email Icon" className="forgot-email-icon" />

          </div>

          <p className="text-muted small text-start">ما یک پیام برای تنظیم یا بازیابی رمز عبور جدید برایتان ارسال خواهیم کرد.</p>
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn d-flex align-items-center gap-1 forgot-btn">
              <span className="text-white fw-bold forgot-btn-text">ارسال کد</span>
              <img src={sendcodeIcon} alt="send icon" style={{ width: '30px', height: '25px' }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotpasswordPage;
