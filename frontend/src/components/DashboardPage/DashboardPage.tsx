import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import styles from './DashboardPage.module.css';
// import { fetchUserGames } from '../../services/userService';

import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.svg";
import tower_war_icon from "../../../public/icons/tower-war-icon.svg";
import dashboard_collaborator_icon from '../../../public/icons/dashboard_collaborator_icon.svg';
import dashboard_collaborator_wrapper_icon from '../../../public/icons/dashboard_collaborator_wrapper_icon.svg';
import dashboard_add_collaborator_icon from '../../../public/icons/dashboard_add_collaborator_icon.svg';
import dashboard_game_setting_icon from '../../../public/icons/dashboard_game_setting_icon.svg';
import game_with_no_thumbnail_icon from '../../../public/icons/game_with_no_thumbnail_icon.svg';

// ===================== Mock Data =====================
const mockGames = [
  {
    id: 'game1',
    icon: pocket_champs_icon,
    title: 'پاکت چمپس',
    description: 'بازی استراتژیک با قابلیت چندنفره.',
    dnu: 35,
    dau: 1200,
    retention: '12.5%',
    platform: 'Android, iOS',
  },
  {
    id: 'game2',
    icon: tower_war_icon,
    title: 'تاور وار',
    description: 'دفاع از قلعه در برابر هیولاها.',
    dnu: 20,
    dau: 800,
    retention: '9.3%',
    platform: 'Android',
  },
  {
    id: 'game3',
    icon: game_with_no_thumbnail_icon,
    title: 'بدون تصویر',
    description: 'بازی تستی بدون آیکون مشخص.',
    dnu: 12,
    dau: 400,
    retention: '7.1%',
    platform: 'Web',
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [games, setGames] = useState<any[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(320);
  const [username, setUsername] = useState<string>('user name');

  const chartData = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 50) + 10
  );

  const points = chartData.map((val, i) => {
    const x = i * 10;
    const y = 60 - val;
    return [x, y];
  });

  const pathD = points.map((p, i) =>
    i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`
  ).join(" ");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // const response = await fetchUserGames();
        // const userGames = response.games.map((g: any) => ({ ... }))

        const userGames = mockGames;
        setGames(userGames);
      } catch (error) {
        console.error('❌ خطا در دریافت بازی‌ها:', error);
      }
    };

    if (location.state?.refresh || games.length === 0) {
      loadGames();
    }

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [location.state]);

  return (
    <div>
      <MainLayout />
      <div className={`${styles["dashboard-toolbar"]} px-4 py-3`}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className={styles["dashboard-title"]}>مدیریت بازی‌ها</h2>
          <div className={`${styles["dashboard-user"]} d-flex align-items-center gap-2`}>
            <span className={styles["user-avatar"]}>👤</span>
            <span className={styles["user-name"]}>{username} ▼</span>
          </div>
        </div>

        <div className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles["toolbar-bottom"]}`}>
          <span className={styles["filter-label"]}>لیست بازی‌ها</span>
          <div className="d-flex align-items-center gap-2">
            <button className={styles["download-kit-btn"]}>دانلود Starter Kit</button>
            <button className={styles["add-game-btn"]} onClick={() => navigate('/welcome')}>➕ افزودن بازی جدید</button>
          </div>
          <div className={`d-flex align-items-center gap-2 mx-auto ${styles["shifted-select"]}`}>
            {/* <select className={`${styles["filter-dropdown"]}`}>
              <option>Mobile only</option>
            </select>
            <select className={`${styles["filter-dropdown"]}`}>
              <option>Recently Used</option>
            </select> */}
          </div>
        </div>
      </div>

      <div className={`${styles["dashboard-container"]} px-4 py-4`}>
        <div className={`${styles["game-list"]} d-flex flex-column gap-4`}>
          {games.map((game) => (
            <div key={game.id} className={`${styles["game-card"]} d-flex justify-content-between align-items-center shadow-sm rounded`}>
              <div className={`${styles["game-section-info"]} d-flex align-items-start gap-3`}>
                <div className={styles["game-icon-wrapper"]}>
                  <img
                    src={game.icon}
                    alt={game.title}
                    className={styles["game-icon"]}
                    onClick={() => navigate(`/dashboard/${game.id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span className={styles["game-tag"]}>{game.platform}</span>
                </div>

                <div>
                  <h4
                    className={styles["game-title"]}
                    onClick={() => navigate(`/dashboard/${game.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {game.title}
                  </h4>
                  <p className={styles["game-description"]}>{game.description}</p>
                  <div className="d-flex gap-2 mt-2">
                    <span className={styles["game-meta-colored"]}>Created: 23 Nov 16</span>
                  </div>
                </div>
                <div className="ms-auto">
                  <img
                    src={dashboard_game_setting_icon}
                    alt="تنظیمات"
                    className={styles["game-settings-icon"]}
                  />
                </div>
              </div>

              <div className={styles["game-section-stats"]}>
                <div className={styles["user-stats-title"]}>کاربران فعال</div>
                <div className="d-flex justify-content-around align-items-end mt-2">
                  <div className="text-center">
                    <div className={styles["game-stat-label"]}>Monthly</div>
                    <strong className={styles["game-stat-value"]}>{game.dau}k</strong>
                  </div>
                  <div className="text-center">
                    <div className={styles["game-stat-label"]}>Daily</div>
                    <strong className={styles["game-stat-value"]}>{game.dnu}k</strong>
                  </div>
                </div>

                <div className={styles["stats-line-chart"]}>
                  <svg viewBox="0 0 320 60" preserveAspectRatio="none" className={styles["line-chart"]}>
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(125, 43, 171, 0.9)" />
                        <stop offset="25%" stopColor="rgba(197, 134, 255, 0.8)" />
                        <stop offset="50%" stopColor="rgba(125, 43, 171, 0.9)" />
                        <stop offset="75%" stopColor="rgba(197, 134, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(125, 43, 171, 0.9)" />
                      </linearGradient>
                    </defs>
                    <path
                      ref={pathRef}
                      d={pathD}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      className={styles["line-path"]}
                    />
                  </svg>
                </div>
              </div>

              <div className={styles["game-section-collaborators"]}>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span className={styles["collaborator-label"]}>همکاران</span>
                  <img
                    src={dashboard_add_collaborator_icon}
                    alt="افزودن همکار"
                    className={styles["add-collaborator-icon"]}
                  />
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {[...Array(6)].map((_, i) => {
                    const isOnline = Math.random() > 0.5;
                    return (
                      <div key={i} className={styles["collaborator-status-wrapper"]}>
                        <img src={dashboard_collaborator_wrapper_icon} alt="wrapper" className={styles["collaborator-wrapper-icon"]} />
                        <img src={dashboard_collaborator_icon} alt="user" className={styles["collaborator-icon"]} />
                        <span className={`${styles["status-indicator"]} ${isOnline ? styles["online"] : styles["offline"]}`}></span>
                      </div>
                    );
                  })}
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
