import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage_v2.module.css";

import TestimonialsCarousel from "./TestimonialsCarousel";
import CircleAnimation from "./CircleAnimation";
import LandingPage_Navbar from "./LandingPage_Navbar";
import LandingPage_AchievementCounters from "./LandingPage_AchievementCounters";
import LandingPage_Start from "./LandingPage_Start";

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

      {/* Navbar ثابت */}
      <LandingPage_Navbar />

      <div className={styles.landingContent}>
        <main className={styles.mainSection}>
          {/* سکشن اول - انیمیشن دایره */}
          <section id="features" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <CircleAnimation />
          </section>

          {/* سکشن دوم - سرویس‌ها */}
          <section id="services" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            سرویس‌ها
          </section>

          {/* سکشن سوم - نظرات کاربران */}
          <section id="testimonials" className={styles.section}>
            <div className={`hiddenOnLoad ${styles.sectionTitleBox}`}>
              <div className={styles.sectionTitle}>نظرات کاربران</div>
              <div className={styles.sectionTitleLine}></div>
            </div>
            <TestimonialsCarousel />
          </section>

          {/* سکشن چهارم - شروع کار */}
          <section id="start" className={styles.section}>
            <LandingPage_Start />
          </section>

          {/* سکشن پنجم - دستاوردها */}
          <section id="achievements" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <LandingPage_AchievementCounters />
          </section>

          {/* سکشن ششم - تماس با ما */}
          <section id="contact" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            آموزش و ارتباط با ما
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
