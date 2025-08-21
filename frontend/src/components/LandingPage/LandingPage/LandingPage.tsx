import React from "react";
import styles from "./LandingPage.module.css";

// Sections
import LandingPage_Testimonials from "../LandingPage_Testimonials/LandingPage_Testimonials";
import LandingPage_InsightOrbit from "../LandingPage_InsightOrbit/LandingPage_InsightOrbit";
import LandingPage_Navbar from "../LandingPage_Navbar/LandingPage_Navbar";
import LandingPage_AchievementCounters from "../LandingPage_AchievementCounters/LandingPage_AchievementCounters";
import LandingPage_HowToStart from "../LandingPage_HowToStart/LandingPage_HowToStart";
import LandingPage_AnalysisTools from "../LandingPage_AnalysisTools/LandingPage_AnalysisTools";
import LandingPage_Contact from "../LandingPage_Contact/LandingPage_Contanct";
import LandingPage_YoutubeVideoGuide from "../LandingPage_YoutubeVideoGuide/LandingPage_YoutubeVideoGuide";

// Assets
import Section1_Years from "../../../../public/icons/Landing/Section1_years.svg";
import BackGroundImage from "../../../../src/assets/images/TotalBackGround.png";
import FirstSectionBackGround from "../../../../src/assets/images/FirstSectionBackGround.png";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {/* پس‌زمینه کلی صفحه */}
      <img src={BackGroundImage} alt="" className={styles.backgroundImage} />

      {/* نوار ناوبری ثابت */}
      <LandingPage_Navbar />

      {/* محتوای صفحه */}
      <div className={styles.contentWrapper}>
        <main className={styles.mainSections}>
          {/* ========== Section 1 (Hero / بدون عنوان) ========== */}
          <section id="features" className={styles.section}>
            {/* بک‌گراند تزئینی همین سکشن */}
            <img src={FirstSectionBackGround} alt="" className={styles.sectionBg} />

            <div className={styles.sectionInner}>
              <div className={styles.heroRow}>
                <div className={styles.heroCopy}>
                  <h1>
                    هدایت مسیر رشد محصول شما
                    <br />
                    در چشم‌انداز داده‌محور{" "}
                    <span className={styles.accent}>جهانی</span>
                  </h1>
                  <p>
                    ما به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق و داشبوردهای
                    سفارشی، تصمیم‌های هوشمندانه‌تری بگیرید و تجربه کاربران را
                    بهینه‌سازی کنید.
                  </p>
                </div>

                {/* <img
                  src={Section1_Years}
                  alt=""
                  aria-hidden="true"
                  className={styles.heroArt}
                /> */}
              </div>

              <div className={styles.body}>
                <LandingPage_InsightOrbit />
              </div>
            </div>
          </section>

          {/* ========== Section 2 - Services ========== */}
          <section id="services" className={styles.sectionService}>
            {/* <div className={styles.sectionInner}> */}
              <header className={styles.head}>
                <span className={styles.headBadge}>سرویس‌ها</span>
                <span className={styles.headLine} />
              </header>
              <div className={styles.body}>
                <LandingPage_AnalysisTools />
              </div>
            {/* </div> */}
          </section>
          <section
            id="testimonials"
            className={`${styles.section} ${styles.sectionTestimonials}`}
          >
            <div className={styles.sectionInner}>
              <header className={styles.head}>
                <span className={styles.headBadgeTestimonials}>نظرات کاربران</span>
                <span className={styles.headLine} />
              </header>

              <div className={styles.body}>
                <LandingPage_Testimonials />
              </div>
            </div>
          </section>

          {/* ========== Section 4 - How to Start ========== */}
          <section id="start" className={styles.section}>
            <div className={styles.sectionInner}>
              <header className={styles.head}>
                <span className={styles.headBadge}>نحوه شروع</span>
                <span className={styles.headLine} />
              </header>
              <div className={styles.body}>
                <LandingPage_HowToStart />
              </div>
            </div>
          </section>

          {/* ========== Section 5 - Achievements ========== */}
          <section id="achievements" className={styles.section}>
            <div className={styles.sectionInner}>
              <header className={styles.head}>
                <span className={styles.headBadge}>دستاوردها</span>
                <span className={styles.headLine} />
              </header>
              <div className={styles.body}>
                <LandingPage_AchievementCounters />
              </div>
            </div>
          </section>

          {/* ========== Section 6 - YouTube Guide ========== */}
          <section id="youtubeGuide" className={styles.section}>
            <div className={styles.sectionInner}>
              <header className={styles.head}>
                <span className={styles.headBadge}>آموزش گام به گام</span>
                <span className={styles.headLine} />
              </header>
              <div className={styles.body}>
                <LandingPage_YoutubeVideoGuide />
              </div>
            </div>
          </section>

          <section id="contact" className={` ${styles.section}`}>
            <div className={styles.sectionInner}>
              <header className={styles.head}>
                <span className={styles.headBadge}>ارتباط با ما</span>
                <span className={styles.headLine} />
              </header>
              <div className={styles.body}>
                <LandingPage_Contact />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* دکمه رفتن به بالا */}
      <button
        className={styles.scrollToTopButton}
        onClick={() =>
          document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        ↑
      </button>
    </div>
  );
};

export default LandingPage;