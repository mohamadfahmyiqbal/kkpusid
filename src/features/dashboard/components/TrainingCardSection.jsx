import React, { useMemo, useCallback } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { 
  MdSchool, 
  MdMenuBook, 
  MdPlayArrow, 
  MdChevronRight,
  MdOutlineAssignment,
  MdAccessTime
} from "react-icons/md";

/**
 * Komponen kartu pelatihan individu
 */
const TrainingItem = React.memo(({ item, onViewMateri, onStartEvaluasi }) => {
  const isWajib = item.label === "Program Wajib";
  
  // Warna badge berdasarkan status
  const statusConfig = useMemo(() => {
    switch (item.status) {
      case "Aktif":
        return { bg: "#dcfce7", color: "#15803d", label: "Tersedia" };
      case "Selesai":
        return { bg: "#dbeafe", color: "#1e40af", label: "Selesai" };
      default:
        return { bg: "#f1f5f9", color: "#475569", label: "Belum Mulai" };
    }
  }, [item.status]);

  const handleViewMateri = useCallback(() => {
    onViewMateri(item.id, item.type);
  }, [item.id, item.type, onViewMateri]);

  const handleStartEvaluasi = useCallback(() => {
    onStartEvaluasi(item.id, item.type);
  }, [item.id, item.type, onStartEvaluasi]);

  return (
    <div className="dc-train-card-wrapper h-100">
      <Card className="dc-train-card-v2 h-100 border-0 shadow-sm">
        <Card.Body className="p-4 d-flex flex-column">
          {/* Header Card: Badge & Status */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={`dc-badge-program ${isWajib ? 'wajib' : 'pilihan'}`}>
              {item.label}
            </span>
            <span 
              className="dc-status-pill"
              style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
            >
              {statusConfig.label}
            </span>
          </div>

          {/* Content: Code & Title */}
          <div className="flex-grow-1">
            <div className="dc-train-code d-flex align-items-center gap-1 mb-1">
              <MdOutlineAssignment size={14} className="opacity-50" />
              <span>{item.code}</span>
            </div>
            <h5 className="dc-train-title mb-3">{item.title}</h5>
            
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="dc-meta-info">
                <MdMenuBook size={16} />
                <span>1 Materi</span>
              </div>
              <div className="dc-meta-info">
                <MdAccessTime size={16} />
                <span>15 Soal</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              className="dc-btn-secondary d-flex align-items-center justify-content-center gap-2"
              onClick={handleViewMateri}
            >
              <MdMenuBook size={18} />
              <span>Baca Materi</span>
            </Button>
            <Button
              variant="primary"
              className="dc-btn-primary d-flex align-items-center justify-content-center gap-2"
              onClick={handleStartEvaluasi}
            >
              <MdPlayArrow size={20} />
              <span>Mulai Evaluasi</span>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
});

const TrainingCardSection = ({
  trainingData,
  onSeeAll,
  onViewMateri,
  onStartEvaluasi,
}) => {
  return (
    <section className="mb-4 dc-training-section">
      <div className="d-flex align-items-center justify-content-between mb-3 px-1">
        <div className="d-flex align-items-center gap-2">
          <div className="dc-section-icon bg-primary bg-opacity-10 text-primary">
            <MdSchool size={20} />
          </div>
          <h5 className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
            Evaluasi (Training)
          </h5>
        </div>
        <Button
          variant="link"
          className="p-0 text-decoration-none fw-bold d-flex align-items-center"
          style={{ fontSize: '13px' }}
          onClick={onSeeAll}
        >
          Lihat Semua <MdChevronRight size={18} />
        </Button>
      </div>

      <Row className="g-4">
        {trainingData.slice(0, 2).map((item) => (
          <Col xs={12} md={6} key={item.code}>
            <TrainingItem 
              item={item} 
              onViewMateri={onViewMateri} 
              onStartEvaluasi={onStartEvaluasi} 
            />
          </Col>
        ))}
      </Row>

    </section>
  );
};

export default React.memo(TrainingCardSection);
