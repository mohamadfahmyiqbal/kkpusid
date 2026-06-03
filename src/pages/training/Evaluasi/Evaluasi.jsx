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
  Form,
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import { FaCheckCircle, FaArrowLeft, FaTrophy } from "react-icons/fa";

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
    // Get kurikulumId from URL
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const kurikulumId = decoded?.kurikulumId;
      const type = decoded?.type;

      // TODO: Fetch questions from API
      // fetchQuestions(kurikulumId, type);

      // Mock data
      setTimeout(() => {
        setMateriData({
          id: kurikulumId || 1,
          title: "Pengenalan Koperasi",
          type: type || "wajib",
        });

        setQuestions([
          {
            id: 1,
            question: "Apa tujuan utama didirikannya koperasi?",
            options: [
              "Mencari keuntungan semata-mata",
              "Meningkatkan kesejahteraan anggota",
              "Dominasi pasar",
              "Ekspansi bisnis",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question:
              "Prinsip koperasi yang menekankan keanggotaan terbuka disebut?",
            options: [
              "Keanggotaan terbuka",
              "Pengendalian demokratis",
              "Partisipasi ekonomi anggota",
              "Otonomi dan kemandirian",
            ],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: "Badan hukum koperasi diatur dalam UU nomor berapa?",
            options: [
              "UU No 17 Tahun 2012",
              "UU No 25 Tahun 1992",
              "UU No 4 Tahun 2023",
              "UU No 1 Tahun 2013",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "Simpanan wajib dalam koperasi bersifat?",
            options: [
              "Opsional",
              "Wajib untuk semua anggota",
              "Hanya untuk pengurus",
              "Sementara waktu",
            ],
            correctAnswer: 1,
          },
          {
            id: 5,
            question: "SHU (Sisa Hasil Usaha) dibagikan berdasarkan?",
            options: [
              "Modal yang disetor",
              "Jasa usaha dan modal",
              "Lama keanggotaan",
              "Status sosial",
            ],
            correctAnswer: 1,
          },
        ]);

        setLoading(false);
      }, 1000);
    } catch (e) {
      console.error("Error decoding URL:", e);
      setError("Invalid URL");
      setLoading(false);
    }
  }, []);

  const handleAnswerChange = useCallback((questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
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
    // Check if all questions are answered
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      setError(
        `Harap jawab semua pertanyaan (${answeredCount}/${questions.length} terjawab)`,
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });

      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      setPassed(finalScore >= 70);

      // TODO: Call API to submit evaluation
      // await TrainingService.submitEvaluation(materiData.id, answers, finalScore);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowResult(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal mengirim evaluasi");
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

  const handleBack = useCallback(() => {
    const token = jwtEncode({
      page: "detailMateri",
      kurikulumId: materiData?.id,
      type: materiData?.type,
    });
    navigate(`/${token}`);
  }, [navigate, materiData]);

  if (loading) {
    return (
      <LayoutGlobal title="Evaluasi">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat soal evaluasi...</p>
        </div>
      </LayoutGlobal>
    );
  }

  if (showResult) {
    return (
      <LayoutGlobal title="Hasil Evaluasi">
        <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
          <div className="col-12 align-self-center">
            <h3 className="text-themecolor mb-0 mt-0 fw-bold">
              <FaTrophy className="me-2" />
              Hasil Evaluasi
            </h3>
          </div>
        </div>

        <Container className="mt-4">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Card className="shadow-lg border-0 text-center">
                <Card.Body className="p-5">
                  <div
                    className={`mb-4 ${passed ? "text-success" : "text-danger"}`}
                    style={{ fontSize: "80px" }}
                  >
                    {passed ? <FaTrophy /> : <span>×</span>}
                  </div>
                  <h4
                    className={`fw-bold mb-3 ${passed ? "text-success" : "text-danger"}`}
                  >
                    {passed ? "Selamat! Anda Lulus" : "Maaf, Anda Belum Lulus"}
                  </h4>
                  <div className="mb-4">
                    <h2 className="fw-bold mb-2">{score}%</h2>
                    <p className="text-muted">
                      {passed
                        ? "Anda telah menyelesaikan materi ini dengan baik"
                        : "Nilai minimum untuk lulus adalah 70%"}
                    </p>
                  </div>
                  <ProgressBar
                    now={score}
                    variant={passed ? "success" : "danger"}
                    className="mb-4"
                    style={{ height: "20px" }}
                  />
                  <div className="d-flex gap-2 justify-content-center">
                    {!passed && (
                      <Button
                        variant="outline-primary"
                        className="px-4 py-2"
                        onClick={handleRetry}
                      >
                        Ulangi Evaluasi
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      className="px-4 py-2"
                      onClick={handleBackToDashboard}
                    >
                      Kembali ke Dashboard
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Evaluasi">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            Evaluasi: {materiData?.title}
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Card className="shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                {/* Progress */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">
                      Pertanyaan {currentQuestion + 1} dari {questions.length}
                    </span>
                    <span className="small fw-bold">
                      {Math.round(
                        ((currentQuestion + 1) / questions.length) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <ProgressBar
                    now={((currentQuestion + 1) / questions.length) * 100}
                    variant="primary"
                    style={{ height: "8px" }}
                  />
                </div>

                {/* Question */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-4">
                    {questions[currentQuestion]?.question}
                  </h5>
                  <div className="d-grid gap-3">
                    {questions[currentQuestion]?.options.map(
                      (option, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          id={`option-${index}`}
                          name={`question-${questions[currentQuestion].id}`}
                          label={option}
                          checked={
                            answers[questions[currentQuestion].id] === index
                          }
                          onChange={() =>
                            handleAnswerChange(
                              questions[currentQuestion].id,
                              index,
                            )
                          }
                          className="p-3 border rounded hover-bg-light cursor-pointer"
                          style={{ cursor: "pointer" }}
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold text-muted"
                    onClick={
                      currentQuestion === 0 ? handleBack : handlePrevious
                    }
                    disabled={submitting}
                  >
                    {currentQuestion === 0 ? (
                      <>
                        <FaArrowLeft className="me-2" />
                        Kembali
                      </>
                    ) : (
                      "Sebelumnya"
                    )}
                  </Button>
                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      variant="primary"
                      className="px-5 py-2 fw-bold shadow-sm"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Jawaban"
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="px-5 py-2 fw-bold shadow-sm"
                      onClick={handleNext}
                      disabled={submitting}
                    >
                      Selanjutnya
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

export default Evaluasi;
