import React from 'react';
import { Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1 && totalItems === 0) return null;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
      <small className="text-muted">
        Menampilkan {startItem} - {endItem} dari {totalItems} data
      </small>
      <div className="d-flex gap-2 align-items-center">
        <Button 
          variant="outline-secondary" 
          size="sm" 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="me-1" size={10} /> Sebelumnya
        </Button>
        <span className="text-muted small px-2">
          Halaman {currentPage} dari {Math.max(1, totalPages)}
        </span>
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Selanjutnya <FaChevronRight className="ms-1" size={10} />
        </Button>
      </div>
    </div>
  );
};
export default Pagination;
