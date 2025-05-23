import styles from './LandingPage_Contanct.module.css';

const LandinPage_Contact = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.columnBrand}>
          <h2 className={styles.logo}>اودیسه</h2>
          <p className={styles.description}>
            ما در ODESSAY به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق، مسیر رشد محصول
            خود را بهینه‌سازی کنید. همراه ما باشید!
          </p>
          <a className={styles.email} href="mailto:contact@odessay.com">
            CONTACT@ODESSAY.COM
          </a>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>خدمات ما</h3>
          <ul className={styles.list}>
            <li>ارائه SDK برای تحلیل و بهینه‌سازی داده‌ها</li>
            <li>رهگیری و آنالیز رفتار کاربران</li>
            <li>بهینه‌سازی درآمد و تبلیغات</li>
            <li>پایش عملکرد و رشد محصول</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>اطلاعات بیشتر</h3>
          <ul className={styles.list}>
            <li>درباره ما</li>
            <li>مستندات و راهنماها</li>
            <li>ساختار سایت</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3 className={styles.heading}>راه‌های ارتباطی</h3>
          <ul className={styles.list}>
            <li>تماس با ما</li>
            <li>پشتیبانی</li>
            <li>سؤالات متداول (FAQ)</li>
            <li>شبکه‌های اجتماعی</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>شرایط و قوانین</span>
        <span>حریم خصوصی</span>
      </div>
    </footer>
  );
};

export default LandinPage_Contact;
