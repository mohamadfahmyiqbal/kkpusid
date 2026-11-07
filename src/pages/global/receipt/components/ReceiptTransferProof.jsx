import React from "react";
import ProtectedFileViewer from "./ProtectedFileViewer";
import { API_BASE_URL } from "./receiptHelpers";

export default function ReceiptTransferProof({ receiptData, isWithdrawal }) {
  const showProofSection =
    (isWithdrawal && receiptData.method !== "TUNAI") ||
    (!isWithdrawal && receiptData.metode_pencairan !== "Tunai");

  if (!showProofSection) return null;

  const getProofUrl = () => {
    if (!receiptData?.transfer_proof_path) return null;
    let path = receiptData.transfer_proof_path;
    if (path.startsWith("/")) path = path.slice(1);

    if (path.startsWith("uploads/")) {
      return `${API_BASE_URL}/${path.replace(/^uploads\//, "uploads/")}`;
    }
    return `${API_BASE_URL}/${path}`;
  };

  const proofUrl = getProofUrl();
  const isProofPdf = receiptData?.transfer_proof_path?.toLowerCase().endsWith(".pdf");

  return (
    <div className="mt-4 pt-4 border-top">
      <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">
        Lampiran Bukti Transfer
      </h6>
      <div className="text-center mb-4">
        {proofUrl ? (
          isProofPdf ? (
            <div
              className="border rounded overflow-hidden shadow-sm bg-light w-100"
              style={{ height: "800px" }}
            >
              <ProtectedFileViewer url={proofUrl} title="Bukti Transfer" />
            </div>
          ) : (
            <ProtectedFileViewer
              url={proofUrl}
              title="Bukti Transfer"
              isImage={true}
              className="img-fluid rounded-4 border shadow-sm"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )
        ) : (
          <div className="p-4 border rounded-4 d-inline-block bg-light shadow-sm text-muted">
            <p className="mb-0">Belum ada bukti transfer yang diunggah.</p>
          </div>
        )}
        <div className="mt-2 text-muted small">
          *Bukti transfer ini diunggah oleh Bendahara saat persetujuan.
        </div>
      </div>
    </div>
  );
}
