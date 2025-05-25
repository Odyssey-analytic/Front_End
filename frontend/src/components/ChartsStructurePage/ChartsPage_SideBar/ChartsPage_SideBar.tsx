import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
  FiBookOpen,
  FiChevronDown
} from 'react-icons/fi';
import styles from './ChartsPage_SideBar.module.css';




const menuItems = [
  {
    // label: 'داشبوردها (Dashboards)',
    label: 'داشبوردها',
    collapsible: true,
    icon: <FiGrid />,
    // items: [
    //   { label: 'نمای کلی (Overview)', icon: <FiHome /> },
    //   { label: 'تعامل کاربران (Engagement)', icon: <FiBarChart2 /> },
    //   { label: 'معیارها (Benchmarks)', icon: <FiActivity /> },
    //   { label: 'درآمدزایی (Monetization)', icon: <FiDollarSign /> },
    //   { label: 'منابع (Resources)', icon: <FiLayers /> },
    //   { label: 'پیشرفت (Progression)', icon: <FiTrendingUp /> },
    //   { label: 'کیفیت (Quality)', icon: <FiPieChart /> },
    // ]
    items: [
      { label: 'نمای کلی ', icon: <FiHome /> },
      { label: 'تعامل کاربران', icon: <FiBarChart2 /> },
      { label: 'معیارها', icon: <FiActivity /> },
      { label: 'درآمدزایی', icon: <FiDollarSign /> },
      { label: 'منابع', icon: <FiLayers /> },
      { label: 'پیشرفت', icon: <FiTrendingUp /> },
      { label: 'کیفیت', icon: <FiPieChart /> },
    ]
  },
  {
    label: 'داشبورد سفارشی',
    // label: 'داشبورد سفارشی (Custom dashboards)'
    collapsible: true,
    icon: <FiGrid />,
    // items: [
    //   { label: 'جستجو (Explore)', icon: <FiSearch /> },
    //   { label: 'قیف‌ها (Funnels)', icon: <FiUsers /> },
    //   { label: 'دسته‌بندی کاربران (Cohorts)', icon: <FiUsers /> },
    //   { label: 'پیکربندی (Configs)', icon: <FiTool /> },
    //   { label: 'تنظیمات (Settings)', icon: <FiSettings /> },
    // ]
    items: [
      { label: 'جستجو', icon: <FiSearch /> },
      { label: 'قیف‌ها', icon: <FiUsers /> },
      { label: 'دسته‌بندی کاربران', icon: <FiUsers /> },
      { label: 'پیکربندی', icon: <FiTool /> },
      { label: 'تنظیمات', icon: <FiSettings /> },
    ]
  },
];



const ChartsPage_SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState<string | number>(0);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const game_name = localStorage.getItem('game_name');
  const Logo = localStorage.getItem('Logo');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const gameList = JSON.parse(localStorage.getItem('gamesList') ?? '[]');
  const navigate = useNavigate();
  const toggleSection = (index: number) => {
  setOpenSections(prev => {
    console.log(game_name); // This will now be executed
    if (prev.includes(index)) {
      return prev.filter(i => i !== index);
    } else {
      return [...prev, index];
    }
  });
};

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>

      <div className={styles.gameHeader}>
        <div className={styles.gameSelectorWrapper}>
          <div
            className={styles.gameSelectorBox}
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <img src={Logo} alt="Game Logo" className={styles.gameLogo} />
            {!collapsed && <span className={styles.gameName}>{game_name}</span>}
          </div>

          <div
            className={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
        </div>
</div>
 {dropdownOpen && (
        
          <div className={styles.gameDropdown}>
            {gameList.map((game: any, index: number) => (
              <div
                key={index}
                className={styles.gameDropdownItem}
                onClick={() => {
                  localStorage.setItem("game_name", game.title);
                  localStorage.setItem("Logo", game.icon);
                  setDropdownOpen(false);
                  console.log(game.id);
                  navigate(`/dashboard/${game.id}`);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={game.icon}
                    alt={game.title}
                    className={styles.gameDropdownItemImg}
                  />
                  <span>{game.title}</span>
                </div>
              </div>
            ))}

      </div>)}

      <nav className={styles.menu}>
        {menuItems.map((item, index) => {
          const isSectionOpen = openSections.includes(index);
          const isActive = activeIndex === index;

          return (
            <div key={index}>
              <div
                className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                onClick={() =>
                  item.collapsible ? toggleSection(index) : setActiveIndex(index)
                }
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
                        className={`${styles.subMenuItem} ${activeIndex === subItemKey ? styles.active : ''}`}
                        onClick={() => setActiveIndex(subItemKey)}
                      >
                        <div className={styles.menuContent}>
                          <span className={styles.iconSub}>{subItem.icon}</span>
                          {!collapsed && <span className={styles.label}>{subItem.label}</span>}
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
  );
};

export default ChartsPage_SideBar;
