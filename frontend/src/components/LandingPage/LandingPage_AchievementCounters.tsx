// components/LandingPage_AchievementCounters.tsx
import React, { useEffect, useState, useRef } from "react";
import styles from "./LandingPage_AchievementCounters.module.css";

const achievements = [
  { key: "users", value: 55000, label: "کاربران مبتنی بر داده" },
  { key: "studios", value: 2000, label: "استودیو و کمپانی‌های فعال" },
  { key: "years", value: 15, label: "بزرگترین سرویس تحلیلی", suffix: "سال" },
  { key: "countries", value: 10, label: "جامعه جهانی", suffix: "کشور دنیا" },
];

function toPersianDigits(num: number): string {
  return num.toLocaleString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}

const Counter: React.FC<{ end: number; trigger: boolean; speed?: number }> = ({
  end,
  trigger,
  speed = 200, // زمان بین هر گام (ms) = هر 0.2 ثانیه یک گام
}) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const increment = Math.ceil(end / 100); // حدوداً 100 مرحله برای هر عدد
      current += increment;

      if (current >= end) {
        current = end;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      setCount(current);
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, end, speed]);

  return <span>{toPersianDigits(count)}</span>;
};

const LandingPage_AchievementCounters: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(false);
          setTimeout(() => setVisible(true), 100);
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <h3 className={styles.title}>دستاوردهای ما در یک نگاه :</h3>
      <p className={styles.subtitle}>
        هزاران استودیو، ناشر و توسعه‌دهنده با استفاده از سرویس‌های ما مسیر جذابی برای تحلیل و رشد پیدا کرده‌اند. ثبت‌نام کنید!
      </p>

      <div className={styles.statsGrid}>
        {achievements.map(({ key, value, label, suffix }) => (
          <div key={key} className={styles.card}>
            <div className={styles.odometer}>
              <Counter end={value} trigger={visible} speed={30} />
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
