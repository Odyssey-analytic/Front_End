// frontend/src/components/Docs/DocsFrame.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const DOCS_HOST = import.meta.env.VITE_DOCS_URL || "http://localhost:3000"; // سرور داکیوسوروس

export default function DocsFrame() {
  const { pathname } = useLocation();        // مثلا "/docs/intro"
  const subpath = useMemo(() => {
    const s = pathname.replace(/^\/docs/, "");   // → "/intro"
    return s && s !== "/" ? s : "/intro";        // پیش‌فرض: /intro
  }, [pathname]);

  const src = `${DOCS_HOST}/docs${subpath}`;     // → "http://localhost:3000/docs/intro"

  const [ready, setReady] = useState(false);
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {!ready && (
        <div style={{position:"absolute", inset:0, display:"grid", placeItems:"center"}}>
          در حال بارگذاری مستندات…
        </div>
      )}
      <iframe
        src={src}
        title="Documentation"
        style={{ width: "100%", height: "100%", border: "none" }}
        onLoad={() => setReady(true)}
      />
    </div>
  );
}
