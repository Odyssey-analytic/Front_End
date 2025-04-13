import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ResetpasswordPage.css';

const ResetpasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`https://odysseyanalytics.ir/api/api/reset-password/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Reset password failed.");
      }

      alert("Your password has been successfully reset.");
      navigate("/");
    } catch (error: any) {
      console.error("Reset error:", error.message);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">  
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>

      <div className="forgot-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 forgot-title">تغییر رمز عبور</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 position-relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control text-start pe-5 text-dark forgot-input"
              placeholder="رمز عبور جدید"
              required
            />
            <img
              src="/src/assets/icons/signup_padlock_icon.svg"
              alt="lock icon"
              className="forgot-email-icon"
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control text-start pe-5 text-dark forgot-input"
              placeholder="تایید رمز عبور جدید"
              required
            />
            <img
              src="/src/assets/icons/signup_padlock_icon.svg"
              alt="lock icon"
              className="forgot-email-icon"
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn d-flex align-items-center gap-1 forgot-btn">
              <span className="text-white fw-bold forgot-btn-text">ثبت رمز جدید</span>
              <img src="/src/assets/icons/forgetpassword_sendcode_icon.svg" alt="send icon" style={{ width: '30px', height: '25px' }} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetpasswordPage;


// import './ResetpasswordPage.css'; 

// const ResetpasswordPage = () => {
//   return (
//     <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">  
//       <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
//         <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
//         <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
//       </div>

//       <div className="forgot-box mx-auto ms-lg-5">
//         <h2 className="fw-bold text-start mb-3 forgot-title">تغییر رمز عبور</h2>

//         <form>
//           <div className="mb-3 position-relative">
//             <input
//               type="password"
//               className="form-control text-start pe-5 text-dark forgot-input"
//               placeholder="رمز عبور جدید"
//               required
//             />
//             <img
//               src="/src/assets/icons/signup_padlock_icon.svg"
//               alt="lock icon"
//               className="forgot-email-icon"
//             />
//           </div>

//           <div className="mb-3 position-relative">
//             <input
//               type="password"
//               className="form-control text-start pe-5 text-dark forgot-input"
//               placeholder="تایید رمز عبور جدید"
//               required
//             />
//             <img
//               src="/src/assets/icons/signup_padlock_icon.svg"
//               alt="lock icon"
//               className="forgot-email-icon"
//             />
//           </div>

//           <div className="d-flex justify-content-center mt-3">
//             <button type="submit" className="btn d-flex align-items-center gap-1 forgot-btn">
//               <span className="text-white fw-bold forgot-btn-text">ثبت رمز جدید</span>
//               <img src="/src/assets/icons/forgetpassword_sendcode_icon.svg" alt="send icon" style={{ width: '30px', height: '25px' }} />
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetpasswordPage;
