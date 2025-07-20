import React, { useEffect, useState } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
  styleType: 1 | 2; // اضافه شده
};

const NUM_LINES = 5;

export default function WelcomePage() {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const createLine = (id: number): Line => ({
      id,
      top: Math.random() * 100,
      left: Math.random() * 100,
      length: 80 + Math.random() * 150,
      duration: 5 + Math.random() * 25,
      styleType: (Math.random() < 0.5 ? 1 : 2) as 1 | 2,
    });
  
    let nextId = 0;
  
    const addLine = () => {
      const newLine = createLine(nextId);
      const lineId = nextId;
      nextId++;
  
      setLines((prev) => [...prev, newLine]);
  
      // بعد از مدت زمان انیمیشن، حذفش کن و خط جدید اضافه کن
      setTimeout(() => {
        setLines((prev) => prev.filter((line) => line.id !== lineId));
        addLine(); // خط جدید بساز
      }, newLine.duration * 1000); // تبدیل به میلی‌ثانیه
    };
  
    // شروع اولیه (مثلاً 10 خط)
    for (let i = 0; i < NUM_LINES; i++) {
      addLine();
    }
  
    return () => {
      // اینجا می‌تونی پاک‌سازی تایمرها رو اضافه کنی اگه خواستی
    };
  }, []);
  



  return (
    <div className={styles.container}>
      {lines.map((line) => {
        const wrapperStyle =
          line.styleType === 1
            ? {
                top: `${line.top}%`,
                left: `-${line.left}%`,
                width: `${line.length}px`,
              }
            : {
                top: `100%`,
                left: `${line.left}%`,
                width: `${line.length}px`,
              };

        return (
          <div
            key={line.id}
            className={styles.rotatedWrapper}
            style={wrapperStyle}
          >
            <div
              className={styles.line}
              style={{
                animationDuration: `${line.duration}s`,
              }}
            />
          </div>
        );
      })}
    </div>

  );
}
