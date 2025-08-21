// import "./MainLayout.css";
import styles from './WelcomePage_Header.module.css';

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OdessayLogo from "/public/icons/odessay_logo.svg";
// import UserIcon from "/public/icons/welcome_subheader_user.svg";
// import MenuIcon from "/public/icons/welcome_subheader_menu.svg";
// import HelpIcon from "/public/icons/welcome_header_help.svg";

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
      {/* <div className={styles.authButtons}>
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
      </button> */}

      {/* <ul className={styles.navLinks}>
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
      </ul> */}

      <div className={styles.rightSection}>
        <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
        <span className={styles.logoText}>ODESSAY</span>
      </div>
    </nav>
    
    // <div>
    //   <div className={`${styles.SubHeader} d-flex justify-content-between align-items-center py-2`}>
    //     <div className={styles.Logo}>
    //       <img
    //           src={OdessayLogo}
    //           alt="Odessay Logo"
    //           className={`${styles.LogoImg} ms-2`}
    //         />
    //       <span className={`${styles.LogoText} english-text`}>ODESSAY</span>
    //     </div>
        
    //     <div className="d-flex align-items-center gap-3">
        
    //       <img
    //         src={UserIcon}
    //         alt="User"
    //         className={styles.SubHeader_UserIcon}
    //       />
    //       <div
    //         ref={menuRef}
    //         onClick={() => setMenuOpen((prev) => !prev)}
    //       >
    //         <img
    //           src={MenuIcon}
    //           alt="Menu"
    //           className={styles.SubHeader_MenuIcon}
    //         />
    //         <div
    //           className={`${styles.DropdownMenu} ${menuOpen ? styles.show : ''}`}
    //           >
    //           <button
    //             className={styles.DropdownItem}
    //             onClick={handleLogout}
    //           >
    //             خروج از حساب کاربری
    //           </button>
    //         </div>
            
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );

};

export default MainLayout;
