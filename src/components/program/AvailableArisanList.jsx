import React from "react";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  MdGroup,
  MdChevronRight,
  MdEvent,
  MdPeople,
  MdTrackChanges,
  MdPayments,
} from "react-icons/md";

// Helper formatting functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

/**
 * Komponen untuk menampilkan daftar Arisan yang tersedia untuk diikuti.
 */
export default function AvailableArisanList({ availableArisan = [], onJoinClick }) {
  if (!availableArisan || availableArisan.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <div className="d-flex align-items-center gap-2 mb-3 px-1">
        <MdTrackChanges size={20} className="text-teal" />
        <h6 className="fw-bold mb-0 text-muted font-outfit" style={{ letterSpacing: "0.2px" }}>
          Pilih Arisan yang Tersedia
        </h6>
      </div>
      <Row className="g-3">
        {availableArisan.map((arisan, idx) => {
          const programName = arisan.program_name || arisan.title || "-";
          const batchName = arisan.batch_name || arisan.batch || "-";
          
          const currentPeserta = arisan.participant_count ?? (arisan.peserta ? parseInt(arisan.peserta.split("/")[0]) : 0);
          const maxPeserta = arisan.max_participants ?? (arisan.peserta ? parseInt(arisan.peserta.split("/")[1]) : 1);
          
          const isFull = arisan.status === "full" || currentPeserta >= maxPeserta;
          
          const fillPercentage = maxPeserta > 0 ? Math.min(
            100,
            Math.round((currentPeserta / maxPeserta) * 100)
          ) : 0;

          const targetValue = arisan.target_amount ?? arisan.target ?? 0;
          const contributionValue = arisan.monthly_contribution ?? arisan.setoran ?? 0;
          
          const displayPeriod = arisan.start_date
            ? (isNaN(new Date(arisan.start_date).getTime())
                ? arisan.start_date
                : new Date(arisan.start_date).toLocaleDateString("id-ID", {
                    month: "short",
                    year: "numeric",
                  }))
            : (arisan.periode || "-");

          const participantsDisplay = arisan.peserta || `${currentPeserta}/${maxPeserta} Peserta`;
          const displayTarget = typeof targetValue === "string" ? targetValue : formatCurrency(targetValue);
          const displayContribution = typeof contributionValue === "string" ? contributionValue : `${formatCurrency(contributionValue)}/bln`;

          return (
            <Col md={6} lg={6} xl={4} key={arisan.arisan_id || arisan.id || idx}>
              <Card className="dc-arisan-card border-0 shadow-sm h-100 overflow-hidden font-outfit">
                <div className="dc-arisan-card-header px-4 py-3 text-white d-flex justify-content-between align-items-center">
                  <span
                    className="small fw-bold text-uppercase opacity-75"
                    style={{ letterSpacing: "1px", fontSize: "10px" }}
                  >
                    Batch {batchName}
                  </span>
                  <Badge
                    bg={isFull ? "danger" : "success"}
                    className={`premium-status-badge border-0 ${isFull ? "status-full" : "status-available"}`}
                  >
                    {isFull ? "Penuh" : "Tersedia"}
                  </Badge>
                </div>
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="fw-bold mb-3 text-dark font-outfit" style={{ fontSize: "1.1rem" }}>
                      {programName}
                    </h6>

                    <div className="dc-arisan-grid mb-4">
                      <div className="dc-arisan-info-item">
                        <MdPeople size={18} />
                        <div>
                          <small>Peserta</small>
                          <strong>{participantsDisplay}</strong>
                        </div>
                      </div>
                      <div className="dc-arisan-info-item">
                        <MdTrackChanges size={18} />
                        <div>
                          <small>Target</small>
                          <strong>{displayTarget}</strong>
                        </div>
                      </div>
                      <div className="dc-arisan-info-item">
                        <MdPayments size={18} />
                        <div>
                          <small>Setoran</small>
                          <strong>{displayContribution}</strong>
                        </div>
                      </div>
                      <div className="dc-arisan-info-item">
                        <MdEvent size={18} />
                        <div>
                          <small>Mulai/Periode</small>
                          <strong>{displayPeriod}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Participant Progress Bar */}
                    <div className="arisan-progress-section mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted fw-bold" style={{ fontSize: "10.5px" }}>
                          Keterisian Batch
                        </span>
                        <span className="text-teal fw-bold" style={{ fontSize: "10.5px" }}>
                          {fillPercentage}%
                        </span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${fillPercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={isFull ? "outline-secondary" : "primary"}
                    className={`w-100 fw-bold rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm border-0 ${
                      isFull ? "arisan-btn-full" : "premium-btn-hover arisan-btn-join"
                    }`}
                    disabled={isFull}
                    style={!isFull ? {
                      background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                      transition: "all 0.2s",
                    } : {}}
                    onClick={() => onJoinClick && onJoinClick(arisan)}
                  >
                    {isFull ? (
                      <>
                        <MdPeople size={18} />
                        <span>Penuh</span>
                      </>
                    ) : (
                      <>
                        <span>Gabung Arisan</span>
                        <MdChevronRight size={18} />
                      </>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

