import styles from "./ChartsPage_SideBar.module.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
  FiTrendingUp,
  FiActivity,
  FiSettings,
  FiPieChart,
  FiSearch,
  FiUsers,
  FiGrid,
  FiTool,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";

import GameLogo from "../../../../public/icons/game-ghost-icon.svg";
import dashboard_logout_panel_icon from "../../../../public/icons/dashboard_panel_icon.svg";
import dashboard_sidebar_user_icon from "../../../../public/icons/dashboard_sidebar_user_icon.svg";
import OdessayLogo from "../../../../public/icons/odessay_logo.svg"

const menuItems = [
  {
    label: "داشبوردها", // Dashboards
    collapsible: true,
    icon: <FiGrid />,
    items: [
      {
        label: (
          <>
            نمای کلی <span className={`${styles.englishPart}`}>(Overview)</span>
          </>
        ),
        icon: <FiHome />,
      },
      {
        label: (
          <>
            تعامل کاربران{" "}
            <span className={`${styles.englishPart}`}>(Engagement)</span>
          </>
        ),
        icon: <FiBarChart2 />,
      },
      {
        label: (
          <>
            معیارها{" "}
            <span className={`${styles.englishPart}`}>(Benchmarks)</span>
          </>
        ),
        icon: <FiActivity />,
      },
      {
        label: (
          <>
            درآمدزایی{" "}
            <span className={`${styles.englishPart}`}>(Monetization)</span>
          </>
        ),
        icon: <FiDollarSign />,
      },
      {
        label: (
          <>
            منابع <span className={`${styles.englishPart}`}>(Resources)</span>
          </>
        ),
        icon: <FiLayers />,
      },
      {
        label: (
          <>
            پیشرفت{" "}
            <span className={`${styles.englishPart}`}>(Progression)</span>
          </>
        ),
        icon: <FiTrendingUp />,
      },
      {
        label: (
          <>
            کیفیت <span className={`${styles.englishPart}`}>(Quality)</span>
          </>
        ),
        icon: <FiPieChart />,
      },
    ],
  },
  {
    label: "داشبورد سفارشی", // Custom Dashboards
    collapsible: true,
    icon: <FiGrid />,
    items: [
      {
        label: (
          <>
            جستجو <span className={`${styles.englishPart}`}>(Explore)</span>
          </>
        ),
        icon: <FiSearch />,
      },
      {
        label: (
          <>
            قیف‌ها <span className={`${styles.englishPart}`}>(Funnels)</span>
          </>
        ),
        icon: <FiUsers />,
      },
      {
        label: (
          <>
            دسته‌بندی کاربران{" "}
            <span className={`${styles.englishPart}`}>(Cohorts)</span>
          </>
        ),
        icon: <FiUsers />,
      },
      {
        label: (
          <>
            پیکربندی <span className={`${styles.englishPart}`}>(Configs)</span>
          </>
        ),
        icon: <FiTool />,
      },
      {
        label: (
          <>
            تنظیمات <span className={`${styles.englishPart}`}>(Settings)</span>
          </>
        ),
        icon: <FiSettings />,
      },
    ],
  },
];

