import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomePage_Layout.module.css';
import { number } from 'framer-motion';

import WelcomePage from './WelcomePage';
import MainLayout from './WelcomePage_HeaderLayout';


type Line = {
  id: number;
  position: number;
  left?: number;
  top?: number;
  direction: 'bottom' | 'left';
  speed: number;
  length: number;
  opacity: number;
};


const DiagonalLine: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);
  const requestRef = useRef<number | null>(null);
  const spawnInterval = 300;

  const createLine = (): Line => {
    const isFromBottom = Math.random() < 0.5;
    const randomSpeed = 2 + Math.random() * 4;
    // between 2 - 6

    const randomLength = 30 + Math.random() * 150;
    // between 30px - 180px

    const randomOpacity = 0.2 + Math.random() * 0.6;
    // 0.2 - 0.8

    if (isFromBottom) {
      const leftPercent = 10 + Math.random() * 90;
      return {
        id: lineId.current++,
        position: 0,
        left: leftPercent,
        direction: 'bottom',
        speed: randomSpeed,
        length: randomLength,
        opacity: randomOpacity,
      };
    } else {
      const topPercent = 10 + Math.random() * 90;
      return {
        id: lineId.current++,
        position: 0,
        top: topPercent,
        direction: 'left',
        speed: randomSpeed,
        length: randomLength,
        opacity: randomOpacity,
      };
    }
  };

  useEffect(() => {

    setLines((prev) => [...prev, createLine()]);

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
          position: line.position + line.speed,
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

      <WelcomePage />
      {/* <MainLayout></MainLayout> */}


      {lines.map((line) => (
        <div
          key={line.id}
          className={styles.line}
          style={
            line.direction === 'bottom'
              ? {
                  top: `100%`,
                  left: `${line.left}%`,
                  width: `${line.length}px`,
                  opacity: line.opacity,
                  transform: `translate(${line.position}px, -${line.position}px) rotate(-45deg)`
                }
              : {
                  top: `${line.top}%`,
                  width: `${line.length}px`,
                  opacity: line.opacity,
                  transform: `translate(${line.position}px, -${line.position}px) rotate(-45deg)`
                }
          }
        />
      ))}

    </div>
  );
};

export default DiagonalLine;
