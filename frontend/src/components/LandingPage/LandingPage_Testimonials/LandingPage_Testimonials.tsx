import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import styles from "./LandingPage_Testimonials.module.css";

// ======================= Static testimonial data =======================
const testimonials = [
  { name: "رضا قاسمی", role: "تحلیل‌گر داده، گروه تکتا", text: "یکی از بهترین مزیت‌ها برای ما گزارش‌های لحظه‌ای بود. منتظر آخر ماه بمونیم تا بدونیم چی کار کردیم؟" },
  { name: "شیما پارسا", role: "مدیر مارکتینگ، سایت زیبال", text: "از زمانی که این سیستم‌ و استفاده کردیم، نرخ کلیک و بازده تبلیغات‌مون کلی بهتر شده." },
  { name: "سعید محمدی", role: "مهندس فنی، استارتاپ بیدو", text: "نیاز نداشتیم تیم آنالیز جدا استخدام کنیم! فقط با یه ادغام ساده، کلی دیتا پشتیبون رسید." },
  { name: "نیلوفر سادات", role: "مدیر محصول، اپلیکیشن کندو", text: "قابلیت‌های گزارش‌گیری لحظه‌ای واقعاً نجات‌بخشن. همیشه می‌دونیم توی محصول‌مون دقیقاً چی داره اتفاق می‌افته." },
  { name: "امیر رضایی", role: "مدیرعامل، گروه اوپتک", text: "با استفاده از این پلتفرم، خیلی راحت تونستیم رفتار کاربران رو تحلیل کنیم و تصمیم‌های بهتری بگیریم." },
  { name: "سارا معتقدی", role: "مدیرمارکتینگ، اپلیکیشن ویواکم", text: "ما از روز اول قصد استفاده از این سرویسو داشتیم چونش دید بهتری به داده‌هامون داده و سریع و قابل اعتماده." },
];

const LandingPage_Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const topSwiperRef = useRef<any>(null);
  const bottomSwiperRef = useRef<any>(null);

  const [isHovering, setIsHovering] = useState(false); // 🔁 Shared hover state

  // ======================= Fade-in when in viewport =======================
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), 100);
      }
    }, { threshold: 0.6 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ======================= Control autoplay on hover =======================
  useEffect(() => {
    if (topSwiperRef.current && bottomSwiperRef.current) {
      if (isHovering) {
        topSwiperRef.current.autoplay?.stop();
        bottomSwiperRef.current.autoplay?.stop();
      } else {
        topSwiperRef.current.autoplay?.start();
        bottomSwiperRef.current.autoplay?.start();
      }
    }
  }, [isHovering]);

  // ======================= Render testimonial cards =======================
  const renderSlides = (reverse = false) =>
    testimonials.map((t, i) => (
      <SwiperSlide key={reverse ? `rev-${i}` : i}>
        <div className={`${styles.card} ${i % 2 === 0 ? styles.dark : styles.light}`}>
          <img
            src={i % 2 === 0 ? "/icons/avatarDot-light.svg" : "/icons/avatarDot-dark.svg"}
            className={`${styles.avatarDot} ${i % 2 === 0 ? styles.avatarDotLight : styles.avatarDotDark}`}
            alt="avatar dot"
          />
          <img
            src={i % 2 === 0 ? "/icons/quote-light.svg" : "/icons/quote-dark.svg"}
            className={styles.quoteIcon}
            alt="quote"
          />
          <div className={styles.personInfo}>
            <div className={styles.personName}>{t.name}</div>
            <div className={styles.personRole}>{t.role}</div>
          </div>
          <p className={styles.comment}>{t.text}</p>
        </div>
      </SwiperSlide>
    ));

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`${styles.testimonialsWrapper} ${isVisible ? "animate" : "hiddenOnLoad"}`}
    >
      {/* ================= Top Swiper ================= */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          onSwiper={(swiper) => (topSwiperRef.current = swiper)}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          loop
          freeMode
          speed={3500}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
        >
          {renderSlides()}
        </Swiper>
      </div>

      {/* ================= Bottom Swiper ================= */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          onSwiper={(swiper) => (bottomSwiperRef.current = swiper)}
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          loop
          freeMode
          speed={3500}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
          allowTouchMove={false}
          style={{ marginTop: "20px" }}
        >
          {renderSlides(true)}
        </Swiper>
      </div>
    </section>
  );
};

export default LandingPage_Testimonials;
