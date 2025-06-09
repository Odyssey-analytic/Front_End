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

import { fetchUserGames } from "../../services/userService";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [games, setGames] = useState<any[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(320);
  const [username, setUsername] = useState<string>("user name");

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

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
    else {
      localStorage.setItem("username", "نام کاربری");
      setUsername("نام کاربری");
    }
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return;

      if (e.key === "PageDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === "PageUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        navigate(`/dashboard/${suggestions[selectedIndex].id}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, selectedIndex]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetchUserGames();
        const userGames = response.games.map((g: any) => ({
          id: g.id,
          icon: g.thumbnail || game_with_no_thumbnail_icon,
          title: g.name,
          description: g.description || "توضیحی ثبت نشده است.",
          dnu: g.dnu || 14,
          dau: g.dau || 1648,
          retention: g.retention || "10.49%",
          platform: g.platform?.join(", ") || "پلتفرم ثبت نشده",
        }));
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

        <div className={styles.mainLayoutHeaderSearchBox}>
          <input
            type="text"
            className={styles.mainLayoutHeaderSearchBoxInput}
            placeholder="جستجو..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {suggestions.length > 0 && (
            <div className={styles.searchDropdown}>
              {suggestions.map((game, index) => (
                <div
                  key={game.id}
                  className={`${styles.searchSuggestionItem} ${
                    index === selectedIndex ? styles.activeSuggestion : ""
                  }`}
                  onClick={() => navigate(`/dashboard/${game.id}`)}
                >
                  <img
                    src={game.icon}
                    alt={game.title}
                    className={styles.searchSuggestionIcon}
                  />
                  <div className={styles.searchSuggestionText}>
                    <div className={styles.searchSuggestionTitle}>
                      {game.title}
                    </div>
                    <div className={styles.searchSuggestionDescription}>
                      {game.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
              افزودن بازی جدید
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
