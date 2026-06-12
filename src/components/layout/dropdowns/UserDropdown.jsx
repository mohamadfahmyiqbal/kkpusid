import React, { memo, useCallback, useRef, useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "react-bootstrap";
import {
  FaUser,
  FaWallet,
  FaPowerOff,
  FaChevronRight,
  FaChevronDown,
  FaIdCard,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import PropTypes from "prop-types";
import { useNavigation } from "../../../hooks/useNavigation";
import { sanitizeText, getSafeDisplayName } from "../../../utils/sanitization";
import {
  FONT_SIZES,
  ACCESSIBILITY_LABELS,
  CSS_CLASSES,
} from "../../../constants/layout";

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

// Inject keyframes once into <head>
if (typeof document !== "undefined" && !document.getElementById("user-dropdown-styles")) {
  const styleEl = document.createElement("style");
  styleEl.id = "user-dropdown-styles";
  styleEl.textContent = `
    @keyframes dropdownSlideInUser {
      from { opacity: 0; transform: scale(0.92) translateY(-8px); }
      to   { opacity: 1; transform: scale(1)   translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);
}

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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
    {
      icon: FaWallet,
      label: "Saldo & Tabungan",
      desc: "Kelola keuangan Anda",
      page: "balancePage",
      color: "#10b981",
    },
    {
      icon: FaIdCard,
      label: "Keanggotaan",
      desc: "Status & informasi akun",
      page: isRegularMember ? "accountPage" : "registrationPage",
      color: "#8b5cf6",
    },
  ];

  return (
    <li className="nav-item user-dropdown" style={{ position: "relative" }}>
      <button
        ref={btnRef}
        className="nav-link p-0 d-flex align-items-center border-0 bg-transparent"
        onClick={handleToggle}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label={ACCESSIBILITY_LABELS.USER_MENU}
        style={{ transition: "opacity 0.15s" }}
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
              style={{ position: "fixed", inset: 0, zIndex: 9999998, backgroundColor: "transparent" }}
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Panel */}
            <div
              style={{
                position: "fixed",
                top: dropdownPos.top,
                right: dropdownPos.right,
                width: dropdownPos.width,
                zIndex: 9999999,
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden",
                transformOrigin: "top right",
                animation: isAnimating ? "dropdownSlideInUser 0.25s cubic-bezier(0.34,1.56,0.64,1)" : "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >


              {/* Profile Header */}
              <div
                style={{
                  background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circles */}
                <div style={{
                  position: "absolute", top: -20, right: -20,
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                }} />
                <div style={{
                  position: "absolute", bottom: -10, right: 20,
                  width: 50, height: 50, borderRadius: "50%",
                  background: "rgba(255,255,255,0.04)",
                }} />

                <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                  {/* Large Initials Avatar */}
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                        border: "2.5px solid rgba(255,255,255,0.35)",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        fontWeight: 900,
                        color: "#ffffff",
                        letterSpacing: "1px",
                        userSelect: "none",
                        flexShrink: 0,
                      }}
                    >
                      {initials}
                    </div>
                    {isRegularMember && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: -4,
                          right: -4,
                          background: "#22c55e",
                          borderRadius: "50%",
                          width: 18,
                          height: 18,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1.5px solid #ffffff",
                        }}
                      >
                        <MdVerified size={12} color="#ffffff" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sanitizeText(user?.full_name) || "Guest User"}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.65)",
                        fontSize: 11,
                        marginTop: 2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sanitizeText(user?.email) || "No email"}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: memberBadgeColor.bg,
                          color: memberBadgeColor.text,
                          fontSize: 10,
                          fontWeight: 700,
                          border: `1px solid ${memberBadgeColor.border}`,
                        }}
                      >
                        {isRegularMember && <MdVerified size={10} />}
                        {user?.member_type || "Calon Anggota"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Member ID */}
                {user?.member_no && (
                  <div
                    style={{
                      marginTop: 12,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "7px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
                      ID Anggota
                    </span>
                    <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 12, letterSpacing: "0.5px" }}>
                      {sanitizeText(user?.member_no)}
                    </span>
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
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background 0.15s",
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background: `${item.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={14} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        {item.desc}
                      </div>
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
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: "10px",
                    background: "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fff5f5"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "#fff5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaPowerOff size={14} color="#ef4444" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>
                      Keluar Aplikasi
                    </div>
                    <div style={{ fontSize: 11, color: "#fca5a5" }}>
                      Akhiri sesi sekarang
                    </div>
                  </div>
                </button>
              </div>

              {/* Version badge */}
              <div
                style={{
                  padding: "8px 20px",
                  borderTop: "1px solid #f1f5f9",
                  textAlign: "center",
                  background: "#fafafa",
                }}
              >
                <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 500 }}>
                  Paguyuban Usaha Sukses © 2024
                </span>
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

