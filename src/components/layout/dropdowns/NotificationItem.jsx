import React from "react";
import { FaBell, FaCheckDouble } from "react-icons/fa";
import PropTypes from "prop-types";
import { sanitizeText, safeDateFormat } from "../../../utils/sanitization";

const NotificationItem = ({ notif, onClick }) => {
  const isUnread = notif.status === 1;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Baca notifikasi: ${sanitizeText(notif.title)}`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        width: "100%",
        padding: "12px 16px",
        border: "none",
        borderBottom: "1px solid #f1f5f9",
        background: isUnread ? "linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)" : "#ffffff",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.15s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isUnread
          ? "linear-gradient(90deg, #eff6ff 0%, #ffffff 100%)"
          : "#ffffff";
      }}
    >
      {/* Icon Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background: isUnread
            ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            : "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: isUnread ? "0 2px 8px rgba(59,130,246,0.3)" : "none",
        }}
      >
        {isUnread
          ? <FaBell size={14} color="#ffffff" />
          : <FaCheckDouble size={14} color="#94a3b8" />
        }
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "13px",
            fontWeight: isUnread ? 700 : 500,
            color: isUnread ? "#1e293b" : "#475569",
            marginBottom: "2px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {sanitizeText(notif.title)}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#64748b",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
            marginBottom: "4px",
          }}
        >
          {sanitizeText(notif.body)}
        </div>
        <div style={{ fontSize: "11px", color: "#94a3b8" }}>
          {safeDateFormat(notif.sent_at)}
        </div>
      </div>

      {/* Unread indicator dot */}
      {isUnread && (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3b82f6",
            flexShrink: 0,
            marginTop: 4,
            boxShadow: "0 0 0 2px rgba(59,130,246,0.2)",
          }}
        />
      )}
    </button>
  );
};

NotificationItem.propTypes = {
  notif: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    sent_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationItem;
