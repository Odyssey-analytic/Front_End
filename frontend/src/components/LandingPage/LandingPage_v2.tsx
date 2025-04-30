import React, { useEffect } from "react";
import styles from "./LandingPage_v2.module.css";
import TestimonialsCarousel from "./TestimonialsCarousel";
import OdessayLogo from "/public/icons/odessay_logo.svg";
import CircleAnimation from "./CircleAnimation";

const LandingPage: React.FC = () => {
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
          {/* Section 1: Hero */}
          <section className={`${styles.section} ${styles.heroSection}`}>
            <CircleAnimation />
            {/* <div className={styles.heroText}>
              <h1>هدایت مسیر رشد محصول شما</h1>
              <p>در چشم‌انداز داده‌محور جهانی</p>
            </div> */}
          </section>

          {/* Section 2: Feature Highlights */}
          <section className={styles.section}>ویژگی‌های کلیدی</section>

          {/* Section 3: Services */}
          <section className={styles.section}>سرویس‌ها</section>

          {/* Section 4: Testimonials */}
          <section className={styles.section}><TestimonialsCarousel /></section>

          {/* Section 5: Getting Started Steps */}
          <section className={styles.section}>چطور شروع کنیم؟</section>

          {/* Section 6: Achievements */}
          <section className={styles.section}>دستاوردها</section>

          {/* Section 7: Video + Contact */}
          <section className={styles.section}>آموزش و ارتباط با ما</section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
