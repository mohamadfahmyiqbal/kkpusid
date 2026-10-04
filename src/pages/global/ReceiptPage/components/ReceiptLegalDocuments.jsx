import React from "react";
import { Row, Col } from "react-bootstrap";
import ProtectedFileViewer from "./ProtectedFileViewer";
import api from "../../../utils/api/common";

export default function ReceiptLegalDocuments({ receiptData }) {
  const getFileUrl = (transaction, type) => {
    const txId = transaction?.id || transaction?.financing_id;
    if (!txId) return "#";
    let url = `${api.defaults.baseURL}/financing/evidence/${txId}/download`;
    if (type) {
      url += `?type=${type}`;
    }
    return url;
  };

  return (
    <div className="mb-5">
      <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">
        Dokumen Legalitas & Pendukung
      </h6>
      <Row className="gy-4">
        <Col md={4}>
          <div
            className="border rounded overflow-hidden shadow-sm bg-light"
            style={{ height: "300px" }}
          >
            <ProtectedFileViewer
              url={receiptData.file_evidence ? getFileUrl(receiptData, "evidence") : "#"}
              title="Bukti Kepemilikan"
            />
          </div>
          <div className="text-center mt-2 fw-semibold text-dark small">
            Bukti Kepemilikan Usaha
          </div>
        </Col>
        <Col md={4}>
          <div
            className="border rounded overflow-hidden shadow-sm bg-light"
            style={{ height: "300px" }}
          >
            <ProtectedFileViewer
              url={receiptData.contract_proof ? getFileUrl(receiptData, "contract_proof") : "#"}
              title="Bukti Kerjasama"
            />
          </div>
          <div className="text-center mt-2 fw-semibold text-dark small">
            Bukti Kerjasama / Kontrak
          </div>
        </Col>
        <Col md={4}>
          <div
            className="border rounded overflow-hidden shadow-sm bg-light"
            style={{ height: "300px" }}
          >
            <ProtectedFileViewer
              url={
                receiptData.additional_documents
                  ? getFileUrl(receiptData, "additional_documents")
                  : "#"
              }
              title="Dokumen Pendukung"
            />
          </div>
          <div className="text-center mt-2 fw-semibold text-dark small">
            Dokumen Pendukung Tambahan
          </div>
        </Col>
      </Row>
    </div>
  );
}
