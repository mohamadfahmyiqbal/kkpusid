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
import UTransaction from "../../utils/api/UJualBeli";
import { formatRupiah, parseRawNumber } from "../../utils/helper/formatRupiah";

const TRANSACTION_TYPES = [
  { value: 'PEMBELIAN', label: 'Pembelian' },
  { value: 'PEMBAYARAN', label: 'Pembayaran' },
  { value: 'TOPUP', label: 'Top Up' },
  { value: 'LAINNYA', label: 'Lainnya' }
];

const CATEGORIES = [
  'Elektronik',
  'Kendaraan',
  'Property',
  'Pendidikan',
  'Kesehatan',
  'Konsumsi',
  'Lainnya'
];

function FormJualBeliUmum() {
  const navigate = useNavigate();

  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  useEffect(() => {
    if (CATEGORIES.length > 0) {
      setCategory(CATEGORIES[0]);
    }
    if (TRANSACTION_TYPES.length > 0) {
      setTransactionType(TRANSACTION_TYPES[0].value);
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setValidationError(null);
      setSubmissionError(null);

      const amountReq = Number(amount);
      if (amountReq <= 0) {
        setValidationError("Jumlah transaksi harus lebih dari 0.");
        return;
      }
      if (!itemName.trim()) {
        setValidationError("Nama item/barang tidak boleh kosong.");
        return;
      }
      if (!transactionType) {
        setValidationError("Tipe transaksi harus dipilih.");
        return;
      }
      if (!category) {
        setValidationError("Kategori harus dipilih.");
        return;
      }

      try {
        setLoading(true);
        
        const payload = {
          transaction_type: transactionType,
          category: category,
          item_name: itemName.trim(),
          amount: amountReq,
          description: description.trim() || null
        };

        const res = await UTransaction.createTransaction(payload);

        if (res.data?.status || res.status) {
          const targetId = res.data?.data?.transaction_id;
          navigate(
            `/${jwtEncode({
              page: "transactionDetailPage",
              transactionId: targetId,
              return: "jualBeliPage",
            })}`,
          );
        } else {
          setSubmissionError("Transaksi gagal diproses. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setSubmissionError(
          error.response?.data?.message ||
            "Terjadi kesalahan saat mengirim transaksi. Silakan coba lagi.",
        );
      } finally {
        setLoading(false);
      }
    },
    [transactionType, category, itemName, amount, description, navigate],
  );

  return (
    <div className="min-vh-100 bg-light pb-5">
      <Container className="py-4">
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            <h4 className="mb-4 fw-bold">Transaksi Umum</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Tipe Transaksi</Form.Label>
                <Form.Select
                  className="fw-bold"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  disabled={loading}
                >
                  {TRANSACTION_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Kategori</Form.Label>
                <Form.Select
                  className="fw-bold"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Nama Item/Barang</Form.Label>
                <Form.Control
                  type="text"
                  className="fw-bold"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Masukkan nama item atau barang"
                  disabled={loading}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Jumlah</Form.Label>
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

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold mb-1">Deskripsi (Opsional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="fw-bold"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahkan deskripsi transaksi..."
                  disabled={loading}
                />
              </Form.Group>

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
                disabled={loading || amount <= 0 || !itemName || !transactionType || !category}
                style={{
                  backgroundColor: "#1c5b7a",
                  borderColor: "#1c5b7a",
                  borderRadius: "25px",
                }}
              >
                {loading ? "Memproses..." : "Proses Transaksi"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default memo(FormJualBeliUmum);
