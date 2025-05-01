import React, { useEffect, useRef } from "react";
import styles from "./LandingPage_InsightOrbit.module.css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap-trial/MotionPathPlugin";

// ======================= Register GSAP Plugins ===================
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const LandingPage_InsightOrbit: React.FC = () => {
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    // ======================= Animate the stroke reveal for each orbit circle ===================
    gsap.fromTo("#circleAnim1", { strokeDashoffset: 1130 }, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power1.out"
    });

    gsap.fromTo("#circleAnim2", { strokeDashoffset: 880 }, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power1.out",
      onComplete: () => {
        animateDots();
      }
    });

    // ======================= Animate orbiting dots on path after stroke animation ===================
    const animateDots = () => {
      gsap.set([dot1Ref.current, dot2Ref.current], { opacity: 0 });

      gsap.to(dot1Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        motionPath: {
          path: "#orbitPath1",
          align: "#orbitPath1",
          alignOrigin: [0.5, 0.5],
          start: 0.6,
          end: 0.9
        }
      });

      gsap.to(dot2Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        motionPath: {
          path: "#orbitPath2",
          align: "#orbitPath2",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 0.8
        }
      });
    };
  }, []);

  return (
    <div className={styles.orbitContainer}>
      <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ overflow: "visible" }}>
        <defs>
          {/* ======================= Orbit stroke fade gradients =================== */}
          <linearGradient id="orbitGradient1">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
            <stop offset="75%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="orbitGradient2">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="40%" stopColor="white" stopOpacity="0.5" />
            <stop offset="75%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>

          {/* ======================= Stroke reveal masks for animation =================== */}
          <mask id="maskOrbit1">
            <circle id="circleAnim1" className={styles.orbitAnimatedStroke} cx="200" cy="200" r="180" />
          </mask>

          <mask id="maskOrbit2">
            <circle id="circleAnim2" className={styles.orbitAnimatedStroke} cx="200" cy="200" r="140" />
          </mask>
        </defs>

        {/* ======================= Orbit lines =================== */}
        <g mask="url(#maskOrbit1)">
          <circle cx="200" cy="200" r="180" stroke="url(#orbitGradient1)" className={styles.orbitDashed} />
        </g>
        <g mask="url(#maskOrbit2)">
          <circle cx="200" cy="200" r="140" stroke="url(#orbitGradient2)" className={styles.orbitDashed} />
        </g>

        {/* ======================= Invisible paths for dot animation =================== */}
        <path id="orbitPath1" d="M 200,20 a 180,180 0 1,1 0,360 a 180,180 0 1,1 0,-360" fill="none" stroke="transparent" />
        <path id="orbitPath2" d="M 200,60 a 140,140 0 1,1 0,280 a 140,140 0 1,1 0,-280" fill="none" stroke="transparent" />

        {/* ======================= Orbiting dots =================== */}
        <circle ref={dot1Ref} className={styles.dotLilac} />
        <circle ref={dot2Ref} className={styles.dotGray} />
      </svg>
    </div>
  );
};

export default LandingPage_InsightOrbit;
