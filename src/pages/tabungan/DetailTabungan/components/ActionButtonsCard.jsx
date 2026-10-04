import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function ActionButtonsCard({
  progressPercentage,
  onSetoran,
  onPencairan,
  onPengajuanBaru,
}) {
  return (
    <Card className="shadow-sm border-0 mb-4 detail-actions-card">
      <Card.Body className="p-4">
        <h6 className="fw-bold mb-3">Menu Aksi</h6>
        <div className="d-flex gap-2 flex-wrap">
          {progressPercentage < 100 ? (
            <Button
              variant="primary"
              className="px-4 py-2 shadow-sm"
              onClick={onSetoran}
            >
              <FaPlus className="me-2" />
              Setoran
            </Button>
          ) : (
            <Button
              variant="success"
              className="px-4 py-2 shadow-sm"
              onClick={onPencairan}
            >
              Pencairan
            </Button>
          )}
          <Button
            variant="outline-secondary"
            className="px-4 py-2"
            onClick={onPengajuanBaru}
          >
            <FaPlus className="me-2" />
            Pengajuan Baru
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
