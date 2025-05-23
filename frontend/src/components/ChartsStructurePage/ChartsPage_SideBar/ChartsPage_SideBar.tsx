// import { useState } from 'react';
// import {
//   FiHome,
//   FiBarChart2,
//   FiDollarSign,
//   FiChevronLeft,
//   FiChevronRight,
// } from 'react-icons/fi';
// import styles from './ChartsPage_SideBar.module.css';
// import OdessayLogo from '../../../../public/icons/odessay_logo.svg';

// const menuItems = [
//   { icon: <FiHome />, label: 'Overview' },
//   { icon: <FiBarChart2 />, label: 'Engagement' },
//   { icon: <FiDollarSign />, label: 'Monetization' },
// ];

// const ChartsPage_SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
//       <div className={styles.top}>
//         <div className={styles.logoWrapper}>
//           <div className={styles.logo}>
//             {!collapsed && <span className={styles.logoText}>ODESSAY</span>}
//             <img src={OdessayLogo} alt="Logo" className={styles.logoImg} />
//           </div>
//           <div
//             className={styles.toggle}
//             onClick={() => setCollapsed(!collapsed)}
//             aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//           >
//             {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
//           </div>
//         </div>
//         <hr className={styles.divider} />
//       </div>

//       <nav className={styles.menu}>
//         {menuItems.map((item, index) => {
//           const isActive = activeIndex === index;
//           const isHovered = hoveredIndex === index;

//           return (
//             <div
//               key={index}
//               className={`${styles.menuItem} ${
//                 isActive ? styles.active : ''
//               } ${isHovered ? styles.hovered : ''}`}
//               onClick={() => setActiveIndex(index)}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               role="button"
//               tabIndex={0}
//               onKeyDown={e => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   setActiveIndex(index);
//                 }
//               }}
//             >
//               <div className={styles.menuContent}>
//                 <span className={styles.icon}>{item.icon}</span>
//                 {!collapsed && <span className={styles.label}>{item.label}</span>}
//               </div>
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// };

// export default ChartsPage_SideBar;


import { useState } from 'react';
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
import OdessayLogo from '../../../../public/icons/odessay_logo.svg';
import GameLogo from '../../../../public/icons/game-ghost-icon.svg'



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
  // {
  //   label: 'دسته‌بندی آزمایشی (Cohorts BETA)', icon: <FiUsers />
  // },
  // {
  //   label: 'ویژگی‌های قدیمی (Legacy features)', icon: <FiBookOpen />
  // }
];



const ChartsPage_SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState<string | number>(0);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const [selectedGame, setSelectedGame] = useState('بازی A');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const gameList = ['بازی A', 'بازی B', 'بازی C'];

  const toggleSection = (index: number) => {
    setOpenSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            {!collapsed && <span className={styles.logoText}>ODESSAY</span>}
            <img src={OdessayLogo} alt="Logo" className={styles.logoImg} />
          </div>
          <div
            className={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
        </div>
        <hr className={styles.divider} />
      </div> */}

      {/* <div className={styles.gameHeader}>
        <div className={styles.gameSelectorWrapper}>
          <div className={styles.gameSelector}>
            <img src={GameLogo} alt="Game Logo" className={styles.gameLogo} />
            {!collapsed && (
              <div className={styles.gameNameWrapper}>
                <span
                  className={styles.gameName}
                  onClick={() => setDropdownOpen(prev => !prev)}
                >
                  {selectedGame}
                </span>
                {dropdownOpen && (
                  <div className={styles.gameDropdown}>
                    {gameList.map(game => (
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
              </div>
            )}
          </div>

          <div
            className={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
        </div>
        <hr className={styles.divider} />
      </div> */}

      <div className={styles.gameHeader}>
        <div className={styles.gameSelectorWrapper}>
          <div className={styles.gameSelector} onClick={() => setDropdownOpen(prev => !prev)}>
            <img src={GameLogo} alt="Game Logo" className={styles.gameLogo} />
            {!collapsed && (
              <div className={styles.gameNameBox}>
                <span className={styles.gameName}>{selectedGame}</span>
                <FiChevronDown className={styles.dropdownIcon + (dropdownOpen ? ' ' + styles.rotate : '')} />
              </div>
            )}
            {dropdownOpen && (
              <div className={styles.gameDropdown}>
                {gameList.map(game => (
                  <div
                    key={game}
                    className={`${styles.gameDropdownItem} ${game === selectedGame ? styles.selected : ''}`}
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
          </div>

          <div
            className={styles.toggle}
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </div>
        </div>
        <hr className={styles.divider} />
      </div>



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
