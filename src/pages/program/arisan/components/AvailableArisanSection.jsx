import React from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "react-bootstrap";
import { FaPlusCircle, FaRedo } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import AvailableArisanList from "../../../components/program/AvailableArisanList";
import ArisanEmptyState from "./ArisanEmptyState";

export default function AvailableArisanSection({
  availableArisans,
  error,
  canCreate,
  onRetry,
  onJoinClick,
}) {
  return (
    <>
      {error && (
        <Alert
          variant="warning"
          className="d-flex align-items-center justify-content-between mb-4 rounded-3 border-0 bg-warning bg-opacity-10 text-warning"
        >
          <span className="small">{error}</span>
          <Button
            variant="link"
            className="p-0 text-warning text-decoration-none d-flex align-items-center"
            onClick={onRetry}
          >
            <FaRedo className="me-1" size={12} /> Coba Lagi
          </Button>
        </Alert>
      )}

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-dark mb-1 font-outfit">
            <MdGroup className="me-2 text-primary" size={22} />
            Arisan Tersedia
          </h5>
          <p className="text-muted small mb-0">
            Pilih grup arisan yang sesuai dengan kebutuhan Anda
          </p>
        </div>
        {canCreate && (
          <Button
            variant="outline-primary"
            size="sm"
            className="d-none d-md-flex align-items-center rounded-pill px-3"
            onClick={() => onJoinClick("new")}
          >
            <FaPlusCircle className="me-2" />
            Buat Arisan Baru
          </Button>
        )}
      </div>

      {availableArisans.length === 0 ? (
        <ArisanEmptyState
          onCreate={() => onJoinClick("new")}
          canCreate={canCreate}
        />
      ) : (
        <AvailableArisanList
          availableArisan={availableArisans}
          onJoinClick={(item) => onJoinClick(item.arisan_id || item.id)}
        />
      )}
    </>
  );
}

AvailableArisanSection.propTypes = {
  availableArisans: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
  canCreate: PropTypes.bool.isRequired,
  onRetry: PropTypes.func.isRequired,
  onJoinClick: PropTypes.func.isRequired,
};
