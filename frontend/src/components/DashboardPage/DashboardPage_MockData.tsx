// The new version of styles with only Mock Data

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardPage.module.css";

import OdessayLogo from "/public/icons/odessay_logo.svg";
import pocket_champs_icon from "/public/icons/pocket-champs-icon.svg";
import tower_war_icon from "/public/icons/tower-war-icon.svg";
import dashboard_collaborator_icon from "/public/icons/dashboard_collaborator_icon.svg";
import lists_icon from "../../../public/icons/clipboard 1.svg";

import dashboard_add_collaborator_icon from "../../../public/icons/add 1.svg";

import game_with_no_thumbnail_icon from "/public/icons/game_with_no_thumbnail_icon.svg";
import { FiSettings } from "react-icons/fi";

// ✅ داده‌های ماک برای تست
const mockGames = [
  {
    id: "mock-1",
    icon: pocket_champs_icon,
    title: "Pocket Champs",
    description: "یک بازی اکشن سریع برای موبایل",
    dnu: 32,
    dau: 1220,
    retention: "15.7%",
    platform: "IOS",
    collaborators: [
      { name: "علی رضایی", online: true },
      { name: "نگار موسوی", online: false },
      { name: "سینا کاظمی", online: true },
      { name: "پارسا شریفی", online: false },
    ],
  },
  {
    id: "mock-2",
    icon: tower_war_icon,
    title: "Tower War",
    description: "نبردی تاکتیکی میان برج‌ها!",
    dnu: 18,
    dau: 960,
    retention: "12.4%",
    platform: "Android",
    collaborators: [
      { name: "علی رضایی", online: true },
      { name: "نگار موسوی", online: false },
      { name: "سینا کاظمی", online: true },
      { name: "پارسا شریفی", online: false },
    ],
  },
  {
    id: "mock-3",
    icon: game_with_no_thumbnail_icon,
    title: "Shadow Game",
    description: "تست بازی بدون تصویر اختصاصی",
    dnu: 9,
    dau: 300,
    retention: "9.1%",
    platform: "PC",
    collaborators: [
      { name: "علی رضایی", online: true },
      { name: "نگار موسوی", online: false },
      { name: "سینا کاظمی", online: true },
      { name: "پارسا شریفی", online: false },
    ],
  },
];

