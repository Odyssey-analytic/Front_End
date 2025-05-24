import React, { useEffect, useState, useRef } from "react";
import styles from "./LandingPage_AchievementCounters.module.css";

// ======================= Achievement data =======================
const achievements = [
  { key: "users", value: 55000, label: "کاربران مبتنی بر داده" },
  { key: "studios", value: 2000, label: "استودیو و کمپانی‌های فعال" },
  { key: "years", value: 15, label: "بزرگترین سرویس تحلیلی", suffix: "سال" },
  { key: "countries", value: 10, label: "جامعه جهانی", suffix: "کشور دنیا" },
];

// ======================= Convert number to Persian digits =======================
function toPersianDigits(num: number): string {
  return num.toLocaleString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
}

// ======================= Counter Component =======================
const Counter: React.FC<{ end: number; trigger: boolean; speed?: number }> = ({
  end,
  trigger,
  speed = 200,
}) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trigger) return;

    let current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const increment = Math.ceil(end / 100);
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

// ======================= Main Component =======================
const LandingPage_AchievementCounters: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setVisible(false); 
  //         setTimeout(() => {
  //           setVisible(true);
  //           setAnimationKey(prev => prev + 1); // re-trigger
  //         }, 100);
  //       }
  //     },
  //     { threshold: 0.6 }
  //   );

  //   if (containerRef.current) observer.observe(containerRef.current);
  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !visible) {
        setVisible(true);
        setAnimationKey(prev => prev + 1);
      }
    },
    { threshold: 0.6 }
  );

  if (containerRef.current) observer.observe(containerRef.current);
  return () => observer.disconnect();
}, [visible]);


  useEffect(() => {
    const handleResize = () => {
      const cards = document.querySelectorAll(`.${styles.card}`);
      let maxHeight = 0;
  
      cards.forEach((card) => {
        (card as HTMLElement).style.height = "auto";
      });
  
      cards.forEach((card) => {
        const height = (card as HTMLElement).offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });
  
      cards.forEach((card) => {
        (card as HTMLElement).style.height = `${maxHeight}px`;
      });
    };
  
    handleResize(); // اجرا در بار اول
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visible]);
  

  return (
    <div className={styles.container} ref={containerRef}>
      <h3 className={styles.title}>دستاوردهای ما در یک نگاه :</h3>
      <p className={styles.subtitle}>
        هزاران استودیو، ناشر و توسعه‌دهنده با استفاده از سرویس‌های ما مسیر جذابی برای تحلیل و رشد پیدا کرده‌اند. ثبت‌نام کنید!
      </p>

      <div className={styles.statsGrid}>
        {achievements.map(({ key, value, label, suffix }, index) => (
          <div
            key={`${key}-${animationKey}`}
            className={`${styles.card} ${visible ? styles.fadeUp : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }} // 🌟 staggered entry
          >
            <div className={styles.label}>
              {label}
              {suffix && <span className={styles.suffix}> در {suffix}</span>}
            </div>
            
            <div className={styles.odometer}>
              <Counter end={value} trigger={visible} speed={30} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage_AchievementCounters;
