import React from "react";
import { Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import PropTypes from "prop-types";

const NotificationBadge = ({ unreadCount, ariaExpanded = false }) => {
  return (
    <div className="position-relative text-white" aria-expanded={ariaExpanded}>
      <FaBell size={18} />
      {unreadCount > 0 && (
        <Badge
          bg="warning"
          pill
          className="position-absolute top-0 start-100 translate-middle text-dark notification-badge"
          aria-label={`${unreadCount} unread notifications`}
        >
          {unreadCount}
        </Badge>
      )}
    </div>
  );
};

NotificationBadge.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  ariaExpanded: PropTypes.bool,
};

export default NotificationBadge;
