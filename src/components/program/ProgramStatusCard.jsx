// components/program/ProgramStatusCard.jsx

import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaFileAlt, FaCheckCircle, FaShieldAlt, FaPercent } from "react-icons/fa";
import "./ProgramStatusCard.css";

const ProgramStatusCard = ({
  title,
  message,
  buttonText,
  onButtonClick,
  variant,
  status,
}) => {
  // Infer state if not explicitly passed via variant
  const isPending =
    variant === "pending" ||
    (message &&
      (message.toLowerCase().includes("menunggu") ||
        message.toLowerCase().includes("approval")));

  const isTabunganEmpty = status === "NG";

  let stateClass = "program-status-empty";
  if (isPending) {
    stateClass = "program-status-pending";
  } else if (status === "OK" && !isTabunganEmpty) {
    stateClass = "program-status-active";
  }

  return (
    <Card className={`program-status-card ${stateClass}`}>
      {/* Glossy overlay effect */}
      <div className="program-glass-sheen" />

      {/* Decorative floating blurred spheres (only for empty/NG state) */}
      {!isPending && (
        <>
          <div className="program-decor-circle c1" />
          <div className="program-decor-circle c2" />
        </>
      )}

      <Card.Body>
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{message}</p>

        {/* Stepper Approval Tracker for Pending status */}
        {isPending && (
          <div className="mb-4">
            <div className="program-stepper-container">
              <div className="program-stepper-line">
                <div className="program-stepper-progress" style={{ width: "66%" }} />
              </div>
              <div className="program-stepper-step completed">
                <div className="program-stepper-node">1</div>
                <span className="program-stepper-label">Diajukan</span>
              </div>
              <div className="program-stepper-step completed">
                <div className="program-stepper-node">2</div>
                <span className="program-stepper-label">Verifikasi</span>
              </div>
              <div className="program-stepper-step active">
                <div className="program-stepper-node program-radar-pulse">3</div>
                <span className="program-stepper-label">Persetujuan</span>
              </div>
              <div className="program-stepper-step">
                <div className="program-stepper-node">4</div>
                <span className="program-stepper-label">Selesai</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Call to Action Button */}
        {buttonText && onButtonClick && (
          <Button
            variant="light"
            onClick={onButtonClick}
            className="program-cta-btn"
          >
            <FaFileAlt size={14} className="btn-icon" />
            {buttonText}
          </Button>
        )}

        {/* Benefits Grid for Empty / Inactive status */}
        {!isPending && !isTabunganEmpty && (
          <div className="program-benefits-grid">
            <div className="program-benefit-card">
              <div className="program-benefit-icon">
                <FaCheckCircle size={16} />
              </div>
              <h6 className="program-benefit-title">Proses Cepat</h6>
              <p className="program-benefit-desc">
                Persetujuan praktis tanpa kendala
              </p>
            </div>
            <div className="program-benefit-card">
              <div className="program-benefit-icon">
                <FaShieldAlt size={16} />
              </div>
              <h6 className="program-benefit-title">Prinsip Syariah</h6>
              <p className="program-benefit-desc">
                Transaksi aman & penuh berkah
              </p>
            </div>
            <div className="program-benefit-card">
              <div className="program-benefit-icon">
                <FaPercent size={15} />
              </div>
              <h6 className="program-benefit-title">Bagi Hasil Adil</h6>
              <p className="program-benefit-desc">
                Margin bersaing & transparan
              </p>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProgramStatusCard;