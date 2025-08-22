import styles from "./LandingPage_YoutubeVideoGuide.module.css";

const DOCS_BASE =
  (import.meta as any).env?.VITE_DOCS_BASE_URL ??
  ((import.meta as any).env?.PROD
    ? "https://odysseyanalytics.ir"
    : `${window.location.protocol}//${window.location.hostname}:3000`);

const DOCS_URL = `${DOCS_BASE}/docs`;

const LandingPage_YoutubeVideoGuide = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textBox}>
        <div className={styles.textBoxInside}>
          <p className={styles.subheading}>نیاز به راهنمایی برای شروع داری؟</p>
          <p className={styles.description}>
            در این بخش، ویدیوهای آموزشی ما رو ببین و با قابلیت‌های پلتفرم
            قدم‌به‌قدم آشنا شو تا سریع‌تر و حرفه‌ای‌تر شروع کنی.
          </p>
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docsLink}
          >
            رفتن به مستندات
          </a>
        </div>
      </div>

      <div className={styles.videoBox}>
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/your-video-id"
          title="آموزش ByteBrew"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default LandingPage_YoutubeVideoGuide;
