// import { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import styles from "./DashboardPage.module.css";

// import MainLayout from "../MainLayout/MainLayout";

// import OdessayLogo from "/public/icons/odessay_logo.svg";
// import welcome_subheader_user from "/public/icons/welcome_subheader_user.svg";
// import welcome_subheader_menu from "/public/icons/welcome_subheader_menu.svg";
// import welcome_header_help from "/public/icons/welcome_header_help.svg";

// import pocket_champs_icon from "../../../public/icons/pocket-champs-icon.svg";
// import tower_war_icon from "../../../public/icons/tower-war-icon.svg";
// import dashboard_collaborator_icon from "../../../public/icons/dashboard_collaborator_icon.svg";
// import dashboard_collaborator_wrapper_icon from "../../../public/icons/dashboard_collaborator_wrapper_icon.svg";
// import dashboard_add_collaborator_icon from "../../../public/icons/dashboard_add_collaborator_icon.svg";
// import dashboard_game_setting_icon from "../../../public/icons/dashboard_game_setting_icon.svg";
// import game_with_no_thumbnail_icon from "../../../public/icons/game_with_no_thumbnail_icon.svg";

// import { fetchUserGames } from "../../services/userService";

// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [games, setGames] = useState<any[]>([]);
//   const pathRef = useRef<SVGPathElement | null>(null);
//   const [pathLength, setPathLength] = useState(320);
//   const [username, setUsername] = useState<string>("user name");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [selectedIndex, setSelectedIndex] = useState<number>(-1);

//   const chartData = Array.from(
//     { length: 32 },
//     () => Math.floor(Math.random() * 50) + 10
//   );

//   const points = chartData.map((val, i) => {
//     const x = i * 10;
//     const y = 60 - val;
//     return [x, y];
//   });

