import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";

import TestimonialsCarousel from "./LandingPage_Testimonials";
import LandingPage_InsightOrbit from "./LandingPage_InsightOrbit";
import LandingPage_Navbar from "./LandingPage_Navbar";
import LandingPage_AchievementCounters from "./LandingPage_AchievementCounters";
import LandingPage_Start from "./LandingPage_Start";

const LandingPage: React.FC = () => {
  useEffect(() => {
    // ======================= Intersection Observer to animate hidden sections on scroll ===================
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
    <div className={styles.wrapper}>
      <img
        src="/src/assets/images/Landing_Page_Background.png"
        alt="Background"
        className={styles.backgroundImage}
      />

      {/* ======================= Fixed Navbar =================== */}
      <LandingPage_Navbar />

      <div className={styles.contentWrapper}>
        <main className={styles.mainSections}>
          {/* ======================= Section 1 - Circle Animation =================== */}
          <section id="features" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <LandingPage_InsightOrbit />
          </section>

          {/* ======================= Section 2 - Services =================== */}
          <section id="services" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            سرویس‌ها
          </section>

          {/* ======================= Section 3 - Testimonials =================== */}
          <section id="testimonials" className={styles.section}>
            <div className={`hiddenOnLoad ${styles.titleWrapper}`}>
              <div className={styles.sectionTitle}>نظرات کاربران</div>
              <div className={styles.titleUnderline}></div>
            </div>
            <TestimonialsCarousel />
          </section>

          {/* ======================= Section 4 - Getting Started =================== */}
          <section id="start" className={styles.section}>
            <LandingPage_Start />
          </section>

          {/* ======================= Section 5 - Achievement Counters =================== */}
          <section id="achievements" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <LandingPage_AchievementCounters />
          </section>

          {/* ======================= Section 6 - Contact Us =================== */}
          <section id="contact" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            آموزش و ارتباط با ما
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
