import React from "react";
import {  Badge } from "react-bootstrap";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import Alert from "../../../components/ui/SwalAlert";


// Configuration constants
const ALB_CONFIG = {
  MESSAGE: "Anda login sebagai",
  ROLE_LABEL: "Anggota Luar Biasa (ALB)",
  DISMISS_LABEL: "Tutup notifikasi",
  ARIA_LABEL: "Notifikasi status Anggota Luar Biasa",
};

const ALBAlert = ({
  isALB,
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const [show, setShow] = React.useState(true);

  if (!isALB || !show) return null;

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      setShow(false);
    }
  };

  return (
    <Alert
      variant="info"
      className={`border-0 shadow-sm mb-4 d-flex align-items-center rounded-3 transition-all duration-300 ${className}`}
      dismissible={dismissible}
      onClose={handleDismiss}
      role="alert"
      aria-label={ALB_CONFIG.ARIA_LABEL}
    >
      <FaInfoCircle className="me-2" aria-hidden="true" />
      <span className="flex-grow-1">
        {ALB_CONFIG.MESSAGE}{" "}
        <Badge bg="info" className="ms-1">
          {ALB_CONFIG.ROLE_LABEL}
        </Badge>
      </span>
      {dismissible && (
        <button
          type="button"
          className="btn-close ms-2"
          onClick={handleDismiss}
          aria-label={ALB_CONFIG.DISMISS_LABEL}
        />
      )}
    </Alert>
  );
};

export default React.memo(ALBAlert);
