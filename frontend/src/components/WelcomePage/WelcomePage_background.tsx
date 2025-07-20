import React, { useEffect, useState, useRef } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
  styleType: 1 | 2;
};

export default function WelcomePage() {
  const [lines, setLines] = useState<Line[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    // فقط یک خط در ابتدا
    const newLine: Line = {
      id: nextId.current++,
      top: Math.random() * 100,
      left: Math.random() * 100,
      length: 100 + Math.random() * 100,
      duration: 4 + Math.random() * 3, // حدود 4 تا 7 ثانیه
      styleType: 1, // فعلاً ثابت
    };

    setLines([newLine]);
  }, []);

  const handleAnimationEnd = (id: number) => {
    setLines(prev => prev.filter(line => line.id !== id));
  };

  return (
    <div className={styles.container}>
      {lines.map(line => {
        const wrapperStyle =
          line.styleType === 1
            ? {
                top: `${line.top}%`,
                left: `-${line.length}px`, // شروع از بیرون چپ
                width: `${line.length}px`,
              }
            : {
                top: `100%`,
                left: `${line.left}%`,
                width: `${line.length}px`,
              };




            //   ? {
            //     top: ${line.top}%,
            //     left: -${line.left}%,
            //     width: ${line.length}px,
            //   }
            // : {
            //     top: 100%,
            //     left: ${line.left}%,
            //     width: ${line.length}px,
            //   };



              
        return (
          <div
            key={line.id}
            className={styles.rotatedWrapper}
            style={wrapperStyle}
          >
            <div
              className={`${styles.line} ${line.styleType === 1 ? styles.style1 : styles.style2}`}
              style={{ animationDuration: `${line.duration}s` }}
              onAnimationEnd={() => handleAnimationEnd(line.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
