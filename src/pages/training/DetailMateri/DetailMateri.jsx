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
  Tab,
  Form,
  ListGroup} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import TrainingService from "../../../services/training.service";
import {
  FaEdit,
  FaDownload,
  FaFileAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaBookOpen,
  FaRegFilePdf,
  FaQuestionCircle,
  FaClock,
} from "react-icons/fa";
import "./DetailMateri.css";
import Alert from "../../../components/ui/SwalAlert";


const DetailMateri = () => {
  const navigate = useNavigate();
  const [materiData, setMateriData] = useState(null);
  const [activeTab, setActiveTab] = useState("materi");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const kurikulumId = decoded?.kurikulumId;
      const type = decoded?.type;

      const fetchMateriData = async () => {
        try {
          setLoading(true);
          const response = await TrainingService.getMaterials(kurikulumId);
          
          if (response.status) {
            // Transform data if needed, or set directly
            const materials = response.data;
            
            // Assume the first material represents the curriculum info for now
            // or fetch curriculum detail separately if needed
            setMateriData({
              id: kurikulumId,
              title: materials[0]?.curriculum?.curriculum_name || "Materi Training",
              type: type || "WAJIB",
              description: materials[0]?.curriculum?.description || "Pelajari materi ini untuk meningkatkan pengetahuan Anda.",
              duration: "-", // Or calculate from materials
              modules: materials.map(m => ({
                id: m.material_id,
                title: m.material_title,
                duration: m.duration || "15 menit",
                documentUrl: m.content_url,
                completed: m.evaluations?.length > 0 && m.evaluations[0].passed,
                quizCompleted: m.evaluations?.length > 0 && m.evaluations[0].passed,
              })),
              progress: 0, // Calculate progress
            });
            
            // Calculate progress based on passed evaluations
            const passedCount = materials.filter(m => m.evaluations?.length > 0 && m.evaluations[0].passed).length;
            const progress = materials.length > 0 ? Math.round((passedCount / materials.length) * 100) : 0;
            
            setMateriData(prev => ({ ...prev, progress }));
            
            // Notes handling
            if (materials.length > 0 && materials[0].notes?.length > 0) {
              setNotes(materials[0].notes[0].note_content);
            }
          }
        } catch (err) {
          setError("Gagal memuat detail materi");
        } finally {
          setLoading(false);
        }
      };

      fetchMateriData();
    } catch (e) {
      console.error("Error decoding URL:", e);
      setError("URL tidak valid");
      setLoading(false);
    }
  }, []);

  const handleSaveNotes = async () => {
    if (!notes.trim() || !materiData) return;
    
    setSavingNotes(true);
    try {
      const materialId = materiData.modules?.[0]?.id;
      if (materialId) {
        await TrainingService.saveNote(materialId, notes);
        setMateriData((prev) => ({ ...prev, savedNotes: notes }));
        // Could add a toast here for success
      }
    } catch (err) {
      setError("Gagal menyimpan catatan");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDownload = useCallback((url, filename) => {
    // Implement download logic here
  }, []);

  const handleReadMateri = useCallback((modulId) => {
    const token = jwtEncode({
      page: "bacaMateri",
      kurikulumId: materiData?.id,
      modulId: modulId,
      type: materiData?.type,
    });
    navigate(`/${token}`);
  }, [navigate, materiData]);

  const handleStartQuizMateri = useCallback((modulId) => {
    // Navigate to specific module quiz
    console.log("Start quiz for module:", modulId);
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
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 text-muted fw-medium">Menyiapkan materi belajar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger" className="rounded-4 shadow-sm border-0 py-4">
           <h5 className="fw-bold mb-3">{error}</h5>
           <Button variant="danger" className="rounded-pill px-4" onClick={handleBack}>Kembali ke Dashboard</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="detail-materi-container pb-5">
      <Container fluid className="mt-4 px-0">
        <Row className="mx-0">
          <Col xs={12}>
            {/* Learning Content Section */}
            <Card className="shadow-sm border-0 rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="custom-detail-tabs nav-pills p-4 bg-light bg-opacity-50 border-bottom"
                >
                  <Tab
                    eventKey="materi"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaBookOpen />
                        <span>Materi Belajar</span>
                      </div>
                    }
                  >
                    <div className="p-4 p-md-5">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Modul Pembelajaran</h5>
                        <Badge bg="info" className="bg-opacity-10 text-info px-3 py-2 rounded-pill">
                          {materiData.modules.length} Modul Tersedia
                        </Badge>
                      </div>
                      <ListGroup variant="flush" className="border-0">
                        {materiData.modules.map((modul) => (
                          <ListGroup.Item
                            key={modul.id}
                            className={`module-list-item d-flex align-items-center gap-3 ${modul.completed ? 'completed' : ''}`}
                          >
                            <div className={`module-icon-box ${modul.completed ? 'bg-success bg-opacity-10 text-success' : 'bg-primary bg-opacity-10 text-primary'}`}>
                              {modul.completed ? <FaCheckCircle size={20} /> : <FaBookOpen size={20} />}
                            </div>
                            <div className="flex-grow-1">
                              <h6 className={`fw-bold mb-1 ${modul.completed ? 'text-success' : 'text-dark'}`}>
                                {modul.title}
                              </h6>
                              <small className="text-muted d-flex align-items-center gap-2">
                                <FaClock size={12} /> {modul.duration}
                              </small>
                            </div>
                            <div className="d-flex gap-2">
                              <Button
                                variant={modul.completed ? "outline-success" : "primary"}
                                size="sm"
                                className="rounded-pill px-4 fw-bold"
                                onClick={() => handleReadMateri(modul.id)}
                              >
                                {modul.completed ? "Baca Lagi" : "Baca Materi"}
                              </Button>
                              <Button
                                variant={modul.quizCompleted ? "success" : "outline-warning"}
                                size="sm"
                                className="rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
                                onClick={() => handleStartQuizMateri(modul.id)}
                                disabled={!modul.completed && !modul.quizCompleted}
                              >
                                <FaQuestionCircle />
                                <span>Quiz</span>
                                {modul.quizCompleted && <FaCheckCircle size={12} />}
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="dokumen"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaFileAlt />
                        <span>Dokumen Materi</span>
                      </div>
                    }
                  >
                    <div className="p-4 p-md-5">
                       <h5 className="fw-bold mb-4">Materi Pendukung (.PDF)</h5>
                       <ListGroup variant="flush">
                        {materiData.modules.map((modul) => (
                          <ListGroup.Item
                            key={modul.id}
                            className="module-list-item d-flex align-items-center gap-3"
                          >
                            <div className="module-icon-box bg-danger bg-opacity-10 text-danger">
                              <FaRegFilePdf size={22} />
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-0">{modul.title}</h6>
                              <small className="text-muted">PDF Document</small>
                            </div>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-pill px-3"
                              onClick={() => handleDownload(modul.documentUrl, modul.title)}
                            >
                              <FaDownload size={14} className="me-1" /> Download
                            </Button>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Tab>

                  <Tab
                    eventKey="catatan"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaEdit />
                        <span>Catatan Saya</span>
                      </div>
                    }
                  >
                    <div className="p-4 p-md-5">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">Catatan Pembelajaran</h5>
                        <small className="text-muted">Otomatis tersimpan sebagai draft</small>
                      </div>
                      <Form.Group className="mb-4">
                        <Form.Control
                          as="textarea"
                          className="notes-textarea"
                          rows={8}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Tulis hal-hal penting yang Anda pelajari hari ini..."
                        />
                      </Form.Group>
                      <div className="text-end">
                        <Button
                          variant="primary"
                          className="px-5 py-2 fw-bold rounded-pill shadow-sm"
                          onClick={handleSaveNotes}
                          disabled={savingNotes}
                        >
                          {savingNotes ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Menyimpan...
                            </>
                          ) : (
                            <>Simpan Catatan</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>

                {/* Footer Actions */}
                <div className="p-4 bg-light border-top d-flex flex-column flex-md-row justify-content-between gap-3">
                  <Button
                    variant="link"
                    className="btn-back-elegant text-decoration-none d-flex align-items-center justify-content-center gap-2"
                    onClick={handleBack}
                  >
                    <FaArrowLeft />
                    <span>Kembali ke Dashboard</span>
                  </Button>
                  
                  {materiData.progress >= 80 && (
                    <Button
                      variant="success"
                      className="px-5 py-2 fw-black rounded-pill shadow-md border-0"
                      onClick={handleStartEvaluasi}
                      style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                    >
                      AMBIL EVALUASI SEKARANG
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailMateri;
