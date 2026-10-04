import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { FaArrowRight, FaUserShield } from "react-icons/fa";

// Configuration constants
const REGISTRATION_CONFIG = {
  DEFAULT_TITLE: "Silahkan Daftar Anggota",
  DEFAULT_DESCRIPTION: "Untuk dapat mengakses keseluruhan fitur.",
  LEGAL_NOTICE:
    "(*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)",
  DECORATION: {
    ICON_SIZE: "100px",
    POSITION: {
      RIGHT: "-15px",
      TOP: "-15px",
    },
    OPACITY: 0.15,
    ROTATE: "-15deg",
  },
  TEXT_STYLES: {
    MIN_FONT_SIZE: "0.75rem",
    MAX_FONT_SIZE: "0.85rem",
    LINE_HEIGHT: "1.6",
    MAX_WIDTH: "600px",
  },
};

const RegistrationCard = ({
  user,
  title = REGISTRATION_CONFIG.DEFAULT_TITLE,
  description = REGISTRATION_CONFIG.DEFAULT_DESCRIPTION,
  showLegalNotice = true,
  pageKey = "registrationPage",
}) => {
  const navigate = useNavigate();

  const handleRegister = useCallback(() => {
    if (!user) return;
    const token = jwtEncode({ page: pageKey });
    navigate(`/${token}`);
  }, [navigate, pageKey, user]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRegister();
      }
    },
    [handleRegister],
  );

  // Validasi Role ID 1 (Calon Anggota)
  const isCandidate = useMemo(() => {
    if (!user?.status_id) return true; // Default ke true jika data user belum lengkap/baru login
    return String(user.status_id) === '1';
  }, [user?.status_id]);

  // Combine description with legal notice if enabled
  const fullDescription = useMemo(() => {
    if (!showLegalNotice) return description;
    return `${description} ${REGISTRATION_CONFIG.LEGAL_NOTICE}`;
  }, [description, showLegalNotice]);

  if (!user || !isCandidate) return null;

  return (
    <div
      className="card bg-blueGrad text-white mb-4 shadow border-0 overflow-hidden registration-card hover:shadow-lg transition-shadow duration-300"
      onClick={handleRegister}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`${title}. ${description}`}
      aria-describedby="registration-description"
      style={{ borderRadius: "12px" }}
    >
      <div className="card-body p-4 position-relative">
        <div
          className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="me-sm-3 mb-3 mb-sm-0">
            <h4 className="card-title text-white mb-2 fw-bold d-flex align-items-center">
              <FaUserShield className="me-2" aria-hidden="true" />
              {title}
            </h4>
            <p
              id="registration-description"
              className="card-text mb-0 opacity-90"
              style={{
                fontSize: `clamp(${REGISTRATION_CONFIG.TEXT_STYLES.MIN_FONT_SIZE}, 2.5vw, ${REGISTRATION_CONFIG.TEXT_STYLES.MAX_FONT_SIZE})`,
                lineHeight: REGISTRATION_CONFIG.TEXT_STYLES.LINE_HEIGHT,
                maxWidth: REGISTRATION_CONFIG.TEXT_STYLES.MAX_WIDTH,
              }}
            >
              {fullDescription}
            </p>
          </div>
          <div
            className="text-white flex-shrink-0 animate-arrow align-self-end align-self-sm-center transform transition-transform duration-200 hover:scale-110"
            aria-hidden="true"
          >
            <FaArrowRight size={28} />
          </div>
        </div>

        {/* Dekorasi Background */}
        <div
          className="position-absolute d-none d-sm-block registration-decoration"
          style={{
            right: REGISTRATION_CONFIG.DECORATION.POSITION.RIGHT,
            top: REGISTRATION_CONFIG.DECORATION.POSITION.TOP,
            opacity: REGISTRATION_CONFIG.DECORATION.OPACITY,
            fontSize: REGISTRATION_CONFIG.DECORATION.ICON_SIZE,
            zIndex: 1,
            transform: `rotate(${REGISTRATION_CONFIG.DECORATION.ROTATE})`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <FaUserShield />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RegistrationCard);
