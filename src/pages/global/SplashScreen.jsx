// pages/global/SplashScreen.jsx

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { jwtEncode } from "../../routes/helpers"; // Diperlukan untuk enkripsi rute

/**
 * SplashScreen
 * - Navigasi otomatis ke LandingPage setelah delay, menggunakan Encrypted Routing.
 * - Fitur: Rata tengah penuh, gradient kustom, reduced-motion awareness.
 * @param {number} delay - ms sebelum redirect (default 1200)
 * @param {string} className - class CSS tambahan opsional
 */
export default function SplashScreen({ delay = 1200, className = "" }) {
  const navigate = useNavigate();
  const timeoutRef = useRef();

  // --- 1. LOGIKA ACCESSIBILITY (Reduced Motion) ---

  const getReducedMotion = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // --- 2. STYLE DINAMIS & RESPONSIVE ---

  const styles = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        minWidth: "100vw",
        // Menggunakan Linear Gradient untuk latar belakang yang lebih modern
        background: "linear-gradient(180deg, #13547A 0%, #80D0C7 100%)",
        overflow: "hidden",
        padding: 0,
      },
      logo: {
        // Ukuran logo responsif menggunakan CSS clamp()
        width: "clamp(120px, 30vw, 320px)",
        height: "auto",
        display: "block",
        margin: "0 auto",
        filter: "drop-shadow(0 4px 4px rgba(0,0,0,.3))",
      },
      subtitle: {
        // Ukuran teks responsif menggunakan CSS clamp()
        fontSize: "clamp(18px, 5vw, 48px)",
        fontFamily:
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        textShadow: "0 4px 4px rgba(0,0,0,.3)",
      },
    }),
    []
  );

  // --- 3. LOGIKA REDIRECT (KOREKSI ENKRIPSI) ---
  useEffect(() => {
    const wait = Math.max(300, Number(delay) || 0);

    timeoutRef.current = setTimeout(() => {
      // 1. ENKRIPSI NAMA HALAMAN TUJUAN
      // Menggunakan kunci "landingPage" yang terdaftar di globalRoutes.jsx
      const encryptedPath = jwtEncode({ page: "landingPage" });

      // 2. NAVIGASI KE PATH TERENKRIPSI
      navigate(`/${encryptedPath}`, { replace: true });
    }, wait);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, navigate]);

  // --- 4. RENDER KOMPONEN ---

  return (
    // Container fluid dan kelas d-flex memastikan rata tengah penuh (vertikal & horizontal)
    <Container
      fluid
      className={`d-flex flex-column justify-content-center align-items-center ${className}`}
      style={styles.page}
    >
      {/* Baris untuk Logo */}
      <Row className="w-100 justify-content-center align-items-center">
        <Col xs="auto">
          <img
            src="/assets/icons/PUSlogo.png"
            alt="Logo Paguyuban Usaha Sukses"
            style={styles.logo}
            aria-label="Logo PUS"
          />
        </Col>
      </Row>

      {/* Baris untuk Subtitle */}
      <Row className="w-100 justify-content-center align-items-center mt-3">
        <Col xs="auto">
          <h2
            className="text-white fw-bold m-0 text-center"
            style={styles.subtitle}
          >
            Paguyuban Usaha Sukses
          </h2>
        </Col>
      </Row>

      {/* Baris untuk Spinner Loading */}
      <Row className="mt-4">
        <Col xs="auto">
          <Spinner
            // Nonaktifkan animasi jika reducedMotion aktif
            animation={reducedMotion ? undefined : "border"}
            variant="light" // Menggunakan 'light' agar terlihat di gradient gelap
            role="status"
            aria-live="polite"
            aria-label="Memuat…"
          >
            {/* Menggunakan kelas Bootstrap 5 (visually-hidden) untuk screen reader */}
            <span className="visually-hidden">Memuat…</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
}
