import './ResetpasswordPage.css'; 

const ResetpasswordPage = () => {
  return (
    <div className="d-flex justify-content-center justify-content-lg-start align-items-center vh-100 forgot-page-container px-3">  
      <div className="website-brand d-flex align-items-center position-absolute top-0 end-0 ms-4 mt-4">
        <div className="website-brand-text english-text text-white me-3">ODESSAY</div>
        <img src="/src/assets/icons/odessay_logo.svg" alt="Odessay Logo" className="website-logo-img me-4" />
      </div>

      <div className="forgot-box mx-auto ms-lg-5">
        <h2 className="fw-bold text-start mb-3 forgot-title">تغییر رمز عبور</h2>

        <form>
          <div className="mb-3 position-relative">
            <input
              type="password"
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
