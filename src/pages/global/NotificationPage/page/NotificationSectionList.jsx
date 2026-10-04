import React from "react";
import { FaBell, FaClock } from "react-icons/fa";
import NotificationRowItem from "./NotificationRowItem";

export default function NotificationSectionList({
  filteredNotifications,
  groupedNotifications,
  onToggleRead,
  onDelete,
}) {
  if (filteredNotifications.length === 0) {
    return (
      <div className="np-empty-state">
        <div className="np-empty-icon-box">
          <FaBell />
        </div>
        <h5 className="np-empty-title">Tidak ada notifikasi</h5>
        <p className="np-empty-desc">
          Kami tidak menemukan notifikasi yang sesuai dengan pencarian atau filter Anda.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 1. Kelompok Hari ini */}
      {groupedNotifications.today.length > 0 && (
        <div>
          <div className="np-date-group-header">
            <FaClock size={12} /> Hari ini
          </div>
          {groupedNotifications.today.map((notif) => (
            <NotificationRowItem
              key={notif.id}
              notif={notif}
              onToggleRead={onToggleRead}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* 2. Kelompok Kemarin */}
      {groupedNotifications.yesterday.length > 0 && (
        <div>
          <div className="np-date-group-header">
            <FaClock size={12} /> Kemarin
          </div>
          {groupedNotifications.yesterday.map((notif) => (
            <NotificationRowItem
              key={notif.id}
              notif={notif}
              onToggleRead={onToggleRead}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {/* 3. Kelompok Sebelumnya */}
      {groupedNotifications.earlier.length > 0 && (
        <div>
          <div className="np-date-group-header">
            <FaClock size={12} /> Sebelumnya
          </div>
          {groupedNotifications.earlier.map((notif) => (
            <NotificationRowItem
              key={notif.id}
              notif={notif}
              onToggleRead={onToggleRead}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
