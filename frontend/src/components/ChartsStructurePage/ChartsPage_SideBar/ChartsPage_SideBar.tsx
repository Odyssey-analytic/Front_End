import React, {useState, useEffect, JSX} from "react";
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
import OdessayLogo from "../../../../public/icons/odessay_logo.svg";
import styles from "./ChartsPage_SideBar.module.css";

// تایپ پراپس برای setSelectedTab
interface SidebarProps {
  setSelectedTab: (tab: string | null) => void;
  setSelectedSubTab: (subTab: string | null) => void; // اضافه کردن پراپس برای زیرتب
}

// اصلاح مدل دیتا به نحوی که label از نوع string باشد و icon از نوع JSX.Element
interface SubMenuItem {
  label: string; // تغییر به string
  icon: JSX.Element; // باقی ماندن به عنوان JSX.Element
}

interface MenuItem {
  label: string; // تغییر به string
  collapsible: boolean;
  icon: JSX.Element;
  items?: SubMenuItem[]; // زیرمنوهایی که در صورت لزوم وجود دارند
}

const menuItems: MenuItem[] = [
  {
    label: "داشبوردها", // Dashboards
    collapsible: true,
    icon: <FiGrid />,
    items: [
      {
        label: "(AverageSessionLength)", // تغییر به string
        icon: <FiHome />,
      },
      {
        label: "(GameEventSSEConsumer)", // تغییر به string
        icon: <FiBarChart2 />,
      },
      {
        label: "(DailyActiveUsersConsumer)", // تغییر به string
        icon: <FiActivity />,
      },
      {
        label: "(AverageFPSConsumer)", // تغییر به string
        icon: <FiDollarSign />,
      },
      {
        label: "(AverageMemoryUsageConsumer)", // تغییر به string
        icon: <FiLayers />,
      },
      {
        label: "(AverageSessionDurationConsumer)", // تغییر به string
        icon: <FiTrendingUp />,
      },
      {
        label: "(TotalRevenuePerCurrencyConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
      {
        label: "(ARPPUConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
      {
        label: "(LevelCompletionRateConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
            {
        label: "(AverageTriesPerLevelConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
                  {
        label: "(NetResourceFlowConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
                        {
        label: "(CrashRateConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
                              {
        label: "(ResourceSinkRatioConsumer)", // تغییر به string
        icon: <FiPieChart />,
      },
                                    {
        label: "(TopErrorTypesConsumer)", // تغییر به string
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
        label: "تنظیمات (Settings)", // تغییر به string
        icon: <FiSettings />,
      },
    ],
  },
];

const ChartsPage_SideBar: React.FC<SidebarProps> = ({
  setSelectedTab,
  setSelectedSubTab,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | string | null>(null);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([]); // برای باز و بسته کردن زیرتب‌ها
  const [selectedGame, setSelectedGame] = useState(
    localStorage.getItem("game_name") ?? ""
  ); // مقدار پیش‌فرض
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const gameList = JSON.parse(localStorage.getItem("gamesList") ?? "[]");
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | undefined>(undefined);

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
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 480);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const resetMobileSidebarState = () => {
    setDropdownOpen(false);
    setOpenSections([]);
    setActiveIndex(null);
  };

  const MobileSidebarOpen = () => {
    setSidebarActive(true);
  };

  const MobileSidebarClose = () => {
    setSidebarActive(false);
    resetMobileSidebarState();
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );

    if (openSections.includes(index)) {
      setActiveIndex(null);
    }
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setDropdownOpen(false);
    setOpenSections([]);
  };

  const handleMenuItemClick = (tabName: string) => {
    setSelectedTab(tabName);
    setSelectedSubTab(null); // هر بار روی تب کلیک می‌کنیم، زیرتب باید null شود
  };

  const handleSubTabClick = (subTabName: string) => {
    setSelectedSubTab(subTabName); // تعیین زیرتب انتخاب شده
    setSelectedTab(subTabName); // همچنین در صورت لزوم تغییر تب
  };

  return (
    <div className={styles.sidebarcontainer}>
      {!isSmallScreen && (
        <aside
          className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}
        >
          <div className={styles.headerWrapper}>
            {!collapsed && (
              <div className={styles.brandLogoHeader}>
                <span className={styles.brandLogoText}>ODESSAY</span>
                <img
                  src={OdessayLogo}
                  alt="Odessay Logo"
                  className={styles.brandLogoImg}
                />
              </div>
            )}
            <div
              className={styles.toggle}
              onClick={toggleCollapse}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            </div>
          </div>

          <div className={styles.gameSelectorSection}>
            <hr className={styles.divider} />
            <div
              className={styles.gameSelectorBox}
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
            >
              <img src={GameLogo} alt="Game Logo" className={styles.gameLogo} />
              {!collapsed && (
                <span className={styles.gameName}>{selectedGame}</span>
              )}
            </div>
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

          <nav className={styles.menu}>
            {menuItems.map((item, index) => {
              const isSectionOpen = openSections.includes(index);
              const isActive = activeIndex === index;

              return (
                <div key={index}>
                  <div
                    className={`${styles.menuItem} ${
                      isActive ? styles.active : ""
                    }`}
                    onClick={() => {
                      if (item.collapsible) {
                        if (isSectionOpen) {
                          setActiveIndex(null);
                        }
                        toggleSection(index);
                      } else {
                        setActiveIndex(index);
                      }
                    }}
                  >
                    <div className={styles.menuContent}>
                      <span className={styles.iconMain}>{item.icon}</span>
                      {!collapsed && (
                        <span className={styles.label}>{item.label}</span>
                      )}
                      {item.collapsible && !collapsed && (
                        <span className={styles.chevron}>
                          {isSectionOpen ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.collapsible &&
                    isSectionOpen &&
                    item.items &&
                    item.items.length > 0 && (
                      <div className={styles.subMenu}>
                        {item.items.map((subItem, subIdx) => {
                          const subItemKey = `${index}-${subIdx}`;
                          return (
                            <div
                              key={subIdx}
                              className={`${styles.subMenuItem} ${
                                activeIndex === subItemKey ? styles.active : ""
                              }`}
                              onClick={() => handleSubTabClick(subItem.label)} // کلیک روی زیرتب
                            >
                              <div className={styles.menuContent}>
                                <span className={styles.iconSub}>
                                  {subItem.icon}
                                </span>
                                {!collapsed && (
                                  <span className={styles.label}>
                                    {subItem.label}
                                  </span>
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

          {/* پایین سایدبار */}
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
        </aside>
      )}
    </div>
  );
};

export default ChartsPage_SideBar;
