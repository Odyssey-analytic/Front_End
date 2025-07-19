import React, { useEffect, useState } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  top: number;
  left: number;
  length: number;
  duration: number;
};

const NUM_LINES = 15;

export default function WelcomePage() {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const generatedLines = Array.from({ length: NUM_LINES }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      length: 80 + Math.random() * 150,
      duration: 5 + Math.random() * 10, // سرعت بیشتر
    }));
    setLines(generatedLines);
  }, []);

  return (
    <div className={styles.container}>
      {lines.map((line) => (
        <div
          key={line.id}
          className={styles.rotatedWrapper}
          style={{
            top: `${line.top}%`,
            left: `-${line.left}%`,
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