const DashboardPage = () => {
  // --- types ----------------------------------------------------
  type Collaborator = { name: string; online: boolean };
  type Game = {
    id: string;
    icon: string;
    title: string;
    description: string;
    dnu: number;
    dau: number;
    retention: string;
    platform: "IOS" | "Android" | "PC";
    collaborators: Collaborator[];
  };

  // --- utils ----------------------------------------------------
  const normalizeText = (s: string) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .normalize("NFKD");

  // --- hooks/state ----------------------------------------------
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement | null>(null);
  const searchBoxRef = useRef<HTMLDivElement | null>(null);

  const [games, setGames] = useState<Game[]>([]);
  const [username, setUsername] = useState("نام کاربری");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [pathLength, setPathLength] = useState(320);

  const [openCollaboratorsFor, setOpenCollaboratorsFor] = useState<
    string | null
  >(null);

  // --- derived data ---------------------------------------------
  const filteredGames = useMemo(() => {
    const q = normalizeText(searchTerm);
    if (!q) return games;
    return games.filter((g) => normalizeText(g.title).includes(q));
  }, [games, searchTerm]);

  // داده و نام کاربری + طول path
  useEffect(() => {
    setGames(mockGames as unknown as Game[]);

    const storedUsername = localStorage.getItem("username") ?? "نام کاربری";
    setUsername(storedUsername);
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "نام کاربری");
    }

    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  // --- handlers -------------------------------------------------
  const toggleCollaborators = useCallback((gameId: string) => {
    setOpenCollaboratorsFor((prev) => (prev === gameId ? null : gameId));
  }, []);

  const handleSelectSuggestion = useCallback(
    (gameId: string) => {
      navigate(`/dashboard/${gameId}`);
      setSuggestions([]);
      setSelectedIndex(-1);
    },
    [navigate]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      const q = normalizeText(value);
      if (!q) {
        setSuggestions([]);
        setSelectedIndex(-1);
        return;
      }
      const matched = games.filter((g) => normalizeText(g.title).includes(q));
      setSuggestions(matched.slice(0, 8));
      setSelectedIndex(matched.length ? 0 : -1);
    },
    [games]
  );

  // یک افکت واحد برای کلیدها (ArrowUp/Down/Enter/Escape)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[selectedIndex].id);
      } else if (e.key === "Escape") {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [suggestions, selectedIndex, handleSelectSuggestion]);

  // بستن ساجست با کلیک بیرون
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (searchBoxRef.current && !searchBoxRef.current.contains(t)) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  // قفل اسکرول هنگام باز بودن Bottom Sheet
  useEffect(() => {
    if (!openCollaboratorsFor) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openCollaboratorsFor]);

  // بستن Bottom Sheet با ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenCollaboratorsFor(null);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // --- chart path (سازمان‌دهی به محاسبات نمودار) ----------------
  const { pathD } = useMemo(() => {
    const chartData = Array.from(
      { length: 32 },
      () => Math.floor(Math.random() * 50) + 10
    );
    const points = chartData.map((val, i) => [i * 10, 60 - val] as const);
    return {
      pathD: points
        .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
        .join(" "),
    };
  }, []);

  // --- convenience ----------------------------------------------
  const currentGame = useMemo(
    () =>
      openCollaboratorsFor
        ? games.find((g) => g.id === openCollaboratorsFor) ?? null
        : null,
    [openCollaboratorsFor, games]
  );

  return (
    <div className={`${styles.dashboardContainer}`}>
      <div className={styles.header}>
        <div className={`${styles.toolbarTop}`}>
          <div className={styles.headerBrand}>
            <img
              src={OdessayLogo}
              alt="Odessay Logo"
              className={`${styles.logoImg} ms-2`}
            />
            <span className={`${styles.brandText} english-text`}>ODESSAY</span>
          </div>

          <div className={styles.searchBox}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="جستجو..."
              value={searchTerm}
              onChange={handleSearch}
            />

            {suggestions.length > 0 && (
              <ul className={styles.searchSuggestions}>
                {suggestions.map((s, idx) => (
                  <li
                    key={s.id}
                    onMouseDown={() => {
                      // onMouseDown تا blur نشه قبل از navigate
                      navigate(`/dashboard/${s.id}`);
                      setSuggestions([]);
                    }}
                    className={
                      idx === selectedIndex
                        ? `${styles.suggestionItem} ${styles.active}`
                        : styles.suggestionItem
                    }
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
          <h2 className={styles.dashboardTitle}>مدیریت بازی‌ها</h2>
          <div className={styles.dashboardUser}>
            <div
              className={`d-flex align-items-center gap-2 ${styles.dashboardUserbox}`}
            >
              <span className={styles.userAvatar}>👤</span>
              <span className={styles.userName}>{username} ▼</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gameListtop}>
        <div
          className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles.toolbarBottom}`}
        >
          <div className="d-flex align-items-center gap-2">
            <img src={lists_icon} className={`${styles.lists_icon} ms-2`} />
            <span className={styles.filterLabel}>لیست بازی‌ها</span>
          </div>
          <div className={styles.dashboardBtns}>
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
        </div>
      </div>

      <div className={styles.gameList}>
        {filteredGames.map((game) => (
          <div key={game.id} className={`${styles.gameCard}`}>
            <div className={`${styles.gameSectionInfo}`}>
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

              <div className={styles.gameTextContent}>
                <h4
                  className={styles.gameTitle}
                  onClick={() => navigate(`/dashboard/${game.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {game.title}
                </h4>
                <p className={styles.gameDescription}>{game.description}</p>
                <div>
                  <span className={styles.gameMetaColored}>
                    Created: 23 Nov 16
                  </span>
                </div>
              </div>
              <FiSettings className={styles.gameSettingsIcon} />
            </div>

            <div className={styles.FirstverticalLine}></div>

            <div className={styles.gameSectionStats}>
              <div className={styles.userStatsTitle}>کاربران فعال</div>
              <div className={styles.statRow}>
                <div className={styles.statItem}>
                  <div className={styles.gameStatLabel}>Monthly</div>
                  <strong className={styles.gameStatValue}>{game.dau}k</strong>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.gameStatLabel}>Daily</div>
                  <strong className={styles.gameStatValue}>{game.dnu}k</strong>
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
                      <stop offset="0%" stopColor="rgb(43, 40, 132)" />
                      <stop offset="25%" stopColor="rgb(94, 135, 171)" />
                      <stop offset="50%" stopColor="#425398" />
                      <stop offset="75%" stopColor="rgb(87, 85, 161)" />
                      <stop offset="100%" stopColor="#5570a1" />
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

            <div className={styles.SecondverticalLine}></div>

            <div className={styles.gameSectionCollaborators}>
              <div>
                <span className={styles.collaboratorLabel}>همکاران</span>
                <img
                  src={dashboard_add_collaborator_icon}
                  alt="افزودن همکار"
                  className={styles.addCollaboratorIcon}
                />
              </div>

              {/* دسکتاپ: نمایش آیکون‌ها (مثل قبل) */}
              <div className={styles.collaboratorsDesktop}>
                {(game.collaborators ?? [])
                  .slice(0, 4)
                  .map((c: any, i: number) => (
                    <div key={i} className={styles.collaboratorStatusWrapper}>
                      <div className={styles.collaboratorWrapperIcon}>
                        <img
                          src={dashboard_collaborator_icon}
                          alt={c.name}
                          title={c.name}
                          className={styles.collaboratorIcon}
                        />
                        <span
                          className={`${styles.statusIndicator} ${
                            c.online ? styles.online : styles.offline
                          }`}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* موبایل: فقط دکمهٔ باز کردن باکس مجزا */}
              <button
                type="button"
                className={styles.collaboratorsToggleBtn}
                onClick={() => toggleCollaborators(game.id)}
                aria-expanded={openCollaboratorsFor === game.id}
              >
                لیست اسامی
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
          Bottom Sheet / Modal (فقط موبایل)
          ========================= */}
      {currentGame && (
        <div
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="collabSheetTitle"
          onClick={(e) => {
            // کلیک روی بک‌دراپ ببنده
            if (e.target === e.currentTarget) setOpenCollaboratorsFor(null);
          }}
        >
          <div className={styles.mobileSheet}>
            <div className={styles.mobileSheetHeader}>
              <h3 id="collabSheetTitle" className={styles.mobileSheetTitle}>
                همکاران: {currentGame.title}
              </h3>
              <button
                className={styles.mobileSheetClose}
                onClick={() => setOpenCollaboratorsFor(null)}
                aria-label="بستن"
              >
                ✕
              </button>
            </div>

            <div className={styles.mobileSheetBody}>
              {(currentGame.collaborators ?? []).map((c: any, i: number) => (
                <div key={i} className={styles.collaboratorNameRowMobile}>
                  <span className={styles.name}>{c.name}</span>
                  <span
                    className={`${styles.dot} ${
                      c.online ? styles.online : styles.offline
                    }`}
                    aria-label={c.online ? "آنلاین" : "آفلاین"}
                    title={c.online ? "آنلاین" : "آفلاین"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
