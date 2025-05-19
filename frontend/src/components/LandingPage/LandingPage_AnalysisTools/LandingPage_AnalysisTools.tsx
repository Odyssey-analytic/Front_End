// import styles from "./LandingPage_AnalysisTools.module.css";
// import serviceIllustration from "../../../../public/icons/Landing/Section2_services.svg"; 

// import Custom_Dashboard from "../../../../public/icons/Landing/Custom Dashboard.svg"
// import Custom_KPIs from "../../../../public/icons/Landing/Custom KPIs.svg"
// import Real_time_Monitoring from "../../../../public/icons/Landing/Real-time Monitoring.svg"
// import Revenue_Tracking from "../../../../public/icons/Landing/Revenue Tracking.svg"
// import Flexible_Events from "../../../../public/icons/Landing/Flexible Events.svg"


// const LandingPage_AnalysisTools = () => {
//   return (
//     <div className={styles.analysisToolsWrapper}>
//       <div className={styles.textContent}>
//         <h2 className={styles.title}>
//           سرویس‌ها جهت آنالیز و<br /> بهینه‌سازی محصول شما
//         </h2>
//         <p className={styles.description}>
//           با ابزارهای تحلیلی ما، عملکرد محصول خود را به‌دقت بررسی کرده<br />
//           و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
//         </p>

//         <div className={styles.servicesGrid}>
//           <div className={styles.serviceItem}>
//             <img src={Custom_Dashboard} alt="KPI" />
//             <span>شاخص‌های کلیدی سفارشی</span>
//           </div>
//           <div className={styles.serviceItem}>
//             <img src={Custom_KPIs} alt="Dashboard" />
//             <span>داشبورد سفارشی</span>
//           </div>
//           <div className={styles.serviceItem}>
//             <img src={Real_time_Monitoring} alt="Live Monitoring" />
//             <span>پایش لحظه‌ای</span>
//           </div>
//           <div className={styles.serviceItem}>
//             <img src={Revenue_Tracking} alt="Revenue" />
//             <span>ردیابی درآمد</span>
//           </div>
//           <div className={styles.serviceItem}>
//             <img src={Flexible_Events} alt="Events" />
//             <span>رویدادهای منعطف</span>
//           </div>
//         </div>
//       </div>

//       <div className={styles.containerctaButton}>
//         <button className={styles.ctaButton}>بررسی سرویس‌ها</button>
//       </div>

//       <div className={styles.imageContainer}>
//         <img
//           src={serviceIllustration}
//           alt="ابزار تحلیل"
//           className={styles.illustrationImage}
//         />
//       </div>
//     </div>
//   );
// };

// export default LandingPage_AnalysisTools;

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./LandingPage_AnalysisTools.module.css";
import serviceIllustration from "../../../../public/icons/Landing/Section2_services.svg"; 

import Custom_Dashboard from "../../../../public/icons/Landing/Custom Dashboard.svg"
import Custom_KPIs from "../../../../public/icons/Landing/Custom KPIs.svg"
import Real_time_Monitoring from "../../../../public/icons/Landing/Real-time Monitoring.svg"
import Revenue_Tracking from "../../../../public/icons/Landing/Revenue Tracking.svg"
import Flexible_Events from "../../../../public/icons/Landing/Flexible Events.svg"
import Service_Box from "../../../../public/icons/Landing/box.svg"


const LandingPage_AnalysisTools = () => {

  const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef(null);
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      console.log("isVisible:", entry.isIntersecting);
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.5 }
  );
  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);

  return (
    <div className={styles.analysisToolsWrapper} ref={sectionRef}>
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
      <div className={styles.imageContainer}>
      <motion.img
  src={Service_Box}
  alt="box"
  className={styles.boxImage}
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  viewport={{ once: false, amount: 0.5 }}
  layout 
/>

</div>

    </div>
  );
};

export default LandingPage_AnalysisTools;