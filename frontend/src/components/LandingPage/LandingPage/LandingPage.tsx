import React, { useEffect } from "react";
import styles from "./LandingPage.module.css";

import LandingPage_Testimonials from "../LandingPage_Testimonials/LandingPage_Testimonials";
import LandingPage_InsightOrbit from "../LandingPage_InsightOrbit/LandingPage_InsightOrbit";
import LandingPage_Navbar from "../LandingPage_Navbar/LandingPage_Navbar";
import LandingPage_AchievementCounters from "../LandingPage_AchievementCounters/LandingPage_AchievementCounters";
import LandingPage_HowToStart from "../LandingPage_HowToStart/LandingPage_HowToStart";
import LandingPage_AnalysisTools from "../LandingPage_AnalysisTools/LandingPage_AnalysisTools";
import LandingPage_Contact from "../LandingPage_Contact/LandingPage_Contanct";
import LandingPage_YoutubeVideoGuide from "../LandingPage_YoutubeVideoGuide/LandingPage_YoutubeVideoGuide";

import Section1_Years from "../../../../public/icons/Landing/Section1_years.svg";
import BackGroundImage from "../../../../src/assets/images/TotalBackGround.png";
import FirstSectionBackGround from "../../../../src/assets/images/FirstSectionBackGround.png";

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

  // =============== Auto Snap to Closest Section After Scroll Stop =================
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scrollToClosestSection = () => {
      const sections = document.querySelectorAll(`.${styles.section}`);
      let closestSection: Element | null = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      if (closestSection) {
        timeoutId = setTimeout(() => {
          closestSection?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 800);
      }
    };

    const handleScrollEnd = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(scrollToClosestSection, 800);
    };

    window.addEventListener("scroll", handleScrollEnd);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <img
        src={BackGroundImage}
        alt="Background"
        className={styles.backgroundImage}
      />

      <LandingPage_Navbar />

      <div className={styles.contentWrapper}>
        <main className={styles.mainSections}>
          <section
            id="features"
            className={`${styles.section} ${styles.hiddenOnLoad}`}
          >
            <img
              src={FirstSectionBackGround}
              alt="FirstSectionBackground"
              className={styles.FirstSectionBackGroundImage}
            />
            <div className={styles.featuresText}>
              <h2>
                هدایت مسیر رشد محصول شما
                <br />
                در چشم‌انداز داده‌محور{" "}
                <span className={styles.featureHighlight}>جهانی</span>
              </h2>
              <p>
                ما به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق و داشبوردهای
                سفارشی، تصمیم‌های هوشمندانه‌تری بگیرید و تجربه کاربران را
                بهینه‌سازی کنید.
              </p>
            </div>
            <img src={Section1_Years} className={styles.feature_year_img} />
            <LandingPage_InsightOrbit />
          </section>

          <section
            id="services"
            className={`${styles.section} ${styles.hiddenOnLoad}`}
          >
            <div className={styles.servicesTitleWrapper}>
              <div className={styles.servicesTitleBox}>سرویس‌ها</div>
              <div className={styles.servicesTitleLine}></div>
            </div>
            <div className={styles.servicesInsidePart}>
              <LandingPage_AnalysisTools />
            </div>
          </section>

          <section id="testimonials" className={styles.section}>
            <div className={styles.testimonialsTitleWrapper}>
              <div className={styles.testimonialsTitleBox}>نظرات کاربران</div>
              <div className={styles.testimonialsTitleLine}></div>
            </div>
            <div className={styles.testimonialsInsidePart}>
              <LandingPage_Testimonials />
            </div>
          </section>

          <section id="start" className={styles.section}>
            <div className={styles.startTitleWrapper}>
              <div className={styles.startTitleBox}>نحوه شروع</div>
              <div className={styles.startTitleLine}></div>
            </div>
            <div className={styles.startInsidePart}>
              <LandingPage_HowToStart />
            </div>
          </section>

          <section
            id="achievements"
            className={`${styles.section} ${styles.hiddenOnLoad}`}
          >
            <div className={styles.achievementsTitleWrapper}>
              <div className={styles.achievementsTitleBox}>دستاوردها</div>
              <div className={styles.achievementsTitleLine}></div>
            </div>
            <div className={styles.achievementsInsidePart}>
              <LandingPage_AchievementCounters />
            </div>
          </section>

          <section
            id="youtubeGuide"
            className={`${styles.section} ${styles.hiddenOnLoad}`}
          >
            <div className={styles.youtubeTitleWrapper}>
              <div className={styles.youtubeTitleBox}>آموزش گام به گام</div>
              <div className={styles.youtubeTitleLine}></div>
            </div>
            <div className={styles.youtubeInsidePart}>
              <LandingPage_YoutubeVideoGuide />
            </div>
          </section>

          <section
            id="contact"
            className={`${styles.section} ${styles.hiddenOnLoad}`}
          >
            <div className={styles.contactInsidePart}>
              <LandingPage_Contact />
            </div>
          </section>
        </main>
      </div>

      <button
        className={styles.scrollToTopButton}
        onClick={() => {
          const sectionTop = document.getElementById("features");
          sectionTop?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        ↑
      </button>
    </div>
  );
};

export default LandingPage;
