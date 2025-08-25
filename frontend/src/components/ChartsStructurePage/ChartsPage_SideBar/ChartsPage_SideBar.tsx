import React, { useState, useEffect, JSX } from "react";
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

// ترجمه‌ها
const tabTranslations: { [key: string]: string } = {
  GameEventSSEConsumer: "رویدادهای بازی",
  DailyActiveUsersConsumer: "کاربران فعال روزانه",
  AverageFPSConsumer: "میانگین فریم‌برثانیه",
  AverageMemoryUsageConsumer: "میانگین استفاده از حافظه",
  AverageSessionDurationConsumer: "میانگین مدت زمان جلسه",
  TotalRevenuePerCurrencyConsumer: "درآمد کل به ازای هر ارز",
  ARPPUConsumer: "درآمد میانگین به ازای هر کاربر پرداخت‌کننده",
  CrashRateConsumer: "نرخ کرش",
  Settings: "تنظیمات",
};

const menuItems: MenuItem[] = [
  {
    label: "داشبوردها", // کد انگلیسی باقی می‌ماند
    collapsible: true,
    icon: <FiGrid />,
    items: [
      {
        label: "GameEventSSEConsumer", // کد انگلیسی
        icon: <FiBarChart2 />,
      },
      {
        label: "DailyActiveUsersConsumer", // کد انگلیسی
        icon: <FiActivity />,
      },
      {
        label: "AverageFPSConsumer", // کد انگلیسی
        icon: <FiDollarSign />,
      },
      {
        label: "AverageMemoryUsageConsumer", // کد انگلیسی
        icon: <FiLayers />,
      },
      {
        label: "AverageSessionDurationConsumer", // کد انگلیسی
        icon: <FiTrendingUp />,
      },
      {
        label: "TotalRevenuePerCurrencyConsumer", // کد انگلیسی
        icon: <FiPieChart />,
      },
      {
        label: "ARPPUConsumer", // کد انگلیسی
        icon: <FiHome />,
      },
      {
        label: "CrashRateConsumer", // کد انگلیسی
        icon: <FiLayers />,
      },
    ],
  },
  {
    label: "داشبوردهای سفارشی", // کد انگلیسی
    collapsible: true,
    icon: <FiGrid />,
    items: [
      {
        label: "Settings", // کد انگلیسی
        icon: <FiSettings />,
      },
    ],
  },
];

const ChartsPage_SideBar: React.FC<SidebarProps> = ({
  setSelectedTab,
  setSelectedSubTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
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
    setActiveSubTab(null);
  };

  const MobileSidebarOpen = () => {
    setSidebarActive(true);
  };

  const MobileSidebarClose = () => {
    setSidebarActive(false);
    resetMobileSidebarState();
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const newOpenSections = prev.includes(index)
        ? prev.filter((i) => i !== index) // تب بسته شده است، آن را از آرایه حذف می‌کنیم
        : [...prev, index]; // تب باز شده است، آن را به آرایه اضافه می‌کنیم

      // اگر تب بسته شد، selectedSubTab و selectedTab را ریست کن
      if (!newOpenSections.includes(index)) {
        setSelectedTab(null); // ریست کردن تب
        setSelectedSubTab(null); // ریست کردن ساب‌تب
        setActiveSubTab(null); // ریست کردن ساب‌تب فعال
        localStorage.removeItem("activeSubTab"); // حذف ساب‌تب ذخیره‌شده
      }

      return newOpenSections;
    });
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    setDropdownOpen(false);
    setOpenSections([]); // برای بستن تب‌ها

    // ریست کردن selectedSubTab و selectedTab زمانی که سایدبار بسته می‌شود
    setSelectedSubTab(null); // ساب‌تب‌ها ریست می‌شوند
    setSelectedTab(null); // تب‌ها ریست می‌شوند
  };

  const handleMenuItemClick = (tabName: string) => {
    setSelectedTab(tabName);
    setSelectedSubTab(null);
  };

  const handleSubTabClick = (subTabName: string) => {
    setActiveSubTab(subTabName); // تعیین زیرتب فعال
    setSelectedSubTab(subTabName); // تعیین زیرتب انتخاب شده
    setSelectedTab(subTabName); // همچنین در صورت لزوم تغییر تب
  };

  useEffect(() => {
    const savedSubTab = localStorage.getItem("activeSubTab");
    if (savedSubTab) {
      setActiveSubTab(savedSubTab);
    }
  }, []); // در هنگام باز شدن صفحه، اگر ساب‌تب ذخیره شده باشد، آن را فعال می‌کنیم

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
              return (
                <div key={index}>
                  <div
                    className={`${styles.menuItem} ${
                      item.collapsible && isSectionOpen ? styles.active : ""
                    }`}
                    onClick={() => {
                      toggleSection(index);
                    }}
                  >
                    <div className={styles.menuContent}>
                      <span className={styles.iconMain}>{item.icon}</span>
                      {!collapsed && (
                        <span className={styles.label}>
                          {tabTranslations[item.label] || item.label}{" "}
                          {/* نمایش فارسی */}
                        </span>
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
                          const isActive = activeSubTab === subItem.label;
                          return (
                            <div
                              key={subIdx}
                              className={`${styles.subMenuItem} ${
                                isActive ? styles.active : ""
                              }`}
                              onClick={() => handleSubTabClick(subItem.label)}
                            >
                              <div className={styles.menuContent}>
                                <span className={styles.iconSub}>
                                  {subItem.icon}
                                </span>
                                {!collapsed && (
                                  <span className={styles.label}>
                                    {tabTranslations[subItem.label] ||
                                      subItem.label}
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

          <div className={styles.MobileprofileSection}>
            <div className={styles.MobileprofileCard}>
              <div className={styles.MobileprofileInfo}>
                <img
                  src={dashboard_sidebar_user_icon}
                  alt="Avatar"
                  className={styles.avatar}
                  onClick={() => navigate("/dashboard")} // اضافه کردن رویداد onClick
                />
                {!collapsed && (
                  <div className={styles.profileText}>
                    <div className={styles.profileName}>{username}</div>
                    <div className={styles.profileStatus}>آنلاین</div>
                  </div>
                )}
              </div>

              <div
                className={styles.logoutBtn}
                onClick={() => (window.location.href = "/")}
              >
                <div className={styles.logoutContent}>
                  <img
                    src={dashboard_logout_panel_icon}
                    alt="Logout"
                    className={styles.logoutIcon}
                  />
                  {!collapsed && (
                    <span className={styles.profilePanel}>پنل کاربری</span>
                  )}
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
