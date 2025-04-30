import React, { useEffect } from "react";
import "./LandingPage_v2.css";
import TestimonialsCarousel from './TestimonialsCarousel'; 

const LandingPage_v2: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.6, // یعنی حداقل ۶۰٪ از بخش دوم وارد صفحه بشه
        rootMargin: "0px 0px -30% 0px", // یعنی ۳۰٪ پایین صفحه رو حذف کنه از دیدرس
      }
    );
  
    const targets = document.querySelectorAll(".hidden-on-load");
    targets.forEach((el) => observer.observe(el));
  
    return () => observer.disconnect();
  }, []);
  
  

  return (
    <div className="landing-page">
      <img
        src="/src/assets/images/Landing_Page_Background.png"
        alt="Background"
        className="landing-background"
      />
      <div className="landing-content">
        <header className="landing-header">
          <div className="logo">Odessay Logo</div>
          <div className="auth-buttons">
            <button className="signup-btn">ثبت‌نام</button>
            <button className="login-btn">ورود</button>
          </div>
        </header>

        <main className="main-section">
          <h1 className="fade-in">هدایت مسیر رشد محصول شما</h1>
          <p className="fade-in delay1">در چشم‌انداز داده‌محور جهانی</p>
          <p className="fade-in delay2 subtext">
            ما به شما کمک می‌کنیم تا با تحلیل داده‌های دقیق و داشبوردهای سفارشی، تصمیم‌های هوشمندانه‌تری
            بگیرید و تجربه کاربران را بهینه‌سازی کنید.
          </p>
          <button className="fade-in delay3 services-btn">بررسی سرویس‌ها</button>
        </main>

        {/* سکشن دوم */}
        <section className="services-section hidden-on-load" id="services">
          <h2>سرویس‌ها جهت آنالیز و بهینه‌سازی</h2>
          <p>
            با ابزارهای تحلیل ما، عملکرد محصول خود را با دقت بررسی کرده و مسیر رشد را هوشمندانه‌تر ترسیم کنید.
          </p>
          <div className="features">
            <ul>
              <li>داشبورد سفارشی</li>
              <li>شاخص‌های کلیدی</li>
              <li>پایش لحظه‌ای</li>
              <li>ردیابی درآمد</li>
              <li>رویدادهای منعطف</li>
            </ul>
          </div>
          <button className="services-btn">بررسی سرویس‌ها</button>
        </section>
        <TestimonialsCarousel />
      </div>
    </div>
  );
};

export default LandingPage_v2;
