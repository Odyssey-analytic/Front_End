// LandingPage.tsx
import React, { useEffect } from "react";
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

      {/* Fixed Navbar */}
      <LandingPage_Navbar />

      <div className={styles.landingContent}>
        <main className={styles.mainSection}>
          <section id="features" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <CircleAnimation />
          </section>

          <section id="services" className={`${styles.section} ${styles.hiddenOnLoad}`}>سرویس‌ها</section>

          {/* <section id="testimonials" className={`${styles.section} ${styles.hiddenOnLoad}`} > <TestimonialsCarousel />نظرات</section>


           */}
            <TestimonialsCarousel />
           <section id="testimonials" className={`${styles.section}`}>
  <div className={`${styles.sectionTitleBox} ${styles.hiddenOnLoad}`}>
    <div className={styles.sectionTitle}>نظرات کاربران</div>
    <div className={styles.sectionTitleLine}></div>
  </div>
 
</section>

           
          {/* <section className={`${styles.section} ${styles.hiddenOnLoad}`}></section> */}

          {/* <section id="start" className={`${styles.section} ${styles.hiddenOnLoad}`}>چطور شروع کنیم؟</section> */}
          <section id="start" className={styles.section}>
  <LandingPage_Start />
</section>

          <section id="achievements" className={`${styles.section} ${styles.hiddenOnLoad}`}>دستاوردها <LandingPage_AchievementCounters /></section>

          <section id="contact" className={`${styles.section} ${styles.hiddenOnLoad}`}>آموزش و ارتباط با ما</section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;