import React from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "react-bootstrap";
import { MdGroup } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";

export default function ArisanEmptyState({ onCreate, canCreate }) {
  return (
    <Alert
      variant="light"
      className="text-center py-5 border-0 bg-light rounded-4 font-outfit"
    >
      <div className="mb-3">
        <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-sm arisan-empty-icon-container">
          <MdGroup size={32} className="text-muted" />
        </div>
      </div>
      <h6 className="fw-bold text-dark">Belum Ada Arisan Tersedia</h6>
      <p className="text-muted small mb-3">
        Saat ini tidak ada grup arisan yang terbuka.
        {canCreate && (
          <>
            <br />
            Anda bisa membuat arisan baru untuk memulai.
          </>
        )}
      </p>
      {canCreate && (
        <Button
          variant="primary"
          className="rounded-pill px-4"
          onClick={onCreate}
        >
          <FaPlusCircle className="me-2" />
          Buat Arisan Baru
        </Button>
      )}
    </Alert>
  );
}

ArisanEmptyState.propTypes = {
  onCreate: PropTypes.func.isRequired,
  canCreate: PropTypes.bool.isRequired,
};
