import React from "react";
import PropTypes from "prop-types";
import { CardHeader, ProgressBar, Badge } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function RegistrationProgressBar({
  step,
  totalSteps,
  stepLabels,
  progressPercent,
  onStepClick,
}) {
  return (
    <>
      {/* Progress Bar with percentage */}
      <div className="position-relative">
        <ProgressBar
          now={progressPercent}
          variant="primary"
          className="rounded-0"
          style={{ height: "6px" }}
        />
        <div
          className="position-absolute top-0 end-0 small fw-bold text-primary pe-3"
          style={{ marginTop: "-20px", fontSize: "11px" }}
        >
          {Math.round(progressPercent)}%
        </div>
      </div>

      {/* Header */}
      <CardHeader className="bg-white border-0 p-3 p-md-4 pb-2">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center">
            <div className="step-badge-counter bg-primary text-white me-3">
              {step}
            </div>
            <div>
              <h5 className="mb-0 fw-bold">{stepLabels[step - 1]}</h5>
              <small className="text-muted">
                Langkah {step} dari {totalSteps}
              </small>
            </div>
          </div>
          <Badge
            bg="light"
            className="text-primary border px-3 py-2 rounded-pill"
          >
            <FaUserCircle className="me-1" /> Calon Anggota
          </Badge>
        </div>

        {/* Step Indicator Dots */}
        <div className="step-indicators">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`step-dot ${
                i + 1 === step
                  ? "active"
                  : i + 1 < step
                  ? "completed"
                  : ""
              }`}
              title={`Langkah ${i + 1}: ${stepLabels[i]}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (i + 1 < step && onStepClick) {
                  onStepClick(i + 1);
                }
              }}
            />
          ))}
        </div>
      </CardHeader>
    </>
  );
}

RegistrationProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  progressPercent: PropTypes.number.isRequired,
  onStepClick: PropTypes.func.isRequired,
};
