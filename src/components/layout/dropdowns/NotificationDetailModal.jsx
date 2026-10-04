import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Button from "../../../components/ui/Button";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import { safeDateFormat, sanitizeText } from "../../../utils/sanitization";

const NotificationDetailModal = ({ show, onHide, notif }) => {
  if (!notif) return null;

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="font-outfit fw-bold d-flex align-items-center gap-2" style={{ fontSize: "1.1rem" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaBell size={14} color="#ffffff" />
          </div>
          Detail Notifikasi
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="pt-4 px-4 pb-3">
        <h5 className="fw-bold text-dark mb-2" style={{ lineHeight: "1.4" }}>
          {sanitizeText(notif.title)}
        </h5>
        
        <div className="d-flex align-items-center gap-2 mb-4 text-secondary opacity-75" style={{ fontSize: "12px" }}>
          <FaCalendarAlt size={12} />
          <span>{safeDateFormat(notif.sent_at)}</span>
        </div>

        <div 
          className="p-3 rounded-3" 
          style={{ 
            backgroundColor: "#f8fafc", 
            border: "1px solid #e2e8f0",
            fontSize: "14px", 
            lineHeight: "1.6",
            color: "#334155"
          }}
        >
          {sanitizeText(notif.body)}
        </div>
      </Modal.Body>
      
      <Modal.Footer className="border-0 pt-0 px-4 pb-4">
        <Button variant="premium-outline" onClick={onHide} className="w-100 py-2 rounded-3 fw-bold">
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

NotificationDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  notif: PropTypes.object,
};

export default NotificationDetailModal;
