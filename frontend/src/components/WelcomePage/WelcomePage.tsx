// حافظه پاک میشه


import React, { useEffect, useRef, useState } from 'react';
import styles from './WelcomePage_simple.module.css';
import { number } from 'framer-motion';

type Line = {
  id: number;
  position: number;
  // top: number;
  left: number;
};

const DiagonalLine: React.FC = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const lineId = useRef(0);
  const requestRef = useRef<number | null>(null);
  const speed = 1;
  const spawnInterval = 3000;

  
  const createLine = (): Line => {
    const leftPercent = 10 + Math.random() * 90;
    return {
      id: lineId.current++,
      position: 0,
      left: leftPercent,
    };
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
          // style={{
          //   top: `${line.top}%`,
          //   transform: `translate(${line.position}px, -${line.position}px)
          //   rotate(-45deg)`
          // }}
          style={{
            top: `100%`,
            left: `${line.left}%`,
            transform: `translate(${line.position}px, -${line.position}px) rotate(-45deg)`
          }}
        />
      ))}
    </div>
  );
};

export default DiagonalLine;



// ? {
//   top: ${line.top}%,
//   left: -${line.left}%,
//   width: ${line.length}px,
// }
// : {
//   top: 100%,
//   left: ${line.left}%,
//   width: ${line.length}px,
// };

