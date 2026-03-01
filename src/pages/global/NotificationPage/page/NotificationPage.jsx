import React from "react";
import {
  NotificationCard,
  NotificationList,
  NotificationPagination,
  NotificationItem,
} from "../index";
import { useNotificationNavigation, useNotificationData } from "../index";

const NotificationPage = () => {
  const itemsPerPage = 10;

  // Custom hook for navigation logic
  const { handleBackToDashboard, handleDetailClick } =
    useNotificationNavigation();

  // Custom hook for data management
  const {
    notifications,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    markAllAsRead,
    markAsReadLocal,
  } = useNotificationData(itemsPerPage);

  // Enhanced detail click handler
  const handleDetailClickWithMark = (notif) => {
    if (notif.status === 1) {
      markAsReadLocal(notif.id);
    }
    handleDetailClick(notif, markAsReadLocal);
  };

  return (
    <div className="container-fluid">
      <NotificationCard
        loading={loading}
        notifications={notifications}
        unreadCount={notifications.filter((n) => n.status === 1).length}
        onMarkAllAsRead={markAllAsRead}
      >
        <NotificationList loading={loading} notifications={notifications}>
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notif={notif}
              onDetailClick={handleDetailClickWithMark}
            />
          ))}
        </NotificationList>
      </NotificationCard>

      {!loading && totalPages > 1 && (
        <div className="card-footer d-flex justify-content-center">
          <NotificationPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
