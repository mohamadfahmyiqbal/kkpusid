import { useState, useCallback, useEffect } from "react";
import React from "react";
import { Container } from "react-bootstrap";
import { useSplashRedirect } from "../hooks/useSplashRedirect";
import { DEFAULT_SPLASH_DELAY } from "../service/splashService";
import masjidImage from "../../../../assets/images/masjid.png";
import "../styles/SplashPage.css";

const LOADING_MESSAGES = [
  "Memuat pengalaman terbaik...",
  "Menyiapkan antarmuka syariah...",
  "Menghubungkan ke layanan...",
  "Hampir selesai...",
];

/**
 * SplashPage - Halaman awal aplikasi Paguyuban Usaha Sukses
 */
function SplashPage({ delay = DEFAULT_SPLASH_DELAY, className = "" }) {
  const [logoError, setLogoError] = useState(false);
  const [mosqueError, setMosqueError] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // Hook untuk mengalihkan ke halaman landing setelah delay tertentu
  const { skip } = useSplashRedirect(delay);

  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, []);

  const handleMosqueError = useCallback(() => {
    setMosqueError(true);
  }, []);

  // Efek untuk merotasi pesan loading
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`splashx-screen ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Memuat aplikasi Paguyuban Usaha Sukses"
    >
      {/* Background stars pattern */}
      <div className="splashx-stars" aria-hidden="true" />
      <div className="splashx-noise" aria-hidden="true" />
      <div className="splashx-orb splashx-orb-left" aria-hidden="true" />
      <div className="splashx-orb splashx-orb-right" aria-hidden="true" />

      <Container className="splashx-wrap">
        <section className="splashx-content text-center">
          
          {/* PUS Logo */}
          <div className="splashx-logo-container">
            {logoError ? (
              <div className="splashx-logo-fallback" aria-label="Logo PUS">
                <span className="splashx-fallback-text">PUS</span>
              </div>
            ) : (
              <img
                src="/assets/icons/PUSlogo.png"
                alt="Logo PUS"
                className="splashx-logo-image"
                loading="eager"
                fetchpriority="high"
                onError={handleLogoError}
              />
            )}
          </div>

          <h1 className="splashx-title">
            <span className="splashx-title-white d-block">Paguyuban Usaha</span>
            <span className="splashx-title-green d-block">Sukses</span>
          </h1>
          
          <p className="splashx-subtitle">
            Koperasi & Layanan Pembiayaan<br />Usaha Syariah
          </p>

          {/* Mosque Illustration */}
          <div className="splashx-mosque-illustration">
            {mosqueError ? (
              <div className="splashx-mosque-fallback" aria-hidden="true">
                <span className="splashx-mosque-icon">🕌</span>
              </div>
            ) : (
              <img
                src={masjidImage}
                alt="Ilustrasi Masjid"
                className="splashx-mosque-image"
                loading="eager"
                fetchpriority="high"
                onError={handleMosqueError}
              />
            )}
          </div>

          {/* Loading Bar */}
          <div
            className="splashx-loading-container"
            role="progressbar"
            aria-valuetext="Memuat aplikasi"
          >
            <div className="splashx-loading-bar">
              <div className="splashx-loading-progress" aria-hidden="true" />
            </div>
            <p className="splashx-loading-text">
              {LOADING_MESSAGES[messageIndex]}
            </p>
          </div>

          {/* Skip Button */}
          <button
            type="button"
            className="splashx-skip-btn"
            onClick={skip}
            aria-label="Lewati halaman pembuka"
          >
            Lewati
          </button>

          {/* Copyright */}
          <p className="splashx-copyright">
            © 2025 Paguyuban Usaha Sukses. All rights reserved.
          </p>
        </section>
      </Container>
    </main>
  );
}

export default React.memo(SplashPage);
