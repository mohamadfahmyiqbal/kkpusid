import React, { useState } from "react";
import { Dropdown, Button, Badge, Modal } from "react-bootstrap";
import {
  FaCheckSquare,
  FaSquare,
  FaTrash,
} from "react-icons/fa";
import { useNotificationFeatures } from "../hooks/useNotificationFeatures";

const NotificationBulkActions = ({
  notifications,
  selectedIds,
  onSelectAll,
  onSelectOne,
  onBulkAction,
  onClearSelection,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const features = useNotificationFeatures();

  // Configuration constants (moved here to avoid circular dependency)
  const BULK_ACTIONS = [
    { value: "mark_read", label: "Tandai Dibaca", icon: "fa-check" },
    { value: "mark_unread", label: "Tandai Belum Dibaca", icon: "fa-envelope" },
    { value: "delete", label: "Hapus", icon: "fa-trash", danger: true },
  ];

  if (!features.bulkActions || notifications.length === 0) {
    return null;
  }

  const handleBulkAction = (action) => {
    if (action === "delete") {
      setShowDeleteModal(true);
    } else {
      onBulkAction(action, selectedIds);
    }
  };

  const confirmDelete = () => {
    onBulkAction("delete", selectedIds);
    setShowDeleteModal(false);
  };

  const isAllSelected = selectedIds.length === notifications.length;
  const isSomeSelected =
    selectedIds.length > 0 && selectedIds.length < notifications.length;

  return (
    <>
      <div className="notification-bulk-actions mb-3 p-3 bg-light rounded">
        <div className="d-flex align-items-center justify-content-between">
          {/* Selection Controls */}
          <div className="selection-controls">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() =>
                onSelectAll(isAllSelected ? [] : notifications.map((n) => n.id))
              }
              className="me-2"
            >
              {isAllSelected ? (
                <>
                  <FaCheckSquare className="me-1" /> Batal Pilih Semua
                </>
              ) : (
                <>
                  <FaSquare className="me-1" /> Pilih Semua
                </>
              )}
            </Button>

            {selectedIds.length > 0 && (
              <Badge bg="info" pill>
                {selectedIds.length} terpilih
              </Badge>
            )}
          </div>

          {/* Bulk Action Buttons */}
          {selectedIds.length > 0 && (
            <div className="bulk-action-buttons">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" size="sm">
                  Aksi Massal
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {BULK_ACTIONS.map((action) => (
                    <Dropdown.Item
                      key={action.value}
                      onClick={() => handleBulkAction(action.value)}
                      className={action.danger ? "text-danger" : ""}
                    >
                      <i className={`fa ${action.icon} me-2`}></i>
                      {action.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Button
                variant="outline-secondary"
                size="sm"
                onClick={onClearSelection}
                className="ms-2"
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Apakah Anda yakin ingin menghapus {selectedIds.length} notifikasi
            terpilih?
          </p>
          <p className="text-muted small">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <FaTrash className="me-1" />
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationBulkActions;
