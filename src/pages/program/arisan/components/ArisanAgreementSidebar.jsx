import React from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { FaInfoCircle } from "react-icons/fa";
import SummaryDetail from "./SummaryDetail";

export default function ArisanAgreementSidebar({
  summaryData,
  agreedAkad,
  onAgreedAkadChange,
  agreedTerms,
  onAgreedTermsChange,
  isSubmitDisabled,
  isLoading,
  programArisan,
}) {
  return (
    <div className="d-flex flex-column gap-4">
      {/* Summary Info */}
      <SummaryDetail summaryData={summaryData} />

      {/* Agreement Checkboxes */}
      <Card variant="form" className="p-4">
        <div className="form-section-header mb-3">
          <h6 className="fw-bold font-outfit mb-0 text-dark">
            Pernyataan Persetujuan
          </h6>
        </div>

        <div className="d-flex flex-column gap-3">
          <div className="custom-checkbox-premium">
            <input
              type="checkbox"
              id="checkAkad"
              checked={agreedAkad}
              onChange={(e) => onAgreedAkadChange(e.target.checked)}
              className="form-check-input"
              disabled={isLoading}
            />
            <label htmlFor="checkAkad" className="form-check-label">
              Saya menyetujui ketentuan Akad Perjanjian.
            </label>
          </div>

          <div className="custom-checkbox-premium">
            <input
              type="checkbox"
              id="checkSyarat"
              checked={agreedTerms}
              onChange={(e) => onAgreedTermsChange(e.target.checked)}
              className="form-check-input"
              disabled={isLoading}
            />
            <label htmlFor="checkSyarat" className="form-check-label">
              Saya bersedia menaati Syarat & Ketentuan program.
            </label>
          </div>
        </div>
      </Card>

      {/* Action Button */}
      <div className="d-grid gap-2">
        <Button
          variant="form"
          type="submit"
          disabled={isSubmitDisabled}
          isLoading={isLoading}
          loadingText="Memproses Pengajuan..."
          className="w-100 d-flex flex-column align-items-center justify-content-center py-3"
        >
          {!isLoading && (
            <>
              <span className="fw-bold" style={{ fontSize: "16px" }}>
                Proses Pengajuan Arisan
              </span>
              <small className="opacity-75" style={{ fontSize: "11px" }}>
                {programArisan
                  ? "Konfirmasi Pendaftaran"
                  : "Pilih Program Terlebih Dahulu"}
              </small>
            </>
          )}
        </Button>

        <div className="text-center mt-2">
          <small
            className="text-muted d-flex align-items-center justify-content-center gap-1"
            style={{ fontSize: "11px" }}
          >
            <FaInfoCircle /> Setujui akad & ketentuan untuk melanjutkan.
          </small>
        </div>
      </div>
    </div>
  );
}
