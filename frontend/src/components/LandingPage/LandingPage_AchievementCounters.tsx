// components/LandingPage_AchievementCounters.tsx
import React, { useEffect, useState } from "react";
import styles from "./LandingPage_AchievementCounters.module.css";

const achievements = [
  { key: "users", value: 55000, label: "کاربران مبتنی بر داده" },
  { key: "studios", value: 2000, label: "استودیو و کمپانی‌های فعال" },
  { key: "years", value: 3, label: "بزرگترین سرویس تحلیلی", suffix: "سال" },
  { key: "countries", value: 4, label: "جامعه جهانی", suffix: "کشور دنیا" },
];

function toPersianDigits(num: number): string {
  return num.toLocaleString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}

const Counter: React.FC<{ end: number; duration?: number; steps?: number }> = ({
  end,
  duration = 5000, // مدت زمان نهایی شمارش (آهسته‌تر شد)
  steps = 100      // تعداد گام‌های شمارش
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = end / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        current = end;
        clearInterval(interval);
      }
      setCount(Math.floor(current));
    }, duration / steps);

    return () => clearInterval(interval);
  }, [end, duration, steps]);

  return <span>{toPersianDigits(count)}</span>;
};


const LandingPage_AchievementCounters: React.FC = () => {
  const DURATION = 3000; // همه با هم توی این مدت تموم بشن

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>دستاوردهای ما در یک نگاه :</h3>
      <p className={styles.subtitle}>
        هزاران استودیو، ناشر و توسعه‌دهنده با استفاده از سرویس‌های ما مسیر جذابی برای تحلیل و رشد پیدا کرده‌اند. ثبت‌نام کنید!
      </p>

      <div className={styles.statsGrid}>
        {achievements.map(({ key, value, label, suffix }) => (
          <div key={key} className={styles.card}>
            <div className={styles.odometer}>
              <Counter end={value} duration={5000} steps={120}  />
            </div>
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

export default LandingPage_AchievementCounters;
