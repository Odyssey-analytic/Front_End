import styles from './LandingPage_YoutubeVideoGuide.module.css'

const LandingPage_YoutubeVideoGuide = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.textBox}>
        <div className={styles.textBoxInside}>
        <p className={styles.subheading}>نیاز به راهنمایی برای شروع داری؟</p>
        <p className={styles.description}>
          در این بخش، ویدیوهای آموزشی ما رو ببین و با قابلیت‌های پلتفرم قدم‌به‌قدم آشنا شو تا سریع‌تر و حرفه‌ای‌تر شروع کنی.
        </p>
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
