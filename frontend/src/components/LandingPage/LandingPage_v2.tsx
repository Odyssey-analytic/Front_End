// LandingPage_v2.tsx
import React, { useEffect } from "react";
import styles from "./LandingPage_v2.module.css";
import TestimonialsCarousel from './TestimonialsCarousel'; 
import OdessayLogo from "/public/icons/odessay_logo.svg";
import { gsap } from "gsap";
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const LandingPage_v2: React.FC = () => {
  useEffect(() => {
    // Intersection observer (قبلی)
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

  useEffect(() => {
    // دایره اول (ساعت‌گرد)
    gsap.fromTo(
      "#circleAnim1",
      { strokeDashoffset: 565 },
      { strokeDashoffset: 0, duration: 3, ease: "power1.out" }
    );
  
    // دایره دوم (پادساعت‌گرد)
    gsap.fromTo(
      "#circleAnim2",
      { strokeDashoffset: 0 },
      { strokeDashoffset: 565, duration: 3, ease: "power1.out" }
    );
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
          <div className={styles.planetContainer}>
          <svg width="200" height="200" style={{ overflow: 'visible' }}>
  <defs>
    {/* دایره اول */}
    <mask id="circle-mask-1">
      <circle
        id="circleAnim1"
        className={styles.planetDottedAnimated}
        cx="100"
        cy="100"
        r="90"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
    </mask>

    {/* دایره دوم */}
    <mask id="circle-mask-2">
      <circle
        id="circleAnim2"
        className={styles.planetDottedAnimated}
        cx="100"
        cy="100"
        r="70"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
    </mask>
  </defs>

  {/* دایره اول با ماسک */}
  <g mask="url(#circle-mask-1)">
    <circle
      className={styles.planetDotted}
      cx="100"
      cy="100"
      r="90"
      stroke="#fff"
      strokeWidth="2"
      strokeDasharray="6 10"
      strokeLinecap="round"
      fill="none"
    />
  </g>

  {/* دایره دوم با ماسک */}
  <g mask="url(#circle-mask-2)">
    <circle
      className={styles.planetDotted}
      cx="100"
      cy="100"
      r="70"
      stroke="#fff"
      strokeWidth="2"
      strokeDasharray="6 10"
      strokeLinecap="round"
      fill="none"
    />
  </g>
</svg>

      </div>
        </main>

        {/* <section className={`${styles.servicesSection} ${styles.hiddenOnLoad}`} id="services">
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

        <TestimonialsCarousel /> */}
      </div>

      {/* SVG with mask and animated circle */}
      
    </div>
  );
};

export default LandingPage_v2;
