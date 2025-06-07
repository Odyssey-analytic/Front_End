import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import styles from "./LandingPage_AnalysisTools.module.css";

gsap.registerPlugin(DrawSVGPlugin);

import Custom_Dashboard from "../../../../public/icons/Landing/Custom Dashboard.svg";
import Custom_KPIs from "../../../../public/icons/Landing/Custom KPIs.svg";
import Real_time_Monitoring from "../../../../public/icons/Landing/Real-time Monitoring.svg";
import Revenue_Tracking from "../../../../public/icons/Landing/Revenue Tracking.svg";
import Flexible_Events from "../../../../public/icons/Landing/Flexible Events.svg";
import Service_Box from "../../../../public/icons/Landing/box.svg";
import Topbar from "../../../../public/icons/Landing/topbar.svg";
import ServiceSection_FirstChat from "../../../../public/icons/Landing/ServiceSection_FirstChat.svg";
import ServiceSection_SecondChat from "../../../../public/icons/Landing/ServiceSection_SecondChat.svg";
import ServiceSection_ThirdChat from "../../../../public/icons/Landing/ServiceSection_ThirdChat.svg";
import ServiceSection_FirstChat_Profile from "../../../../public/icons/Landing/ServiceSection_FirstChat_Profile.svg";
import ServiceSection_SecondChat_Profile from "../../../../public/icons/Landing/ServiceSection_SecondChat_Profile.svg";
import ServiceSection_ThirdChat_Profile from "../../../../public/icons/Landing/ServiceSection_ThirdChat_Profile.svg";
import ServiceSection_ChartBox from "../../../../public/icons/Landing/ServiceSection_ChartBox.svg";

