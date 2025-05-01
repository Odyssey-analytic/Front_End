import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage_Navbar.module.css";
import OdessayLogo from "/public/icons/odessay_logo.svg";

// ======================= Section anchors used in scroll tracking =======================
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

  // ======================= Observe section visibility for scroll spy =======================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const mostVisible = visible.reduce((prev, current) =>
            prev.intersectionRatio > current.intersectionRatio ? prev : current
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -35% 0px",
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
      {/* ======================= Left side: Auth buttons ======================= */}
      <div className={styles.authButtons}>
        <Link to="/signup" className={styles.signupBtn}>
          ثبت‌نام
        </Link>
        <Link to="/login" className={styles.loginBtn}>
          ورود
        </Link>
      </div>

      {/* ======================= Mobile menu toggle button ======================= */}
      <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* ======================= Center: Navigation links ======================= */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`${styles.link} ${activeSection === id ? styles.activeNavLink : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* ======================= Right side: Logo and text ======================= */}
      <div className={styles.rightSection}>
        <span className={styles.logoText}>ODESSAY</span>
        <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
      </div>
    </nav>
  );
};

export default LandingPage_Navbar;
