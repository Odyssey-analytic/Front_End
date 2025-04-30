
import React, { useEffect } from "react";
import styles from "./LandingPage_v2.module.css";
import TestimonialsCarousel from './TestimonialsCarousel'; 
import OdessayLogo from "/public/icons/odessay_logo.svg";
import CircleAnimation from "./CircleAnimation";

const LandingPage_v2: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      {
        threshold: 0.6,
        rootMargin: "0px 0px -30% 0px",
      }
    );
    const targets = document.querySelectorAll("." + styles.hiddenOnLoad);
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.landingPage}>
      <img
        src="/src/assets/images/Landing_Page_Background.png"
        alt="Background"
        className={styles.landingBackground}
      />

      <div className={styles.landingContent}>
        <header className={styles.landingHeader}>
          <div className={styles.authButtons}>
            <button className={styles.signupBtn}>ثبت‌نام</button>
            <button className={styles.loginBtn}>ورود</button>
          </div>
          <div className={styles.logo}>
            <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
            <span>ODESSAY</span>
          </div>
        </header>

        <main className={styles.mainSection}>
          <CircleAnimation />
        </main>
      </div>
    </div>
  );
};

export default LandingPage_v2;
