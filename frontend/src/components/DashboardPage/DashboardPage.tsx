import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./DashboardPage.module.css";

import OdessayLogo from "/public/icons/odessay_logo.svg";
import welcome_subheader_user from "/public/icons/welcome_subheader_user.svg";
import welcome_subheader_menu from "/public/icons/welcome_subheader_menu.svg";
import welcome_header_help from "/public/icons/welcome_header_help.svg";

import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.svg";
import tower_war_icon from "../../../public/icons/tower-war-icon.svg";
import dashboard_collaborator_icon from "../../../public/icons/dashboard_collaborator_icon.svg";
import dashboard_collaborator_wrapper_icon from "../../../public/icons/dashboard_collaborator_wrapper_icon.svg";
import dashboard_add_collaborator_icon from "../../../public/icons/dashboard_add_collaborator_icon.svg";
import dashboard_game_setting_icon from "../../../public/icons/dashboard_game_setting_icon.svg";
import game_with_no_thumbnail_icon from "../../../public/icons/game_with_no_thumbnail_icon.svg";

const mockGames = [
  // بازی‌های با حرف "پ"
  {
    id: "game1",
    icon: pocket_champs_icon,
    title: "پاکت چمپس",
    description: "بازی استراتژیک با قابلیت چندنفره.",
    dnu: 35,
    dau: 1200,
    retention: "12.5%",
    platform: "Android, iOS",
  },
  {
    id: "game2",
    icon: pocket_champs_icon,
    title: "پرش خفن",
    description: "بازی پرشی با مراحل جذاب.",
    dnu: 15,
    dau: 400,
    retention: "10%",
    platform: "Android",
  },
  {
    id: "game3",
    icon: pocket_champs_icon,
    title: "پازل کده",
    description: "حل معماهای تصویری.",
    dnu: 18,
    dau: 520,
    retention: "11%",
    platform: "iOS",
  },
  {
    id: "game4",
    icon: pocket_champs_icon,
    title: "پادشاه نبرد",
    description: "بازی نبرد تن‌به‌تن آنلاین.",
    dnu: 28,
    dau: 800,
    retention: "13%",
    platform: "Web",
  },
  {
    id: "game5",
    icon: pocket_champs_icon,
    title: "پینگ پونگ",
    description: "شبیه‌ساز پینگ پونگ حرفه‌ای.",
    dnu: 10,
    dau: 200,
    retention: "7%",
    platform: "Android",
  },

  // بازی‌های با حرف "ت"
  {
    id: "game6",
    icon: tower_war_icon,
    title: "تاور وار",
    description: "دفاع از قلعه در برابر هیولاها.",
    dnu: 20,
    dau: 800,
    retention: "9.3%",
    platform: "Android",
  },
  {
    id: "game7",
    icon: tower_war_icon,
    title: "تمرکز سریع",
    description: "بازی تقویت تمرکز و دقت.",
    dnu: 17,
    dau: 600,
    retention: "8.2%",
    platform: "Android",
  },
  {
    id: "game8",
    icon: tower_war_icon,
    title: "تفنگی‌ها",
    description: "نبرد با سلاح‌های متنوع.",
    dnu: 30,
    dau: 1100,
    retention: "12.1%",
    platform: "iOS",
  },
  {
    id: "game9",
    icon: tower_war_icon,
    title: "تخته نرد آنلاین",
    description: "بازی تخته نرد با رقیب واقعی.",
    dnu: 14,
    dau: 500,
    retention: "9.5%",
    platform: "Web",
  },
  {
    id: "game10",
    icon: tower_war_icon,
    title: "تست واکنش",
    description: "بازی ساده برای تست واکنش سریع.",
    dnu: 9,
    dau: 300,
    retention: "6.9%",
    platform: "Android",
  },

  // بازی‌های با حرف "ب"
  {
    id: "game11",
    icon: game_with_no_thumbnail_icon,
    title: "بدون تصویر",
    description: "بازی تستی بدون آیکون مشخص.",
    dnu: 12,
    dau: 400,
    retention: "7.1%",
    platform: "Web",
  },
  {
    id: "game12",
    icon: game_with_no_thumbnail_icon,
    title: "بسکتبال خیابانی",
    description: "بازی مسابقه‌ای بسکتبال.",
    dnu: 22,
    dau: 650,
    retention: "10.1%",
    platform: "Android",
  },
  {
    id: "game13",
    icon: game_with_no_thumbnail_icon,
    title: "برج کلمات",
    description: "حل کلمات پنهان در جدول‌ها.",
    dnu: 19,
    dau: 700,
    retention: "9.9%",
    platform: "iOS",
  },
  {
    id: "game14",
    icon: game_with_no_thumbnail_icon,
    title: "بمب‌گذاری حرفه‌ای",
    description: "بازی مهارتی و زمان‌بندی بمب‌ها.",
    dnu: 13,
    dau: 350,
    retention: "7.8%",
    platform: "Web",
  },
  {
    id: "game15",
    icon: game_with_no_thumbnail_icon,
    title: "بازی بی‌پایان",
    description: "بازی آرکید بی‌انتها.",
    dnu: 25,
    dau: 900,
    retention: "11.2%",
    platform: "Android, iOS",
  },

  // بازی‌های با حرف "ن"
  {
    id: "game16",
    icon: tower_war_icon,
    title: "نبرد تاریکی",
    description: "بازی فانتزی با داستان عمیق.",
    dnu: 16,
    dau: 470,
    retention: "8%",
    platform: "Android",
  },
  {
    id: "game17",
    icon: tower_war_icon,
    title: "نجات حیوانات",
    description: "بازی ماجراجویی و کمک به حیوانات.",
    dnu: 14,
    dau: 380,
    retention: "8.3%",
    platform: "iOS",
  },
  {
    id: "game18",
    icon: tower_war_icon,
    title: "نابغه شو",
    description: "سری سوالات تست هوش.",
    dnu: 20,
    dau: 500,
    retention: "10%",
    platform: "Web",
  },
  {
    id: "game19",
    icon: tower_war_icon,
    title: "نقاشی کن",
    description: "یادگیری نقاشی با مراحل مختلف.",
    dnu: 18,
    dau: 430,
    retention: "9.7%",
    platform: "Android",
  },
  {
    id: "game20",
    icon: tower_war_icon,
    title: "نیروهای ویژه",
    description: "بازی اکشن با گروه ویژه.",
    dnu: 26,
    dau: 850,
    retention: "11.5%",
    platform: "iOS",
  },

  // بازی‌های با حرف "د"
  {
    id: "game21",
    icon: tower_war_icon,
    title: "دژ مستحکم",
    description: "ساخت و دفاع از دژ.",
    dnu: 19,
    dau: 710,
    retention: "10.4%",
    platform: "Android",
  },
  {
    id: "game22",
    icon: tower_war_icon,
    title: "دویدن تا ابد",
    description: "بازی دونده‌ی بی‌پایان.",
    dnu: 30,
    dau: 1000,
    retention: "12%",
    platform: "Android, iOS",
  },
  {
    id: "game23",
    icon: tower_war_icon,
    title: "دست خالی",
    description: "بازی بقا در جهان بدون منابع.",
    dnu: 11,
    dau: 300,
    retention: "6.8%",
    platform: "Web",
  },
  {
    id: "game24",
    icon: tower_war_icon,
    title: "دکتر سریع",
    description: "شبیه‌ساز اورژانس پزشکی.",
    dnu: 17,
    dau: 560,
    retention: "9.2%",
    platform: "Android",
  },
  {
    id: "game25",
    icon: tower_war_icon,
    title: "دقت بالا",
    description: "تمرین تیراندازی دقیق.",
    dnu: 21,
    dau: 780,
    retention: "10.6%",
    platform: "iOS",
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [games, setGames] = useState<any[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(320);
  const [username, setUsername] = useState<string>("user name");

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const chartData = Array.from(
    { length: 32 },
    () => Math.floor(Math.random() * 50) + 10
  );

  const points = chartData.map((val, i) => {
    const x = i * 10;
    const y = 60 - val;
    return [x, y];
  });

  const pathD = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = games.filter((game) =>
      game.title.startsWith(value.trim())
    );
    setSuggestions(filtered);
  };

  useEffect(() => {
    const loadGames = async () => {
      try {
        const userGames = mockGames;
        setGames(userGames);
      } catch (error) {
        console.error("❌ خطا در دریافت بازی‌ها:", error);
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
      <div className="main-layout-header">
        <img
          src={welcome_header_help}
          alt="Help"
          className="main-layout-header-help-icon"
        />

        <div className="main-layout-header-search-box">
          <input
            type="text"
            className="main-layout-header-search-box-input"
            placeholder="جستجو..."
            value={searchTerm}
            onChange={handleSearch}
          />

          {suggestions.length > 0 && (
<ul className={styles.searchDropdown}>
  {suggestions.map((game) => (
    <li
      key={game.id}
      onClick={() => navigate(`/dashboard/${game.id}`)}
      className={styles.searchSuggestionItem}
    >
      <img src={game.icon} alt={game.title} className={styles.searchSuggestionIcon} />
      <div className={styles.searchSuggestionText}>
        <div className={styles.searchSuggestionTitle}>{game.title}</div>
        <div className={styles.searchSuggestionDescription}>{game.description}</div>
      </div>
    </li>
  ))}
</ul>

          )}
        </div>

        <div className="main-layout-header-brand">
          <span className="main-layout-brand-text english-text">ODESSAY</span>
          <img
            src={OdessayLogo}
            alt="Odessay Logo"
            className="main-layout-logo-img ms-2"
          />
        </div>
      </div>

       <div className={`${styles.dashboardToolbar} px-4 py-3`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className={styles.dashboardTitle}>مدیریت بازی‌ها</h2>
          <div
            className={`d-flex align-items-center gap-2 ${styles.dashboardUser}`}
          >
            <span className={styles.userAvatar}>👤</span>
            <span className={styles.userName}>{username} ▼</span>
          </div>
        </div>

      <div
          className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles.toolbarBottom}`}
        >
          <span className={styles.filterLabel}>لیست بازی‌ها</span>
          <div className="d-flex align-items-center gap-2">
            <a
              href="https://github.com/Odyssey-analytic/SDK"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadKitBtn}
            >
              دانلود Starter Kit
            </a>
            <button
              className={styles.addGameBtn}
              onClick={() => navigate("/welcome")}
            >
              ➕ افزودن بازی جدید
            </button>
          </div>
          <div
            className={`d-flex align-items-center gap-2 mx-auto ${styles.shiftedSelect}`}
          ></div>
        </div>
      </div>


      <div className={`${styles.dashboardContainer} px-4 py-4`}>
        <div className={`${styles.gameList} d-flex flex-column gap-4`}>
          {games.map((game) => (
            <div
              key={game.id}
              className={`${styles.gameCard} d-flex justify-content-between align-items-center shadow-sm rounded`}
            >
              <div
                className={`${styles.gameSectionInfo} d-flex align-items-start gap-3`}
              >
                <div className={styles.gameIconWrapper}>
                  <img
                    src={game.icon}
                    alt={game.title}
                    className={styles.gameIcon}
                    onClick={() => navigate(`/dashboard/${game.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <span className={styles.gameTag}>{game.platform}</span>
                </div>

                <div>
                  <h4
                    className={styles.gameTitle}
                    onClick={() => navigate(`/dashboard/${game.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {game.title}
                  </h4>
                  <p className={styles.gameDescription}>{game.description}</p>
                  <div className="d-flex gap-2 mt-2">
                    <span className={styles.gameMetaColored}>
                      Created: 23 Nov 16
                    </span>
                  </div>
                </div>
                <div className="ms-auto">
                  <img
                    src={dashboard_game_setting_icon}
                    alt="تنظیمات"
                    className={styles.gameSettingsIcon}
                  />
                </div>
              </div>

              <div className={styles.gameSectionStats}>
                <div className={styles.userStatsTitle}>کاربران فعال</div>
                <div className="d-flex justify-content-around align-items-end mt-2">
                  <div className="text-center">
                    <div className={styles.gameStatLabel}>Monthly</div>
                    <strong className={styles.gameStatValue}>
                      {game.dau}k
                    </strong>
                  </div>
                  <div className="text-center">
                    <div className={styles.gameStatLabel}>Daily</div>
                    <strong className={styles.gameStatValue}>
                      {game.dnu}k
                    </strong>
                  </div>
                </div>

                <div className={styles.statsLineChart}>
                  <svg
                    viewBox="0 0 320 60"
                    preserveAspectRatio="none"
                    className={styles.lineChart}
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="rgba(125, 43, 171, 0.9)" />
                        <stop
                          offset="25%"
                          stopColor="rgba(197, 134, 255, 0.8)"
                        />
                        <stop
                          offset="50%"
                          stopColor="rgba(125, 43, 171, 0.9)"
                        />
                        <stop
                          offset="75%"
                          stopColor="rgba(197, 134, 255, 0.8)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(125, 43, 171, 0.9)"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      ref={pathRef}
                      d={pathD}
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                      className={styles.linePath}
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.gameSectionCollaborators}>
                <div className="d-flex align-items-center justify-content-between w-100">
                  <span className={styles.collaboratorLabel}>همکاران</span>
                  <img
                    src={dashboard_add_collaborator_icon}
                    alt="افزودن همکار"
                    className={styles.addCollaboratorIcon}
                  />
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {[...Array(6)].map((_, i) => {
                    const isOnline = Math.random() > 0.5;
                    return (
                      <div key={i} className={styles.collaboratorStatusWrapper}>
                        <img
                          src={dashboard_collaborator_wrapper_icon}
                          alt="wrapper"
                          className={styles.collaboratorWrapperIcon}
                        />
                        <img
                          src={dashboard_collaborator_icon}
                          alt="user"
                          className={styles.collaboratorIcon}
                        />
                        <span
                          className={`${styles.statusIndicator} ${
                            isOnline ? styles.online : styles.offline
                          }`}
                        ></span>
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