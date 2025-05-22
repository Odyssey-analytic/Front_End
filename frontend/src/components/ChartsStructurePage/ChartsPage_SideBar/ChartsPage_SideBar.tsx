// import styles from './ChartsPage_SideBar.module.css';
// import OdessayLogo from '../../../../public/icons/odessay_logo.svg';

// const ChartsPage_SideBar = () => (
//   <aside className={styles.sidebar}>
//     <div className={styles.brand}>
//       <span className={styles.brandText}>ODESSAY</span>
//       <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImg} />
//     </div>

//     <nav className={styles.menu}>
//       <ul>
//         <li>Overview</li>
//         <li>Engagement</li>
//         <li>Monetization</li>
//       </ul>
//     </nav>
//   </aside>
// );

// export default ChartsPage_SideBar;


//////////////////////////////////////////////////////////////////////////////////////////////

// import { useState } from 'react';
// import { FiHome, FiBarChart2, FiDollarSign, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import styles from './ChartsPage_SideBar.module.css';

// const menuItems = [
//   { icon: <FiHome />, label: 'Overview' },
//   { icon: <FiBarChart2 />, label: 'Engagement' },
//   { icon: <FiDollarSign />, label: 'Monetization' },
// ];

// const ChartsPage_SideBar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
//       <div className={styles.logo}>
//         {!collapsed && <span>Demo Game v2</span>}
//       </div>

//       <nav className={styles.menu}>
//         {menuItems.map((item, index) => (
//           <div key={index} className={styles.menuItem}>
//             <span className={styles.icon}>{item.icon}</span>
//             {!collapsed && <span className={styles.label}>{item.label}</span>}
//           </div>
//         ))}
//       </nav>

//       <div className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
//         {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
//       </div>
//     </aside>
//   );
// };

// export default ChartsPage_SideBar;


///////////////////////////////////////////////////////////////////////////////////


import { useState } from 'react';
import {
  FiHome,
  FiBarChart2,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import styles from './ChartsPage_SideBar.module.css';
import OdessayLogo from '../../../../public/icons/odessay_logo.svg'; // آدرس دقیق لوگو
import { FiMenu } from 'react-icons/fi'; // آیکون ۳ خط کلاسیک


const menuItems = [
  { icon: <FiHome />, label: 'Overview' },
  { icon: <FiBarChart2 />, label: 'Engagement' },
  { icon: <FiDollarSign />, label: 'Monetization' },
];


const ChartsPage_SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      
      {/* <div className={styles.top}>
        <div className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </div>

        <div className={styles.logo}>
          <img src={OdessayLogo} alt="Logo" className={styles.logoImg} />
          {!collapsed && <span className={styles.logoText}>ODESSAY</span>}
        </div>

        <hr className={styles.divider} />
      </div> */}

      <div className={styles.top}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            {/* <img src={OdessayLogo} alt="Logo" className={styles.logoImg} /> */}
            {!collapsed && <span className={styles.logoText}>ODESSAY</span>}
            <img src={OdessayLogo} alt="Logo" className={styles.logoImg} />
            
          </div>
          <div className={styles.toggle} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
            {/* {collapsed ? <FiMenu /> : <FiChevronLeft />} */}
          </div>
        </div>

        <hr className={styles.divider} />
      </div>



      {/* <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <span className={styles.icon}>{item.icon}</span>
            {!collapsed && <span className={styles.label}>{item.label}</span>}
          </div>
        ))}
      </nav> */}

      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          // <div
          //   key={index}
          //   className={`${styles.menuItem} ${activeIndex === index ? styles.active : ''}`}
          //   onClick={() => setActiveIndex(index)}
          // >
          //   <span className={styles.icon}>{item.icon}</span>
          //   {!collapsed && <span className={styles.label}>{item.label}</span>}
          // </div>

            <div
              key={index}
              className={`${styles.menuItem} ${
                activeIndex === index ? styles.active : ''
              } ${hoveredIndex === index ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(index)}
            >
              <div className={styles.menuContent}>
                <span className={styles.icon}>{item.icon}</span>
                {!collapsed && <span className={styles.label}>{item.label}</span>}
              </div>
            </div>




        ))}
      </nav>



    </aside>
  );
};

export default ChartsPage_SideBar;
