import './WelcomePage.css';
import { useEffect, useState } from 'react';

// =========================== assets ===========================
import OdessayLogo from '/public/icons/odessay_logo.svg';
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';
import welcome_page_main_box_welcome_icon from '/public/icons/welcome_page_main_box_welcome_icon.svg';

// =========================== component ===========================
const WelcomePage = () => {

  // =========================== states ===========================
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [step, setStep] = useState(1); 

  // =========================== effects ===========================
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  return (
    <>
      {/* =========================== Main Layout =========================== */}
      <div className="welcome-page-container vh-100 d-flex flex-column">
        {/* =========================== Header =========================== */}
        <div className="welcome-page-header d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
          <div>
            <img src={welcome_header_help} alt="Help" className="welcome-page-header-help-icon" />
          </div>
          <div className="welcome-page-header-search-box flex-grow-1 mx-4">
            <input type="text" className="welcome-page-header-search-box-input form-control text-center" placeholder="جستجو..." />
          </div>
          <div className="d-flex align-items-center">
            <span className="website-brand-text english-text">ODESSAY</span>
            <img src={OdessayLogo} alt="Odessay Logo" className="website-logo-img ms-2" />
          </div>
        </div>

        {/* =========================== Subheader =========================== */}
        <div className="welcome-page-subheader d-flex justify-content-between align-items-center px-4 py-2">
          <div className="d-flex align-items-center gap-3">
            <img src={welcome_subheader_menu} alt="Menu" className="welcome-page-subheader-menu-icon" />
            <img src={welcome_subheader_user} alt="User" className="welcome-page-subheader-user-icon" />
          </div>
          <div className="welcome-page-subheader-admin-label-container d-flex align-items-center">
            <span className="welcome-page-subheader-admin-label-container-divider"></span>
            <div className="welcome-page-subheader-admin-label-container-label-text">Admin</div>
          </div>
        </div>

        {/* =========================== Main Box =========================== */}
        <div className="welcome-page-body d-flex justify-content-center align-items-center flex-grow-1">
          <div className={`welcome-page-main-box text-center p-4 ${showPopup ? 'blurred' : ''}`}>
            <div className="welcome-page-main-box-icon mb-3">
              <img src={welcome_page_main_box_welcome_icon} alt="Welcome Icon" />
            </div>
            <h2 className="welcome-page-main-box-heading mb-3">{username} خوش اومدی!</h2>
            <p className="welcome-page-main-box-description mb-1">
              شروع کن تا ببینی توی محصولات دقیقاً چه خبره
            </p>
            <p className="welcome-page-main-box-description mb-4">
              و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.
            </p>
            <button className="btn welcome-page-main-box-start-btn" onClick={() => setShowPopup(true)}> اضافه کردن بازی </button>
          </div>
        </div>
      </div>

      {/* =========================== Popup =========================== */}
      {showPopup && (
        <>
          <div className="welcome-page-main-box-body" />
          <div className="welcome-page-main-box-body-overlay">
            <div className="welcome-page-main-box-body-popup-card">

              {/* =========================== Stepper =========================== */}
              <div className="stepper-container">
                <div className={`stepper-item ${step >= 1 ? 'active' : ''}`}>
                  <div className="stepper-circle">1</div>
                  <div className="stepper-label">انتخاب محصول</div>
                </div>
                <div className={`stepper-line ${step >= 2 ? 'active' : ''}`} />
                <div className={`stepper-item ${step >= 2 ? 'active' : ''}`}>
                  <div className="stepper-circle">2</div>
                  <div className="stepper-label">اطلاعات</div>
                </div>
                <div className={`stepper-line ${step >= 3 ? 'active' : ''}`} />
                <div className={`stepper-item ${step >= 3 ? 'active' : ''}`}>
                  <div className="stepper-circle">3</div>
                  <div className="stepper-label">ثبت نهایی</div>
                </div>
              </div>

              {/* =========================== Step 1 =========================== */}
              {step === 1 && (
                <>
                  <p className="welcome-page-popup-title">محصولی که می‌خوای آنالیزشون رو انجام بدی رو انتخاب کن :</p>
                  <div className="product-options-list">
                    <label className={`product-option ${selectedProduct === 'game' ? 'checked' : ''}`}>
                      <input type="checkbox" checked={selectedProduct === 'game'} onChange={() => setSelectedProduct('game')} />
                      <span className="checkmark" />
                      بازی
                    </label>
                    <label className={`product-option ${selectedProduct === 'website' ? 'checked' : ''}`}>
                      <input type="checkbox" checked={selectedProduct === 'website'} onChange={() => setSelectedProduct('website')} />
                      <span className="checkmark" />
                      وب‌سایت
                    </label>
                  </div>
                  <button className="btn btn-primary mt-3" disabled={!selectedProduct} onClick={() => setStep(2)}>ادامه</button>
                </>
              )}
              {/* =========================== Step 2 =========================== */}
              {step === 2 && selectedProduct === 'game' && (
              <div className="step-2-compact">
                <p className="text-start ">اطلاعات بازیت رو وارد کن :</p>
                <div className="popup-options my-2 text-end">
                  <label>نام بازی:</label>
                  <input type="text" className="form-control game-name-input" />

                  <div className="d-flex justify-content-between gap-4 flex-wrap">
  {/* موتور بازی */}
  <div className="text-end">
    <label className="d-block mb-1">انتخاب موتور بازی :</label>
    <div className="d-flex gap-2">
      <label ><input type="checkbox" /> Unity</label>
      <label className="engine-disabled-option"><input type="checkbox" disabled/> Godot</label>
      <label className="engine-disabled-option"><input type="checkbox" disabled/> Custom</label>
    </div>
  </div>

  {/* پلتفرم هدف */}
  <div className="text-end">
    <label className="d-block mb-1">انتخاب پلتفرم هدف :</label>
    <div className="d-flex gap-2">
    <label><input type="checkbox" /> Windows</label>
      <label><input type="checkbox" /> Android</label>
      <label><input type="checkbox" /> iOS</label>
    </div>
  </div>
</div>


                  <label>توضیحات (اختیاری):</label>
                  <textarea className="form-control"></textarea>

                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-secondary" onClick={() => setStep(1)}>بازگشت</button>
                    <button className="btn btn-primary" onClick={() => setStep(3)}>ثبت</button>
                  </div>
                </div>
              </div>
            )}
              {/* =========================== Step 3 =========================== */}
              {step === 3 && (
              <div className="step-success-container">
                <div className="success-icon-wrapper">
                  <img src="/icons/success.svg" alt="Success" />
                </div>
                <h4 className="mb-2">محصول با موفقیت ثبت شد!</h4>
                <p className="mb-2">
                  همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل بازی/وب‌سایت‌تون قرار بدید تا بتونید داده‌های آنالیز رو ببینید.
                </p>
                <p className="mb-3">
                  <a href="#" className="sdk-download-link">دانلود SDK</a>
                </p>
                <div className="access-token-box">
                  <strong>Access Token:</strong><br />
                  <span className="token-value">ghp_4G8j7nwWL9TETKXsmBjXaiU6NHQMrs1ZDOGv</span>
                </div>
                <p className="token-note">
                  برای اطلاع از نحوه نصب SDK به بخش داکیومنت در منو مراجعه کن.
                </p>
              </div>
            )}


            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WelcomePage;
