import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  
  Badge,
  Tabs,
  Tab} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../utils/helpers";
import TrainingService from "../../services/training.service";
import {
  FaChalkboardTeacher,
  FaBook,
  FaTrophy,
  FaHeadphones,
} from "react-icons/fa";
import "./TrainingDashboardPage.css";
import Alert from "../../components/ui/SwalAlert";


const TrainingDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kurikulum");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kurikulumWajib, setKurikulumWajib] = useState([]);
  const [kurikulumReguler, setKurikulumReguler] = useState([]);

  useEffect(() => {
    const fetchCurriculums = async () => {
      try {
        setLoading(true);
        const [resWajib, resReguler] = await Promise.all([
          TrainingService.getCurriculums("WAJIB"),
          TrainingService.getCurriculums("REGULER")
        ]);

        const mapData = (item) => ({
          id: item.curriculum_id,
          title: item.curriculum_name,
          description: item.description,
          duration: "-", // Belum ada di API
          modules: item.materials_count || 0, // Fallback ke 0
          completed: item.progress === 100,
          progress: item.progress || 0,
        });

        if (resWajib.status) {
          setKurikulumWajib(resWajib.data.map(mapData));
        }
        if (resReguler.status) {
          setKurikulumReguler(resReguler.data.map(mapData));
        }
      } catch (err) {
        setError("Gagal memuat daftar kurikulum");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculums();
  }, []);

  const handleViewMateri = useCallback(
    (kurikulumId, type) => {
      const token = jwtEncode({
        page: "detailMateri",
        kurikulumId,
        type,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleStartEvaluasi = useCallback(
    (kurikulumId, type) => {
      const token = jwtEncode({
        page: "evaluasi",
        kurikulumId,
        type,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleViewRanking = useCallback(() => {
    const token = jwtEncode({ page: "ranking" });
    navigate(`/${token}`);
  }, [navigate]);

  const renderKurikulumCard = (item, type) => (
    <Card
      key={item.id}
      className={`training-card h-100 border-0 shadow-sm transition-all ${item.completed ? 'training-card-completed' : ''}`}
    >
      <div className="training-card-header-icon p-3">
         <div className="icon-wrapper bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
            <FaChalkboardTeacher size={24} />
         </div>
      </div>
      <Card.Body className="p-4 pt-0">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-bold text-dark-blue line-clamp-2">{item.title}</h5>
          {item.completed && (
            <Badge bg="success" className="rounded-pill px-3 py-1">
              Selesai
            </Badge>
          )}
        </div>
        
        <p className="text-muted small mb-3 line-clamp-2" style={{ minHeight: '3em' }}>
          {item.description}
        </p>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <div className="d-flex align-items-center gap-1 small text-muted bg-light px-3 py-1 rounded-pill">
            <FaBook className="text-primary" />
            <span>{item.modules} Modul</span>
          </div>
          {item.duration !== "-" && (
             <div className="d-flex align-items-center gap-1 small text-muted bg-light px-3 py-1 rounded-pill">
               <FaHeadphones className="text-primary" />
               <span>{item.duration}</span>
             </div>
          )}
        </div>

        <div className="training-progress-section mb-4">
          <div className="d-flex justify-content-between mb-1 align-items-end">
            <span className="small text-muted fw-bold">Progress Belajar</span>
            <span className="small fw-black text-primary">{item.progress}%</span>
          </div>
          <div className="progress rounded-pill overflow-hidden" style={{ height: "8px", background: '#f1f5f9' }}>
            <div
              className={`progress-bar transition-all ${item.progress === 100 ? 'bg-success' : 'bg-primary'}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-auto">
          <Button
            variant={item.progress > 0 ? "primary" : "outline-primary"}
            className="flex-grow-1 fw-bold rounded-3 py-2 btn-training-action"
            onClick={() => handleViewMateri(item.id, type)}
          >
            {item.progress === 100 ? "Review Materi" : (item.progress > 0 ? "Lanjutkan" : "Mulai Belajar")}
          </Button>
          {item.progress >= 80 && !item.completed && (
            <Button
              variant="success"
              className="fw-bold rounded-3 py-2 btn-training-evaluasi px-4"
              onClick={() => handleStartEvaluasi(item.id, type)}
              title="Evaluasi"
            >
              <FaTrophy />
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted fw-medium">Memuat kurikulum training...</p>
      </div>
    );
  }

  return (
    <Container fluid className="px-2 px-md-3 py-3 fade-in">
      <Row>
        <Col xs={12}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4 custom-training-tabs gap-2 pt-4 px-4"
                  variant="pills"
                >
                  <Tab
                    eventKey="kurikulum" 
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaBook /> 
                        <span>Kurikulum</span>
                      </div>
                    }
                  >
                    <div className="px-4 pb-4">
                      <Tabs
                        defaultActiveKey="wajib"
                        id="kurikulum-sub-tabs"
                        className="mb-4 custom-training-pills gap-2"
                        variant="pills"
                      >
                        <Tab eventKey="wajib" title="Kurikulum Wajib">
                          <Row className="g-4 mt-2">
                            {kurikulumWajib.map((item) => (
                              <Col lg={4} md={6} key={item.id}>
                                {renderKurikulumCard(item, "wajib")}
                              </Col>
                            ))}
                          </Row>
                          {kurikulumWajib.length === 0 && (
                            <div className="text-center py-5 bg-light rounded-4 text-muted mt-4">
                              <FaBook className="fs-1 mb-3 text-secondary opacity-50" />
                              <p className="mb-0">Tidak ada kurikulum wajib saat ini</p>
                            </div>
                          )}
                        </Tab>

                        <Tab eventKey="reguler" title="Kurikulum Reguler">
                          <Row className="g-4 mt-2">
                            {kurikulumReguler.map((item) => (
                              <Col lg={4} md={6} key={item.id}>
                                {renderKurikulumCard(item, "reguler")}
                              </Col>
                            ))}
                          </Row>
                          {kurikulumReguler.length === 0 && (
                            <div className="text-center py-5 bg-light rounded-4 text-muted mt-4">
                              <FaBook className="fs-1 mb-3 text-secondary opacity-50" />
                              <p className="mb-0">Tidak ada kurikulum reguler saat ini</p>
                            </div>
                          )}
                        </Tab>
                      </Tabs>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="ranking"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaTrophy /> 
                        <span>Peringkat</span>
                      </div>
                    }
                  >
                    <div className="text-center py-5 px-4">
                      <div
                        className="text-muted mb-3"
                        style={{ fontSize: "64px" }}
                      >
                        <FaTrophy />
                      </div>
                      <h5 className="fw-bold mb-3">Peringkat Peserta</h5>
                      <p className="text-muted mb-4">
                        Lihat peringkat Anda dibandingkan dengan peserta lain
                      </p>
                      <Button
                        variant="primary"
                        className="px-5 py-2 fw-bold shadow-sm rounded-pill"
                        onClick={handleViewRanking}
                      >
                        Lihat Peringkat
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
  );
};


export default TrainingDashboardPage;
