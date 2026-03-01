import { useCallback, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSplashRedirect } from "../hooks/useSplashRedirect";
import { DEFAULT_SPLASH_DELAY } from "../service/splashService";

export default function SplashPage({
  delay = DEFAULT_SPLASH_DELAY,
  className = "",
}) {
  const getReducedMotion = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  useSplashRedirect(delay);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <main
      className={`splashx-screen ${reducedMotion ? "splashx-reduced" : ""} ${className}`}
    >
      <div className="splashx-grid" />
      <div className="splashx-noise" />
      <div className="splashx-orb splashx-orb-left" />
      <div className="splashx-orb splashx-orb-right" />
      <div className="splashx-ring splashx-ring-a" />
      <div className="splashx-ring splashx-ring-b" />

      <Container className="splashx-wrap">
        <section className="splashx-card text-center">
          <img
            src="/assets/icons/PUSlogo.png"
            alt="Logo Paguyuban Usaha Sukses"
            className="splashx-logo"
            aria-label="Logo PUS"
          />

          <h1 className="splashx-title">
            Koperasi Konsumen Paguyuban Usaha Sukses
          </h1>
          <p className="splashx-subtitle">
            Menyiapkan pengalaman digital anggota yang cepat, aman, dan modern.
          </p>

          <div className="splashx-spinner-wrap" aria-label="Memuat halaman">
            <Spinner
              animation={reducedMotion ? undefined : "border"}
              role="status"
              className="splashx-spinner"
              aria-live="polite"
              aria-label="Memuat..."
            >
              <span className="visually-hidden">Memuat...</span>
            </Spinner>
          </div>
        </section>
      </Container>
    </main>
  );
}
