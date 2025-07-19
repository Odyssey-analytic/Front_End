import React, { useEffect, useState } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
};

const NUM_LINES = 7;

export default function WelcomePage() {
  const [lines, setLines] = useState<Line[]>([]);

  // useEffect(() => {
  //   const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => {
  //     const fromTop = Math.random() < 0.5;

  //     return {
  //       id: i,
  //       top: fromTop ? 0 : Math.random() * 100,
  //       left: fromTop ? Math.random() * 100 : 0,
  //       length: 80 + Math.random() * 150,
  //       duration: 5 + Math.random() * 10,
  //     };
  //   });
  //   setLines(generatedLines);
  // }, []);


  useEffect(() => {
    const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => {
      const fromTop = Math.random() < 0.5;
  
      const line = {
        id: i,
        top: fromTop ? 0 : Math.random() * 100,
        left: fromTop ? Math.random() * 100 : 0,
        length: 80 + Math.random() * 150,
        duration: 5 + Math.random() * 10,
      };
  
      console.log('Generated line:', line); // 🔍 لاگ بررسی
      return line;
    });
    setLines(generatedLines);
  }, []);
  

  return (
    <div className={styles.container}>
      {lines.map((line) => (
        <div
          key={line.id}
          className={styles.rotatedWrapper}
          // style={{
          //   top: `${line.top}%`,
          //   left: `${line.left}%`,
          //   width: `${line.length}px`,
          // }}
          style={{
            top: line.top === 0 ? '0%' : `${line.top}%`,
            left: line.left === 0 ? '0%' : `${line.left}%`,
            width: `${line.length}px`,
          }}
          
        >
          <div
            className={styles.line}
            style={{
              animationDuration: `${line.duration}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

