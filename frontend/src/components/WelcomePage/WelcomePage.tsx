import './WelcomePage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { submitGameInfo } from '../../services/userService';
import MainLayout from '../MainLayout/MainLayout';
import { motion } from "framer-motion";

// =========================== assets ===========================
import OdessayLogo from '/public/icons/odessay_logo.svg';
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';
import welcome_page_main_box_welcome_icon from '/public/icons/welcome_page_main_box_welcome_icon.svg';
import gift from '/public/icons/gift.svg';
import close_icon from '/public/icons/close_icon.svg';
import uploading_game_image_icon from '/public/icons/game-console-icon.svg';
import uploading_game_image_icon_ghost from '/public/icons/game-ghost-icon.svg';
import copyIcon from '/public/icons/copy-icon-gradient.svg';
import game_with_no_thumbnail_icon from '../../../public/icons/game_with_no_thumbnail_icon.svg';
import game_with_no_thumbnail_icon_png from '../../../public/icons/game_with_no_thumbnail_icon.png';

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
  const [copySuccess, setCopySuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [token, setToken] = useState('');

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

const fetchDefaultThumbnail = async (): Promise<File | null> => {
  try {
    const response = await fetch(game_with_no_thumbnail_icon_png);
    const blob = await response.blob();
    return new File([blob], 'default-thumbnail.png', { type: 'image/png' });
  } catch (err) {
    console.error('خطا در بارگیری تصویر پیش‌فرض:', err);
    return null;
  }
};



  const handleClick = () => {
    setIsLoading(true);
    setIsFading(true);
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
      setIsFading(false);
    }, 300);
  };

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }).catch((err) => console.error("خطا در کپی:", err));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "-1000px";
      textArea.style.left = "-1000px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        }
      } catch (err) {
        console.error("کپی با fallback شکست خورد:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const resetPopupState = () => {
    setStep(1);
    setSelectedProduct('');
    setGameName('');
    setDescription('');
    setEngine('');
    setPlatforms([]);
    setThumbnail(null);
    setImageError('');
    setGameNameError('');
    setEngineError('');
    setPlatformError('');
    setToken('');
    setCopySuccess(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'user name');
  }, []);

  const handlePlatformChange = (platform: string) => {
    
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter(p => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleSubmitGame = async () => {
    let valid = true;
    if (!gameName.trim()) {
      setGameNameError('وارد کردن نام بازی الزامی است.');
      valid = false;
    } else setGameNameError('');

    if (!engine.trim()) {
      setEngineError('انتخاب موتور بازی الزامی است.');
      valid = false;
    } else setEngineError('');

    if (platforms.length === 0) {
      setPlatformError('انتخاب حداقل یک پلتفرم الزامی است.');
      valid = false;
    } else setPlatformError('');

    if (!valid) return;

    let finalThumbnail = thumbnail;

    if (!thumbnail) {
      finalThumbnail = await fetchDefaultThumbnail();
      if (!finalThumbnail) {
        alert('امکان بارگذاری تصویر پیش‌فرض وجود ندارد.');
        return;
      }
    }
    
    const data = {
      name: gameName,
      description: description,
      engine: engine,
      platform: platforms,
      thumbnail: finalThumbnail
    };

    try {
      const result = await submitGameInfo(data);
      setToken(result.token);
      setStep(3);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/dashboard', { state: { refresh: true } }); // ===== Navigate to dashboard after success
      }, 1000);
    } catch (err: any) {
      console.error('API error:', err.response?.data || err.message);
      alert('خطا در ثبت بازی. لطفا دوباره تلاش کنید.');
    }
  };



  return (
    <>
    <MainLayout></MainLayout>

    <div className="welcome-page-body">

      <div className={`welcome-page-main-box text-center ${showPopup ? 'blurred' : ''}`}>
        <div className="welcome-page-main-box-icon">
          <img src={welcome_page_main_box_welcome_icon} alt="Welcome Icon" />
        </div>

        <h2 className="welcome-page-main-box-heading">{username} خوش اومدی!</h2>
        <p className="welcome-page-main-box-description">شروع کن تا ببینی توی محصولات دقیقاً چه خبره</p>
        <p className="welcome-page-main-box-description">و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.</p>
        
        <button className="btn welcome-page-main-box-start-btn" 
          onClick={() => setShowPopup(true)}> 
          اضافه کردن بازی 
        </button>

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
                // onClick={() => setShowPopup(false)}
                onClick={() => {
                  setShowPopup(false);
                  resetPopupState();
                }}
                
              />
            )} 

            <div className="welcome-page-stepper-container">
              <div className={`welcome-page-stepper-item ${step >= 1 ? 'active' : ''}`}><div className="welcome-page-stepper-circle">1</div><div className="welcome-page-stepper-label">انتخاب محصول</div></div>
              <div className={`welcome-page-stepper-line1 ${step >= 2 ? 'active' : ''}`} />
              <div className={`welcome-page-stepper-item ${step >= 2 ? 'active' : ''}`}><div className="welcome-page-stepper-circle">2</div><div className="welcome-page-stepper-label">اطلاعات</div></div>
              <div className={`welcome-page-stepper-line2 ${step >= 3 ? 'active' : ''}`} />
              <div className={`welcome-page-stepper-item ${step >= 3 ? 'active' : ''}`}><div className="welcome-page-stepper-circle">3</div><div className="welcome-page-stepper-label">ثبت نهایی</div></div>
            </div>

            {step === 1 && (
              <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <p className="welcome-page-popup-title">محصولی که می‌خوای آنالیزشون رو انجام بدی رو انتخاب کن:</p>
                <div className="welcome-page-product-options-list">
                  <label className={`welcome-page-product-option ${selectedProduct === 'game' ? 'checked' : ''}`}>

                    <input
                      type="checkbox"
                      checked={selectedProduct === 'game'}
                      onChange={() =>
                        setSelectedProduct(selectedProduct === 'game' ? '' : 'game')
                      }
                    />
                    
                    <span className="checkmark" /> بازی
                  </label>

                  <label className={`welcome-page-product-option ${selectedProduct === 'website' ? 'checked' : ''}`}>
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
                
                <div className="welcome-page-product-buttons-row">
                  <button
                    className="welcome-page-continue-btn"
                    disabled={!selectedProduct || isLoading}
                    onClick={handleClick}
                    >
                    {isLoading ? "در حال بارگذاری..." : "ادامه"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && selectedProduct === 'game' && (
              <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              >

            <div className="step-2-compact">
              <p className="text-start mb-3">اطلاعات بازیت رو وارد کن :</p>

              {/* نام بازی + آپلود تصویر */}
              <div className="d-flex justify-content-between align-items-start mb-4">
                    
                    {/* نام بازی */}
                    <div className="flex-fill me-3">
                      <label className="d-block mb-3 small-label text-start">
                        نام بازی: <span style={{ color: 'red' }}>*</span>
                      </label>
                      
                      <input
                        type="text"
                        className="form-control game-name-input-sm text-start"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                      />
                    
                      <div className="welcome-page-error-placeholder text-start" style={{ minHeight: '20px' }}>
                        {gameNameError && <p className="text-danger small mt-1 mb-0">{gameNameError}</p>}
                      </div>                    
                    </div>

                    {/* آپلود تصویر دایره‌ای */}
                    <div className="welcome-page-upload-section text-center">

                      <div className="welcome-page-upload-preview-wrapper">
                        {thumbnail ? (
                          <img
                            src={URL.createObjectURL(thumbnail)}
                            alt="thumbnail"
                            className="welcome-page-upload-preview-image"
                          />
                        ) : (
                          <img
                            src={uploading_game_image_icon_ghost}
                            alt="انتخاب تصویر"
                            className="welcome-page-upload-placeholder-icon"
                          />
                        )}
                      </div>

                      {/* آیکون انتخاب و حذف تصویر در یک ردیف */}
                      <div className="d-flex justify-content-center gap-3 mt-2">
                        <label className="welcome-page-upload-select-label mb-0">
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

                    </div>
                  </div>

              {/* <!-- انتخاب موتور بازی --> */}
              <div className="d-flex flex-column flex-md-row gap-4 ">
                <div className="text-start flex-fill mt-3 mt-md-0 mb-4">
                  <label className="d-block mb-3">
                    انتخاب موتور بازی: <span style={{ color: 'red' }}>*</span>
                    </label>
                  
                  <div className="welcome-page-radio-group-grid">
                    <label className="welcome-page-radio-label">
                      <input
                        type="checkbox"
                        checked={engine === 'unity'}
                        onChange={() => {
                          if (engine === 'unity') {
                            setEngine('');
                          } else {
                            setEngine('unity');
                          }
                        }}
                      />
                      Unity
                    </label>

                    <label className="welcome-page-radio-label welcome-page-engine-disabled-option">
                      <input
                        type="checkbox"
                        checked={engine === 'godot'}
                        onChange={() => {
                          if (engine === 'godot') {
                            setEngine('');
                          } else {
                            setEngine('godot');
                          }
                        }}
                      />
                      Godot
                    </label>

                    <label className="welcome-page-radio-label welcome-page-engine-disabled-option">
                      <input
                        type="checkbox"
                        checked={engine === 'custom'}
                        onChange={() => {
                          if (engine === 'custom') {
                            setEngine('');
                          } else {
                            setEngine('custom');
                          }
                        }}
                      />
                      Custom
                    </label>
                  </div>
                  
                  <div className="welcome-page-error-placeholder" style={{ minHeight: '20px' }}>
                    {engineError && <p className="text-danger small mt-1 mb-0">{engineError}</p>}
                  </div>

                </div>
              </div>

              {/* <!-- انتخاب پلتفرم هدف --> */}
              <div className="d-flex flex-column flex-md-row mb-4">
                <div className="text-start flex-fill mt-3 mt-md-0 mb-2">
                  <label className="d-block mb-3">
                    انتخاب پلتفرم هدف: <span style={{ color: 'red' }}>*</span>
                  </label>

                  <div className="welcome-page-radio-group-grid">

                    <label className="welcome-page-radio-label">
                      <input
                        type="checkbox"
                        checked={platforms.includes('ios')}
                        onChange={() => handlePlatformChange('ios')}
                      />
                      iOS
                    </label>

                    <label className="welcome-page-radio-label">
                      <input
                        type="checkbox"
                        checked={platforms.includes('android')}
                        onChange={() => handlePlatformChange('android')}
                      />
                      Android
                    </label>

                    <label className="welcome-page-radio-label">
                      <input
                        type="checkbox"
                        checked={platforms.includes('pc')}
                        onChange={() => handlePlatformChange('pc')}
                      />
                      Windows
                    </label>
                  </div>

                  <div className="welcome-page-error-placeholder" style={{ minHeight: '20px' }}>
                    {platformError && <p className="text-danger small mt-1 mb-0">{platformError}</p>}
                  </div>

                </div>
              </div>

              <div className="w-100 text-start mb-4">
                <label className="d-block mb-2">توضیحات (اختیاری):</label>
                <textarea
                  className="form-control game-name-input-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-center gap-3 mt-3">

                <button
                  className="welcome-page-continue-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setStep(1);
                      setIsLoading(false);
                    }, 200);
                  }}
                >
                  بازگشت
                </button>

                <button
                    className="welcome-page-continue-btn"
                    disabled={!selectedProduct || isLoading}
                    onClick={handleSubmitGame}
                    >
                    {isLoading ? "در حال بارگذاری..." : "ثبت"}
                  </button>

              </div>
            
            </div>
            </motion.div>
            )}

            {step === 3 && (
              <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              >

              <div className="welcome-page-step-success-container">

                <div className="welcome-page-success-icon-wrapper">
                  <img src={gift} alt="Success Icon" />
                </div>

                <h4 className="welcome-page-success-text-title">محصول شما با موفقیت ثبت شد!</h4>
                <p className="welcome-page-success-text-explain">همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل بازی/وب‌سایت‌تون قرار بدید.</p>
                <p className="mb-3 welcome-page-sdk-download-link"><a href="#">لینک دانلود SDK</a></p>
                
                <div className="welcome-page-access-token-box mb-3">
                  <strong className="welcome-page-access-token-label">Access Token:</strong><br />

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                      <div>
                      <div className="welcome-page-copy-icon-wrapper">
                        <img
                          src={copyIcon}
                          alt="Copy"
                          className={`welcome-page-token-copy-icon-img ${copySuccess ? 'active' : ''}`}
                          onClick={() => copyToClipboard(token)}
                        />

                        {copySuccess && (
                          <div className="welcome-page-copy-done-msg-tooltip">
                            !کپی شد
                          </div>
                        )}

                      </div>
                    </div>

                    <span className="welcome-page-token-value">{token}</span>

                  </div>
                </div>

                <p className="welcome-page-token-note">برای اطلاع از دستور نصب، به بخش داکیومنت در منو مراجعه کنید!</p>
              </div>
              </motion.div>
            )}

          </div>
        </div>
      </>
    )}
    </>
  );
};

export default WelcomePage;