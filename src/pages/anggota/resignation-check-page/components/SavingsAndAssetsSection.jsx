import React from "react";
import { Row, Col } from "react-bootstrap";
import { formatRupiah } from "./resignationHelpers";

export default function SavingsAndAssetsSection({ savingsInfo, otherAssets }) {
  const totalSimpanan = savingsInfo
    ? savingsInfo.pokok + savingsInfo.wajib + savingsInfo.sukarela
    : 0;

  return (
    <>
      {/* Informasi Simpanan */}
      {savingsInfo && (
        <div className="rcp-savings-section mb-4 p-4 rounded bg-light border border-secondary border-opacity-10">
          <h5 className="fw-bold mb-3">Informasi Simpanan Anda</h5>
          <Row className="g-3 text-start">
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                <small className="text-muted d-block">Simpanan Pokok</small>
                <span className="fw-bold text-dark fs-5">
                  {formatRupiah(savingsInfo.pokok)}
                </span>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                <small className="text-muted d-block">Simpanan Wajib</small>
                <span className="fw-bold text-dark fs-5">
                  {formatRupiah(savingsInfo.wajib)}
                </span>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                <small className="text-muted d-block">Simpanan Sukarela</small>
                <span className="fw-bold text-dark fs-5">
                  {formatRupiah(savingsInfo.sukarela)}
                </span>
              </div>
            </Col>
          </Row>
          <div className="mt-3 text-end">
            <small className="text-muted me-2">Total Simpanan:</small>
            <strong className="text-primary fs-5">
              {formatRupiah(totalSimpanan)}
            </strong>
          </div>
          <p className="text-muted small mt-3 mb-0">
            * Total simpanan ini akan dikembalikan kepada Anda setelah proses
            pemberhentian keanggotaan disetujui (dikurangi tagihan/kewajiban jika
            ada dan sesuai AD/ART).
          </p>
        </div>
      )}

      {/* Informasi Tabungan */}
      {otherAssets && otherAssets.tabunganList.length > 0 && (
        <div className="rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25">
          <h5 className="fw-bold mb-3 text-info-emphasis">
            Informasi Tabungan Anda
          </h5>
          <Row className="g-3 text-start">
            {otherAssets.tabunganList.map((tab, idx) => (
              <Col md={4} key={idx}>
                <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                  <small className="text-muted d-block">{tab.name}</small>
                  <span className="fw-bold text-dark fs-5">
                    {formatRupiah(tab.balance)}
                  </span>
                </div>
              </Col>
            ))}
          </Row>
          <p className="text-muted small mt-3 mb-0">
            * Saldo tabungan ini akan dikembalikan atau diselesaikan sesuai
            dengan ketentuan koperasi saat pemberhentian keanggotaan Anda
            disetujui.
          </p>
        </div>
      )}

      {/* Informasi Investasi */}
      {otherAssets && otherAssets.investasi > 0 && (
        <div className="rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25">
          <h5 className="fw-bold mb-3 text-info-emphasis">
            Informasi Investasi Anda
          </h5>
          <Row className="g-3 text-start">
            <Col md={4}>
              <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                <small className="text-muted d-block">Total Investasi</small>
                <span className="fw-bold text-dark fs-5">
                  {formatRupiah(otherAssets.investasi)}
                </span>
              </div>
            </Col>
          </Row>
          <p className="text-muted small mt-3 mb-0">
            * Saldo investasi ini akan diselesaikan sesuai dengan ketentuan
            koperasi saat pemberhentian keanggotaan Anda disetujui.
          </p>
        </div>
      )}
    </>
  );
}
