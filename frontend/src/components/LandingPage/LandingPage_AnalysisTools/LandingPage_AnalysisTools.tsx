import styles from "./LandingPage_AnalysisTools.module.css";
import serviceIllustration from  "../../../../public/icons/Landing/Section2_services.svg"; 

const LandingPage_AnalysisTools = () => {
  return (
    <div className={styles.analysisToolsWrapper}>

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
            <img src="/icons/custom-kpi.svg" alt="KPI" />
            <span>شاخص‌های کلیدی سفارشی</span>
          </div>
          <div className={styles.serviceItem}>
            <img src="/icons/custom-dashboard.svg" alt="Dashboard" />
            <span>داشبورد سفارشی</span>
          </div>
          <div className={styles.serviceItem}>
            <img src="/icons/live-monitoring.svg" alt="Live Monitoring" />
            <span>پایش لحظه‌ای</span>
          </div>
          <div className={styles.serviceItem}>
            <img src="/icons/revenue-tracking.svg" alt="Revenue" />
            <span>ردیابی درآمد</span>
          </div>
          <div className={styles.serviceItem}>
            <img src="/icons/event-analysis.svg" alt="Events" />
            <span>رویدادهای منعطف</span>
          </div>
        </div>

        <button className={styles.ctaButton}>بررسی سرویس‌ها</button>
      </div>


      <div className={styles.imageContainer}>
        <img
          src={serviceIllustration}
          alt="ابزار تحلیل"
          className={styles.illustrationImage}
        />
      </div>
    
    </div>
  );
};

export default LandingPage_AnalysisTools;
