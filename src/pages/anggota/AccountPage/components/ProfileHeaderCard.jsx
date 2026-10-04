import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaCamera, FaIdCard, FaShieldAlt } from "react-icons/fa";

// Helper untuk format tanggal Indonesia
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const getAvatarGradient = (name) => {
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
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

const getFotoSrc = (foto) => {
  if (!foto) return "";
  return foto.startsWith("data:image")
    ? foto
    : `data:image/jpeg;base64,${foto}`;
};

export default function ProfileHeaderCard({ userProfile, onEditPhoto }) {
  const fotoSrc = getFotoSrc(userProfile?.foto);
  const initials = getInitials(userProfile?.nama);
  const [gradFrom, gradTo] = getAvatarGradient(userProfile?.nama);

  return (
    <Card className="ap-profile-header-card mb-4">
      <Card.Body className="p-4 d-flex align-items-center justify-content-between flex-wrap gap-4">
        <div className="d-flex align-items-center gap-4 flex-wrap">
          {/* Avatar with Camera overlay */}
          <div className="ap-avatar-wrapper">
            {fotoSrc ? (
              <img src={fotoSrc} alt="Foto Profil" className="ap-avatar-img" />
            ) : (
              <div
                className="ap-avatar-img d-flex align-items-center justify-content-center"
                style={{
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                  fontSize: "36px",
                  fontWeight: "800",
                  color: "#ffffff",
                  letterSpacing: "1px",
                  userSelect: "none",
                }}
              >
                {initials}
              </div>
            )}
            <button
              className="ap-avatar-edit-btn"
              onClick={onEditPhoto}
              title="Ubah Foto Profil"
            >
              <FaCamera />
            </button>
          </div>

          {/* User Info */}
          <div className="text-start">
            <h3 className="fw-bold text-white mb-1">{userProfile?.nama}</h3>
            <div className="d-flex flex-column gap-2">
              <div>
                <div className="ap-role-badge">
                  <FaIdCard />
                  <span>{userProfile?.jabatan || "Calon Anggota"}</span>
                </div>
              </div>
              <span className="opacity-75 fs-7">
                Bergabung sejak{" "}
                {userProfile?.join_date && userProfile.join_date !== "-"
                  ? formatDate(userProfile.join_date)
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Status Verification Box (Right) */}
        <div className="ap-verified-box ms-md-auto align-items-center gap-3">
          <FaShieldAlt className="ap-verified-icon" />
          <div className="text-start d-flex flex-column">
            <strong className="text-white fs-7">Akun Anda Terverifikasi</strong>
            <span className="opacity-75 fs-8">
              Terakhir diperbarui{" "}
              {userProfile?.updated_at && userProfile.updated_at !== "-"
                ? formatDate(userProfile.updated_at)
                : "-"}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
