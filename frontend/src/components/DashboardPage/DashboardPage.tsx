

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardPage.module.css";

import OdessayLogo from "/public/icons/odessay_logo.svg";
import dashboard_collaborator_icon from "/public/icons/dashboard_collaborator_icon.svg";
import lists_icon from "../../../public/icons/clipboard 1.svg";
import dashboard_add_collaborator_icon from "../../../public/icons/add 1.svg";
import game_with_no_thumbnail_icon from "/public/icons/game_with_no_thumbnail_icon.svg";
import { FiSettings } from "react-icons/fi";

import { fetchUserGames } from "../../services/userService";

const DashboardPage = () => {
  // ---- Types ----
  type Collaborator = { name: string; online: boolean };

  type ApiGame = {
    id: string | number;
    name: string;
    thumbnail?: string | null;
    description?: string | null;
    dnu?: number | null;
    dau?: number | null;
    retention?: number | string | null;
    platform?: string[] | string | null;
    created_at?: string | null;
  };

  type Game = {
    id: string;
    icon: string;
    title: string;
    description: string;
    dnu: number;
    dau: number;
    retention: string;
    platform: string;
    collaborators: Collaborator[]; // اگر بعداً از API بیاد، اینجا پرش می‌کنیم
    createdAt?: string;
  };

  // ---- Utils ----
  const normalizeText = (s: string) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .normalize("NFKD");

  const percent = (v: number | string | null | undefined) => {
    if (v == null) return "0%";
    if (typeof v === "number") return `${v.toFixed(2)}%`;
    const t = String(v).trim();
    return t.endsWith("%") ? t : `${t}%`;
  };

  const nCompact = (n?: number | null) => {
    if (n == null || isNaN(Number(n))) return "0";
    const x = Math.abs(Number(n));
    if (x >= 1_000_000_000)
      return (x / 1_000_000_000).toFixed(x >= 10_000_000_000 ? 0 : 1) + "B";
    if (x >= 1_000_000)
      return (x / 1_000_000).toFixed(x >= 10_000_000 ? 0 : 1) + "M";
    if (x >= 1_000) return (x / 1_000).toFixed(x >= 10_000 ? 0 : 1) + "k";
    return String(x);
  };

  const fmtDate = (iso?: string | null) => {
    if (!iso) return undefined;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return undefined;
    return d.toLocaleDateString("fa-IR", {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    });
  };

  const mapApiToUi = (dto: ApiGame): Game => ({
    id: String(dto.id),
    icon: dto.thumbnail || game_with_no_thumbnail_icon,
    title: dto.name,
    description: dto.description || "توضیحی ثبت نشده است.",
    dnu: dto.dnu ?? 0,
    dau: dto.dau ?? 0,
    retention: percent(dto.retention),
    platform: Array.isArray(dto.platform)
      ? dto.platform.length
        ? dto.platform.join(", ")
        : "پلتفرم ثبت نشده"
      : dto.platform || "پلتفرم ثبت نشده",
    collaborators: [], // اگر API دارد، بعداً وصلش می‌کنیم
    createdAt: fmtDate(dto.created_at),
  });

  // ---- Hooks/State ----
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

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ---- Derived ----
  const filteredGames = useMemo(() => {
    const q = normalizeText(searchTerm);
    if (!q) return games;
    return games.filter((g) => normalizeText(g.title).includes(q));
  }, [games, searchTerm]);

  // ---- Data load (NO MOCK) ----
  const loadGames = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const payload = await fetchUserGames();
      const list: ApiGame[] = Array.isArray(payload)
        ? payload
        : (payload as any).games;
      if (!Array.isArray(list)) throw new Error("ساختار پاسخ API نامعتبر است.");
      setGames(list.map(mapApiToUi));
    } catch (err: any) {
      console.error("❌ خطا در دریافت بازی‌ها:", err);
      setErrorMsg(err?.message || "خطا در دریافت بازی‌ها");
      setGames([]); // هیچ داده‌ای نمایش نده
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") ?? "نام کاربری";
    setUsername(storedUsername);
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "نام کاربری");
    }
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
    loadGames();
  }, [loadGames]);

  // ---- Handlers ----
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

  // Keyboard for suggestions
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

  // Close suggestions on outside click
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

  // Lock scroll when bottom sheet open
  useEffect(() => {
    if (!openCollaboratorsFor) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    const loadGames = async () => {
      try {
        const response = await fetchUserGames();
        const userGames = response.games.map((g: any) => ({
          id: g.id,
          icon: g.thumbnail || game_with_no_thumbnail_icon,
          title: g.name,
          description: g.description || 'توضیحی ثبت نشده است.',
          dnu: g.dnu || 14,
          dau: g.dau || 1648,
          retention: g.retention || '10.49%',
          platform: g.platform?.join(', ') || 'پلتفرم ثبت نشده',
        }));
        const tempGame=response.games.map((g: any)=>({
          id: g.id,
          icon: g.thumbnail || game_with_no_thumbnail_icon,
          title: g.name,
        }))
        setNavigate_games(tempGame);
        localStorage.setItem('gamesList',JSON.stringify(tempGame));
        console.log(localStorage.getItem("gamesList"));
        setGames(userGames);
      } catch (error) {
        console.error('❌ خطا در دریافت بازی‌ها:', error);
      }
    };
  }, [openCollaboratorsFor]);

  // ESC to close bottom sheet
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpenCollaboratorsFor(null);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // --- Chart path (same as before) ---
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

  const currentGame = useMemo(
    () =>
      openCollaboratorsFor
        ? games.find((g) => g.id === openCollaboratorsFor) ?? null
        : null,
    [openCollaboratorsFor, games]
  );

  // ---- UI ----
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

          <div className={styles.searchBox} ref={searchBoxRef}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="جستجو..."
              value={searchTerm}
              onChange={handleSearch}
              disabled={loading || !!errorMsg || games.length === 0}
            />
            {suggestions.length > 0 && (
              <ul className={styles.searchSuggestions}>
                {suggestions.map((s, idx) => (
                  <li
                    key={s.id}
                    onMouseDown={() => {
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

      {/* حالات لودینگ / خطا / خالی */}
      {loading && (
        <div className={styles.stateBox}>
          <div className={styles.skeletonList}>
            {/* چند اسکلت ساده؛ یا از CSS Skeleton خودت استفاده کن */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.skeletonCard} />
            ))}
          </div>
        </div>
      )}

      {!loading && errorMsg && (
        <div className={styles.stateBox}>
          <p className={styles.errorText}>⚠️ {errorMsg}</p>
          <button className={styles.retryBtn} onClick={loadGames}>
            تلاش مجدد
          </button>
        </div>
      )}

      {!loading && !errorMsg && games.length === 0 && (
        <div className={styles.stateBox}>
          <p className={styles.emptyText}>هنوز بازی‌ای ثبت نشده است.</p>
          <button
            className={styles.addGameBtn}
            onClick={() => navigate("/welcome")}
          >
            افزودن بازی جدید
          </button>
        </div>
      )}

      {!loading && !errorMsg && games.length > 0 && (
        <div className={styles.gameList}>
          {filteredGames.map((game) => (
            <div key={game.id} className={`${styles.gameCard}`}>
              <div className={`${styles.gameSectionInfo}`}>
                <div className={styles.gameIconWrapper}>
                  <img
                    src={game.icon}
                    alt={game.title}
                    className={styles.gameIcon}
                    onClick={() => {
                        localStorage.setItem('game_name', game.title);
                        localStorage.setItem('Logo',game.icon)
                        navigate(`/dashboard/${game.id}`)
                    }}
                    style={{ cursor: "pointer" }}

                  />
                  <span className={styles.gameTag}>{game.platform}</span>
                </div>

                <div className={styles.gameTextContent}>
                  <h4
                    className={styles.gameTitle}
                     onClick={() => {
                      localStorage.setItem('game_name', game.title);
                      localStorage.setItem('Logo',game.icon)
                      navigate(`/dashboard/${game.id}`)
                  }}
                    style={{ cursor: "pointer" }}

                  >
                    {game.title}
                  </h4>
                  <p className={styles.gameDescription}>{game.description}</p>
                  <div>
                    <span className={styles.gameMetaColored}>
                      Created: {game.createdAt ?? "—"}
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
                    <strong className={styles.gameStatValue}>
                      {nCompact(game.dau)}
                    </strong>
                  </div>

                  <div className={styles.statItem}>
                    <div className={styles.gameStatLabel}>Daily</div>
                    <strong className={styles.gameStatValue}>
                      {nCompact(game.dnu)}
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
      )}

      {/* Bottom Sheet (mobile) */}
      {currentGame && (
        <div
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="collabSheetTitle"
          onClick={(e) => {
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
