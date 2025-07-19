import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  position: number;
  top: number; // مقدار تصادفی برای top به درصد
};

const DiagonalLine: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);
  const requestRef = useRef<number | null>(null);
  const speed = 2;
  const spawnInterval = 500;

  // تابع برای ساخت یک خط جدید با top تصادفی بین 10% تا 100%
  const createLine = (): Line => {
    const topPercent = 10 + Math.random() * 90; // عددی بین 10 تا 100
    return {
      id: lineId.current++,
      position: 0,
      top: topPercent,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => [...prev, createLine()]);
    }, spawnInterval);
    return () => clearInterval(interval);
  }, []);

  const animate = () => {
    setLines((prev) =>
      prev
        .map((line) => ({
          ...line,
          position: line.position + speed,
        }))
        .filter(
          (line) => line.position < window.innerWidth + window.innerHeight + 100
        )
    );
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      {lines.map((line) => (
        <div
          key={line.id}
          className={styles.line}
          style={{
            top: `${line.top}%`,
            transform: `translate(${line.position}px, -${line.position}px) rotate(-45deg)`
          }}
        />
      ))}
    </div>
  );
};

export default DiagonalLine;
