import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage_Navbar.module.css";
import OdessayLogo from "/public/icons/odessay_logo.svg";

const sections = [
  { id: "services", label: "سرویس‌ها" },
  { id: "testimonials", label: "نظرات" },
  { id: "start", label: "شروع" },
  { id: "achievements", label: "دست‌آورد‌ها" },
  { id: "youtubeGuide", label: "آموزش استفاده" },
  { id: "contact", label: "ارتباط" },
];

const LandingPage_Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("features");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {menuOpen && (
        <div className={styles.mobileMenuCentered}>
          <button
            className={styles.closeMenuBtn}
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>

          <ul className={styles.mobileMenuList}>
            {sections.map(({ id, label }, index) => (
              <li key={id} className={styles.mobileMenuItem} style={{ animationDelay: `${index * 0.08}s` }}>
                <a
                  href={`#${id}`}
                  className={styles.mobileMenuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileAuth}>
            <Link to="/login" className={styles.loginBtn}>ورود</Link>
            <Link to="/signup" className={styles.signupBtn}>
              <span className={styles.signupText}>ثبت‌نام</span>
            </Link>
          </div>
        </div>
      )}


      <nav className={`${styles.navbar} ${isShrunk ? styles.shrink : ""}`}>
        <div className={styles.authButtons}>
          <Link to="/signup" className={styles.signupBtn}>
            <span className={styles.signupText}>ثبت‌نام</span>
          </Link>
          <Link to="/login" className={styles.loginBtn}>ورود</Link>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={styles.navLinks}>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`${styles.link} ${
                  activeSection === id ? styles.activeNavLink : ""
                }`}
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
    </>
  );
};

export default LandingPage_Navbar;
