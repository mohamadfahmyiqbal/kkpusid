import React, { useMemo, useState, useEffect } from "react";
import { DEFAULT_GREETING, USER_NAME_FALLBACKS } from "../constants/greeting";

const WelcomeGreeting = ({ userData, loading, error }) => {
  const greeting = DEFAULT_GREETING;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Update waktu setiap detik
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const userName = useMemo(() => {
    if (!userData) return "";

    const fallbacks = USER_NAME_FALLBACKS.slice(0, -1);
    for (const field of fallbacks) {
      if (userData[field]) return userData[field];
    }

    return "Pengguna";
  }, [userData]);

  if (loading) {
    return (
      <div className="page-header welcome-greeting-header loading-state">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="welcome-content">
                <div className="user-welcome">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <div>
                      <h1 className="h2 mb-3 fw-bold">
                        <span className="text-gradient">{greeting}</span>
                      </h1>
                      <p className="mb-0 h5">
                        <span className="fw-semibold text-muted loading-shimmer shimmer-text">
                          {userName || "Pengguna"}
                        </span>
                      </p>
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <div className="time-display">
                        <div className="time-text text-muted fw-medium loading-shimmer shimmer-text">
                          Memuat waktu...
                        </div>
                      </div>
                      <div className="date-display">
                        <div className="date-text text-muted fw-medium loading-shimmer shimmer-text">
                          Memuat tanggal...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-header welcome-greeting-header error-state">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="welcome-content">
                <div className="user-welcome">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <div>
                      <p className="mb-0 h5">
                        <span className="fw-semibold text-danger">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          Gagal Memuat Data
                        </span>
                      </p>
                      <p className="text-muted small mt-2 mb-3">
                        {error?.message ||
                          "Terjadi kesalahan. Silakan refresh halaman."}
                      </p>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
                        onClick={() => window.location.reload()}
                        aria-label="Coba lagi"
                      >
                        <i className="fas fa-redo me-1"></i>
                        Coba Lagi
                      </button>
                    </div>
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <div className="time-display">
                        <i className="far fa-clock me-2 text-danger"></i>
                        <span className="time-text text-muted fw-medium">
                          {formatTime(currentTime)}
                        </span>
                      </div>
                      <div className="date-display">
                        <i className="far fa-calendar me-2 text-danger"></i>
                        <span className="date-text text-muted fw-medium">
                          {formatDate(currentTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`page-header welcome-greeting-header ${mounted ? "mounted" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="welcome-content">
              <div className="user-welcome">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                  <div>
                    <h1 className="h2 mb-3 fw-bold">
                      <span className="text-gradient">{greeting}</span>
                    </h1>
                    <p className="mb-0 h5">
                      <span className="fw-semibold text-primary">
                        {userName}
                      </span>
                      <i className="fas fa-hand-wave ms-2 text-warning animate-wave"></i>
                    </p>
                  </div>
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="time-display">
                      <i className="far fa-clock me-2 text-primary"></i>
                      <span className="time-text text-muted fw-medium">
                        {formatTime(currentTime)}
                      </span>
                    </div>
                    <div className="date-display">
                      <i className="far fa-calendar me-2 text-primary"></i>
                      <span className="date-text text-muted fw-medium">
                        {formatDate(currentTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WelcomeGreeting.displayName = "WelcomeGreeting";

export default WelcomeGreeting;
