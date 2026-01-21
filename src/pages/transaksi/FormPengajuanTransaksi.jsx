import React, { useState, useCallback, useMemo, memo } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Container,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import UTransaksi from "../../utils/api/UTransaksi";
import { useProfile } from "../../contexts/ProfileContext";
import { formatRupiah, parseRawNumber } from "../../utils/helper/formatRupiah";

const formatCurrency = (amount) =>
  amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

const TIPE_OPTIONS = ["Elektronik", "Kendaraan", "Property"];
const TERMS_OPTIONS = [
  { label: "1x Pembayaran", value: "1" },
  { label: "3x Pembayaran", value: "3" },
  { label: "6x Pembayaran", value: "6" },
  { label: "12x Pembayaran", value: "12" },
  { label: "24x Pembayaran", value: "24" },
];

function FormPengajuanTransaksi() {
  const navigate = useNavigate();
  const { userData } = useProfile();

  const [tipeDipilih, setTipeDipilih] = useState(TIPE_OPTIONS[0]);
  const [namaBarang, setNamaBarang] = useState("");
  const [tenorDipilih, setTenorDipilih] = useState("12");
  const [nominalHarga, setNominalHarga] = useState(0);
  const [nominalDP, setNominalDP] = useState(0);

  const nominalKredit = useMemo(
    () => Math.max(0, Number(nominalHarga) - Number(nominalDP)),
    [nominalHarga, nominalDP]
  );
  const estimasiAngsuran = useMemo(
    () =>
      nominalKredit > 0
        ? Math.ceil(nominalKredit / parseInt(tenorDipilih || 1))
        : 0,
    [nominalKredit, tenorDipilih]
  );

  const handleBack = useCallback(() => {
    navigate(`/${jwtEncode({ page: "transaksiPage" })}`);
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const amountReq = Number(nominalHarga);
      if (amountReq <= 0 || !namaBarang) return;

      try {
        const payload = {
          category: tipeDipilih,
          item_name: namaBarang,
          tenure: parseInt(tenorDipilih),
          amount_requested: amountReq,
          down_payment: Number(nominalDP),
          principal_amount: Number(nominalKredit),
          monthly_installment: Number(estimasiAngsuran),
        };

        const res = await UTransaksi.submitPengajuan(payload);

        if (res.data?.status || res.status) {
          const targetId = res.data?.data?.financing_id;
          navigate(
            `/${jwtEncode({
              page: "transactionDetailPage",
              financingId: targetId,
              return: "transaksiPage",
            })}`
          );
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
    [
      tipeDipilih,
      namaBarang,
      tenorDipilih,
      nominalHarga,
      nominalDP,
      nominalKredit,
      estimasiAngsuran,
      navigate,
    ]
  );

  return (
    <div className="min-vh-100 bg-light pb-5">
      <Container className="py-4">
        <div className="mx-2 mb-3">
          <Button
            variant="link"
            className="p-0 text-decoration-none text-muted fw-bold d-flex align-items-center"
            onClick={handleBack}
          >
            <FaArrowLeft className="me-2" /> Kembali
          </Button>
        </div>

        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Tipe</Form.Label>
                <Form.Select
                  className="fw-bold"
                  value={tipeDipilih}
                  onChange={(e) => setTipeDipilih(e.target.value)}
                >
                  {TIPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  className="fw-bold"
                  value={namaBarang}
                  onChange={(e) => setNamaBarang(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">Harga</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="fw-bold bg-secondary text-white">
                    Rp.
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="fw-bold"
                    value={formatRupiah(nominalHarga)}
                    onChange={(e) =>
                      setNominalHarga(parseRawNumber(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-1">DP</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="fw-bold bg-secondary text-white">
                    Rp.
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className="fw-bold"
                    value={formatRupiah(nominalDP)}
                    onChange={(e) =>
                      setNominalDP(parseRawNumber(e.target.value))
                    }
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold mb-1">Tenor</Form.Label>
                <Form.Select
                  className="fw-bold"
                  value={tenorDipilih}
                  onChange={(e) => setTenorDipilih(e.target.value)}
                >
                  {TERMS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="border-top pt-3 mb-4">
                <Row>
                  <Col xs={6} className="text-muted">
                    Pokok Pinjaman
                  </Col>
                  <Col xs={6} className="text-end fw-bold">
                    {formatCurrency(nominalKredit)}
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} className="text-muted">
                    Angsuran / Bulan
                  </Col>
                  <Col xs={6} className="text-end fw-bold text-primary">
                    {formatCurrency(estimasiAngsuran)}
                  </Col>
                </Row>
              </div>

              <Button
                type="submit"
                className="w-100 fw-bold py-2"
                disabled={nominalKredit <= 0 || !namaBarang}
                style={{
                  backgroundColor: "#1c5b7a",
                  borderColor: "#1c5b7a",
                  borderRadius: "25px",
                }}
              >
                Proses Pengajuan
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default memo(FormPengajuanTransaksi);
