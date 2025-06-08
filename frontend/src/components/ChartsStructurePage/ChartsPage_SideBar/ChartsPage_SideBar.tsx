// import { useState } from "react";
// import { FiGrid, FiHome, FiBarChart2, FiActivity, FiDollarSign, FiLayers, FiTrendingUp, FiPieChart, FiSearch, FiUsers, FiTool, FiSettings } from "react-icons/fi";
import styles from "./ChartsPage_SideBar.module.css"; // وارد کردن CSS Module

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

// import styles from "./ChartsPage_SideBar.module.css";
import GameLogo from "../../../../public/icons/game-ghost-icon.svg";
import dashboard_logout_panel_icon from "../../../../public/icons/dashboard_panel_icon.svg";
import dashboard_sidebar_user_icon from "../../../../public/icons/dashboard_sidebar_user_icon.svg";
import dashboard_close_icon from "../../../../public/icons/close_icon.svg";
import insteadham from "../../../../public/icons/game_with_no_thumbnail_icon.png";

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
  // const [activeIndex, setActiveIndex] = useState<number | null>(null); // برای مدیریت وضعیت باز بودن هر منو
  const [activeIndex, setActiveIndex] = useState<string | number>(0);


  const [sidebarActive, setSidebarActive] = useState(false); // وضعیت باز و بسته بودن سایدبار
  const [isSmallScreen, setIsSmallScreen] = useState(false); // وضعیت اینکه آیا صفحه کوچکتر از 480px است یا نه
  const [collapsed, setCollapsed] = useState(false); // وضعیت باز یا بسته بودن سایدبار در صفحات بزرگتر از 480px

  const [openSections, setOpenSections] = useState<number[]>([]);


  const [selectedGame, setSelectedGame] = useState("بازی A");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const gameList = ["بازی اول", "بازی دوم", "بازی سوم"];



  // تابع برای باز و بسته کردن سایدبار
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  // تغییر وضعیت باز بودن زیرمنوها
  // const toggleSection = (index: number) => {
  //   setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  // };

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // تابع برای جمع کردن و باز کردن سایدبار
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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

  return (
    <div>
      {/* فقط در صورتی که عرض صفحه کوچکتر از 480px باشد، نمایش آیکون همبرگر */}
      {isSmallScreen && (
        <div
          className={styles.hamburgerIcon}
          onClick={toggleSidebar} // با کلیک روی این آیکون، سایدبار باز یا بسته می‌شود
        >
          <FiMenu />
        </div>
      )}

      {/* برای صفحه‌های بزرگتر از 480px سایدبار ثابت */}
      {!isSmallScreen && (
        <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
          
          
          
          
          {/* دکمه برای جمع کردن سایدبار */}
          {/* <div
            className={styles.toggle}
            onClick={toggleCollapse} // با کلیک روی این آیکون، سایدبار جمع یا باز می‌شود
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div> */}


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













          {/* <div className={styles.menu}>
            {menuItems.map((item, index) => (
              <div key={index}>
                <div
                  className={`${styles.menuItem} ${activeIndex === index ? styles.active : ""}`}
                  onClick={() => toggleSection(index)} // با کلیک روی منو، وضعیت باز بودن آن تغییر می‌کند
                >
                  <span className={styles.iconMain}>{item.icon}</span>
                  <span className={styles.label}>{item.label}</span>
                </div>

                {activeIndex === index && item.collapsible && item.items.length > 0 && (
                  <div className={styles.subMenu}>
                    {item.items.map((subItem, subIdx) => (
                      <div key={subIdx} className={styles.subMenuItem}>
                        <span className={styles.iconSub}>{subItem.icon}</span>
                        <span className={styles.label}>{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div> */}


          
        {/* Navigation menu */}
          <nav className={styles.menu}>
            {menuItems.map((item, index) => {
              const isSectionOpen = openSections.includes(index);
              const isActive = activeIndex === index;

              return (
                <div key={index}>

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

                      {/* {!collapsed && index === 0 && window.innerWidth < 480 && (
                        <div className={styles.hamburgerIcon} onClick={toggleSidebar}>
                          <FiMenu />
                        </div>
                      )} */}
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



        </aside>
      )}



      {/* اگر صفحه کوچکتر از 480px باشد، سایدبار کشویی */}
      {sidebarActive && isSmallScreen && (
        <aside className={`${styles.sidebar} ${styles.sidebarActive}`}>
          {/* دکمه بستن سایدبار */}
          <div
            className={styles.closeSidebar}
            onClick={toggleSidebar}
          >
            <FiX />
          </div>

          {/* محتوای دیگر سایدبار */}
          <div className={styles.sidebarContent}>
            <h2>این سایدبار است!</h2>
          </div>
        </aside>
      )}
    </div>
  );
};

export default ChartsPage_SideBar;
