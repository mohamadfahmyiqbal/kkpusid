import React from "react";
import { Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NotificationPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="notification-pagination d-flex justify-content-between align-items-center p-3 border-top">
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="pagination-btn pagination-btn-prev"
      >
        <FaChevronLeft className="me-1" />
        Sebelumnya
      </Button>

      <div className="pagination-info">
        <span className="text-muted">
          Halaman <strong>{currentPage}</strong> dari{" "}
          <strong>{totalPages}</strong>
        </span>
      </div>

      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="pagination-btn pagination-btn-next"
      >
        Berikutnya
        <FaChevronRight className="ms-1" />
      </Button>
    </div>
  );
};

export default NotificationPagination;
