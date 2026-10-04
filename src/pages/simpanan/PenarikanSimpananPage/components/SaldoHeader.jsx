import React from "react";
import { Spinner } from "react-bootstrap";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";

const SaldoHeader = ({ balance, loading }) => (
  <div
    className="p-4 text-white position-relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(13, 71, 161, 0.25)",
    }}
  >
    {/* Decorative Circle Background */}
    <div
      className="position-absolute"
      style={{
        top: "-20px",
        right: "-20px",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.1)",
      }}
    />

    <div className="position-relative z-1">
      <p
        className="opacity-75 small fw-medium mb-1 text-uppercase"
        style={{ letterSpacing: "1px" }}
      >
        Saldo Tersedia
      </p>
      {loading ? (
        <Spinner animation="grow" size="sm" variant="light" />
      ) : (
        <h1
          className="fw-bold mb-2"
          style={{ fontSize: "2.4rem", letterSpacing: "-1px" }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: "4px" }}>Rp</span>
          {formatRupiah(balance)}
        </h1>
      )}

      <div className="d-inline-flex align-items-center px-2 py-1 bg-white bg-opacity-10 rounded-pill mt-2">
        <div
          className="bg-success rounded-circle me-2"
          style={{ width: "6px", height: "6px" }}
        />
        <span style={{ fontSize: "11px", fontWeight: "500" }}>
          Tersinkronisasi Otomatis
        </span>
      </div>
    </div>
  </div>
);

export default React.memo(SaldoHeader);
