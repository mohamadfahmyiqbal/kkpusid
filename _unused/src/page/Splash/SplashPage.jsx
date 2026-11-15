import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export default function SplashPage({
  delay = 3000,
  logoSrc = "/assets/icons/PUSlogo.png",
  title = "Paguyuban Usaha Sukses",
  spinnerVariant = "light",
  className = "",
}) {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const getReducedMotion = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);

  const [reducedMotion, setReducedMotion] = useState(() => getReducedMotion());
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  useEffect(() => {
    const wait = Math.max(300, Number(delay) || 0);
    timeoutRef.current = setTimeout(
      () => navigate("/landing", { replace: true }),
      wait
    );
    return () => clearTimeout(timeoutRef.current);
  }, [delay, navigate]);

  const styles = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(180deg, #13547A 0%, #80D0C7 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 0,
        overflow: "hidden",
      },
      logo: {
        width: "clamp(120px, 30vw, 320px)",
        height: "auto",
        filter: "drop-shadow(0 4px 4px rgba(0,0,0,.3))",
        userSelect: "none",
        marginBottom: "1rem",
      },
      title: {
        fontSize: "clamp(18px, 5vw, 48px)",
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        textShadow: "0 4px 4px rgba(0,0,0,.3)",
        lineHeight: 1.15,
        color: "#fff",
        marginBottom: "2rem",
      },
    }),
    []
  );

  const motion = {
    container: reducedMotion ? "0ms" : "500ms",
    logo: reducedMotion ? "0ms" : "560ms",
    logoDelay: reducedMotion ? "0ms" : "80ms",
    title: reducedMotion ? "0ms" : "520ms",
    titleDelay: reducedMotion ? "0ms" : "160ms",
    spinner: reducedMotion ? "0ms" : "420ms",
    spinnerDelay: reducedMotion ? "0ms" : "260ms",
  };

  return (
    <div style={styles.page} className={className}>
      {/* Logo */}
      {!logoError ? (
        <img
          src={logoSrc}
          alt="Logo"
          style={{
            ...styles.logo,
            opacity: 0,
            transform: "scale(0.96)",
            animationName: "sp_scaleIn",
            animationDuration: motion.logo,
            animationDelay: motion.logoDelay,
            animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            animationFillMode: "forwards",
            willChange: "opacity, transform",
          }}
          onError={() => setLogoError(true)}
        />
      ) : (
        <div
          style={{
            ...styles.logo,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 800,
            fontSize: "clamp(24px, 6vw, 40px)",
            color: "#fff",
          }}
        >
          PUS
        </div>
      )}

      {/* Subtitle */}
      <div
        style={{
          ...styles.title,
          opacity: 0,
          transform: "translateY(6px)",
          animationName: "sp_fadeUp",
          animationDuration: motion.title,
          animationDelay: motion.titleDelay,
          animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          animationFillMode: "forwards",
          willChange: "opacity, transform",
        }}
      >
        {title}
      </div>

      {/* Spinner */}
      <div
        style={{
          opacity: 0,
          animationName: "sp_fadeIn",
          animationDuration: motion.spinner,
          animationDelay: motion.spinnerDelay,
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards",
          willChange: "opacity",
        }}
      >
        <Spinner
          animation={reducedMotion ? undefined : "border"}
          variant={spinnerVariant}
        />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes sp_fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sp_scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes sp_fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
