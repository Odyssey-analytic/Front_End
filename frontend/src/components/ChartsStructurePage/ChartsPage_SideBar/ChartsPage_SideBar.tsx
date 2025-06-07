import { useState, useEffect } from "react";
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

import styles from "./ChartsPage_SideBar.module.css";
import GameLogo from "../../../../public/icons/game-ghost-icon.svg";
import dashboard_logout_panel_icon from "../../../../public/icons/dashboard_panel_icon.svg";
import dashboard_sidebar_user_icon from "../../../../public/icons/dashboard_sidebar_user_icon.svg";
import dashboard_close_icon from "../../../../public/icons/close_icon.svg";
import insteadham from "../../../../public/icons/game_with_no_thumbnail_icon.png";

// Menu items for the sidebar
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
  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [activeIndex, setActiveIndex] = useState<string | number>(0);
  const [openSections, setOpenSections] = useState<number[]>([]);

  const [selectedGame, setSelectedGame] = useState("بازی A");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [username, setUsername] = useState<string>();
  const gameList = ["بازی اول", "بازی دوم", "بازی سوم"];

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Toggle the open/close of menu sections
  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  
  useEffect(() => {
    // چک کردن اینکه آیا صفحه کوچکتر از 480px است
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 480);
    };

    // بررسی اولیه
    checkScreenSize();

    // برای هر بار تغییر اندازه صفحه
    window.addEventListener("resize", checkScreenSize);

    // تمیزکاری (cleanup) برای وقتی که کامپوننت از صفحه خارج می‌شود
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // تابع برای باز و بسته کردن سایدبار
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };


  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      {isSmallScreen && (
        <div 
          className="hamburgerIcon" 
          onClick={toggleSidebar}
        >
          {/* <FiMenu /> */}
          <img src={insteadham} alt="Open Sidebar" />
        </div>
      )}

      <aside className={`${styles.sidebar} ${sidebarActive ? "active" : ""}`}>
        <div
          className={`${styles.closeSidebar} ${window.innerWidth < 480 ? "" : styles.hidden}`}
          onClick={toggleSidebar}
        >
          {/* <FiX /> */}
          <img src={dashboard_close_icon} alt="Close Sidebar" />
        </div>

        {/* Game selector section */}
        <div className={styles.gameHeader}>
          <div className={styles.gameSelectorWrapper}>
            <div
              className={styles.gameSelectorBox}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img src={GameLogo} alt="Game Logo" className={styles.gameLogo} />
              {!collapsed && (
                <span className={styles.gameName}>{selectedGame}</span>
              )}
            </div>

            {/* Collapse/Expand button for the sidebar */}
            <div
              className={styles.toggle}
              onClick={toggleCollapse} // Toggle the collapse state
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </div>
          </div>

          {/* Dropdown to select a game */}
          {dropdownOpen && (
            <div className={styles.gameDropdown}>
              {gameList.map((game) => (
                <div
                  key={game}
                  className={styles.gameDropdownItem}
                  onClick={() => {
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

                {/* <div className={`${styles.menuItem} ${isActive ? styles.active : ""}`} onClick={() => item.collapsible ? toggleSection(index) : setActiveIndex(index)}> */}
                <div
                  className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                  onClick={() =>
                    item.collapsible
                      ? toggleSection(index)
                      : setActiveIndex(index)
                  }
                >
                
                  <div className={styles.menuContent}>
                    <span className={styles.iconMain}>{item.icon}</span>

                    {!collapsed && index === 0 && window.innerWidth < 480 && (
                      <div className={styles.hamburgerIcon} onClick={toggleSidebar}>
                        <FiMenu />
                      </div>
                    )}
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
        </nav>

        {/* Profile section */}
        <div className={styles.profileSection}>
          <div className={styles.profileInfo}>
            <img src={dashboard_sidebar_user_icon} alt="Avatar" className={styles.avatar} />
            {!collapsed && (
              <div>
                <div className={styles.profileName}>{username}</div>
              </div>
            )}
          </div>

          <div
            className={styles.logoutBtn}
            onClick={() => (window.location.href = "/panel")}
          >
            <img
              src={dashboard_logout_panel_icon}
              alt="Logout"
              className={styles.logoutIcon}
            />
            {!collapsed && <span>پنل کاربری</span>}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ChartsPage_SideBar;
