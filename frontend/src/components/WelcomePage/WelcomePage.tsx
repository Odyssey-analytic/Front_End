import './WelcomePage.css';
import { useEffect, useState } from 'react';

import OdessayLogo from "/public/icons/odessay_logo.svg";
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';

const WelcomePage = () => {

  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState('');
  const [step, setStep] = useState(1); // مرحله ۱ = انتخاب محصول، ۲ = فرم اطلاعات، ۳ = پیام موفقیت


  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  return (
    <>
    <div className="welcome-page-container vh-100 d-flex flex-column">
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
        <div className="welcome-page-body d-flex justify-content-center align-items-center flex-grow-1">
    <div className={`welcome-page-main-box text-center p-4 ${showPopup ? 'blurred' : ''}`}>

                <h2 className="welcome-page-main-box-heading mb-3">{username} خوش اومدی!</h2>
                <p className="welcome-page-main-box-description mb-1">
                شروع کن تا ببینی توی محصولات دقیقاً چه خبره
                </p>
                <p className="welcome-page-main-box-description mb-4">
                و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.
                </p>
                <button
                    className="btn welcome-page-main-box-start-btn"
                    onClick={() => setShowPopup(true)}
                    >
                    اضافه کردن بازی
                </button>
            </div>
        </div>
    </div>
    {showPopup && (
  <>
    {/* بلور روی بک‌گراند، برای هر دو مرحله فعاله */}
    <div className="welcome-page-body-overlay" />

    <div className="welcome-overlay">
      <div className="welcome-popup-card">
        {step === 1 && (
          <>
            <p className="popup-title">محصولاتی که می‌خوای آنالیزشون رو انجام بدی رو انتخاب کن:</p>
            <div className="popup-options my-4">
              <label>
                <input
                  type="checkbox"
                  checked={selectedProduct === 'game'}
                  onChange={() => setSelectedProduct('game')}
                /> بازی
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedProduct === 'website'}
                  onChange={() => setSelectedProduct('website')}
                /> وب‌سایت
              </label>
            </div>
            <button
              className="btn btn-primary"
              disabled={!selectedProduct}
              onClick={() => setStep(2)}
            >
              ادامه
            </button>
          </>
        )}

        {step === 2 && selectedProduct === 'game' && (
          <>
            <p className="popup-title">اطلاعات بازیت رو وارد کن:</p>
            <div className="popup-options my-4 text-end">
              <label>نام بازی:</label>
              <input type="text" className="form-control mb-3" />

              <label className="d-block mb-1">انتخاب موتور بازی:</label>
              <div className="d-flex gap-3 mb-3">
                <label><input type="checkbox" /> Unity</label>
                <label><input type="checkbox" /> Godot</label>
                <label><input type="checkbox" /> Custom</label>
              </div>

              <label className="d-block mb-1">انتخاب پلتفرم هدف:</label>
              <div className="d-flex gap-3 mb-3">
                <label><input type="checkbox" /> PC</label>
                <label><input type="checkbox" /> Android</label>
                <label><input type="checkbox" /> iOS</label>
              </div>

              <label>توضیحات (اختیاری):</label>
              <textarea className="form-control mb-4"></textarea>

              <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>بازگشت</button>
                <button className="btn btn-primary"  onClick={() => setStep(3)}>ثبت</button>
              </div>
            </div>
          </>
        )}

{step === 3 && (
  <>
    <div className="success-popup-icon mb-3">
      {/* یا از img استفاده کن، یا یک آیکون استایل‌دار */}
      {/* <img src="/icons/success-box.svg" alt="Success" /> */}
    </div>
    <h4 className="mb-2">محصول شما با موفقیت ثبت شد!</h4>
    <p className="mb-2">
      همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل بازی/وب‌سایت‌تون قرار بدید تا بتونید داده‌های آنالیز رو مشاهده کنید.
    </p>
    <p className="mb-3">
      <a href="#" className="text-primary">لینک دانلود SDK</a>
    </p>
    <div className="form-control mb-2 text-start" style={{ direction: 'ltr' }}>
      <strong>Access Token:</strong><br />
      <span className="text-muted small">ghp_4G8j7nwWL9TETKXsmBjXaiU6NHQMrs1ZDOGv</span>
    </div>
    <p className="text-muted mt-3" style={{ fontSize: '13px' }}>
      برای اطلاع از دستور نصب به بخش داکیومنت در منو مراجعه کنید!
    </p>
  </>
)}

      </div>
    </div>
  </>
)}


    </>
  );
};

export default WelcomePage;
