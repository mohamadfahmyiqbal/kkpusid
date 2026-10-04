import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function ResignationActionSection({
  hasBills,
  isSubmitting,
  onTerminate,
  onGoBack,
}) {
  return (
    <div className="rcp-action-section d-flex flex-column align-items-center pt-4 border-top">
      {!hasBills ? (
        <Button
          variant="danger"
          className="rcp-btn rcp-btn-danger mb-3"
          onClick={onTerminate}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="me-2"
              />{" "}
              Memproses...
            </>
          ) : (
            "Ajukan Berhenti Keanggotaan"
          )}
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="rcp-btn mb-3"
          disabled
          title="Lunasi tagihan terlebih dahulu"
        >
          Ajukan Berhenti Keanggotaan
        </Button>
      )}

      <Button
        variant="link"
        className="text-muted text-decoration-none"
        onClick={onGoBack}
      >
        Batal & Kembali ke Profil
      </Button>
    </div>
  );
}
