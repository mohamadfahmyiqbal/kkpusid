import React, { memo, useCallback, useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "react-bootstrap";
import {
  FaUser,
  FaPowerOff,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import PropTypes from "prop-types";
import { useNavigation } from "../../../hooks/useNavigation";
import { sanitizeText } from "../../../utils/sanitization";
import { ACCESSIBILITY_LABELS } from "../../../constants/layout";
import "./UserDropdown.css";

// Generate initials from full name
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Generate a consistent gradient color from name
const AVATAR_GRADIENTS = [
  ["#3b82f6", "#2563eb"],
  ["#8b5cf6", "#7c3aed"],
  ["#10b981", "#059669"],
  ["#f59e0b", "#d97706"],
  ["#ef4444", "#dc2626"],
  ["#06b6d4", "#0891b2"],
  ["#ec4899", "#db2777"],
  ["#14b8a6", "#0d9488"],
];

const getAvatarGradient = (name) => {
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const UserDropdown = memo(function UserDropdown({
  user = null,
  logout,
  loading = false,
}) {
  const { navigateTo } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 70, right: 0, width: 288 });
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef(null);

  const initials = useMemo(() => getInitials(user?.full_name), [user?.full_name]);
  const [gradFrom, gradTo] = useMemo(() => getAvatarGradient(user?.full_name), [user?.full_name]);

  const handleNav = useCallback(
    (page) => {
      setIsDropdownOpen(false);
      navigateTo(page);
    },
    [navigateTo],
  );

  const handleToggle = useCallback(() => {
    if (!isDropdownOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = Math.min(288, window.innerWidth - 24);
      setDropdownPos({
        top: rect.bottom + 8,
        right: Math.max(12, window.innerWidth - rect.right - 4),
        width: dropdownWidth,
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    setIsDropdownOpen((prev) => !prev);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const onKey = (e) => { if (e.key === "Escape") setIsDropdownOpen(false); };
    
    const updatePos = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const dropdownWidth = Math.min(288, window.innerWidth - 24);
        setDropdownPos({
          top: rect.bottom + 8,
          right: Math.max(12, window.innerWidth - rect.right - 4),
          width: dropdownWidth,
        });
      }
    };

    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    document.addEventListener("keydown", onKey);
    
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  const isRegularMember = user?.member_type === "Anggota Reguler" || user?.status_id === 2;
  const memberBadgeColor = isRegularMember
    ? { bg: "#ecfdf5", text: "#059669", border: "#6ee7b7" }
    : { bg: "#fffbeb", text: "#d97706", border: "#fcd34d" };

  const menuItems = [
    {
      icon: FaUser,
      label: "Profil Saya",
      desc: "Lihat & edit data diri",
      page: "accountPage",
      color: "#3b82f6",
    },
  ];

  return (
    <li className="nav-item user-dropdown-container">
      <button
        ref={btnRef}
        className="nav-link p-0 d-flex align-items-center border-0 bg-transparent user-btn"
        onClick={handleToggle}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label={ACCESSIBILITY_LABELS.USER_MENU}
      >
        {loading ? (
          <Spinner animation="border" size="sm" variant="light" />
        ) : (
          <div className="d-flex align-items-center gap-2">
            {/* Initials Avatar with online dot */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                  border: "2px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "0.5px",
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              {/* Online dot */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: "1.5px solid rgba(255,255,255,0.8)",
                }}
              />
            </div>
            <div className="text-start d-none d-md-flex flex-column ms-1" style={{ lineHeight: "1.15" }}>
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "13px" }}>
                {sanitizeText(user?.full_name) || user?.email?.split("@")[0] || "Anggota"}
              </span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>
                {user?.member_type || "Calon Anggota"}
              </span>
            </div>
            <FaChevronDown
              className="d-none d-md-inline"
              size={9}
              style={{
                color: "rgba(255,255,255,0.5)",
                marginLeft: 2,
                transition: "transform 0.2s",
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </button>

      {isDropdownOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              style={{ position: "fixed", inset: 0, zIndex: 1040, backgroundColor: "transparent" }}
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Panel */}
            <div
              className={`ud-panel ${isAnimating ? "animating-in" : ""}`}
              style={{
                top: dropdownPos.top,
                right: dropdownPos.right,
                width: dropdownPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Header */}
              <div className="ud-header">
                {/* Decorative circles */}
                <div className="ud-header-circle-1" />
                <div className="ud-header-circle-2" />

                <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                  {/* Large Initials Avatar */}
                  <div style={{ position: "relative" }}>
                    <div
                      className="ud-avatar-large"
                      style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
                    >
                      {initials}
                    </div>
                    {isRegularMember && (
                      <div className="ud-verified-badge">
                        <MdVerified size={12} color="#ffffff" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ud-user-name">
                      {sanitizeText(user?.full_name) || "Guest User"}
                    </div>
                    <div className="ud-user-email">
                      {sanitizeText(user?.email) || "No email"}
                    </div>
                    <div className="ud-member-type-badge" style={{ background: memberBadgeColor.bg, color: memberBadgeColor.text, border: `1px solid ${memberBadgeColor.border}` }}>
                      {isRegularMember && <MdVerified size={10} />}
                      {user?.member_type || "Calon Anggota"}
                    </div>
                  </div>
                </div>

                {/* Member ID */}
                {user?.member_no && (
                  <div className="ud-member-id-box">
                    <span className="ud-member-id-label">ID Anggota</span>
                    <span className="ud-member-id-val">{sanitizeText(user?.member_no)}</span>
                  </div>
                )}
              </div>

              {/* Menu Items */}
              <div style={{ padding: "8px" }}>
                {menuItems.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleNav(item.page)}
                    aria-label={item.label}
                    className="ud-menu-item"
                  >
                    <div className="ud-menu-icon" style={{ background: `${item.color}15` }}>
                      <item.icon size={14} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="ud-menu-title">{item.label}</div>
                      <div className="ud-menu-desc">{item.desc}</div>
                    </div>
                    <FaChevronRight size={10} color="#cbd5e1" />
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "#f1f5f9", margin: "0 8px" }} />

              {/* Logout */}
              <div style={{ padding: "8px" }}>
                <button
                  type="button"
                  onClick={logout}
                  aria-label={ACCESSIBILITY_LABELS.LOGOUT}
                  className="ud-logout-item"
                >
                  <div className="ud-logout-icon">
                    <FaPowerOff size={14} color="#ef4444" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="ud-logout-title">Keluar Aplikasi</div>
                    <div className="ud-logout-desc">Akhiri sesi sekarang</div>
                  </div>
                </button>
              </div>

              {/* Version badge */}
              <div className="ud-footer">
                <span className="ud-footer-text">Paguyuban Usaha Sukses © 2024</span>
              </div>
            </div>
          </>,
          document.body,
        )}
    </li>
  );
});

UserDropdown.propTypes = {
  user: PropTypes.shape({
    full_name: PropTypes.string,
    email: PropTypes.string,
    member_no: PropTypes.string,
    member_type: PropTypes.string,
    status_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UserDropdown;
