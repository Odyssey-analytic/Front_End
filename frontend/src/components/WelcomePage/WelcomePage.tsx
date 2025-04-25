// WelcomePage.tsx
import './WelcomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { submitGameInfo } from '../../services/userService';

// =========================== assets ===========================
import OdessayLogo from '/public/icons/odessay_logo.svg';
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';
import welcome_page_main_box_welcome_icon from '/public/icons/welcome_page_main_box_welcome_icon.svg';
import gift from '/public/icons/gift.svg';
import close_icon from '/public/icons/close_icon.png';
import uploading_game_image_icon from '/public/icons/game-console-icon.png';
import uploading_game_image_icon_ghost from '/public/icons/game-ghost-icon.png';


const WelcomePage = () => {
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [step, setStep] = useState(1);

  const [gameName, setGameName] = useState('');
  const [description, setDescription] = useState('');
  const [engine, setEngine] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imageError, setImageError] = useState('');

  const [gameNameError, setGameNameError] = useState('');
  const [engineError, setEngineError] = useState('');
  const [platformError, setPlatformError] = useState('');
  

  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/');
  };  

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  // const handlePlatformChange = (platform: string) => {
  //   setPlatforms(prev =>
  //     prev.includes(platform)
  //       ? prev.filter(p => p !== platform)
  //       : [...prev, platform]
  //   );
  // };

  const handlePlatformChange = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };
  

  // final part
  const handleSubmitGame = async () => {

    setStep(3);

    // let valid = true;
  
    // // بررسی نام بازی
    // if (!gameName.trim()) {
    //   setGameNameError('وارد کردن نام بازی الزامی است.');
    //   valid = false;
    // } else {
    //   setGameNameError('');
    // }
  
    // // بررسی موتور بازی
    // if (!engine.trim()) {
    //   setEngineError('انتخاب موتور بازی الزامی است.');
    //   valid = false;
    // } else {
    //   setEngineError('');
    // }
  
    // // بررسی پلتفرم‌ها
    // if (platforms.length === 0) {
    //   setPlatformError('انتخاب حداقل یک پلتفرم الزامی است.');
    //   valid = false;
    // } else {
    //   setPlatformError('');
    // }
  
    // if (!valid) return; // اگر چیزی خالی بود، جلو برو نگیریم

    // const data = {
    //   name: gameName,
    //   description: description,
    //   engine: engine,
    //   platform: platforms.join(','),
    // };
    
    // console.log('داده ارسالی:', data);
    
    // try {
    //   const result = await submitGameInfo(data);
    //   setToken(result.token);
    //   setStep(3);
    // } catch (err: any) {
    //   console.error('API error:', err.response?.data || err.message);
    //   alert('خطا در ثبت بازی. لطفا دوباره تلاش کنید.');
    // }
    
  };


  return (
    <>
      <div className="welcome-page-container vh-100 d-flex flex-column">

        <div className="welcome-page-header">
          <img src={welcome_header_help} alt="Help" className="welcome-page-header-help-icon" />

          <div className="welcome-page-header-search-box">
            <input
              type="text"
              className="welcome-page-header-search-box-input"
              placeholder="جستجو..."
            />
          </div>

          <div className="header-brand">
            <span className="website-brand-text english-text">ODESSAY</span>
            <img src={OdessayLogo} alt="Odessay Logo" className="website-logo-img ms-2" />
          </div>
        </div>

       <div className="welcome-page-subheader d-flex justify-content-between align-items-center py-2">
          <div className="d-flex align-items-center gap-3">
            {/* <img src={welcome_subheader_menu} alt="Menu" className="welcome-page-subheader-menu-icon" /> */}

            <div
              className="welcome-page-menu-icon-wrapper"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <img
                src={welcome_subheader_menu}
                alt="Menu"
                className="welcome-page-subheader-menu-icon"
              />

              {menuOpen && (
                <div className="welcome-page-dropdown-menu">
                  <button className="welcome-page-dropdown-item" onClick={handleLogout}>
                    خروج از حساب کاربری
                  </button>
                </div>
              )}

            </div>

            <img src={welcome_subheader_user} alt="User" className="welcome-page-subheader-user-icon" />
          </div>
          <div className="welcome-page-subheader-admin-label-container">
            <span className="welcome-page-subheader-admin-label-container-divider"></span>
            <div className="welcome-page-subheader-admin-label-container-label-text">Admin</div>
          </div>
        </div>

        <div className="welcome-page-body justify-content-center align-items-center flex-grow-1">
          <div className={`welcome-page-main-box text-center ${showPopup ? 'blurred' : ''}`}>
            <div className="welcome-page-main-box-icon">
              <img src={welcome_page_main_box_welcome_icon} alt="Welcome Icon" />
            </div>
            <h2 className="welcome-page-main-box-heading">{username} خوش اومدی!</h2>
            <p className="welcome-page-main-box-description">شروع کن تا ببینی توی محصولات دقیقاً چه خبره</p>
            <p className="welcome-page-main-box-description">و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.</p>
            <button className="btn welcome-page-main-box-start-btn" onClick={() => setShowPopup(true)}> اضافه کردن بازی </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <>
          <div className="welcome-page-main-box-body" />
          <div className="welcome-page-main-box-body-overlay">
            <div className="welcome-page-main-box-body-popup-card">

              {((step === 1) || (step === 2 && selectedProduct === 'game') || (step === 3)) && (
                <img
                  src={close_icon}
                  alt="بستن"
                  className="welcome-page-popup-card-close-icon"
                  onClick={() => setShowPopup(false)}
                />
              )} 

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

                      <input
                        type="checkbox"
                        checked={selectedProduct === 'game'}
                        onChange={() =>
                          setSelectedProduct(selectedProduct === 'game' ? '' : 'game')
                        }
                      />
                      
                      <span className="checkmark" /> بازی
                    </label>
                    <label className={`product-option ${selectedProduct === 'website' ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedProduct === 'website'}
                        onChange={() =>
                          setSelectedProduct(selectedProduct === 'website' ? '' : 'website')
                        }
                      />
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
                {/* <div className="text-start mb-4">
                  <label className="d-block mb-1">نام بازی:</label>
                  <input
                    type="text"
                    className="form-control game-name-input text-end"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                  />
                </div> */}


                {/* نام بازی + آپلود تصویر */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                      {/* نام بازی */}
                      <div className="flex-fill me-3">
                        <label className="d-block mb-1 small-label">نام بازی:</label>
                        <input
                          type="text"
                          className="form-control game-name-input-sm text-end"
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                        />

                        {gameNameError && <p className="text-danger small mt-1">{gameNameError}</p>}
                      </div>

                      {/* آپلود تصویر دایره‌ای */}
                      <div className="upload-section text-center">
                        <div className="upload-preview-wrapper">
                          {thumbnail ? (
                            <img
                              src={URL.createObjectURL(thumbnail)}
                              alt="thumbnail"
                              className="upload-preview-image"
                            />
                          ) : (
                            <img
                              src={uploading_game_image_icon_ghost}
                              alt="انتخاب تصویر"
                              className="upload-placeholder-icon"
                            />
                          )}
                        </div>


                        {/* آیکون انتخاب و حذف تصویر در یک ردیف */}
                        <div className="d-flex justify-content-center gap-3 mt-2">
                          <label className="upload-select-label mb-0">
                            انتخاب تصویر
                            <input
                              type="file"
                              accept="image/png, image/jpeg"
                              hidden
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setThumbnail(e.target.files[0]);
                                  setImageError('');
                                }
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            className={`welcome-page-delete-image-text-btn ${thumbnail ? 'active' : 'disabled'}`}
                            onClick={() => {
                              if (!thumbnail) {
                                setImageError('هنوز تصویری بارگزاری نشده است.');
                              } else {
                                setThumbnail(null);
                                setImageError('');
                              }
                            }}
                          >
                            حذف تصویر
                          </button>
                        </div>

                        {/* خطای حذف */}
                        {imageError && (
                          <p className="text-danger small mt-1">{imageError}</p>
                        )}

                        {/* نکته سایز و فرمت */}
                        <p className="text-muted small mt-1">
                          تصویر باید png یا jpg و حداکثر ۲۰۰MB باشد.
                        </p>
                      </div>
                    </div>

                {/* <!-- انتخاب موتور بازی --> */}
                <div className="d-flex flex-column flex-md-row gap-4 mb-4">
                  <div className="text-start flex-fill mt-3 mt-md-0 mb-4">
                    <label className="d-block mb-3">انتخاب موتور بازی:</label>

                    <div className="radio-group-grid">
                      <label className="radio-label">
                        <input type="radio" checked={engine === 'unity'} onChange={() => setEngine('unity')} />
                        Unity
                      </label>

                      <label className="radio-label engine-disabled-option">
                        <input type="radio" disabled />
                        Godot
                      </label>

                      <label className="radio-label engine-disabled-option">
                        <input type="radio" disabled />
                        Custom
                      </label>
                    </div>
                    
                    {engineError && <p className="text-danger small mt-1">{engineError}</p>}
                    
                  </div>
                </div>

                {/* <!-- انتخاب پلتفرم هدف --> */}
                <div className="d-flex flex-column flex-md-row gap-4 mb-4">
                  <div className="text-start flex-fill mt-3 mt-md-0 mb-4">
                    <label className="d-block mb-3">انتخاب پلتفرم هدف :</label>

                    <div className="radio-group-grid">
                      <label className="radio-label">
                        <input type="radio" name="platform" onChange={() => handlePlatformChange('ios')} />
                        iOS
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="platform" onChange={() => handlePlatformChange('android')} />
                        Android
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="platform" onChange={() => handlePlatformChange('pc')} />
                        Windows
                      </label>
                    </div>

                    {platformError && <p className="text-danger small mt-1">{platformError}</p>}

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

                {/* دکمه‌ها */}
                <div className="d-flex justify-content-between mt-3">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>بازگشت</button>
                  <button className="btn btn-primary" onClick={handleSubmitGame}>ثبت</button>
                </div>
              </div>
              )}

              {step === 3 && (
                <div className="welcome-page-step-success-container">
                  <div className="welcome-page-success-icon-wrapper">
                    <img src={gift} alt="Success Icon" />
                  </div>
                  <h4 className="mb-3 fw-bold">محصول شما با موفقیت ثبت شد!</h4>
                  <p className="mb-2">همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل بازی/وب‌سایت‌تون قرار بدید.</p>
                  <p className="mb-3 welcome-page-sdk-download-link"><a href="#">لینک دانلود SDK</a></p>
                  <div className="welcome-page-access-token-box mb-3">
                    <strong>Access Token:</strong><br />
                    <span className="welcome-page-token-value">{token}</span>
                  </div>
                  <p className="welcome-page-token-note">برای اطلاع از دستور نصب، به بخش داکیومنت در منو مراجعه کنید!</p>
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
