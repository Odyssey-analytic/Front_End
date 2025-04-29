import { useNavigate } from 'react-router-dom';
import { submitGameInfo } from '../../services/userService';

import './DashboardPage.css';
import { useEffect, useState } from 'react';
import MainLayout from '../MainLayout/MainLayout';

import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.png"
import tower_war_icon from "../../../public/icons/tower-war-icon.png"

const DashboardPage = () => {
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    setGames(mockGames);
  }, []);

  return (
      <div>
    <MainLayout></MainLayout>
    <div className="dashboard-container px-4 py-4">
      {/* هدر داشبورد */}
      <div className="dashboard-header d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">لیست بازی‌ها</h1>
        <button className="add-game-btn">افزودن محصول جدید</button>
      </div>
  
      {/* لیست بازی‌ها */}
      <div className="game-list d-flex flex-column gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="game-card d-flex justify-content-between align-items-start p-3 shadow-sm rounded bg-white"
          >


            <div className="game-summary d-flex flex-column align-items-end text-end">
                
                <div className="game-metrics d-flex gap-4 mt-2">
                  <div>
                    <strong>{game.dnu}</strong>
                    <br />
                    <span className="text-muted small">DNU</span>
                  </div>
                  <div>
                    <strong>{game.dau}</strong>
                    <br />
                    <span className="text-muted small">DAU</span>
                  </div>
                  <div>
                    <strong>{game.retention}</strong>
                    <br />
                    <span className="text-muted small">Retention</span>
                  </div>
                </div>

                <p className="game-description mb-2">{game.description}</p>

              </div>


            <div className="game-info text-end">

              <h4 className="game-title fw-semibold mb-0">{game.title}</h4>
              <img src={game.icon} alt={game.title} className="game-icon me-3" />
        
            </div>


          </div>
        ))}
      </div>
    </div>

  </div>

  );
};

export default DashboardPage;

const mockGames = [
  {
    id: 1,
    icon: pocket_champs_icon,
    title: 'Pocket Champs: 3D Racing Games',
    genre: 'Racing',
    description: 'این بازی یک بازی سه‌بعدی اکشن است که در آن با ارتقاء قهرمان خود در رقابت‌های سریع شرکت می‌کنید.',
    dnu: +14,
    dau: +1648,
    retention: '10.49%',
  },
  {
    id: 2,
    icon: tower_war_icon,
    title: 'Tower War - Tactical Conquest',
    genre: 'Strategy',
    description: 'این بازی یک بازی استراتژیک سریع است که در آن با تصرف برج‌ها مدیریت نیروها را به‌عهده می‌گیرید.',
    dnu: +14,
    dau: +1648,
    retention: '10.49%',
  },
];


