import styles from "./WelcomePage_Header.module.css";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OdessayLogo from "/public/icons/odessay_logo.svg";

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.rightSection}>
        <img
          src={OdessayLogo}
          alt="Odessay Logo"
          className={styles.logoImage}
        />
        <span className={styles.logoText}>ODESSAY</span>
      </div>
    </nav>
  );
};

export default MainLayout;
