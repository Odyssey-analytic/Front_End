// ========================== Insight Orbit Section ==========================
// Animated dashed orbit circles with GSAP and orbiting dots when in viewport

import React, { useEffect, useRef } from "react";
import styles from "./LandingPage_InsightOrbit.module.css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";


// Register GSAP plugins
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const LandingPage_InsightOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // Observe when this component enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation(); // Trigger animation when visible
          }
        });
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Animate the circles and then the orbiting dots
    const startAnimation = () => {
      // Reset stroke-dashoffsets and dot opacity
      gsap.set("#circleAnim1", { strokeDashoffset: 1130 });
      gsap.set("#circleAnim2", { strokeDashoffset: 880 });
      gsap.set([dot1Ref.current, dot2Ref.current], { opacity: 0 });

      // Animate stroke drawing for both circles
      gsap.to("#circleAnim1", {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to("#circleAnim2", {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power1.out",
        onComplete: () => animateDots(), // Animate dots after circles are drawn
      });
    };

    // Animate dots along invisible motion paths
    const animateDots = () => {
      gsap.to(dot1Ref.current, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
          path: "#pathOrbit1",
          align: "#pathOrbit1",
          alignOrigin: [0.5, 0.5],
          start: 0.6,
          end: 0.9,
        },
      });

      gsap.to(dot2Ref.current, {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
          path: "#pathOrbit2",
          align: "#pathOrbit2",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 0.8,
        },
      });
    };

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.planetContainer} ref={containerRef}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
        <defs>
          {/* === Gradients for faded stroke effect === */}
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

          {/* === Masked circles for stroke animation === */}
          <mask id="circle-mask-1">
            <circle
              id="circleAnim1"
              className={styles.planetDottedAnimated}
              cx="200"
              cy="200"
              r="180"
            />
          </mask>
          <mask id="circle-mask-2">
            <circle
              id="circleAnim2"
              className={styles.planetDottedAnimated}
              cx="200"
              cy="200"
              r="140"
            />
          </mask>
        </defs>

        {/* === Dashed orbit circles with gradient stroke === */}
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

        {/* === Hidden paths for guiding dot motion === */}
        <path
          id="pathOrbit1"
          d="M 200,20 a 180,180 0 1,1 0,360 a 180,180 0 1,1 0,-360"
          fill="none"
          stroke="transparent"
        />
        <path
          id="pathOrbit2"
          d="M 200,60 a 140,140 0 1,1 0,280 a 140,140 0 1,1 0,-280"
          fill="none"
          stroke="transparent"
        />

        {/* === Orbiting dots === */}
        <circle ref={dot1Ref} className={styles.movingDotLilac} />
        <circle ref={dot2Ref} className={styles.movingDotGray} />
      </svg>
    </div>
  );
};

export default LandingPage_InsightOrbit;
