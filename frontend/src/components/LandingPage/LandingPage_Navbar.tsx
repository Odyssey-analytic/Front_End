import React, { useEffect, useState } from "react";
import styles from "./LandingPage_Navbar.module.css";
import OdessayLogo from "/public/icons/odessay_logo.svg";

const sections = [
  { id: "features", label: "ویژگی‌ها" },
  { id: "services", label: "سرویس‌ها" },
  { id: "testimonials", label: "نظرات" }, 
  { id: "start", label: "شروع" },
  { id: "achievements", label: "دست‌آورد‌ها" },
  { id: "contact", label: "ارتباط" },
];

const LandingPage_Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("features");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          // انتخاب سکشنی که بیشتر در viewport هست
          const mostVisible = visible.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: 0.4, // نسبت به ارتفاع سکشن‌ها بهتر جواب می‌ده
        rootMargin: "0px 0px -35% 0px", // بهتر scroll detection
      }
    );
  
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  
    return () => observer.disconnect();
  }, []);
  

  return (
    <nav className={styles.navbar}>
      <div className={styles.authButtons}>
        <button className={styles.signupBtn}>ثبت‌نام</button>
        <button className={styles.loginBtn}>ورود</button>
      </div>

      <button className={styles.menuToggle} >
        ☰
      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${
                activeSection === id ? styles.activeNavLink : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.rightSection}>
        <span className={styles.logoText}>ODESSAY</span>
        <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
      </div>
    </nav>
  );
};

export default LandingPage_Navbar;
