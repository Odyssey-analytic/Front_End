// LandingPage_v2.tsx
import React, { useEffect } from "react";
import styles from "./LandingPage_v2.module.css";
import TestimonialsCarousel from './TestimonialsCarousel'; 
import OdessayLogo from '/public/icons/odessay_logo.svg';

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
            <div className={`english-text ${styles.logoText}`}>ODESSAY</div>

            <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
          </div>

         
        </header>

        <main className={styles.mainSection}>
          <h1 className={styles.fadeIn}>هدایت مسیر رشد محصول شما</h1>
          <p className={`${styles.fadeIn} ${styles.delay1}`}>در چشم‌انداز داده‌محور جهانی</p>
          <p className={`${styles.fadeIn} ${styles.delay2} ${styles.subtext}`}>
            ما به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق و داشبوردهای سفارشی، تصمیم‌های هوشمندانه‌تری
            بگیرید و تجربه کاربران را بهینه‌سازی کنید.
          </p>
          <button className={`${styles.fadeIn} ${styles.delay3} ${styles.servicesBtn}`}>بررسی سرویس‌ها</button>
        </main>

        <section className={`${styles.servicesSection} ${styles.hiddenOnLoad}`} id="services">
          <h2>سرویس‌ها جهت آنالیز و بهینه‌سازی</h2>
          <p>
            با ابزارهای تحلیل ما، عملکرد محصول خود را با دقت بررسی کرده و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
          </p>
          <div className={styles.features}>
            <ul>
              <li>داشبورد سفارشی</li>
              <li>شاخص‌های کلیدی</li>
              <li>پایش لحظه‌ای</li>
              <li>ردیابی درآمد</li>
              <li>رویدادهای منعطف</li>
            </ul>
          </div>
          <button className={styles.servicesBtn}>بررسی سرویس‌ها</button>
        </section>

        <TestimonialsCarousel />
      </div>
    </div>
  );
};

export default LandingPage_v2;