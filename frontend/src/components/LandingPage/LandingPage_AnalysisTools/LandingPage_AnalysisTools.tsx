// ======================= Imports =======================
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import styles from "./LandingPage_AnalysisTools.module.css";

// Register GSAP plugin
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

// ======================= Component =======================
const LandingPage_AnalysisTools = () => {
  const chartRef = useRef<SVGPathElement>(null);
  const chartBoxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = chartRef.current;
  
    const resetAndAnimate = () => {
      gsap.set(el, { drawSVG: "0% 0%" });
      gsap.to(el, {
        drawSVG: "0% 87%",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      });
    };
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resetAndAnimate();
          }
        });
      },
      { threshold: 0.5 }
    );
  
    if (chartBoxRef.current) observer.observe(chartBoxRef.current);
    return () => observer.disconnect();
  }, []);
  

  return (
    <div className={styles.analysisToolsWrapper}>
      {/* ================== Right Side Text ================== */}
      <div className={styles.textContent}>
        <h2 className={styles.title}>
          سرویس‌ها جهت آنالیز و<br /> بهینه‌سازی محصول شما
        </h2>
        <p className={styles.description}>
          با ابزارهای تحلیلی ما، عملکرد محصول خود را به‌دقت بررسی کرده<br />
          و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
        </p>

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

      {/* ================== Left Side Illustration ================== */}
      <div className={styles.imageContainer}>

        <motion.img
          src={Service_Box}
          alt="box"
          className={styles.boxImage}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        />

        <motion.img
          src={Topbar}
          alt="topbar"
          className={styles.topbarImage}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 12 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Chat Bubbles */}
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

        {/* Chart Box + Arc */}
        <motion.img
          ref={chartBoxRef}
          src={ServiceSection_ChartBox}
          alt="chart box"
          className={styles.chartBoxImage}
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: 160 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: false, amount: 0.5 }}
        />

        <svg
          viewBox="0 0 200 100"
          width="100%"
          height="auto"
          className={styles.chartArcContainer}
        >
          <path
            ref={chartRef}
            id="chartArc"
            d="M 10 90 A 90 90 0 0 1 190 90"
            fill="none"
            stroke="#00796b"
            strokeWidth="20"
            strokeLinecap="round"
            style={{ strokeDasharray: '100%', strokeDashoffset: '100%' }} //
          />
        </svg>

      </div>
    </div>
  );
};

export default LandingPage_AnalysisTools;