const LandingPage_AnalysisTools = () => {
  {/* ========== Refs ========== */}
  const chartRef = useRef<SVGPathElement>(null);
  const grayArcRef = useRef<SVGPathElement>(null);
  const chartBoxRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<SVGRectElement>(null);
  const line2Ref = useRef<SVGRectElement>(null);
  const line3Ref = useRef<SVGRectElement>(null);
  const rightItemsRef = useRef<HTMLDivElement>(null);

  {/* ========== Local State ========== */}
  const [animateRight, setAnimateRight] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showZero, setShowZero] = useState(false);
  const [showHundred, setShowHundred] = useState(false);
  const [showCenterText, setShowCenterText] = useState(false);
  const [showLines, setShowLines] = useState(false);

  {/* ========== Intersection Observer Logic ========== */}
  useEffect(() => {
    const green = chartRef.current;
    const gray = grayArcRef.current;
    const chartBox = chartBoxRef.current;

    if (!green || !gray || !chartBox) return;

    const greenLength = green.getTotalLength();
    const grayLength = gray.getTotalLength();
    green.style.strokeDasharray = greenLength.toString();
    gray.style.strokeDasharray = grayLength.toString();

    const chartObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset arcs
            green.style.strokeDashoffset = greenLength.toString();
            gray.style.strokeDashoffset = grayLength.toString();
            if (line1Ref.current && line2Ref.current && line3Ref.current) {
              line1Ref.current.setAttribute("width", "0");
              line2Ref.current.setAttribute("width", "0");
              line3Ref.current.setAttribute("width", "0");
            }

            // Reset text states
            setShowTitle(false);
            setShowZero(false);
            setShowHundred(false);
            setShowCenterText(false);
            setShowLines(false);

            // Timeline animation
            setTimeout(() => setShowTitle(true), 1200);
            setTimeout(() => setShowZero(true), 1400);

            setTimeout(() => {
              const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
              tl.to(green, { strokeDashoffset: 0, duration: 1.3 });
              tl.to(gray, { strokeDashoffset: 0, duration: 0.6 }, "-=0.5");
              setShowHundred(true);
            }, 1200);

            setTimeout(() => setShowCenterText(true), 2300);

            setTimeout(() => {
              setShowLines(true);
              gsap.to(line1Ref.current, { attr: { width: 75 }, duration: 0.7 });
              gsap.to(line2Ref.current, { attr: { width: 60 }, duration: 0.7, delay: 0.2 });
              gsap.to(line3Ref.current, { attr: { width: 50 }, duration: 0.7, delay: 0.4 });
            }, 3000);
          } else {
            // Reset on scroll-out
            setShowTitle(false);
            setShowZero(false);
            setShowHundred(false);
            setShowCenterText(false);
            setShowLines(false);
          }
        });
      },
      { threshold: 0.4 }
    );

    chartObserver.observe(chartBox);

    const rightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setAnimateRight(entry.isIntersecting);
        });
      },
      { threshold: 0.4 }
    );

    if (rightItemsRef.current) rightObserver.observe(rightItemsRef.current);

    return () => {
      chartObserver.disconnect();
      rightObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.analysisToolsWrapper}>
      {/* ========== Right Section Content ========== */}
      <div ref={rightItemsRef} className={styles.textContent}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={animateRight ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          سرویس‌ها جهت آنالیز و<br /> بهینه‌سازی محصول شما
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={animateRight ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          با ابزارهای تحلیلی ما، عملکرد محصول خود را به‌دقت بررسی کرده<br />
          و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
        </motion.p>

        {/* ========== Services Grid ========== */}
        <div className={styles.servicesGrid}>
          {[
            { icon: Custom_Dashboard, label: "شاخص‌های کلیدی سفارشی", delay: 0.4 },
            { icon: Custom_KPIs, label: "داشبورد سفارشی", delay: 0.6 },
            { icon: Real_time_Monitoring, label: "پایش لحظه‌ای", delay: 0.8 },
            { icon: Revenue_Tracking, label: "ردیابی درآمد", delay: 1.0 },
            { icon: Flexible_Events, label: "رویدادهای منعطف", delay: 1.2 },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={styles.serviceItem}
              initial={{ opacity: 0, x: 50 }}
              animate={animateRight ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              <img src={item.icon} alt={item.label} />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========== Left Section Illustration ========== */}
      <div className={styles.imageContainer}>
        <motion.img src={Service_Box} alt="box" className={styles.boxImage}
          initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={Topbar} alt="topbar" className={styles.topbarImage}
          initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 12 }}
          transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: false, amount: 0.5 }}
        />

        {/* ========== Chat Bubbles ========== */}
        <motion.img src={ServiceSection_FirstChat} alt="first chat" className={styles.firstChatImage}
          initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2 }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={ServiceSection_FirstChat_Profile} alt="first profile" className={styles.firstChatProfile}
          initial={{ opacity: 0, x: -500 }} whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2 }} viewport={{ once: false, amount: 0.2 }}
        />
        <motion.img src={ServiceSection_SecondChat} alt="second chat" className={styles.secondChatImage}
          initial={{ opacity: 0, x: -400 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={ServiceSection_SecondChat_Profile} alt="second profile" className={styles.secondChatProfile}
          initial={{ opacity: 0, x: -600 }} whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, delay: 0.4 }} viewport={{ once: false, amount: 0.2 }}
        />
        <motion.img src={ServiceSection_ThirdChat} alt="third chat" className={styles.thirdChatImage}
          initial={{ opacity: 0, x: -500 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, delay: 0.5 }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={ServiceSection_ThirdChat_Profile} alt="third profile" className={styles.thirdChatProfile}
          initial={{ opacity: 0, x: -660 }} whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, delay: 0.7 }} viewport={{ once: false, amount: 0.2 }}
        />

        {/* ========== Chart & Bars ========== */}
        <motion.img
          ref={chartBoxRef}
          src={ServiceSection_ChartBox}
          alt="chart box"
          className={styles.chartBoxImage}
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 160 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: false }}
        />
        <svg viewBox="0 0 220 140" width="100%" height="auto" className={styles.chartArcContainer}>
          <path ref={chartRef} d="M 10 90 A 90 90 0 0 1 160 28" fill="none" stroke="#00796b" strokeWidth="20" />
          <path ref={grayArcRef} d="M 162 30 A 90 90 0 0 1 190 90" fill="none" stroke="#e0e0e0" strokeWidth="20" />
          <rect ref={line1Ref} x="0" y="115" width="0" height="6" fill="#aaffaa" rx="3" ry="3" />
          <rect ref={line2Ref} x="85" y="115" width="0" height="6" fill="#00796b" rx="3" ry="3" />
          <rect ref={line3Ref} x="155" y="115" width="0" height="6" fill="#ff6666" rx="3" ry="3" />
        </svg>

        {/* ========== Chart Texts ========== */}
        {showTitle && (
          <motion.h3 className={styles.chartTitle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            رشد سرمایه‌گذاری
          </motion.h3>
        )}
        {showZero && (
          <motion.span className={styles.chartLabelStart} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            ٪۰
          </motion.span>
        )}
        {showHundred && (
          <motion.span className={styles.chartLabelEnd} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            ٪۱۰۰
          </motion.span>
        )}
        {showCenterText && (
          <motion.div className={styles.chartCenterText} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <strong>٪۸۸.۷</strong>
            <span>بر اساس نرخ بهره</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LandingPage_AnalysisTools;
