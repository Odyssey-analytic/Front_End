import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomePage.module.css';

type Line = {
  id: number;
  position: number;
  startX: number;
  startY: number;
};

const DiagonalLine: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);
  const requestRef = useRef<number | null>(null);
  const speed = 2;
  const spawnInterval = 500;

  // تولید موقعیت تصادفی از لبه چپ یا لبه پایین
  const generateRandomStart = (): { x: number; y: number } => {
    const fromBottom = Math.random() < 0.5;
    if (fromBottom) {
      return {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight,
      };
    } else {
      return {
        x: 0,
        y: Math.random() * window.innerHeight,
      };
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const { x, y } = generateRandomStart();
      setLines((prev) => [
        ...prev,
        { id: lineId.current++, position: 0, startX: x, startY: y }
      ]);
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
        .filter((line) =>
          line.startX + line.position < window.innerWidth + 100 &&
          line.startY - line.position > -100
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
            transform: `translate(${line.startX + line.position}px, ${line.startY - line.position}px) rotate(-45deg)`
          }}
        />
      ))}
    </div>
  );
};

export default DiagonalLine;
