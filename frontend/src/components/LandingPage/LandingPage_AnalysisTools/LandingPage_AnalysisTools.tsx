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
        {/* ... سرویس‌ها ... */}
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
