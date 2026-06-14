import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Spinner, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import TrainingService from "../../../services/training.service";
import { FaArrowLeft, FaCheckCircle, FaClock, FaBookOpen } from "react-icons/fa";
import "./BacaMateri.css";

const BacaMateri = ({ decodedToken }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [materi, setMateri] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const { kurikulumId, modulId } = decodedToken || {};
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await TrainingService.getMaterialDetail(modulId);
        if (response.status) {
          const data = response.data;
          setMateri({
            id: data.material_id,
            title: data.material_title,
            kurikulumTitle: data.curriculum?.curriculum_name || "Materi Training",
            duration: data.duration || "15 Menit",
            content: data.description // Use description as content if no dedicated content field
          });
        }
      } catch (err) {
        console.error("Failed to fetch material content", err);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    if (modulId) {
      fetchContent();
    }
  }, [decodedToken]);

  const handleFinish = useCallback(() => {
    // Navigate to Evaluasi
    const token = jwtEncode({ 
      page: "evaluasi", 
      kurikulumId: decodedToken?.kurikulumId,
      modulId: decodedToken?.modulId,
      type: decodedToken?.type 
    });
    navigate(`/${token}`);
  }, [navigate, decodedToken]);

  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "trainingDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 text-muted">Membuka materi...</p>
      </div>
    );
  }

  return (
    <div className="baca-materi-container pb-5">
      <div className="reading-progress-bar">
        <div className="reading-progress-fill" style={{ width: `${scrollProgress}%` }} />
      </div>

      <Container fluid className="pt-4 px-0">
        <Row className="justify-content-center mx-0">
          <Col xs={12}>
            <Card className="materi-content-card p-4 p-md-5 mb-5">
              <div 
                className="materi-body"
                dangerouslySetInnerHTML={{ __html: materi.content }}
              />

              <footer className="mt-5 pt-4 border-top">
                <div className="materi-meta mb-4 text-start small text-muted">
                  <p className="mb-0">
                    Selamat! Anda telah menyelesaikan materi ini. Silakan lanjut ke Quiz untuk menguji pemahaman Anda.
                  </p>
                </div>
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                  <Button 
                    variant="outline-primary" 
                    className="px-5 py-3 fw-bold rounded-pill"
                    onClick={handleBackToDashboard}
                  >
                    Nanti Saja
                  </Button>
                  <Button 
                    variant="primary" 
                    className="btn-finish-reading px-5 py-3"
                    onClick={handleFinish}
                  >
                    <FaCheckCircle className="me-2" />
                    Mulai Quiz Materi
                  </Button>
                </div>
              </footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BacaMateri;
