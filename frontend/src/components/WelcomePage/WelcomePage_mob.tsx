import styles from "./WelcomePage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitGameInfo } from "../../services/userService";
import MainLayout from "../MainLayout/MainLayout";
import { motion } from "framer-motion";

// =========================== assets ===========================
import welcome_page_main_box_welcome_icon from "/public/icons/welcome_page_main_box_welcome_icon.svg";
import gift from "/public/icons/gift.svg";
import close_icon from "/public/icons/close_icon.svg";
import uploading_game_image_icon_ghost from "/public/icons/game-ghost-icon.svg";
import copyIcon from "/public/icons/copy-icon-gradient.svg";
import game_with_no_thumbnail_icon_png from "../../../public/icons/game_with_no_thumbnail_icon.png";

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
      {/* بخش هیرو */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <div className={styles.heroImageContainer}>
            <div className={styles.heroImage}>
              <div className={styles.dashboardMockup}>
                <div className={styles.mockupScreen}>
                  <div className={styles.mapVisualization}></div>
                  <div className={styles.dataPoints}>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className={styles.dataPoint} style={{
                        left: `${10 + (i * 15)}%`,
                        bottom: `${20 + (Math.random() * 60)}%`,
                        animationDelay: `${i * 0.2}s`
                      }}></div>
                    ))}
                  </div>
                </div>

              </div>
              <div className={styles.floatingShapes}>
                <div className={`${styles.shape} ${styles.shape1}`}></div>
                <div className={`${styles.shape} ${styles.shape2}`}></div>
                <div className={`${styles.shape} ${styles.shape3}`}></div>
              </div>
            </div>
          </div>
        </div>

      </section>
      </div>

  );
};

export default WelcomePage;
