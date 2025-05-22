// ======================= Imports =======================
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import styles from "./LandingPage_AnalysisTools.module.css";

// Register GSAP Plugin
gsap.registerPlugin(DrawSVGPlugin);

// ======================= SVG & Images =======================
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
  // ========== Refs for animation targets ==========
  const chartRef = useRef<SVGPathElement>(null);
  const grayArcRef = useRef<SVGPathElement>(null);
  const chartVisible = useRef(false);
  const chartBoxRef = useRef<HTMLImageElement>(null);
  const line1Ref = useRef<SVGRectElement>(null);
  const line2Ref = useRef<SVGRectElement>(null);
  const line3Ref = useRef<SVGRectElement>(null);
  
  // ========== Animation on intersection ==========
  useEffect(() => {
    const green = chartRef.current;
    const gray = grayArcRef.current;
    const chartBox = chartBoxRef.current;

    if (!green || !gray || !chartBox) return;

    const greenLength = green.getTotalLength();
    const grayLength = gray.getTotalLength();

    green.style.strokeDasharray = greenLength.toString();
    gray.style.strokeDasharray = grayLength.toString();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !chartVisible.current) {
            chartVisible.current = true;

            // Set initial dash offset
            green.style.strokeDashoffset = greenLength.toString();
            gray.style.strokeDashoffset = grayLength.toString();

            // Reset horizontal bars
            if (line1Ref.current && line2Ref.current && line3Ref.current) {
              line1Ref.current.setAttribute("x2", "0");
              line2Ref.current.setAttribute("x2", "0");
              line3Ref.current.setAttribute("x2", "0");
            }

            // Timeline for animation
            const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.2 });

            // Arc drawing animation
            tl.to(green, { strokeDashoffset: 0, duration: 1.3 });
            tl.to(gray, { strokeDashoffset: 0, duration: 0.6 }, "-=0.5");

            // Horizontal bar animation
            tl.to(line1Ref.current, { attr: { width: 75 }, duration: 0.7 }, "+=0.1");
            tl.to(line2Ref.current, { attr: { width: 60 }, duration: 0.7 }, "-=0.7");
            tl.to(line3Ref.current, { attr: { width: 50 }, duration: 0.7 }, "-=0.7");            
          }

          if (!entry.isIntersecting) {
            chartVisible.current = false;

            // Reset arcs
            green.style.strokeDashoffset = greenLength.toString();
            gray.style.strokeDashoffset = grayLength.toString();

            // Reset bar widths
            if (line1Ref.current && line2Ref.current && line3Ref.current) {
              line1Ref.current?.setAttribute("width", "0");
              line2Ref.current?.setAttribute("width", "0");
              line3Ref.current?.setAttribute("width", "0");
            }
          }
        });
      },
      { threshold: 0.0 }
    );

    observer.observe(chartBox);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.analysisToolsWrapper}>
      {/* ======================= Right Side Text ======================= */}
      <div className={styles.textContent}>
        <h2 className={styles.title}>
          سرویس‌ها جهت آنالیز و<br /> بهینه‌سازی محصول شما
        </h2>
        <p className={styles.description}>
          با ابزارهای تحلیلی ما، عملکرد محصول خود را به‌دقت بررسی کرده<br />
          و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
        </p>

        {/* ========== Services Grid ========== */}
        <div className={styles.servicesGrid}>
          <div className={styles.serviceItem}>
            <img src={Custom_Dashboard} alt="KPI" />
            <span>شاخص‌های کلیدی سفارشی</span>
          </div>
          <div className={styles.serviceItem}>
            <img src={Custom_KPIs} alt="Dashboard" />
            <span>داشبورد سفارشی</span>
          </div>
          <div className={styles.serviceItem}>
            <img src={Real_time_Monitoring} alt="Live Monitoring" />
            <span>پایش لحظه‌ای</span>
          </div>
          <div className={styles.serviceItem}>
            <img src={Revenue_Tracking} alt="Revenue" />
            <span>ردیابی درآمد</span>
          </div>
          <div className={styles.serviceItem}>
            <img src={Flexible_Events} alt="Events" />
            <span>رویدادهای منعطف</span>
          </div>
        </div>
      </div>

      {/* ======================= Left Side Illustration ======================= */}
      <div className={styles.imageContainer}>
        {/* ========== Box and Topbar Animations ========== */}
        <motion.img src={Service_Box} alt="box" className={styles.boxImage}
          initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={Topbar} alt="topbar" className={styles.topbarImage}
          initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 12 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} viewport={{ once: false, amount: 0.5 }}
        />

        {/* ========== Chat Elements ========== */}
        <motion.img src={ServiceSection_FirstChat} alt="first chat" className={styles.firstChatImage}
          initial={{ opacity: 0, x: -300 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={ServiceSection_FirstChat_Profile} alt="first profile" className={styles.firstChatProfile}
          initial={{ opacity: 0, x: -500 }} whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, ease: "easeOut" }} viewport={{ once: false, amount: 0.2 }}
        />
        <motion.img src={ServiceSection_SecondChat} alt="second chat" className={styles.secondChatImage}
          initial={{ opacity: 0, x: -400 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img src={ServiceSection_SecondChat_Profile} alt="second profile" className={styles.secondChatProfile}
          initial={{ opacity: 0, x: -600 }} whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} viewport={{ once: false, amount: 0.2 }}
        />
        <motion.img src={ServiceSection_ThirdChat} alt="third chat" className={styles.thirdChatImage}
          initial={{ opacity: 0, x: -500 }} whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }} viewport={{ once: false, amount: 0.5 }}
        />

        {/* ========== Chart Box + Arcs + Horizontal Bars ========== */}
        <motion.img
          ref={chartBoxRef}
          src={ServiceSection_ChartBox}
          alt="chart box"
          className={styles.chartBoxImage}
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 160 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false }}
        />

        {/* ========== Arc SVG and Bars ========== */}
        <svg viewBox="0 0 220 140" width="100%" height="auto" className={styles.chartArcContainer}>
          <path
            ref={chartRef}
            d="M 10 90 A 90 90 0 0 1 160 28"
            fill="none"
            stroke="#00796b"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          <path
            ref={grayArcRef}
            d="M 162 30 A 90 90 0 0 1 190 90"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="20"
            strokeLinecap="butt"
          />
          {/* Colored horizontal bars */}
          <rect ref={line1Ref} x="0" y="115" width="0" height="6" fill="#aaffaa" rx="3" ry="3" />
          <rect ref={line2Ref} x="85" y="115" width="0" height="6" fill="#00796b" rx="3" ry="3" />
          <rect ref={line3Ref} x="150" y="115" width="0" height="6" fill="#ff6666" rx="3" ry="3" />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage_AnalysisTools;
