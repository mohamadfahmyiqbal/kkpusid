import React from "react";
import {
  FaCheckCircle,
  FaWallet,
  FaInfoCircle,
  FaExclamationTriangle,
  FaGraduationCap,
  FaBell,
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
} from "react-icons/fa";
import { getRelativeTime } from "./notificationHelpers";

export const getCategoryIcon = (type) => {
  switch (type) {
    case "transaction":
      return {
        icon: <FaCheckCircle />,
        className: "np-icon-success",
      };
    case "payment":
      return {
        icon: <FaWallet />,
        className: "np-icon-info",
      };
    case "system":
      return {
        icon: <FaInfoCircle />,
        className: "np-icon-info",
      };
    case "reminder":
      return {
        icon: <FaExclamationTriangle />,
        className: "np-icon-warning",
      };
    case "announcement":
      return {
        icon: <FaGraduationCap />,
        className: "np-icon-purple",
      };
    default:
      return {
        icon: <FaBell />,
        className: "np-icon-info",
      };
  }
};

export default function NotificationRowItem({ notif, onToggleRead, onDelete }) {
  const isUnread = notif.status === 1;
  const config = getCategoryIcon(notif.type);

  return (
    <div className={`np-item ${isUnread ? "unread" : ""}`}>
      {/* Circle Icon */}
      <div className={`np-item-icon-box ${config.className}`}>{config.icon}</div>

      {/* Content */}
      <div className="np-item-content-wrapper">
        <h6 className="np-item-title">{notif.title}</h6>
        <p className="np-item-body">{notif.body}</p>
      </div>

      {/* Right Side Actions */}
      <div className="np-item-right-actions">
        {/* Time */}
        <span className="np-item-time">{getRelativeTime(notif.created_at)}</span>

        {/* Unread indicator */}
        {isUnread && <div className="np-item-unread-dot" />}

        {/* Mark Read/Unread Envelope Action */}
        <button
          className="np-item-action-btn"
          onClick={() => onToggleRead(notif.id, notif.status)}
          title={isUnread ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
        >
          {isUnread ? <FaEnvelope /> : <FaEnvelopeOpen />}
        </button>

        {/* Delete Action */}
        <button
          className="np-item-action-btn delete"
          onClick={() => onDelete(notif.id)}
          title="Hapus notifikasi"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