//   const pathD = points
//     .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
//     .join(" ");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) setUsername(storedUsername);
//     else {
//       localStorage.setItem("username", "نام کاربری");
//       setUsername("نام کاربری");
//     }
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     const filtered = games.filter((game) =>
//       game.title.startsWith(value.trim())
//     );
//     setSuggestions(filtered);
//   };

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (suggestions.length === 0) return;

//       if (e.key === "PageDown") {
//         e.preventDefault();
//         setSelectedIndex((prev) => (prev + 1) % suggestions.length);
//       } else if (e.key === "PageUp") {
//         e.preventDefault();
//         setSelectedIndex((prev) =>
//           prev <= 0 ? suggestions.length - 1 : prev - 1
//         );
//       } else if (e.key === "Enter" && selectedIndex !== -1) {
//         navigate(`/dashboard/${suggestions[selectedIndex].id}`);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [suggestions, selectedIndex]);

//   useEffect(() => {
//     const loadGames = async () => {
//       try {
//         const response = await fetchUserGames();
//         const userGames = response.games.map((g: any) => ({
//           id: g.id,
//           icon: g.thumbnail || game_with_no_thumbnail_icon,
//           title: g.name,
//           description: g.description || "توضیحی ثبت نشده است.",
//           dnu: g.dnu || 14,
//           dau: g.dau || 1648,
//           retention: g.retention || "10.49%",
//           platform: g.platform?.join(", ") || "پلتفرم ثبت نشده",
//         }));
//         setGames(userGames);
//       } catch (error) {
//         console.error("❌ خطا در دریافت بازی‌ها:", error);
//       }
//     };

//     if (location.state?.refresh || games.length === 0) {
//       loadGames();
//     }

//     if (pathRef.current) {
//       const length = pathRef.current.getTotalLength();
//       setPathLength(length);
//     }
//   }, [location.state]);

//   return (
//     <div>
//       <MainLayout></MainLayout>
//       {/* <div className="main-layout-header">
//         <img
//           src={welcome_header_help}
//           alt="Help"
//           className="main-layout-header-help-icon"
//         />

//         <div className={styles.mainLayoutHeaderSearchBox}>
//           <input
//             type="text"
//             className={styles.mainLayoutHeaderSearchBoxInput}
//             placeholder="جستجو..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           {suggestions.length > 0 && (
//             <div className={styles.searchDropdown}>
//               {suggestions.map((game, index) => (
//                 <div
//                   key={game.id}
//                   className={`${styles.searchSuggestionItem} ${
//                     index === selectedIndex ? styles.activeSuggestion : ""
//                   }`}
//                   onClick={() => navigate(`/dashboard/${game.id}`)}
//                 >
//                   <img
//                     src={game.icon}
//                     alt={game.title}
//                     className={styles.searchSuggestionIcon}
//                   />
//                   <div className={styles.searchSuggestionText}>
//                     <div className={styles.searchSuggestionTitle}>
//                       {game.title}
//                     </div>
//                     <div className={styles.searchSuggestionDescription}>
//                       {game.description}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="main-layout-header-brand">
//           <span className="main-layout-brand-text english-text">ODESSAY</span>
//           <img
//             src={OdessayLogo}
//             alt="Odessay Logo"
//             className="main-layout-logo-img ms-2"
//           />
//         </div>
//       </div> */}

//       <div className={`${styles.dashboardToolbar} px-4 py-3`}>
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h2 className={styles.dashboardTitle}>مدیریت بازی‌ها</h2>
//           <div
//             className={`d-flex align-items-center gap-2 ${styles.dashboardUser}`}
//           >
//             <span className={styles.userAvatar}>👤</span>
//             <span className={styles.userName}>{username} ▼</span>
//           </div>
//         </div>

//         <div
//           className={`d-flex justify-content-between align-items-center flex-wrap gap-3 ${styles.toolbarBottom}`}
//         >
//           <span className={styles.filterLabel}>لیست بازی‌ها</span>
//           <div className="d-flex align-items-center gap-2">
//             <a
//               href="https://github.com/Odyssey-analytic/SDK"
//               target="_blank"
//               rel="noopener noreferrer"
//               className={styles.downloadKitBtn}
//             >
//               دانلود Starter Kit
//             </a>
//             <button
//               className={styles.addGameBtn}
//               onClick={() => navigate("/welcome")}
//             >
//               افزودن بازی جدید
//             </button>
//           </div>
//           <div
//             className={`d-flex align-items-center gap-2 mx-auto ${styles.shiftedSelect}`}
//           ></div>
//         </div>
//       </div>

//       <div className={`${styles.dashboardContainer} px-4 py-4`}>
//         <div className={`${styles.gameList} d-flex flex-column gap-4`}>
//           {games.map((game) => (
//             <div
//               key={game.id}
//               className={`${styles.gameCard} d-flex justify-content-between align-items-center shadow-sm rounded`}
//             >
//               <div
//                 className={`${styles.gameSectionInfo} d-flex align-items-start gap-3`}
//               >
//                 <div className={styles.gameIconWrapper}>
//                   <img
//                     src={game.icon}
//                     alt={game.title}
//                     className={styles.gameIcon}
//                     onClick={() => navigate(`/dashboard/${game.id}`)}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <span className={styles.gameTag}>{game.platform}</span>
//                 </div>

//                 <div>
//                   <h4
//                     className={styles.gameTitle}
//                     onClick={() => navigate(`/dashboard/${game.id}`)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {game.title}
//                   </h4>
//                   <p className={styles.gameDescription}>{game.description}</p>
//                   <div className="d-flex gap-2 mt-2">
//                     <span className={styles.gameMetaColored}>
//                       Created: 23 Nov 16
//                     </span>
//                   </div>
//                 </div>
//                 <div className="ms-auto">
//                   <img
//                     src={dashboard_game_setting_icon}
//                     alt="تنظیمات"
//                     className={styles.gameSettingsIcon}
//                   />
//                 </div>
//               </div>

//               <div className={styles.gameSectionStats}>
//                 <div className={styles.userStatsTitle}>کاربران فعال</div>
//                 <div className="d-flex justify-content-around align-items-end mt-2">
//                   <div className="text-center">
//                     <div className={styles.gameStatLabel}>Monthly</div>
//                     <strong className={styles.gameStatValue}>
//                       {game.dau}k
//                     </strong>
//                   </div>
//                   <div className="text-center">
//                     <div className={styles.gameStatLabel}>Daily</div>
//                     <strong className={styles.gameStatValue}>
//                       {game.dnu}k
//                     </strong>
//                   </div>
//                 </div>

//                 <div className={styles.statsLineChart}>
//                   <svg
//                     viewBox="0 0 320 60"
//                     preserveAspectRatio="none"
//                     className={styles.lineChart}
//                   >
//                     <defs>
//                       <linearGradient
//                         id="lineGradient"
//                         x1="0%"
//                         y1="0%"
//                         x2="100%"
//                         y2="0%"
//                       >
//                         <stop offset="0%" stopColor="rgba(125, 43, 171, 0.9)" />
//                         <stop
//                           offset="25%"
//                           stopColor="rgba(197, 134, 255, 0.8)"
//                         />
//                         <stop
//                           offset="50%"
//                           stopColor="rgba(125, 43, 171, 0.9)"
//                         />
//                         <stop
//                           offset="75%"
//                           stopColor="rgba(197, 134, 255, 0.8)"
//                         />
//                         <stop
//                           offset="100%"
//                           stopColor="rgba(125, 43, 171, 0.9)"
//                         />
//                       </linearGradient>
//                     </defs>
//                     <path
//                       ref={pathRef}
//                       d={pathD}
//                       fill="none"
//                       stroke="url(#lineGradient)"
//                       strokeWidth="2"
//                       className={styles.linePath}
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <div className={styles.gameSectionCollaborators}>
//                 <div className="d-flex align-items-center justify-content-between w-100">
//                   <span className={styles.collaboratorLabel}>همکاران</span>
//                   <img
//                     src={dashboard_add_collaborator_icon}
//                     alt="افزودن همکار"
//                     className={styles.addCollaboratorIcon}
//                   />
//                 </div>
//                 <div className="d-flex flex-wrap gap-2 mt-2">
//                   {[...Array(6)].map((_, i) => {
//                     const isOnline = Math.random() > 0.5;
//                     return (
//                       <div key={i} className={styles.collaboratorStatusWrapper}>
//                         <img
//                           src={dashboard_collaborator_wrapper_icon}
//                           alt="wrapper"
//                           className={styles.collaboratorWrapperIcon}
//                         />
//                         <img
//                           src={dashboard_collaborator_icon}
//                           alt="user"
//                           className={styles.collaboratorIcon}
//                         />
//                         <span
//                           className={`${styles.statusIndicator} ${
//                             isOnline ? styles.online : styles.offline
//                           }`}
//                         ></span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { useEffect, useRef, useState, useMemo } from "react";
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
  const navigate = useNavigate();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [games, setGames] = useState<any[]>([]);
  const [username, setUsername] = useState("نام کاربری");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [pathLength, setPathLength] = useState(320);

  // بالا، کنار سایر stateها
  const [openCollaboratorsFor, setOpenCollaboratorsFor] = useState<
    string | null
  >(null);

  const toggleCollaborators = (gameId: string) => {
    setOpenCollaboratorsFor((prev) => (prev === gameId ? null : gameId));
  };

  const chartData = Array.from(
    { length: 32 },
    () => Math.floor(Math.random() * 50) + 10
  );
  const points = chartData.map((val, i) => [i * 10, 60 - val]);
  const pathD = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  useEffect(() => {
    // بارگذاری داده‌های ماک
    setGames(mockGames);

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
    else {
      localStorage.setItem("username", "نام کاربری");
      setUsername("نام کاربری");
    }

    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const q = normalizeText(value);
    if (!q) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    // از filteredGames استفاده نکن چون به setState وابسته است؛ مستقیم محاسبه کن
    const matched = games.filter((g) => normalizeText(g.title).includes(q));

    setSuggestions(matched.slice(0, 8)); // حداکثر ۸ پیشنهاد
    setSelectedIndex(matched.length ? 0 : -1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!suggestions.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && selectedIndex !== -1) {
        e.preventDefault();
        navigate(`/dashboard/${suggestions[selectedIndex].id}`);
        // بعد از انتخاب، باکس ساجست بسته شود
        setSuggestions([]);
      } else if (e.key === "Escape") {
        setSuggestions([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [suggestions, selectedIndex]);

  const currentGame = openCollaboratorsFor
    ? games.find((g) => g.id === openCollaboratorsFor)
    : null;

  // وقتی Bottom Sheet بازه، اسکرول صفحه قفل بشه و Escape کار کنه
  useEffect(() => {
    const body = document.body;

    // قفل اسکرول
    if (openCollaboratorsFor) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [openCollaboratorsFor]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCollaboratorsFor(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // نرمال‌سازی برای جستجوی بهتر (حساس نبودن به حروف، فواصل، ی/ک فارسی/عربی و ارقام)
  const normalizeText = (s: string) =>
    (s || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
      .normalize("NFKD");

  // محاسبه‌ی لیست فیلتر شده برای رندر کارت‌ها
  const filteredGames = useMemo(() => {
    const q = normalizeText(searchTerm);
    if (!q) return games;
    return games.filter((g) => normalizeText(g.title).includes(q));
  }, [games, searchTerm]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // اگر دوست داری دقیق‌تر کنی، یک ref برای searchBox بگذار
      if (!target.closest?.(`.${styles.searchBox}`)) {
        setSuggestions([]);
      }
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

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
              <ul className={styles.searchSuggestions /* استایل دلخواه شما */}>
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
        {/* {games.map((game) => ( */}
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
