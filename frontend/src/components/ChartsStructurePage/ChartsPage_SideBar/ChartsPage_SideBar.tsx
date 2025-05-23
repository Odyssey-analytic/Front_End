import { useState } from 'react';
import {
  FiHome,
  FiBarChart2,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import styles from './ChartsPage_SideBar.module.css';
import OdessayLogo from '../../../../public/icons/odessay_logo.svg';

const menuItems = [
  { icon: <FiHome />, label: 'Overview' },
  { icon: <FiBarChart2 />, label: 'Engagement' },
  { icon: <FiDollarSign />, label: 'Monetization' },
];

const ChartsPage_SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.top}>
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
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className={`${styles.menuItem} ${
                isActive ? styles.active : ''
              } ${isHovered ? styles.hovered : ''}`}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveIndex(index);
                }
              }}
            >
              <div className={styles.menuContent}>
                <span className={styles.icon}>{item.icon}</span>
                {!collapsed && <span className={styles.label}>{item.label}</span>}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default ChartsPage_SideBar;
