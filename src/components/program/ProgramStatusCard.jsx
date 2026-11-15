// components/program/ProgramStatusCard.jsx

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaFileAlt } from "react-icons/fa";
import { 
  MdCached,
  MdHandshake,
  MdAddCircleOutline,
  MdReceiptLong,
  MdAccountBalance
} from "react-icons/md";

// CSS uses existing styles from JualBeliDashboardPage.css since they are global premium card styles
import "./ProgramStatusCard.css";

const ProgramStatusCard = ({
  title,
  message,
  buttonText,
  onButtonClick,
  variant,
  status,
  pendingAmount,
  pendingDesc
}) => {
  const isPending =
    variant === "pending" ||
    (message &&
      (message.toLowerCase().includes("menunggu") ||
        message.toLowerCase().includes("approval")));

  if (isPending) {
    return (
      <Card className="program-status-card program-status-pending border-0 text-white text-center p-4 p-md-5 shadow-lg">
        <div className="glass-sheen" />
        <Card.Body className="relative" style={{ zIndex: 2 }}>
          {/* Pulsing Radar Container */}
          <div className="program-radar-pulse mb-4">
            <div className="bg-warning bg-opacity-15 p-4 rounded-circle text-white mx-auto" style={{ width: "max-content" }}>
              <MdCached size={48} className="animate-spin-slow" />
            </div>
          </div>

          <h4 className="fw-bold mb-2 text-white">{title || "Pengajuan Sedang Diproses"}</h4>

          {pendingAmount > 0 && (
            <div className="my-3 py-2 px-4 rounded-pill d-inline-block blur-effect">
              <span className="small opacity-75 d-block text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>Nominal Pengajuan</span>
              <strong className="text-warning font-outfit" style={{ fontSize: '18px' }}>
                Rp {Number(pendingAmount).toLocaleString("id-ID")}
              </strong>
            </div>
          )}

          <p className="card-text opacity-90 mb-4 px-3 text-white-90">
            {message || pendingDesc || "Mohon tunggu verifikasi admin koperasi. Kami sedang memproses berkas Anda secara berkala."}
          </p>

          {/* Stepper Status tracker */}
          <div className="program-stepper-container mb-4">
            <div className="program-stepper-line">
              <div className="program-stepper-progress" style={{ width: '50%' }} />
            </div>
            <div className="program-stepper-step completed">
              <div className="program-stepper-node">✓</div>
              <div className="program-stepper-label">Pengajuan</div>
            </div>
            <div className="program-stepper-step active">
              <div className="program-stepper-node">2</div>
              <div className="program-stepper-label">Verifikasi</div>
            </div>
            <div className="program-stepper-step">
              <div className="program-stepper-node">3</div>
              <div className="program-stepper-label">Pencairan</div>
            </div>
          </div>

          {buttonText && onButtonClick && (
            <Button 
              variant="light" 
              className="rounded-pill px-5 py-2 fw-bold text-warning border-0 program-cta-btn shadow-md"
              onClick={onButtonClick}
            >
              <FaFileAlt size={14} className="me-2" />
              {buttonText}
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }

  // Empty State
  return (
    <Card className="program-status-card program-status-empty border-0 text-white text-center p-4 p-md-5 shadow-lg">
      <div className="program-decor-circle c1" />
      <div className="program-decor-circle c2" />
      <div className="program-glass-sheen" />
      <Card.Body className="relative" style={{ zIndex: 2 }}>
        <div className="mb-4 text-white opacity-90">
          <MdHandshake size={56} className="animate-pulse" />
        </div>
        
        <h4 className="fw-bold mb-2">{title || "Mulai Pengajuan Baru"}</h4>
        <p className="card-text opacity-80 mb-4 px-3">
            {message || "Dapatkan berbagai fasilitas secara syariah dengan akad yang mudah, adil, dan transparan."}
        </p>

        {/* Benefits Grid */}
        <div className="program-benefits-grid mb-5 text-center">
          <div className="program-benefit-card">
            <div className="program-benefit-icon">
              <MdHandshake size={22} />
            </div>
            <div className="program-benefit-title">100% Syariah</div>
            <div className="program-benefit-desc">Akad transparan tanpa bunga riba.</div>
          </div>
          <div className="program-benefit-card">
            <div className="program-benefit-icon">
              <MdReceiptLong size={22} />
            </div>
            <div className="program-benefit-title">Proses Instan</div>
            <div className="program-benefit-desc">Pengajuan online cepat langsung diverifikasi admin.</div>
          </div>
          <div className="program-benefit-card">
            <div className="program-benefit-icon">
              <MdAccountBalance size={22} />
            </div>
            <div className="program-benefit-title">Mudah & Aman</div>
            <div className="program-benefit-desc">Sistem koperasi yang bersahabat dan terpercaya.</div>
          </div>
        </div>

        {buttonText && onButtonClick && (
          <Button 
            variant="light" 
            className="rounded-pill px-5 py-2.5 fw-bold text-primary border-0 program-cta-btn shadow-md d-inline-flex align-items-center gap-2"
            onClick={onButtonClick}
          >
            {buttonText} <MdAddCircleOutline size={18} />
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProgramStatusCard;