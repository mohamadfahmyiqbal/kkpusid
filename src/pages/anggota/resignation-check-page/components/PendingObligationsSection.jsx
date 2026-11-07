import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { formatRupiah } from "./resignationHelpers";

export default function PendingObligationsSection({
  jualBeliBill,
  programBill,
  pendingBills,
}) {
  const hasJualBeliBill = jualBeliBill > 0;
  const hasProgramBill = programBill.pinjaman > 0 || programBill.arisan > 0;

  return (
    <>
      {/* Informasi Tagihan Jual Beli */}
      <div
        className={`rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${
          hasJualBeliBill
            ? "bg-danger bg-opacity-10 border-danger"
            : "bg-success bg-opacity-10 border-success"
        }`}
      >
        <h5
          className={`fw-bold mb-3 ${
            hasJualBeliBill ? "text-danger" : "text-success"
          }`}
        >
          Kewajiban Tagihan Jual Beli
        </h5>
        <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
          <div>
            <small className="text-muted d-block">Sisa Tagihan Jual Beli</small>
            <span
              className={`fw-bold fs-5 ${
                hasJualBeliBill ? "text-danger" : "text-success"
              }`}
            >
              {formatRupiah(jualBeliBill)}
            </span>
          </div>
          <div>
            {hasJualBeliBill ? (
              <Badge bg="danger" className="p-2">
                Belum Lunas
              </Badge>
            ) : (
              <Badge bg="success" className="p-2">
                Lunas / Tidak Ada
              </Badge>
            )}
          </div>
        </div>
        {hasJualBeliBill && (
          <p className="text-danger small mt-3 mb-0">
            * Anda memiliki tunggakan/sisa tagihan jual beli. Harap lunasi
            tagihan ini sebelum mengajukan berhenti keanggotaan.
          </p>
        )}
      </div>

      {/* Informasi Tagihan Program (Pinjaman & Arisan) */}
      <div
        className={`rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${
          hasProgramBill
            ? "bg-danger bg-opacity-10 border-danger"
            : "bg-success bg-opacity-10 border-success"
        }`}
      >
        <h5
          className={`fw-bold mb-3 ${
            hasProgramBill ? "text-danger" : "text-success"
          }`}
        >
          Kewajiban Program (Pinjaman Lunak & Arisan)
        </h5>
        <Row className="g-3 text-start">
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
              <div>
                <small className="text-muted d-block">
                  Sisa Pinjaman Lunak
                </small>
                <span
                  className={`fw-bold fs-5 ${
                    programBill.pinjaman > 0 ? "text-danger" : "text-success"
                  }`}
                >
                  {formatRupiah(programBill.pinjaman)}
                </span>
              </div>
              <div>
                {programBill.pinjaman > 0 ? (
                  <Badge bg="danger" className="p-2">
                    Belum Lunas
                  </Badge>
                ) : (
                  <Badge bg="success" className="p-2">
                    Lunas
                  </Badge>
                )}
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
              <div>
                <small className="text-muted d-block">Sisa Tagihan Arisan</small>
                <span
                  className={`fw-bold fs-5 ${
                    programBill.arisan > 0 ? "text-danger" : "text-success"
                  }`}
                >
                  {formatRupiah(programBill.arisan)}
                </span>
              </div>
              <div>
                {programBill.arisan > 0 ? (
                  <Badge bg="danger" className="p-2">
                    Belum Lunas
                  </Badge>
                ) : (
                  <Badge bg="success" className="p-2">
                    Lunas
                  </Badge>
                )}
              </div>
            </div>
          </Col>
        </Row>
        {hasProgramBill && (
          <p className="text-danger small mt-3 mb-0">
            * Anda masih memiliki kewajiban program yang belum dilunasi. Harap
            lunasi pinjaman dan/atau arisan Anda sebelum mengajukan berhenti
            keanggotaan.
          </p>
        )}
      </div>

      {/* Informasi Tagihan Lainnya (General Bills) */}
      {pendingBills.length > 0 && (
        <div className="rcp-savings-section mb-5 p-4 rounded border border-danger border-opacity-25 bg-danger bg-opacity-10">
          <h5 className="fw-bold mb-3 text-danger">
            Kewajiban Tagihan Lainnya (Iuran, dll)
          </h5>
          <Row className="g-3 text-start">
            {pendingBills.map((bill, idx) => (
              <Col md={6} key={idx}>
                <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                  <div>
                    <small className="text-muted d-block">
                      {bill.billing_name}
                    </small>
                    <span className="fw-bold fs-5 text-danger">
                      {formatRupiah(bill.total_amount)}
                    </span>
                  </div>
                  <div>
                    <Badge bg="danger" className="p-2">
                      Belum Lunas
                    </Badge>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <p className="text-danger small mt-3 mb-0">
            * Anda memiliki tagihan lain yang belum lunas. Harap lunasi tagihan
            ini sebelum mengajukan berhenti keanggotaan.
          </p>
        </div>
      )}
    </>
  );
}
