import React, { useEffect, useRef } from "react";
import styles from "./CircleAnimation.module.css";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap-trial/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap-trial/MotionPathPlugin";

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

const CircleAnimation: React.FC = () => {
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.fromTo(
      "#circleAnim1",
      { strokeDashoffset: 1130 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power1.out"
      }
    );

    gsap.fromTo(
      "#circleAnim2",
      { strokeDashoffset: 880 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power1.out",
        onComplete: () => {
          animateDots();
        }
      }
    );

    const animateDots = () => {
      const centerX = 200;
      const centerY = 200;

      const radius1 = 180;
      const radius2 = 140;

      const angle1 = 30 * (Math.PI / 180);
      const angle2 = 60 * (Math.PI / 180);

      const x1 = centerX + radius1 * Math.cos(angle1);
      const y1 = centerY + radius1 * Math.sin(angle1);

      const x2 = centerX + radius2 * Math.cos(angle2);
      const y2 = centerY + radius2 * Math.sin(angle2);

      // نقطه‌ها از نامرئی به مرئی و حرکت تا زاویه مورد نظر
      gsap.set([dot1Ref.current, dot2Ref.current], { opacity: 0 });

      gsap.to(dot1Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        motionPath: {
          path: "#pathOrbit1",
          align: "#pathOrbit1",
          alignOrigin: [0.5, 0.5],
          start: 0.6,
          end: 0.9 // حدود 30 درجه
        }
      });
      
      gsap.to(dot2Ref.current, {
        opacity: 1,
        duration: 2,
        ease: "power1.inOut",
        motionPath: {
          path: "#pathOrbit2",
          align: "#pathOrbit2",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 0.8 // حدود 60 درجه
        }
      });     
    };
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
              r="140"
              stroke="white"
              strokeWidth="12"
              fill="none"
            />
          </mask>
        </defs>

        {/* دایره‌ها */}
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

        <path
    id="pathOrbit1"
    d="M 200,20
       a 180,180 0 1,1 0,360
       a 180,180 0 1,1 0,-360"
    fill="none"
    stroke="transparent"
  />
  <path
    id="pathOrbit2"
    d="M 200,60
       a 140,140 0 1,1 0,280
       a 140,140 0 1,1 0,-280"
    fill="none"
    stroke="transparent"
  />

  {/* دایره‌های کوچک متحرک */}
  <circle ref={dot1Ref} id="movingDotLilac" className={styles.movingDotLilac} />

  <circle ref={dot2Ref} id="movingDotGray" className={styles.movingDotGray} />
        
        </svg>
    </div>
  );
};

export default CircleAnimation;
