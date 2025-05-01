// components/AchievementCounters.tsx
import React, { useEffect } from "react";
import styles from "./LandingPage_AchievementCounters.module.css";

const achievements = [
  { className: "odometer-users", value: 55000, label: "کاربران مبتنی بر داده" },
  { className: "odometer-studios", value: 2000, label: "استودیو و کمپانی‌های فعال" },
  { className: "odometer-years", value: 3, label: "بزرگترین سرویس تحلیلی", suffix: "سال" },
  { className: "odometer-countries", value: 4, label: "جامعه جهانی", suffix: "کشور دنیا" },
];

declare global {
  interface Window {
    Odometer: any;
  }
}

const LandingPage_AchievementCounters : React.FC = () => {
  useEffect(() => {
    achievements.forEach(({ className, value }) => {
      const el = document.querySelector(`.${className}`);
      if (!el) return;

      const odometer = new window.Odometer({
        el,
        value: 0,
        format: "(,ddd)",
      });

      let hasRun = false;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasRun) {
              odometer.update(value);
              hasRun = true;
            }
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(el);
    });
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>دستاوردهای ما در یک نگاه :</h3>
      <p className={styles.subtitle}>
        هزاران استودیو، ناشر و توسعه‌دهنده با استفاده از سرویس‌های ما مسیر جذابی برای تحلیل و رشد پیدا کرده‌اند. ثبت‌نام کنید!
      </p>

      <div className={styles.statsGrid}>
        {achievements.map(({ className, label, suffix }) => (
          <div key={className} className={styles.card}>
            <div className={`odometer ${className}`}>0</div>
            <div className={styles.label}>
              {label}
              {suffix && <span className={styles.suffix}> در {suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage_AchievementCounters ;
