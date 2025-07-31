import styles from "./WelcomePage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitGameInfo } from "../../services/userService";
import { motion } from "framer-motion";

import WelcomePage_HeaderLayout from "./WelcomePage_HeaderLayout";
import MainLayout from "../MainLayout/MainLayout";

// =========================== assets ===========================
import welcome_page_main_box_welcome_icon from "/public/icons/welcome_page_main_box_welcome_icon.svg";
import gift from "/public/icons/gift.svg";
// import close_icon from "/public/icons/close_icon.svg";
import uploading_game_image_icon_ghost from "/public/icons/game-ghost-icon.svg";
import copyIcon from "/public/icons/copy-icon-gradient.svg";
import game_with_no_thumbnail_icon_png from "../../../public/icons/game_with_no_thumbnail_icon.png";
import usericon from "../../../public/icons/user 3.svg";
import doticon from "../../../public/icons/dots 1.svg";


const WelcomePage = () => {
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [step, setStep] = useState(1);

  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [engine, setEngine] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const [gameNameError, setGameNameError] = useState("");
  const [engineError, setEngineError] = useState("");
  const [platformError, setPlatformError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchDefaultThumbnail = async (): Promise<File | null> => {
    try {
      const response = await fetch(game_with_no_thumbnail_icon_png);
      const blob = await response.blob();
      return new File([blob], "default-thumbnail.png", { type: "image/png" });
    } catch (err) {
      console.error("خطا در بارگیری تصویر پیش‌فرض:", err);
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
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 3000);
        })
        .catch((err) => console.error("خطا در کپی:", err));
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
        const successful = document.execCommand("copy");
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
    setSelectedProduct("");
    setGameName("");
    setDescription("");
    setEngine("");
    setPlatforms([]);
    setThumbnail(null);
    setImageError("");
    setGameNameError("");
    setEngineError("");
    setPlatformError("");
    setToken("");
    setCopySuccess(false);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "user name");
  }, []);

  const handlePlatformChange = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleSubmitGame = async () => {
    let valid = true;

    if (!gameName.trim()) {
      setGameNameError("وارد کردن نام بازی الزامی است.");
      valid = false;
    } else setGameNameError("");

    if (!engine.trim()) {
      setEngineError("انتخاب موتور بازی الزامی است.");
      valid = false;
    } else setEngineError("");

    if (platforms.length === 0) {
      setPlatformError("انتخاب حداقل یک پلتفرم الزامی است.");
      valid = false;
    } else setPlatformError("");

    if (!valid) return;

    setIsLoading(true);

    let finalThumbnail = thumbnail;

    if (!thumbnail) {
      finalThumbnail = await fetchDefaultThumbnail();
      if (!finalThumbnail) {
        alert("امکان بارگذاری تصویر پیش‌فرض وجود ندارد.");
        setIsLoading(false);
        return;
      }
    }

    const data = {
      name: gameName,
      description: description,
      engine: engine,
      platform: platforms,
      thumbnail: finalThumbnail,
    };

    try {
      setStep(3);
      const result = await submitGameInfo(data);
      setToken(result.token);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard", { state: { refresh: true } });
      }, 10000);
    } catch (err: any) {
      console.error("API error:", err.response?.data || err.message);
      alert("خطا در ثبت بازی. لطفا دوباره تلاش کنید.");
      setIsLoading(false);
    }
  };
  
  return (
    <div className={styles.container}>
      <WelcomePage_HeaderLayout></WelcomePage_HeaderLayout>

        <div className={styles.icons}>
          <img
              src={doticon}
              alt="بستن"
              className={styles.welcomePageicons}
              onClick={() => {
                setShowPopup(false);
                resetPopupState();
              }}
            />
            
          <img
            src={usericon}
            alt="بستن"
            className={styles.welcomePageicons}
            onClick={() => {
              setShowPopup(false);
              resetPopupState();
            }}
          />
          


        </div>
        
        <div
          className={`${styles.welcomePageMainBox} text-center ${
            showPopup ? styles.blurred : ""
          }`}
          >

          <h1 className={styles.WelcomePageTitle}>!Welcome</h1>
          <h2 className={styles.welcomePageMainBoxHeading}>
            {username} خوش اومدی!
          </h2>
          <p className={styles.welcomePageMainBoxDescription}>
            شروع کن تا ببینی توی محصولت دقیقاً چه خبره
          </p>
          <p className={styles.welcomePageMainBoxDescription}>
            و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.
          </p>

          <button
            className={`btn ${styles.welcomePageMainBoxStartBtn}`}
            onClick={() => setShowPopup(true)}
          >
            اضافه کردن بازی
          </button>
        </div>

      {showPopup && (
        <>
          <div className={styles.welcomePageMainBoxBody} />
          <div className={styles.welcomePageMainBoxBodyOverlay}>
            <div className={styles.welcomePageMainBoxBodyPopupCard}>
              {/* {(step === 1 ||
                (step === 2 && selectedProduct === "game") ||
                step === 3) && (
                <img
                  src={close_icon}
                  alt="بستن"
                  className={styles.welcomePagePopupCardCloseIcon}
                  onClick={() => {
                    setShowPopup(false);
                    resetPopupState();
                  }}
                />
              )} */}

              <div className={styles.welcomePageStepperContainer}>
                <div
                  className={`${styles.welcomePageStepperItem} ${
                    step >= 1 ? styles.active : ""
                  }`}
                >
                  <div className={styles.welcomePageStepperCircle}>1</div>
                  <div className={styles.welcomePageStepperLabel}>
                    انتخاب محصول
                  </div>
                </div>
                <div
                  className={`${styles.welcomePageStepperFirstLine} ${
                    step >= 2 ? styles.active : ""
                  }`}
                />
                <div
                  className={`${styles.welcomePageStepperItem} ${
                    step >= 2 ? styles.active : ""
                  }`}
                >
                  <div className={styles.welcomePageStepperCircle}>2</div>
                  <div className={styles.welcomePageStepperLabel}>اطلاعات</div>
                </div>
                <div
                  className={`${styles.welcomePageStepperSecondLine} ${
                    step >= 3 ? styles.active : ""
                  }`}
                />
                <div
                  className={`${styles.welcomePageStepperItem} ${
                    step >= 3 ? styles.active : ""
                  }`}
                >
                  <div className={styles.welcomePageStepperCircle}>3</div>
                  <div className={styles.welcomePageStepperLabel}>
                    ثبت نهایی
                  </div>
                </div>
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <p className={styles.welcomePagePopupTitle}>
                    محصولی که می‌خوای آنالیزشون رو انجام بدی رو انتخاب کن:
                  </p>
                  <div className={styles.welcomePageProductOptionsList}>
                    <label
                      className={`${styles.welcomePageProductOption} ${
                        selectedProduct === "game" ? styles.checked : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProduct === "game"}
                        onChange={() =>
                          setSelectedProduct(
                            selectedProduct === "game" ? "" : "game"
                          )
                        }
                      />
                      <span className={styles.checkmark} /> بازی
                    </label>

                    <label
                      className={`${styles.welcomePageProductOption} ${
                        selectedProduct === "website" ? styles.checked : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedProduct === "website"}
                        onChange={() =>
                          setSelectedProduct(
                            selectedProduct === "website" ? "" : "website"
                          )
                        }
                      />
                      <span className={styles.checkmark} /> وب‌سایت
                    </label>
                  </div>

                  <div className={styles.welcomePageProductButtonsRow}>
                    <button
                      className={styles.welcomePageContinueBtn}
                      disabled={selectedProduct !== "game" || isLoading}
                      onClick={handleClick}
                    >
                      {isLoading ? "در حال بارگذاری..." : "ادامه"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && selectedProduct === "game" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <div className={styles.step2Compact}>
                    <p className={`text-start mb-3`}>
                      اطلاعات بازیت رو وارد کن:
                    </p>

                    <div
                      className={`d-flex justify-content-between align-items-start mb-4`}
                    >
                      <div className={`flex-fill me-3`}>
                        <label className={`d-block mb-3 text-start`}>
                          نام بازی: <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                          type="text"
                          className={`form-control ${styles.gameNameInputSm} text-start`}
                          value={gameName}
                          onChange={(e) => setGameName(e.target.value)}
                        />

                        <div
                          className={styles.welcomePageErrorPlaceholder}
                          style={{ minHeight: "20px" }}
                        >
                          {gameNameError && (
                            <p className={`text-danger small mt-1 mb-0 text-start`}>
                              {gameNameError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className={styles.welcomePageUploadSection}>
                        <div className={styles.welcomePageUploadPreviewWrapper}>
                          {thumbnail ? (
                            <img
                              src={URL.createObjectURL(thumbnail)}
                              alt="thumbnail"
                              className={styles.welcomePageUploadPreviewImage}
                            />
                          ) : (
                            <img
                              src={uploading_game_image_icon_ghost}
                              alt="انتخاب تصویر"
                              className={
                                styles.welcomePageUploadPlaceholderIcon
                              }
                            />
                          )}
                        </div>
                        <div
                          className={`d-flex justify-content-center gap-3 mt-2`}
                        >
                          <label
                            className={`${styles.welcomePageUploadSelectLabel} mb-0`}
                          >
                            انتخاب تصویر
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/svg"
                              hidden
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setThumbnail(e.target.files[0]);
                                  setImageError("");
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            className={`${
                              styles.welcomePageDeleteImageTextBtn
                            } ${thumbnail ? styles.active : styles.disabled}`}
                            onClick={() => {
                              if (!thumbnail) {
                                setImageError("هنوز تصویری بارگزاری نشده است.");
                              } else {
                                setThumbnail(null);
                                setImageError("");
                              }
                            }}
                          >
                            حذف تصویر
                          </button>
                        </div>

                        {imageError && (
                          <p
                            className={`text-danger small mt-1 ${styles.errorText}`}
                          >
                            {imageError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-4">
                      <div className={`text-start flex-fill mt-3 mt-md-0 mb-4`}>
                        <label className="d-block mb-3">
                          انتخاب موتور بازی:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>

                        <div className={styles.welcomePageRadioGroupGrid}>
                          <label className={styles.welcomePageRadioLabel}>
                            <input
                              type="checkbox"
                              checked={engine === "unity"}
                              onChange={() => {
                                if (engine === "unity") {
                                  setEngine("");
                                } else {
                                  setEngine("unity");
                                }
                              }}
                            />
                            Unity
                          </label>

                          <label
                            className={`${styles.welcomePageRadioLabel} ${styles.welcomePageEngineDisabledOption}`}
                          >
                            <input
                              type="checkbox"
                              checked={engine === "godot"}
                              onChange={() => {
                                if (engine === "godot") {
                                  setEngine("");
                                } else {
                                  setEngine("godot");
                                }
                              }}
                            />
                            Godot
                          </label>

                          <label
                            className={`${styles.welcomePageRadioLabel} ${styles.welcomePageEngineDisabledOption}`}
                          >
                            <input
                              type="checkbox"
                              checked={engine === "custom"}
                              onChange={() => {
                                if (engine === "custom") {
                                  setEngine("");
                                } else {
                                  setEngine("custom");
                                }
                              }}
                            />
                            Custom
                          </label>
                        </div>

                        <div
                          className={styles.welcomePageErrorPlaceholder}
                          style={{ minHeight: "20px" }}
                        >
                          {engineError && (
                            <p
                              className={`text-danger small mt-1 mb-0 ${styles.errorText}`}
                            >
                              {engineError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row mb-4">
                      <div className={`text-start flex-fill mt-3 mt-md-0 mb-2`}>
                        <label className="d-block mb-3">
                          انتخاب پلتفرم هدف:{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>

                        <div className={styles.welcomePageRadioGroupGrid}>
                          <label className={styles.welcomePageRadioLabel}>
                            <input
                              type="checkbox"
                              checked={platforms.includes("ios")}
                              onChange={() => handlePlatformChange("ios")}
                            />
                            iOS
                          </label>

                          <label className={styles.welcomePageRadioLabel}>
                            <input
                              type="checkbox"
                              checked={platforms.includes("android")}
                              onChange={() => handlePlatformChange("android")}
                            />
                            Android
                          </label>

                          <label className={styles.welcomePageRadioLabel}>
                            <input
                              type="checkbox"
                              checked={platforms.includes("pc")}
                              onChange={() => handlePlatformChange("pc")}
                            />
                            Windows
                          </label>
                        </div>

                        <div
                          className={styles.welcomePageErrorPlaceholder}
                          style={{ minHeight: "20px" }}
                        >
                          {platformError && (
                            <p className={`text-danger small mt-1 mb-0`}>
                              {platformError}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`w-100 text-start mb-4`}>
                      <label className="d-block mb-2">توضیحات (اختیاری):</label>
                      <textarea
                        className={`form-control ${styles.gameNameInputSm}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className={`d-flex justify-content-center gap-3 mt-3 ${styles["step-2-buttons"]}`}>
                      <button className={styles.welcomePageContinueBtn} onClick={() => setStep(1)}>
                        بازگشت
                      </button>
                      <button className={styles.welcomePageContinueBtn} disabled={!selectedProduct || isLoading} onClick={handleSubmitGame}>
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
                  <div className={styles.welcomePageStepSuccessContainer}>
                    <div className={styles.welcomePageSuccessIconWrapper}>
                      <img src={gift} alt="Success Icon" />
                    </div>

                    <h4 className={styles.welcomePageSuccessTextTitle}>
                      محصول شما با موفقیت ثبت شد!
                    </h4>
                    <p className={styles.welcomePageSuccessTextExplain}>
                      همه‌چیز آماده‌ست. حالا فقط کافیه SDK رو داخل
                      بازی/وب‌سایت‌تون قرار بدید.
                    </p>
                    <p className={`mb-3 ${styles.welcomePageSdkDownloadLink}`}>
                      <a href="#">لینک دانلود SDK</a>
                    </p>
                    <div className={styles.welcomePageAccessTokenBox}>
                      <strong
                        className={styles.welcomePageAccessTokenLabel}
                      >
                        Access Token:
                      </strong>
                      <br />
                      <div className={styles.welcomePageAccesTokenInsideBox}>
                          <div className={styles.welcomePageCopyIconWrapper}>
                            <img
                              src={copyIcon}
                              alt="Copy"
                              className={`${
                                styles.welcomePageTokenCopyIconImg
                              } ${copySuccess ? styles.active : ""}`}
                              onClick={() => copyToClipboard(token)}
                            />
                            {copySuccess && (
                              <div className={styles.welcomePageCopyDoneMsgTooltip}>
                                !کپی شد
                              </div>
                            )}
                        </div>

                        <span className={styles.welcomePageTokenValue}>
                          {token}
                        </span>
                      </div>
                    </div>
                    <p className={styles.welcomePageTokenNote}>
                      برای اطلاع از دستور نصب، به بخش داکیومنت در منو مراجعه
                      کنید!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomePage;
