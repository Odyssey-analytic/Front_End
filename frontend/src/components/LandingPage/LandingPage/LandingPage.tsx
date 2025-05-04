import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";

import LandingPage_Testimonials from "../LandingPage_Testimonials/LandingPage_Testimonials";
import LandingPage_InsightOrbit from "../LandingPage_InsightOrbit/LandingPage_InsightOrbit";
import LandingPage_Navbar from "../LandingPage_Navbar/LandingPage_Navbar";
import LandingPage_AchievementCounters from "../LandingPage_AchievementCounters/LandingPage_AchievementCounters";
import LandingPage_HowToStart from "../LandingPage_HowToStart/LandingPage_HowToStart";

import Section1_Years from "../../../../public/icons/Landing/Section1_years.svg"

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
              <div className={styles.featuresText}>
                <h2>
                  هدایت مسیر رشد محصول شما<br />
                  در چشم‌انداز داده‌محور <span className={styles.highlight}>جهانی</span>
                </h2>
                <p>
                  ما به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق و داشبوردهای سفارشی، تصمیم‌های هوشمندانه‌تری بگیرید
                  و تجربه کاربران را بهینه‌سازی کنید.
                </p>
              </div>

              <img src={Section1_Years} className={`${styles.section1_year_img}`}/>
              <LandingPage_InsightOrbit />
          </section>

          {/* ======================= Section 2 - Services =================== */}
          {/* <section id="services" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            سرویس‌ها
          </section> */}

          <section id="services" className={`${styles.section} ${styles.hiddenOnLoad}`}>
            <div className={styles.titleWrapper}>
              <div className={styles.sectionTitle}>سرویس‌ها</div>
              <div className={styles.titleUnderline}></div>
            </div>
          </section>


          {/* ======================= Section 3 - Testimonials =================== */}
          <section id="testimonials" className={styles.section}>
            <div className={`hiddenOnLoad ${styles.titleWrapper}`}>
              <div className={styles.sectionTitle}>نظرات کاربران</div>
              <div className={styles.titleUnderline}></div>
            </div>
            <LandingPage_Testimonials />
          </section>

          {/* ======================= Section 4 - Getting Started =================== */}
          <section id="start" className={styles.section}>
            <LandingPage_HowToStart />
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
