import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../utils/helpers";
import LayoutGlobal from "../../components/layout/components/LayoutGlobal";
import {
  FaChalkboardTeacher,
  FaBook,
  FaTrophy,
  FaHeadphones,
} from "react-icons/fa";

const TrainingDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("kurikulum");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kurikulumWajib, setKurikulumWajib] = useState([]);
  const [kurikulumReguler, setKurikulumReguler] = useState([]);

  useEffect(() => {
    // TODO: Fetch data from API
    // fetchKurikulumWajib();
    // fetchKurikulumReguler();

    // Mock data
    setTimeout(() => {
      setKurikulumWajib([
        {
          id: 1,
          title: "Pengenalan Koperasi",
          description: "Dasar-dasar pemahaman tentang koperasi",
          duration: "2 jam",
          modules: 5,
          completed: true,
          progress: 100,
        },
        {
          id: 2,
          title: "Manajemen Keuangan Koperasi",
          description: "Prinsip dan praktik manajemen keuangan",
          duration: "3 jam",
          modules: 8,
          completed: false,
          progress: 60,
        },
        {
          id: 3,
          title: "Etika Bisnis Syariah",
          description: "Penerapan prinsip syariah dalam bisnis",
          duration: "2.5 jam",
          modules: 6,
          completed: false,
          progress: 0,
        },
      ]);

      setKurikulumReguler([
        {
          id: 4,
          title: "Leadership Koperasi",
          description: "Pengembangan kepemimpinan untuk pengurus",
          duration: "4 jam",
          modules: 10,
          completed: false,
          progress: 30,
        },
        {
          id: 5,
          title: "Digital Marketing Koperasi",
          description: "Strategi pemasaran digital untuk koperasi",
          duration: "3 jam",
          modules: 7,
          completed: false,
          progress: 0,
        },
      ]);

      setLoading(false);
    }, 1000);
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
      className="h-100 border-0 shadow-sm hover-shadow transition-all"
    >
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-2">{item.title}</h6>
            <p className="text-muted small mb-2">{item.description}</p>
            <div className="d-flex gap-3 small text-muted">
              <span>
                <FaBook className="me-1" />
                {item.modules} Modul
              </span>
              <span>
                <FaHeadphones className="me-1" />
                {item.duration}
              </span>
            </div>
          </div>
          {item.completed && (
            <Badge bg="success" className="ms-2">
              Selesai
            </Badge>
          )}
        </div>

        {item.progress > 0 && !item.completed && (
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="small text-muted">Progress</span>
              <span className="small fw-bold">{item.progress}%</span>
            </div>
            <div className="progress" style={{ height: "6px" }}>
              <div
                className="progress-bar bg-primary"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="d-flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-grow-1"
            onClick={() => handleViewMateri(item.id, type)}
          >
            {item.progress > 0 ? "Lanjutkan" : "Mulai"}
          </Button>
          {item.progress >= 80 && !item.completed && (
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => handleStartEvaluasi(item.id, type)}
            >
              Evaluasi
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (loading) {
    return (
      <LayoutGlobal title="Training">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat kurikulum training...</p>
        </div>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Training">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaChalkboardTeacher className="me-2" />
            E-Training & Sertifikasi
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab eventKey="kurikulum" title="Kurikulum">
                    <Tabs
                      defaultActiveKey="wajib"
                      id="kurikulum-sub-tabs"
                      className="mb-4"
                    >
                      <Tab eventKey="wajib" title="Kurikulum Wajib">
                        <h6 className="fw-bold mb-3">Materi Wajib</h6>
                        <Row className="g-3">
                          {kurikulumWajib.map((item) => (
                            <Col md={6} key={item.id}>
                              {renderKurikulumCard(item, "wajib")}
                            </Col>
                          ))}
                        </Row>
                        {kurikulumWajib.length === 0 && (
                          <div className="text-center py-4 text-muted">
                            Tidak ada kurikulum wajib saat ini
                          </div>
                        )}
                      </Tab>

                      <Tab eventKey="reguler" title="Kurikulum Reguler">
                        <h6 className="fw-bold mb-3">Materi Reguler</h6>
                        <Row className="g-3">
                          {kurikulumReguler.map((item) => (
                            <Col md={6} key={item.id}>
                              {renderKurikulumCard(item, "reguler")}
                            </Col>
                          ))}
                        </Row>
                        {kurikulumReguler.length === 0 && (
                          <div className="text-center py-4 text-muted">
                            Tidak ada kurikulum reguler saat ini
                          </div>
                        )}
                      </Tab>
                    </Tabs>
                  </Tab>

                  <Tab
                    eventKey="ranking"
                    title={
                      <>
                        <FaTrophy className="me-2" />
                        Peringkat
                      </>
                    }
                  >
                    <div className="text-center py-5">
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
                        className="px-5 py-2 fw-bold shadow-sm"
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
    </LayoutGlobal>
  );
};

export default TrainingDashboardPage;
