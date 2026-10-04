import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import { formatCurrency } from "./tabunganHelpers";

export default function AccountInfoCard({
  productConfig,
  accountData,
  progressPercentage,
}) {
  return (
    <Card className="shadow-lg border-0 mb-4 detail-tabungan-main-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="d-flex align-items-center">
            <div
              className={`detail-icon-wrapper bg-light rounded-3 me-3 text-${productConfig.color}`}
            >
              {productConfig.icon}
            </div>
            <div>
              <h5 className="fw-bold mb-1">{productConfig.label}</h5>
              <p className="text-muted mb-0 small">
                No. Rekening: {accountData.accountNumber}
              </p>
            </div>
          </div>
          <Badge bg="success" className="detail-status-badge px-3 py-2">
            Aktif
          </Badge>
        </div>

        <Row className="g-3">
          <Col md={6}>
            <Card className="bg-light border-0 h-100 detail-balance-card">
              <Card.Body className="p-3">
                <p className="text-muted mb-1 small">Saldo Saat Ini</p>
                <h4 className="fw-bold text-primary mb-0">
                  Rp {formatCurrency(accountData.currentBalance)}
                </h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-light border-0 h-100 detail-balance-card">
              <Card.Body className="p-3">
                <p className="text-muted mb-1 small">Target Saldo</p>
                <h4 className="fw-bold text-success mb-0">
                  Rp {formatCurrency(accountData.targetAmount)}
                </h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Progress */}
        <div className="mt-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted small">Progress</span>
            <span className="fw-bold small">{progressPercentage}%</span>
          </div>
          <div className="detail-progress">
            <div
              className="detail-progress-bar bg-success"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* Stats */}
        <Row className="mt-4 g-3">
          <Col md={4} xs={4}>
            <div className="text-center p-3 bg-light detail-stat-item">
              <p className="text-muted mb-1">Setoran Awal</p>
              <p className="fw-bold mb-0">
                Rp {formatCurrency(accountData.initialDeposit)}
              </p>
            </div>
          </Col>
          <Col md={4} xs={4}>
            <div className="text-center p-3 bg-light detail-stat-item">
              <p className="text-muted mb-1">Target Bulanan</p>
              <p className="fw-bold mb-0">
                Rp {formatCurrency(accountData.monthlyTarget)}
              </p>
            </div>
          </Col>
          <Col md={4} xs={4}>
            <div className="text-center p-3 bg-light detail-stat-item">
              <p className="text-muted mb-1">Sisa Tenor</p>
              <p className="fw-bold mb-0">{accountData.tenor} Bulan</p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
