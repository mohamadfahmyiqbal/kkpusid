import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";

export const useNotificationNavigation = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleDetailClick = useCallback(
    (notif, onMarkAsRead) => {
      if (notif.status === 1) {
        onMarkAsRead(notif.id);
      }

      const token = jwtEncode({
        page: "notificationDetailPage",
        id: notif.id,
        type: notif.type,
        type_id: notif.type_id,
        title: notif.title,
        body: notif.body,
        created_at: notif.created_at,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  return {
    handleBackToDashboard,
    handleDetailClick,
  };
};
