import { useState , useEffect} from "react";
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
} from "react-icons/fi";
import styles from "./ChartsPage_SideBar.module.css";
import GameLogo from "../../../../public/icons/game-ghost-icon.svg";
import dashboard_logout_panel_icon from "../../../../public/icons/dashboard_panel_icon.svg";



const menuItems = [
  {
    label: "داشبوردها",
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
    label: "داشبورد سفارشی",
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

  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  
  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
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

          <div
            className={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
        </div>

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
                onClick={() =>
                  item.collapsible
                    ? toggleSection(index)
                    : setActiveIndex(index)
                }
              >
                <div className={styles.menuContent}>
                  <span className={styles.iconMain}>{item.icon}</span>
                  {!collapsed && (
                    <span className={styles.label}>{item.label}</span>
                  )}
                  {item.collapsible && !collapsed && (
                    <span className={styles.chevron}>
                      {isSectionOpen ? <FiChevronDown /> : <FiChevronRight />}
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
                          onClick={() => setActiveIndex(subItemKey)}
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
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <img
            src="/icons/sample-avatar.png"
            alt="Avatar"
            className={styles.avatar}
          />
          {!collapsed && (
            <div>
              <div className={styles.profileName}>{username}</div>
              {/* <div className={styles.profileRole}>ادمین</div> */}
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
  );
};

export default ChartsPage_SideBar;
