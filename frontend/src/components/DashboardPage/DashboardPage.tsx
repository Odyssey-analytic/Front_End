import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import styles from './DashboardPage.module.css';

// ========== آیکون‌های تست ==========
import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.svg";
import tower_war_icon from "../../../public/icons/tower-war-icon.svg";

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
              {/* Right: Icon + Title + Description */}
              <div className={`${styles["game-info"]} d-flex align-items-center text-end`}>
                <img src={game.icon} alt={game.title} className={`${styles["game-icon"]} ms-3`} />
                <div>
                  <h4 className={styles["game-title"]}>{game.title}</h4>
                  <p className={styles["game-description"]}>{game.description}</p>
                </div>
              </div>

              {/* Left: Stats */}
              <div className={`${styles["game-stats"]} d-flex align-items-center text-center gap-4`}>
                <div>
                  <strong>{game.retention}</strong>
                  <div className="text-muted small">نرخ نگه‌داری</div>
                </div>
                <div>
                  <strong>{game.dau}</strong>
                  <div className="text-muted small">کاربر روزانه</div>
                </div>
                <div>
                  <strong>{game.dnu}</strong>
                  <div className="text-muted small">کاربر جدید</div>
                </div>
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
