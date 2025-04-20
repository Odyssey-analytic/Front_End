// WelcomePage.tsx
import './WelcomePage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// =========================== assets ===========================
import OdessayLogo from '/public/icons/odessay_logo.svg';
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';
import welcome_page_main_box_welcome_icon from '/public/icons/welcome_page_main_box_welcome_icon.svg';
import gift from '/public/icons/gift.svg';

const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [step, setStep] = useState(1);

  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [engine, setEngine] = useState('Unity');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  const handlePlatformChange = (platform: string) => {
    setPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmitGame = async () => {
    const formData = new FormData();
    formData.append('name', gameName);
    formData.append('description', description);
    formData.append('engine', engine);
    formData.append('platform', platforms.join(','));
    if (thumbnail) formData.append('thumbnail', thumbnail);

    try {
      const res = await axios.post('http://localhost:8000/api/game/', formData);
      setToken(res.data.token);
      setStep(3);
    } catch (err) {
      console.error("API error:", err);
      alert('خطا در ثبت بازی. لطفا دوباره تلاش کنید.');
    }
  };

  return (
    <>
      <div className="welcome-page-container vh-100 d-flex flex-column">
        <div className="welcome-page-header d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
          <div><img src={welcome_header_help} alt="Help" className="welcome-page-header-help-icon" /></div>
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
            <div className="welcome-page-main-box-icon mb-3">
              <img src={welcome_page_main_box_welcome_icon} alt="Welcome Icon" />
            </div>
            <h2 className="welcome-page-main-box-heading mb-3">{username} خوش اومدی!</h2>
            <p className="welcome-page-main-box-description mb-1">شروع کن تا ببینی توی محصولات دقیقاً چه خبره</p>
            <p className="welcome-page-main-box-description mb-4">و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.</p>
            <button className="btn welcome-page-main-box-start-btn" onClick={() => setShowPopup(true)}> اضافه کردن بازی </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="welcome-page-main-box-body" />
          <div className="welcome-page-main-box-body-overlay">
            <div className="welcome-page-main-box-body-popup-card">
              <div className="stepper-container">
                <div className={`stepper-item ${step >= 1 ? 'active' : ''}`}><div className="stepper-circle">1</div><div className="stepper-label">انتخاب محصول</div></div>
                <div className={`stepper-line ${step >= 2 ? 'active' : ''}`} />
                <div className={`stepper-item ${step >= 2 ? 'active' : ''}`}><div className="stepper-circle">2</div><div className="stepper-label">اطلاعات</div></div>
                <div className={`stepper-line ${step >= 3 ? 'active' : ''}`} />
                <div className={`stepper-item ${step >= 3 ? 'active' : ''}`}><div className="stepper-circle">3</div><div className="stepper-label">ثبت نهایی</div></div>
              </div>

              {step === 1 && (
                <>
                  <p className="welcome-page-popup-title">محصولی که می‌خوای آنالیزشون رو انجام بدی رو انتخاب کن :</p>
                  <div className="product-options-list">
                    <label className={`product-option ${selectedProduct === 'game' ? 'checked' : ''}`}>
                      <input type="checkbox" checked={selectedProduct === 'game'} onChange={() => setSelectedProduct('game')} />
                      <span className="checkmark" /> بازی
                    </label>
                    <label className={`product-option ${selectedProduct === 'website' ? 'checked' : ''}`}>
                      <input type="checkbox" checked={selectedProduct === 'website'} onChange={() => setSelectedProduct('website')} />
                      <span className="checkmark" /> وب‌سایت
                    </label>
                  </div>
                  <div className="product-buttons-row">
                    <button
                      className="continue-btn"
                      disabled={!selectedProduct}
                      onClick={() => setStep(2)}
                    >
                      ادامه
                    </button>
                  </div>
                </>
              )}
              {step === 2 && selectedProduct === 'game' && (
  <div className="step-2-compact">
    <p className="text-start mb-3">اطلاعات بازیت رو وارد کن :</p>

    {/* نام بازی */}
    <div className="text-start mb-4">
      <label className="d-block mb-1">نام بازی :</label>
      <input
        type="text"
        className="form-control game-name-input text-end"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
    </div>

    <div className="d-flex flex-column flex-md-row gap-4 mb-4">
      {/* موتور بازی */}
      <div className="text-start flex-fill ">
        <label className="d-block mb-1">انتخاب موتور بازی :</label>
        <div className="d-flex gap-2 justify-content-start">
          <label><input type="radio" checked={engine === 'Unity'} onChange={() => setEngine('Unity')} /> Unity</label>
          <label className="engine-disabled-option"><input type="radio" disabled /> Godot</label>
          <label className="engine-disabled-option"><input type="radio" disabled /> Custom</label>
        </div>
      </div>

      <div className="text-start flex-fill mt-3 mt-md-0 mb-4">
        <label className="d-block mb-1">انتخاب پلتفرم هدف :</label>
        <div className="d-flex flex-row align-items-center gap-3">
          <label><input type="checkbox" onChange={() => handlePlatformChange('Windows')} /> Windows</label>
          <label><input type="checkbox" onChange={() => handlePlatformChange('Android')} /> Android</label>
          <label><input type="checkbox" onChange={() => handlePlatformChange('iOS')} /> iOS</label>
        </div>
      </div>
    </div>

    <div className="w-100 text-start mb-4">
      <label className="d-block mb-2">توضیحات (اختیاری) :</label>
      <textarea
        className="form-control"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    <div className="w-100 text-start mb-5">
      <label className="d-block mb-2">آپلود تصویر (اختیاری):</label>
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setThumbnail(e.target.files[0]);
          }
        }}
      />
    </div>

    {/* دکمه‌ها */}
    <div className="d-flex justify-content-between mt-3">
      <button className="btn btn-secondary" onClick={() => setStep(1)}>بازگشت</button>
      <button className="btn btn-primary" onClick={handleSubmitGame}>ثبت</button>
    </div>
  </div>
)}


              {/* {step === 2 && selectedProduct === 'game' && (
                <div className="step-2-compact">
                  <p className="text-start">اطلاعات بازیت رو وارد کن :</p>
                  <div className="text-start">
                    <label className="d-block">نام بازی :</label>
                    <input type="text" className="form-control game-name-input text-end" value={gameName} onChange={(e) => setGameName(e.target.value)} />
                  </div>
                  <div className="d-flex flex-column flex-md-row gap-4">

                  <div className="text-start flex-fill">
                    <label className="d-block mb-1">انتخاب موتور بازی :</label>
                    <div className="d-flex gap-2 justify-content-start">
                      <label><input type="radio" checked={engine === 'Unity'} onChange={() => setEngine('Unity')} /> Unity</label>
                      <label className="engine-disabled-option"><input type="radio" disabled /> Godot</label>
                      <label className="engine-disabled-option"><input type="radio" disabled /> Custom</label>
                    </div>
                  </div>

                  <div className="text-start flex-fill mt-3 mt-md-0">
                        <label className="d-block mb-1">انتخاب پلتفرم هدف :</label>
                    <div className="d-flex flex-row align-items-center gap-3">
                      <label className="d-block"><input type="checkbox" onChange={() => handlePlatformChange('Windows')} /> Windows</label>
                      <label className="d-block"><input type="checkbox" onChange={() => handlePlatformChange('Android')} /> Android</label>
                      <label className="d-block"><input type="checkbox" onChange={() => handlePlatformChange('iOS')} /> iOS</label>
                    </div>
                    </div>
                  </div>

                  <div className="w-100 text-start">
                    <label className="mt-2">توضیحات (اختیاری) :</label>
                  </div>
                  <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />

                  <div className="w-100 text-start">
                    <label className="mt-2">آپلود تصویر (اختیاری):</label>
                  </div>
                  <input type="file" accept="image/*" className="form-control" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setThumbnail(e.target.files[0]);
                    }
                  }} />

                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-secondary" onClick={() => setStep(1)}>بازگشت</button>
                    <button className="btn btn-primary" onClick={handleSubmitGame}>ثبت</button>
                  </div>
                </div>
              )} */}

              {step === 3 && (
                <div className="step-success-container">
                  <div className="success-icon-wrapper">
                    <img src={gift} alt="Success Icon" />
                  </div>
                  <h4 className="mb-3 fw-bold">محصول شما با موفقیت ثبت شد!</h4>
                  <p className="mb-2">همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل بازی/وب‌سایت‌تون قرار بدید.</p>
                  <p className="mb-3"><a href="#" className="sdk-download-link">لینک دانلود SDK</a></p>
                  <div className="access-token-box mb-3">
                    <strong>Access Token:</strong><br />
                    <span className="token-value">{token}</span>
                  </div>
                  <p className="token-note">برای اطلاع از دستور نصب، به بخش داکیومنت در منو مراجعه کنید!</p>
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
