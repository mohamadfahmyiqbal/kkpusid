import React, { useState, useCallback, useEffect, memo } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../utils/helpers";
import USavings from "../../utils/api/USavings";
import { formatRupiah, parseRawNumber } from "../../utils/helper/formatRupiah";

const SAVINGS_TYPES = [
  { value: 'SUKARELA', label: 'Simpanan Sukarela' },
  { value: 'WAJIB', label: 'Simpanan Wajib' },
  { value: 'BERJANGKA', label: 'Simpanan Berjangka' }
];

function FormSimpanan() {
  const navigate = useNavigate();

  const [savingsType, setSavingsType] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setTransactionDate(today);
    
    if (SAVINGS_TYPES.length > 0) {
      setSavingsType(SAVINGS_TYPES[0].value);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setValidationError(null);
      setSubmissionError(null);

      const amountReq = Number(amount);
      if (amountReq <= 0) {
        setValidationError("Jumlah simpanan harus lebih dari 0.");
        return;
      }
      if (!savingsType) {
        setValidationError("Tipe simpanan harus dipilih.");
        return;
      }
      if (!transactionDate) {
        setValidationError("Tanggal transaksi harus diisi.");
        return;
      }

      try {
        setLoading(true);
        
        const payload = {
          savings_type: savingsType,
          amount: amountReq,
          description: description.trim() || null,
          transaction_date: transactionDate
        };

        const res = await USavings.createSavingsApplication(payload);

        if (res.data?.status || res.status) {
          const targetId = res.data?.data?.savings_id;
          navigate(
            `/${jwtEncode({
              page: "savingsDetailPage",
              savingsId: targetId,
              return: "simpananPage",
            })}`,
          );
        } else {
          setSubmissionError("Pengajuan simpanan gagal diproses. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setSubmissionError(
          error.response?.data?.message ||
            "Terjadi kesalahan saat mengirim pengajuan simpanan. Silakan coba lagi.",
        );
      } finally {
        setLoading(false);
      }
    },
    [savingsType, amount, description, transactionDate, navigate],
  );

  return (
    <div className="min-vh-100 bg-light pb-5">
      <Container className="py-4">
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            <h4 className="mb-4 fw-bold">Pengajuan Simpanan</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Tipe Simpanan</Form.Label>
                <Form.Select
                  className="fw-bold"
                  value={savingsType}
                  onChange={(e) => setSavingsType(e.target.value)}
                  disabled={loading}
                >
                  {SAVINGS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Jumlah Simpanan</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="fw-bold bg-secondary text-white">
                    Rp.
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="fw-bold"
                    value={formatRupiah(amount)}
                    onChange={(e) => setAmount(parseRawNumber(e.target.value))}
                    disabled={loading}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Tanggal Transaksi</Form.Label>
                <Form.Control
                  type="date"
                  className="fw-bold"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  disabled={loading}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold mb-1">Deskripsi (Opsional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="fw-bold"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahkan deskripsi simpanan..."
                  disabled={loading}
                />
              </Form.Group>

              <div className="border-top pt-3 mb-4">
                <Row>
                  <Col xs={6} className="text-muted">
                    Tipe Simpanan
                  </Col>
                  <Col xs={6} className="text-end fw-bold">
                    {SAVINGS_TYPES.find(t => t.value === savingsType)?.label || '-'}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} className="text-muted">
                    Jumlah
                  </Col>
                  <Col xs={6} className="text-end fw-bold text-primary">
                    {formatRupiah(amount)}
                  </Col>
                </Row>
              </div>

              {validationError && (
                <Alert variant="danger" className="mb-3">
                  {validationError}
                </Alert>
              )}
              {submissionError && (
                <Alert variant="danger" className="mb-3">
                  {submissionError}
                </Alert>
              )}

              <Button
                type="submit"
                className="w-100 fw-bold py-2"
                disabled={loading || amount <= 0 || !savingsType || !transactionDate}
                style={{
                  backgroundColor: "#1c5b7a",
                  borderColor: "#1c5b7a",
                  borderRadius: "25px",
                }}
              >
                {loading ? "Memproses..." : "Ajukan Simpanan"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default memo(FormSimpanan);
