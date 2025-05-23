import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import styles from './DashboardPage.module.css';

// ========== آیکون‌های تست ==========
import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.svg";
import tower_war_icon from "../../../public/icons/tower-war-icon.svg";
import dashboard_collaborator_icon from '../../../public/icons/dashboard_collaborator_icon.svg';
import dashboard_collaborator_wrapper_icon from '../../../public/icons/dashboard_collaborator_wrapper_icon.svg';
// =======================
// Component: DashboardPage
// =======================
const DashboardPage = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    setGames(mockGames);
  }, []);

  return (
    <div>
      <MainLayout />

      {/* =======================
          Toolbar بالا
      ======================= */}
      <div className={`${styles["dashboard-toolbar"]} px-4 py-3`}>
        <div className={`d-flex justify-content-between align-items-center mb-3`}>
          <h2 className={styles["dashboard-title"]}>مدیریت بازی‌ها</h2>
          <div className={`${styles["dashboard-user"]} d-flex align-items-center gap-2`}>
            <span className={styles["user-avatar"]}>👤</span>
            <span className={styles["user-name"]}>PonsGroup ▼</span>
          </div>
        </div>

        <div className={`d-flex justify-content-between align-items-center ${styles["toolbar-bottom"]}`}>
          <span className={styles["filter-label"]}>لیست بازی‌ها</span>
          <div className={`d-flex gap-2 ${styles["dashboard-controls"]}`}>
            <button className={styles["download-kit-btn"]}>📥 دانلود Starter Kit</button>
            <button className={styles["add-game-btn"]}>➕ افزودن بازی جدید</button>
          </div>
          <div className={`d-flex gap-2 align-items-center ${styles["toolbar-filters"]}`}>
            <select className={styles["filter-dropdown"]}>
              <option>Mobile only</option>
            </select>
            <select className={styles["filter-dropdown"]}>
              <option>Last edited</option>
            </select>
            <span className={styles["toolbar-icon"]}>ℹ️</span>
          </div>
        </div>
      </div>

      {/* =======================
          لیست بازی‌ها
      ======================= */}
      <div className={`${styles["dashboard-container"]} px-4 py-4`}>
        <div className={`${styles["game-list"]} d-flex flex-column gap-4`}>
          {games.map((game) => (
            <div key={game.id} className={`${styles["game-card"]} d-flex justify-content-between align-items-center shadow-sm rounded`}>

  {/* بخش 1: اطلاعات بازی */}
  <div className={`${styles["game-section-info"]} d-flex align-items-start gap-3`}>
    {/* <img src={game.icon} alt={game.title} className={styles["game-icon"]} /> */}
    <div className={styles["game-icon-wrapper"]}>
  <img src={game.icon} alt={game.title} className={styles["game-icon"]} />
  <span className={styles["game-tag"]}>iOS</span>
</div>

    <div>
      <h4 className={styles["game-title"]}>{game.title}</h4>
      <p className={styles["game-description"]}>{game.description}</p>
      <div className="d-flex gap-2 mt-2">
        {/* <span className={styles["game-tag"]}>iOS</span> */}
        <span className={styles["game-meta"]}>Created: 23 Nov 16</span>
        <span className={styles["game-meta"]}>Last edited: 20 min ago</span>
      </div>
    </div>
    <div className="ms-auto">
      <span className={styles["game-settings-icon"]}>⚙️</span>
    </div>
  </div>

  {/* بخش 2: آمار کاربران */}
  <div className={`${styles["game-section-stats"]} d-flex flex-column text-center`}>
    <div>
      <div className={styles["game-stat-label"]}>Monthly</div>
      <strong className={styles["game-stat-value"]}>879k</strong>
    </div>
    <div className="mt-2">
      <div className={styles["game-stat-label"]}>Daily</div>
      <strong className={styles["game-stat-value"]}>120k</strong>
    </div>
  </div>

  {/* بخش 3: همکاران */}
  
  
  <div className={`${styles["game-section-collaborators"]} d-flex align-items-center gap-2`}>
            
{[...Array(6)].map((_, i) => (
  <div key={i} className={styles["collaborator-wrapper"]}>
       <img
      src={dashboard_collaborator_wrapper_icon}
      alt="collaborator wrapper"
      className={styles["collaborator-wrapper-icon"]}
    />
   
    <img
      src={dashboard_collaborator_icon}
      alt="collaborator"
      className={styles["collaborator-icon"]}
    />

  </div>
))}




    {/* <span className={styles["game-more-icon"]}>⋯</span> */}
  </div>
</div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// =======================
// Mock data
// =======================
const mockGames = [
  {
    id: 1,
    icon: pocket_champs_icon,
    title: 'Pocket Champs: 3D Racing Games',
    genre: 'Racing',
    description: 'این بازی یک بازی سه‌بعدی اکشن است که در آن با ارتقاء قهرمان خود در رقابت‌های سریع شرکت می‌کنید.',
    dnu: 14,
    dau: 1648,
    retention: '10.49%',
  },
  {
    id: 2,
    icon: tower_war_icon,
    title: 'Tower War - Tactical Conquest',
    genre: 'Strategy',
    description: 'این بازی یک بازی استراتژیک سریع است که در آن با تصرف برج‌ها مدیریت نیروها را به‌عهده می‌گیرید.',
    dnu: 14,
    dau: 1648,
    retention: '10.49%',
  },
];
