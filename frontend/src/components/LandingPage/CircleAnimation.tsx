import React, { useEffect } from "react";
import styles from "./CircleAnimation.module.css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const CircleAnimation: React.FC = () => {
  useEffect(() => {
    gsap.fromTo(
      "#circleAnim1",
      { strokeDashoffset: 1130 }, // محیط دایره با r=180
      { strokeDashoffset: 0, duration: 3, ease: "power1.out" }
    );

    gsap.fromTo(
      "#circleAnim2",
      { strokeDashoffset: 880 },  // محیط دایره با r=140
      { strokeDashoffset: 0, duration: 3, ease: "power1.out" }
    );
  }, []);

  return (
    <div className={styles.planetContainer}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="fadeGrad1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
            <stop offset="75%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="fadeGrad2">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
            <stop offset="75%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>

          <mask id="circle-mask-1">
            <circle
              id="circleAnim1"
              className={styles.planetDottedAnimated}
              cx="200"
              cy="200"
              r="180"
              stroke="white"
              strokeWidth="12"
              fill="none"
            />
          </mask>

          <mask id="circle-mask-2">
            <circle
              id="circleAnim2"
              className={styles.planetDottedAnimated}
              cx="200"
              cy="200"
              r="140"  // 👈 اصلاح‌شده
              stroke="white"
              strokeWidth="12"
              fill="none"
            />
          </mask>
        </defs>

        {/* دایره اول */}
        <g mask="url(#circle-mask-1)">
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="url(#fadeGrad1)"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeLinecap="round"
            transform="rotate(90 200 200)"
            fill="none"
          />
        </g>

        {/* دایره دوم */}
        <g mask="url(#circle-mask-2)">
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="url(#fadeGrad2)"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeLinecap="round"
            transform="rotate(90 200 200)"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default CircleAnimation;
