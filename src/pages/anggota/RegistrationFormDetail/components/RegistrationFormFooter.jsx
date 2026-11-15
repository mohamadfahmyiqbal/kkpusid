import React from "react";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import { FaArrowRight, FaSave, FaArrowLeft } from "react-icons/fa";

export default function RegistrationFormFooter({
  step,
  isLastStep,
  isSubmitting,
  isCommitmentChecked,
  onBack,
  onPrev,
  onNext,
  onSubmit,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
      <Button
        variant={step === 1 ? "outline-danger" : "light"}
        className={`px-4 py-2 fw-bold rounded-12 ${
          step === 1 ? "text-danger" : "text-muted"
        }`}
        onClick={() => (step === 1 ? onBack() : onPrev())}
        disabled={isSubmitting}
      >
        <FaArrowLeft className="me-2" />
        {step === 1 ? "Batalkan" : "Sebelumnya"}
      </Button>

      <div className="d-flex align-items-center gap-2">
        {isLastStep ? (
          <Button
            variant="primary"
            className="px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12"
            onClick={onSubmit}
            disabled={!isCommitmentChecked || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner size="sm" className="me-2" animation="border" />
                Mengirim...
              </>
            ) : (
              <>
                <FaSave className="me-2" /> Kirim Sekarang
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="primary"
            className="px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12"
            onClick={onNext}
          >
            Selanjutnya <FaArrowRight className="ms-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

RegistrationFormFooter.propTypes = {
  step: PropTypes.number.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isCommitmentChecked: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