const ChartsPage_SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<string | number>(0);

  const [sidebarActive, setSidebarActive] = useState(false); // The state for controlling whether the sidebar is open or closed
  const [isSmallScreen, setIsSmallScreen] = useState(false); // The state to check if the screen width is less than 480px
  const [collapsed, setCollapsed] = useState(false); // The state for controlling the collapsed or expanded state of the sidebar for screens larger than 480px
  
  const [openSections, setOpenSections] = useState<number[]>([]);
  
  const [selectedGame, setSelectedGame] = useState("بازی A");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const gameList = ["بازی اول", "بازی دوم", "بازی سوم"];
  
  const [username, setUsername] = useState<string>();
  
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);
  
  useEffect(() => {
    const handleClick = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [dropdownOpen]);


  const handleMenuClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Function to toggle the sidebar open/closed
  const MobileSidebarOpen = () => {
    setSidebarActive(true);
  };

  const MobileSidebarClose = () => {
    setSidebarActive(false);
  };

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
    
    if (openSections.includes(index)) {
      setActiveIndex(null);
    }
  };
  
  // Function to collapse/expand the sidebar
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  useEffect(() => {
    // Check if the screen width is less than 480px
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 480); // Set isSmallScreen to true if screen width is less than 480px
    };
  
    // Initial check
    checkScreenSize();
  
    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);
  
    // Cleanup (remove event listener) when the component unmounts
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  

  return (
    <div>

      {/* For screens larger than 480px, display a fixed sidebar */}
      {!isSmallScreen && (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>

          {/* Game selector section */}
          <div className={styles.gameHeader}>
            <div className={styles.headerWrapper}>


              {/* <div className={styles.brandLogoHeader}> */}
                <span className={styles.brandLogoText}>ODESSAY</span>
                <img
                  src={OdessayLogo}
                  alt="Odessay Logo"
                  className={styles.brandLogoImg}
                />
              {/* </div> */}

              
              {/* Collapse/Expand button for the sidebar */}
              <div
                className={styles.toggle}
                onClick={toggleCollapse} // Toggle the collapse state
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </div>

            </div>

              <hr className={styles.divider} />

              <div
                className={styles.gameSelectorBox}
                // onClick={() => setDropdownOpen((prev) => !prev)}
                onClick={(e) => {
                  e.stopPropagation(); // جلوگیری از بسته شدن توسط event کلیک صفحه
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <img src={GameLogo} alt="Game Logo" className={styles.gameLogo} />
                {!collapsed && (
                  <span className={styles.gameName}>{selectedGame}</span>
                )}
              </div>

            {/* Dropdown to select a game */}
            {dropdownOpen && (
              <div className={styles.gameDropdown}>
                {gameList.map((game) => (
                  <div
                    key={game}
                    className={styles.gameDropdownItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGame(game);
                      setDropdownOpen(false);
                    }}
                  >
                    {game}
                  </div>
                ))}
              </div>
            )}

            <hr className={styles.divider} />
          </div>

          {/* Navigation menu */}
          <nav className={styles.menu}>
            {menuItems.map((item, index) => {
              const isSectionOpen = openSections.includes(index);
              const isActive = activeIndex === index;

              return (
                <div key={index}>

                  <div
                    className={`${styles.menuItem} ${isActive ? styles.active : ""}`}

                    onClick={() => {
                      if (item.collapsible) {
                        if (isSectionOpen) {
                          setActiveIndex(null); // ریست هنگام بستن
                        }
                        toggleSection(index);
                      } else {
                        setActiveIndex(index);
                      }
                    }}

                  >
                  
                    <div className={styles.menuContent}>
                      <span className={styles.iconMain}>{item.icon}</span>

                      {!collapsed && <span className={styles.label}>{item.label}</span>}
                      {item.collapsible && !collapsed && (
                        <span className={styles.chevron}>
                          {isSectionOpen ? <FiChevronDown /> : <FiChevronRight />}
                        </span>
                      )}

                    </div>
                  </div>

                  {item.collapsible && isSectionOpen && item.items && item.items.length > 0 && (
                    <div className={styles.subMenu}>
                      {item.items.map((subItem, subIdx) => {
                        const subItemKey = `${index}-${subIdx}`;
                        return (
                          <div
                            key={subIdx}
                            className={`${styles.subMenuItem} ${activeIndex === subItemKey ? styles.active : ""}`}
                            onClick={() => setActiveIndex(subItemKey)}
                          >
                            <div className={styles.menuContent}>
                              <span className={styles.iconSub}>{subItem.icon}</span>
                              {!collapsed && (
                                <span className={styles.label}>{subItem.label}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                </div>
              );
            })}

            <div className={styles.profileSection}>
              
              <div className={styles.profileCard}>
                <div className={styles.profileInfo}>
                  <img 
                    src={dashboard_sidebar_user_icon} 
                    alt="Avatar" 
                    className={styles.avatar} 
                  />
                  <div className={styles.profileText}>
                    <div className={styles.profileName}>{username}</div>
                    <div className={styles.profileStatus}>آنلاین</div>
                  </div>
                </div>
              
                <div
                  className={styles.logoutBtn}
                  onClick={() => (window.location.href = "/panel")}
                >
                  <div className={styles.logoutContent}>
                    <img
                      src={dashboard_logout_panel_icon}
                      alt="Logout"
                      className={styles.logoutIcon}
                    />
                    <span className={styles.profilePanel}>پنل کاربری</span>
                  </div>
                </div>
              </div>
            </div>

          </nav>
        </aside>
      )}

      {/* Only show the hamburger icon if the screen width is smaller than 480px */}
      {isSmallScreen && (
        <div
          className={`${styles.hamburgerIcon} ${
            sidebarActive ? styles.hamburgerIconActive : styles.hamburgerIcon
          }`}
          onClick={MobileSidebarOpen}
        >
          <FiMenu />
        </div>

      )}

      {/* If the screen width is smaller than 480px, display a collapsible sidebar */}
      {sidebarActive && isSmallScreen && (
        <aside className={`${styles.sidebarActive}`}>
          {/* Button to close the sidebar */}
          <div
            className={styles.closeSidebar}
            onClick={MobileSidebarClose}
          >
            <FiX />
          </div>

          {/* Game selector section */}
          <div className={styles.MobilegameHeader}>
            <div className={styles.MobilegameSelectorWrapper}>
              <div
                className={`${styles.MobilegameSelectorBox} ${
                  dropdownOpen ? styles.MobilegameSelectorBoxActive : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // جلوگیری از بسته شدن توسط event کلیک صفحه
                  setDropdownOpen(!dropdownOpen);
                }}
              >
                <img src={GameLogo} alt="Game Logo" className={styles.MobilegameLogo} />
                {!collapsed && (
                  <span className={styles.MobilegameName}>{selectedGame}</span>
                )}
              </div>
            </div>

            {/* Dropdown to select a game */}
            {dropdownOpen && (
              <div 
                className={styles.MobilegameDropdown}
                // ref={dropdownRef}
              >
                {gameList.map((game) => (
                  <div
                    key={game}
                    className={styles.MobilegameDropdownItem}

                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedGame(game);
                      setDropdownOpen(false);
                    }}
                  >
                    {game}
                  </div>
                ))}
              </div>
            )}

            <hr className={styles.Mobiledivider} />
          </div>

          {/* Navigation menu */}
          <nav className={styles.Mobilemenu}>
            {menuItems.map((item, index) => {
              const isSectionOpen = openSections.includes(index);
              const isActive = activeIndex === index;

              return (
                <div key={index}>

                  <div
                    className={`${styles.MobilemenuItem} ${isActive ? styles.active : ""}`}
                    
                    onClick={() => {
                      if (item.collapsible) {
                        if (isSectionOpen) {
                          setActiveIndex(null); // ریست هنگام بستن
                        }
                        toggleSection(index);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                  
                    <div className={styles.MobilemenuContent}>
                      <span className={styles.iconMain}>{item.icon}</span>

                      <span className={styles.Mobilelabel}>{item.label}</span>
                      <span className={styles.Mobilechevron}>
                        {isSectionOpen ? <FiChevronDown /> : <FiChevronRight />}
                      </span>
                    </div>
                  </div>

                  {isSectionOpen && item.items && item.items.length > 0 && (
                    <div className={styles.MobilesubMenu}>
                      {item.items.map((subItem, subIdx) => {
                        const subItemKey = `${index}-${subIdx}`;
                        return (
                          <div
                            key={subIdx}
                            className={`${styles.MobilesubMenuItem} ${activeIndex === subItemKey ? styles.active : ""}`}
                            onClick={() => setActiveIndex(subItemKey)}
                          >
                            <div className={styles.MobilemenuContent}>
                              <span className={styles.MobileiconSub}>{subItem.icon}</span>
                              <span className={styles.Mobilelabel}>{subItem.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                </div>
              );
            })}

            <div className={styles.MobileprofileSection}>
              <hr className={styles.Mobiledivider} />
              
              <div className={styles.MobileprofileCard}>
                <div className={styles.MobileprofileInfo}>
                  <img 
                    src={dashboard_sidebar_user_icon} 
                    alt="Avatar" 
                    className={styles.Mobileavatar} 
                  />
                  <div className={styles.MobileprofileText}>
                    <div className={styles.MobileprofileName}>{username}</div>
                    <div className={styles.MobileprofileStatus}>آنلاین</div>
                  </div>
                </div>
              
                <hr className={styles.Mobiledivider} />

                <div
                  className={styles.MobilelogoutBtn}
                  onClick={() => (window.location.href = "/panel")}
                >
                  <div className={styles.MobilelogoutContent}>
                    <img
                      src={dashboard_logout_panel_icon}
                      alt="Logout"
                      className={styles.MobilelogoutIcon}
                    />
                    <span>پنل کاربری</span>
                  </div>
                </div>
              </div>
            </div>

          </nav>
        </aside>
      )}
    </div>
  );
};

export default ChartsPage_SideBar;
