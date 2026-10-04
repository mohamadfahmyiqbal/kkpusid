import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  ProgressBar} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import TrainingService from "../../../services/training.service";
import { FaCheckCircle, FaArrowLeft, FaTrophy, FaChevronRight, FaChevronLeft, FaExclamationTriangle } from "react-icons/fa";
import "./Evaluasi.css";
import Alert from "../../../components/ui/SwalAlert";


const Evaluasi = () => {
  const navigate = useNavigate();
  const [materiData, setMateriData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const kurikulumId = decoded?.kurikulumId;
      const modulId = decoded?.modulId;
      const type = decoded?.type;

      const fetchQuestions = async () => {
        try {
          setLoading(true);
          const response = await TrainingService.getMaterialDetail(modulId);
          if (response.status) {
            const material = response.data;
            setMateriData({
              id: material.material_id,
              title: material.material_title,
              type: type || "WAJIB",
            });

            if (material.quiz_questions && Array.isArray(material.quiz_questions)) {
              setQuestions(material.quiz_questions);
            } else {
              setError("Materi ini belum memiliki soal kuis.");
            }
          }
        } catch (err) {
          setError("Gagal memuat soal kuis.");
        } finally {
          setLoading(false);
        }
      };

      if (modulId) {
        fetchQuestions();
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
      setError("URL tidak valid");
      setLoading(false);
    }
  }, []);

  const handleAnswerChange = useCallback((questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
    setError(null);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const handleSubmit = async () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      setError(
        `Belum selesai! Harap jawab semua pertanyaan (${answeredCount}/${questions.length} terjawab).`,
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Map answers to the format expected by backend
      const formattedAnswers = questions.map(q => ({
        question_id: q.id,
        selected_option: answers[q.id],
        is_correct: answers[q.id] === q.correctAnswer
      }));

      const response = await TrainingService.submitEvaluation(materiData.id, formattedAnswers);

      if (response.status) {
        setScore(response.data.score);
        setPassed(response.data.passed);
        setShowResult(true);
        window.scrollTo(0, 0);
      }
    } catch (err) {
      setError("Gagal mengirim jawaban. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setPassed(false);
    setError(null);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "trainingDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleBackToDetail = useCallback(() => {
    const token = jwtEncode({
      page: "detailMateri",
      kurikulumId: materiData?.id,
      type: materiData?.type,
    });
    navigate(`/${token}`);
  }, [navigate, materiData]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 text-muted fw-medium">Menyiapkan kuis evaluasi...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="evaluasi-container pb-5">
        <Container fluid className="mt-4 px-0">
          <Row className="justify-content-center mx-0">
            <Col lg={8} xl={7}>
              <Card className="result-card shadow-lg border-0 text-center">
                <header className={`result-premium-header ${passed ? "result-header-success" : "result-header-fail"}`}>
                   <div className="quiz-glass-sheen" />
                   <div className="quiz-decor-circle c1" />
                   <div className="quiz-decor-circle c2" />
                   
                   <div style={{ position: 'relative', zIndex: 2 }}>
                     <div className="mb-3">
                        {passed ? <FaTrophy size={64} /> : <FaExclamationTriangle size={64} />}
                     </div>
                     <h2 className="fw-black mb-0 text-white">
                       {passed ? "SELAMAT! ANDA LULUS" : "MAAF, BELUM LULUS"}
                     </h2>
                     <p className="opacity-75 mt-2 mb-0">Evaluasi: {materiData?.title}</p>
                   </div>
                </header>
                <Card.Body className="p-4 p-md-5 pt-0">
                  <div className="mb-4">
                    <div className="score-circle">
                      <span className="score-val" style={{ color: passed ? '#059669' : '#dc2626' }}>{score}</span>
                      <span className="score-label">Skor Akhir</span>
                    </div>
                  </div>
                  
                  <div className="mb-5 px-md-5">
                    <p className="text-muted mb-0 lead-sm">
                      {passed
                        ? `Luar biasa! Anda telah menyelesaikan seluruh materi dan evaluasi ini dengan hasil yang sangat memuaskan.`
                        : `Jangan patah semangat! Nilai minimum untuk lulus adalah 70%. Silakan tinjau kembali materi pembelajaran dan coba lagi saat Anda sudah siap.`}
                    </p>
                  </div>

                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-center px-md-5">
                    {!passed && (
                      <Button
                        variant="primary"
                        className="py-3 px-5 fw-bold rounded-pill shadow-sm flex-grow-1"
                        onClick={handleRetry}
                      >
                        Ulangi Kuis
                      </Button>
                    )}
                    <Button
                      variant={passed ? "primary" : "outline-secondary"}
                      className="py-3 px-5 fw-bold rounded-pill flex-grow-1"
                      onClick={handleBackToDashboard}
                    >
                      Dashboard Training
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <div className="evaluasi-container pb-5">
      <Container fluid className="mt-4 px-0">
        <Row className="mx-0">
          <Col xs={12}>
            {error && (
              <Alert variant="warning" className="mb-4 border-0 shadow-sm rounded-4 d-flex align-items-center gap-3">
                <FaExclamationTriangle className="text-warning" size={20} />
                <span className="fw-bold">{error}</span>
              </Alert>
            )}

            <Card className="quiz-card border-0">
              <div className="quiz-premium-header">
                 <div className="quiz-glass-sheen" />
                 <div className="quiz-decor-circle c1" />
                 
                 <div style={{ position: 'relative', zIndex: 2 }}>
                   <div className="d-flex justify-content-between align-items-end mb-2">
                      <div>
                         <span className="text-info fw-bold small text-uppercase ls-1 opacity-75">
                           Pertanyaan {currentQuestion + 1} dari {questions.length}
                         </span>
                         <h4 className="fw-black text-white mb-0 mt-1">{materiData?.title}</h4>
                      </div>
                      <div className="text-end">
                         <span className="fw-black text-white h3 mb-0">{progress}%</span>
                      </div>
                   </div>
                   <ProgressBar
                      now={progress}
                      variant="info"
                      style={{ height: "8px", background: 'rgba(255,255,255,0.1)' }}
                      className="rounded-pill border-0"
                    />
                 </div>
              </div>

              <Card.Body className="p-4 p-md-5">
                <div className="mb-5">
                  <h4 className="question-text fw-bold mb-4">
                    {questions[currentQuestion]?.question}
                  </h4>
                  <div className="quiz-options-list">
                    {questions[currentQuestion]?.options.map((option, index) => {
                      const isSelected = answers[questions[currentQuestion].id] === index;
                      return (
                        <div 
                          key={index}
                          className={`quiz-option-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleAnswerChange(questions[currentQuestion].id, index)}
                        >
                          <input
                            type="radio"
                            id={`option-${index}`}
                            name={`question-${questions[currentQuestion].id}`}
                            checked={isSelected}
                            readOnly
                          />
                          <label className="quiz-option-label" htmlFor={`option-${index}`}>
                            {option}
                          </label>
                          {isSelected && <FaCheckCircle className="text-primary ms-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center gap-3 mt-4 pt-4 border-top">
                  <Button
                    variant="link"
                    className="text-decoration-none text-muted fw-bold d-flex align-items-center gap-2 p-0"
                    onClick={currentQuestion === 0 ? handleBackToDetail : handlePrevious}
                    disabled={submitting}
                  >
                    {currentQuestion === 0 ? <FaArrowLeft /> : <FaChevronLeft />}
                    {currentQuestion === 0 ? "Batal" : "Sebelumnya"}
                  </Button>

                  <div className="d-flex gap-2">
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        variant="success"
                        className="px-5 py-2 fw-black rounded-pill shadow-md border-0"
                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Mengirim...
                          </>
                        ) : (
                          "SELESAIKAN KUIS"
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 shadow-sm"
                        onClick={handleNext}
                        disabled={submitting}
                      >
                        <span>Selanjutnya</span>
                        <FaChevronRight size={14} />
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Evaluasi;
