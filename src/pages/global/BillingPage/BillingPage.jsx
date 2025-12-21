// 📁 src/pages/anggota/BillingPage.jsx
import React, { useState } from "react";
import { Container, Card, Form, Button, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../utils/api/UBilling";
import { jwtEncode } from "../../../routes/helpers";

const BillingPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { setoranType, isWithdraw, maxAmount } = decodedToken;
  console.log(decodedToken);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // State khusus pencairan
  const [withdrawData, setWithdrawData] = useState({
    method: "Transfer Bank",
    accountNo: "",
    bankName: "",
    accountName: "",
  });

  const handleProses = async () => {
    const nominal = parseFloat(amount);

    if (!nominal || nominal <= 0) {
      alert("Silahkan masukkan nominal yang valid");
      return;
    }

    if (isWithdraw && nominal > maxAmount) {
      alert("Nominal pencairan melebihi saldo tersedia");
      return;
    }

    setLoading(true);
    try {
      if (isWithdraw) {
        // LOGIKA PENCAIRAN (Internal API)
        // const res = await USimpanan.requestWithdraw({ amount: nominal, ...withdrawData });
        alert(
          `Permintaan pencairan Rp ${nominal.toLocaleString(
            "id-ID"
          )} berhasil terkirim. Menunggu verifikasi admin.`
        );
        navigate(-1);
      } else {
        // LOGIKA SETORAN (Midtrans)
        const res = await UBilling.createMidtransTransaction({
          amount: nominal,
          category: setoranType,
        });

        if (res.data?.status) {
          const token = jwtEncode({
            page: "invoicePage",
            billId: res.data.billId,
            fromPage: "billingPage",
          });
          navigate(`/${token}`);
        }
      }
    } catch (err) {
      alert("Gagal memproses transaksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card
        className="border-0 shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <Card.Header
          className="text-white py-3"
          style={{ backgroundColor: "#005a8d" }}
        >
          <h6 className="mb-0 fw-bold">
            {isWithdraw
              ? "Silahkan Masukkan Nominal Pencairan"
              : `Setoran ${setoranType}`}
          </h6>
        </Card.Header>

        <Card.Body className="p-4">
          <Form>
            {/* Input Nominal (Muncul di kedua mode) */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small">Nominal</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rp. 0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="py-2"
              />
              {isWithdraw && (
                <Form.Text className="text-muted small">
                  Saldo tersedia:{" "}
                  <strong>Rp {maxAmount.toLocaleString("id-ID")}</strong>
                </Form.Text>
              )}
            </Form.Group>

            {/* Form Tambahan Khusus Pencairan (Sesuai Gambar) */}
            {isWithdraw && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">
                    Metode Pencairan
                  </Form.Label>
                  <Form.Control
                    value={withdrawData.method}
                    disabled
                    className="bg-light"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">No Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: 1231313123123"
                    value={withdrawData.accountNo}
                    onChange={(e) =>
                      setWithdrawData({
                        ...withdrawData,
                        accountNo: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">Bank</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: Bank Mandiri Syariah"
                    value={withdrawData.bankName}
                    onChange={(e) =>
                      setWithdrawData({
                        ...withdrawData,
                        bankName: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small">
                    Nama Nasabah
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={withdrawData.accountName}
                    onChange={(e) =>
                      setWithdrawData({
                        ...withdrawData,
                        accountName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}

            <Stack gap={2} className="mt-4">
              <Button
                variant="primary"
                className="py-2 fw-bold border-0"
                style={{ backgroundColor: "#005a8d", borderRadius: "25px" }}
                onClick={handleProses}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Proses"}
              </Button>

              <Button
                variant="link"
                className="text-muted text-decoration-none small"
                onClick={() => navigate(-1)}
              >
                Batal
              </Button>
            </Stack>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BillingPage;
