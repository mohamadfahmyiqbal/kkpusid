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
  Form,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import {
  FaBook,
  FaHeadphones,
  FaEdit,
  FaDownload,
  FaFileAlt,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

const DetailMateri = () => {
  const navigate = useNavigate();
  const [materiData, setMateriData] = useState(null);
  const [activeTab, setActiveTab] = useState("audio");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    // Get kurikulumId from URL
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const kurikulumId = decoded?.kurikulumId;
      const type = decoded?.type;

      // TODO: Fetch materi data from API
      // fetchMateriData(kurikulumId, type);

      // Mock data
      setTimeout(() => {
        setMateriData({
          id: kurikulumId || 1,
          title: "Pengenalan Koperasi",
          type: type || "wajib",
          description: "Dasar-dasar pemahaman tentang koperasi",
          duration: "2 jam",
          modules: [
            {
              id: 1,
              title: "Modul 1: Sejarah Koperasi",
              duration: "15 menit",
              audioUrl: "/audio/modul1.mp3",
              documentUrl: "/docs/modul1.pdf",
              completed: true,
            },
            {
              id: 2,
              title: "Modul 2: Prinsip Koperasi",
              duration: "20 menit",
              audioUrl: "/audio/modul2.mp3",
              documentUrl: "/docs/modul2.pdf",
              completed: true,
            },
            {
              id: 3,
              title: "Modul 3: Jenis-Jenis Koperasi",
              duration: "25 menit",
              audioUrl: "/audio/modul3.mp3",
              documentUrl: "/docs/modul3.pdf",
              completed: false,
            },
            {
              id: 4,
              title: "Modul 4: Struktur Organisasi",
              duration: "30 menit",
              audioUrl: "/audio/modul4.mp3",
              documentUrl: "/docs/modul4.pdf",
              completed: false,
            },
            {
              id: 5,
              title: "Modul 5: Hak dan Kewajiban Anggota",
              duration: "30 menit",
              audioUrl: "/audio/modul5.mp3",
              documentUrl: "/docs/modul5.pdf",
              completed: false,
            },
          ],
          progress: 40,
          savedNotes: "Catatan penting tentang prinsip koperasi...",
        });
        setNotes("Catatan penting tentang prinsip koperasi...");
        setLoading(false);
      }, 1000);
    } catch (e) {
      console.error("Error decoding URL:", e);
      setError("Invalid URL");
      setLoading(false);
    }
  }, []);

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    try {
      // TODO: Call API to save notes
      // await TrainingService.saveNotes(materiData.id, notes);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMateriData((prev) => ({ ...prev, savedNotes: notes }));
    } catch (err) {
      setError("Gagal menyimpan catatan");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDownload = useCallback((url, filename) => {
    // TODO: Implement download
    console.log(`Downloading ${filename} from ${url}`);
  }, []);

  const handleStartEvaluasi = useCallback(() => {
    const token = jwtEncode({
      page: "evaluasi",
      kurikulumId: materiData?.id,
      type: materiData?.type,
    });
    navigate(`/${token}`);
  }, [navigate, materiData]);

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "trainingDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <LayoutGlobal title="Detail Materi">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat materi...</p>
        </div>
      </LayoutGlobal>
    );
  }

  if (error) {
    return (
      <LayoutGlobal title="Detail Materi">
        <Container className="mt-4">
          <Alert variant="danger">{error}</Alert>
          <Button onClick={handleBack}>Kembali</Button>
        </Container>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Detail Materi">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaBook className="me-2" />
            Detail Materi
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            {/* Materi Info Card */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-2">{materiData.title}</h5>
                    <p className="text-muted mb-0">{materiData.description}</p>
                  </div>
                  <Badge
                    bg={materiData.type === "wajib" ? "primary" : "secondary"}
                  >
                    {materiData.type === "wajib" ? "Wajib" : "Reguler"}
                  </Badge>
                </div>
                <div className="d-flex gap-3 small text-muted">
                  <span>
                    <FaHeadphones className="me-1" />
                    {materiData.duration}
                  </span>
                  <span>
                    <FaBook className="me-1" />
                    {materiData.modules.length} Modul
                  </span>
                  <span>Progress: {materiData.progress}%</span>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab
                    eventKey="audio"
                    title={
                      <>
                        <FaHeadphones className="me-2" />
                        Audio Materi
                      </>
                    }
                  >
                    <h6 className="fw-bold mb-3">Daftar Modul Audio</h6>
                    <ListGroup>
                      {materiData.modules.map((modul) => (
                        <ListGroup.Item
                          key={modul.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center">
                              {modul.completed && (
                                <FaCheckCircle className="text-success me-2" />
                              )}
                              <span
                                className={
                                  modul.completed
                                    ? "text-decoration-line-through text-muted"
                                    : ""
                                }
                              >
                                {modul.title}
                              </span>
                            </div>
                            <small className="text-muted">
                              {modul.duration}
                            </small>
                          </div>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                console.log("Play audio:", modul.audioUrl)
                              }
                            >
                              <FaHeadphones className="me-1" />
                              Putar
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                handleDownload(modul.documentUrl, modul.title)
                              }
                            >
                              <FaDownload className="me-1" />
                              Download
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>

                  <Tab
                    eventKey="catatan"
                    title={
                      <>
                        <FaEdit className="me-2" />
                        Catatan
                      </>
                    }
                  >
                    <h6 className="fw-bold mb-3">Catatan Pribadi</h6>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        rows={8}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tulis catatan Anda di sini..."
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={handleSaveNotes}
                      disabled={savingNotes}
                    >
                      {savingNotes ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <FaEdit className="me-2" />
                          Simpan Catatan
                        </>
                      )}
                    </Button>
                  </Tab>

                  <Tab
                    eventKey="dokumen"
                    title={
                      <>
                        <FaFileAlt className="me-2" />
                        Dokumen
                      </>
                    }
                  >
                    <h6 className="fw-bold mb-3">Dokumen Materi</h6>
                    <ListGroup>
                      {materiData.modules.map((modul) => (
                        <ListGroup.Item
                          key={modul.id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <div className="d-flex align-items-center">
                            <FaFileAlt className="text-primary me-2" />
                            <span>{modul.title}.pdf</span>
                          </div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              handleDownload(modul.documentUrl, modul.title)
                            }
                          >
                            <FaDownload className="me-1" />
                            Download
                          </Button>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                </Tabs>

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold text-muted"
                    onClick={handleBack}
                  >
                    <FaArrowLeft className="me-2" />
                    Kembali
                  </Button>
                  {materiData.progress >= 80 && (
                    <Button
                      variant="success"
                      className="px-5 py-2 fw-bold shadow-sm"
                      onClick={handleStartEvaluasi}
                    >
                      Mulai Evaluasi
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default DetailMateri;
