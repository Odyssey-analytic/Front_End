import React, { useEffect, useState } from 'react';
import styles from './WelcomePage.module.css';

// type Line = {
//   id: number;
//   top: number;
//   left: number;
//   length: number;
//   duration: number;
// };

type Line = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
  styleType: 1 | 2; // اضافه شده
};



const NUM_LINES = 20;

export default function WelcomePage() {
  const [lines, setLines] = useState<Line[]>([]);

  // useEffect(() => {
  //   const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => ({
  //     id: i,
  //     top: Math.random() * 100,
  //     left: Math.random() * 100,
  //     length: 80 + Math.random() * 150,
  //     duration: 5 + Math.random() * 10,
  //   }));
  //   setLines(generatedLines);
  // }, []);

  // useEffect(() => {
  //   const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => ({
  //     id: i,
  //     top: Math.random() * 100,
  //     left: Math.random() * 100,
  //     length: 80 + Math.random() * 150,
  //     duration: 5 + Math.random() * 10,
  //     styleType: Math.random() < 0.5 ? 1 : 2, // نصف خط‌ها نوع 1، نصف نوع 2
  //   }));
  //   setLines(generatedLines);
  // }, []);
  

  // useEffect(() => {
  //   const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => ({
  //     id: i,
  //     top: Math.random() * 100,
  //     left: Math.random() * 100,
  //     length: 80 + Math.random() * 150,
  //     duration: 5 + Math.random() * 10,
  //     styleType: (Math.random() < 0.5 ? 1 : 2) as 1 | 2,
  //   }));
  //   setLines(generatedLines);
  // }, []);
  

  // useEffect(() => {
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     setLines((prevLines) => {
  //       if (count >= NUM_LINES) {
  //         clearInterval(interval);
  //         return prevLines;
  //       }
  
  //       const newLine: Line = {
  //         id: count,
  //         top: Math.random() * 100,
  //         left: Math.random() * 100,
  //         length: 80 + Math.random() * 150,
  //         duration: 5 + Math.random() * 10,
  //         styleType: (Math.random() < 0.5 ? 1 : 2) as 1 | 2,
  //       };
  
  //       count++;
  //       return [...prevLines, newLine];
  //     });
  //   }, 3);
  
  //   return () => clearInterval(interval);
  // }, []);
  

  useEffect(() => {
    let count = 0;
  
    const addLine = () => {
      if (count >= NUM_LINES) return;
  
      setLines((prevLines) => [
        ...prevLines,
        {
          id: count,
          top: Math.random() * 100,
          left: Math.random() * 70,
          length: 20 + Math.random() * 250,
          duration: 5 + Math.random() * 20,
          styleType: (Math.random() < 0.5 ? 1 : 2) as 1 | 2,
        },
      ]);
  
      count++;
      setTimeout(addLine, 30); // اینجا تایم‌ت رو تنظیم کن
    };
  
    addLine(); // شروع زنجیره
  
    // پاک‌سازی اختیاری (اگر نیاز به توقف زودهنگام باشه)
    return () => {
      count = NUM_LINES;
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

    // <div className={styles.container}>
    //   {lines.map((line) => (
    //     <div
    //       key={line.id}
    //       className={styles.rotatedWrapper}
    //       // style={{
    //       //   top: `${line.top}%`,
    //       //   left: `-${line.left}%`,
    //       //   width: `${line.length}px`,
    //       // }}
    //       // style={{
    //       //   top: `100%`,
    //       //   left: `${line.left}%`,
    //       //   width: `${line.length}px`,
    //       // }}
    //     >
    //       <div
    //         className={styles.line}
    //         style={{
    //           animationDuration: `${line.duration}s`,
    //         }}
    //       />
    //     </div>
    //   ))}
    // </div>
  );
}
