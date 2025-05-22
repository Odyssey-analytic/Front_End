// ======================= Imports =======================
import { motion } from "framer-motion";
import styles from "./LandingPage_AnalysisTools.module.css";

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
  return (
    <div className={styles.analysisToolsWrapper}>

      {/* ========== Text Section (Right Side) ========== */}
      <div className={styles.textContent}>
        <h2 className={styles.title}>
          سرویس‌ها جهت آنالیز و<br /> بهینه‌سازی محصول شما
        </h2>
        <p className={styles.description}>
          با ابزارهای تحلیلی ما، عملکرد محصول خود را به‌دقت بررسی کرده<br />
          و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
        </p>

        {/* ========== Feature List ========== */}
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

      {/* ========== Illustration Section (Left Side) ========== */}
      <div className={styles.imageContainer}>

        {/* White background base box */}
        <motion.img
          src={Service_Box}
          alt="box"
          className={styles.boxImage}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Top bar on the white box */}
        <motion.img
          src={Topbar}
          alt="topbar"
          className={styles.topbarImage}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 12 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Chat 1 */}
        <motion.img
          src={ServiceSection_FirstChat}
          alt="first chat"
          className={styles.firstChatImage}
          initial={{ opacity: 0, x: -300 }}
          whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img
          src={ServiceSection_FirstChat_Profile}
          alt="first profile"
          className={styles.firstChatProfile}
          initial={{ opacity: 0, x: -500 }}
          whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        />

        {/* Chat 2 */}
        <motion.img
          src={ServiceSection_SecondChat}
          alt="second chat"
          className={styles.secondChatImage}
          initial={{ opacity: 0, x: -400 }}
          whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: false, amount: 0.5 }}
        />
        <motion.img
          src={ServiceSection_SecondChat_Profile}
          alt="second profile"
          className={styles.secondChatProfile}
          initial={{ opacity: 0, x: -600 }}
          whileInView={{ opacity: 1, x: -360 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: false, amount: 0.2 }}
        />

        {/* Chat 3 */}
        <motion.img
          src={ServiceSection_ThirdChat}
          alt="third chat"
          className={styles.thirdChatImage}
          initial={{ opacity: 0, x: -500 }}
          whileInView={{ opacity: 1, x: -160 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
        />

        {/* Chart Box appears from right after chat animations finish */}
        <motion.img
          src={ServiceSection_ChartBox}
          alt="chart box"
          className={styles.chartBoxImage}
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.8 }}
          viewport={{ once: false, amount: 0.5 }}
        />

      </div>
    </div>
  );
};

export default LandingPage_AnalysisTools;
