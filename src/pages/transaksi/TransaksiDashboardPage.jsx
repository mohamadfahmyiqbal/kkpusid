import React, { useState, useEffect, useCallback } from "react";
import { Button, Spinner, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHandshake } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../contexts/ProfileContext";
import { useTransaction } from "../../contexts/TransactionContext";
import UTransaksi from "../../utils/api/UTransaksi";

const TransaksiDashboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const { activeFinancing } = useTransaction();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactionData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UTransaksi.getGeneralTransactionHistory();
      if (response.data?.status) {
        setTransactions(response.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  const handleGoToFormPembelian = () => {
    navigate(
      `/${jwtEncode({
        page: "formPengajuanTransaksi",
        return: "transaksiPage",
      })}`
    );
  };

  const handleGoToDetail = (id) => {
    if (!id) return;
    navigate(
      `/${jwtEncode({
        page: "transactionDetailPage",
        financingId: id,
        return: "transaksiPage",
      })}`
    );
  };

  const isApproved = transactions.some(
    (t) => t.status === "APPROVED" || t.status === 2
  );
  const hasPending = transactions.length > 0 && !isApproved;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light pb-5 animated fadeIn">
      <Container className="py-4">
        <div className="mx-2 mb-3">
          <Button
            variant="link"
            className="p-0 text-decoration-none text-muted fw-bold d-flex align-items-center"
            onClick={() => navigate(`/${jwtEncode({ page: "dashboard" })}`)}
          >
            <FaArrowLeft className="me-2" /> Kembali ke Dashboard
          </Button>
        </div>

        <Row className="justify-content-center">
          <Col lg={10}>
            {isApproved ? (
              <Card
                className="border-0 shadow-sm rounded-4 text-white overflow-hidden mb-4"
                style={{ backgroundColor: "#1c5b7a" }}
              >
                <Card.Body className="p-4">
                  <h4 className="text-center fw-bold mb-4">
                    Informasi Rekening
                  </h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Nama</span>
                    <span className="fw-bold text-uppercase">
                      {userData?.full_name}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Produk</span>
                    <span className="fw-bold">Jual Beli</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Akad</span>
                    <span className="fw-bold">Murabahah</span>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <span>Saldo Akhir</span>
                    <span className="fw-bold">
                      Rp{" "}
                      {Number(
                        transactions.find(
                          (t) => t.status === "APPROVED" || t.status === 2
                        )?.principal_amount || 0
                      ).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <Row className="g-2">
                    <Col xs={6}>
                      <Button
                        variant="light"
                        className="w-100 rounded-3 py-2 d-flex flex-column align-items-center border-0 shadow-sm"
                      >
                        <FaHandshake className="text-primary mb-1" size={24} />
                        <small className="text-primary fw-bold">Setoran</small>
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button
                        variant="light"
                        className="w-100 rounded-3 py-2 d-flex flex-column align-items-center border-0 shadow-sm"
                        onClick={handleGoToFormPembelian}
                      >
                        <FaHandshake className="text-primary mb-1" size={24} />
                        <small className="text-primary fw-bold">
                          Pengajuan
                        </small>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : hasPending ? (
              <Card
                className="border-0 shadow-sm rounded-4 text-white text-center p-5 mb-4"
                style={{ backgroundColor: "#dc3545" }}
              >
                <Card.Body>
                  <FaHandshake size={60} className="mb-4 opacity-50" />
                  <h4 className="fw-bold mb-3">Pengajuan Sedang Diproses</h4>
                  <p className="opacity-75 mb-4">
                    Mohon tunggu verifikasi admin koperasi.
                  </p>
                  <Button
                    variant="light"
                    className="rounded-pill px-5 fw-bold text-danger border-0"
                    onClick={() =>
                      handleGoToDetail(
                        transactions[0]?.financing_id || transactions[0]?.id
                      )
                    }
                  >
                    Lihat Pengajuan
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm rounded-4 bg-primary text-white text-center p-5 mb-4">
                <Card.Body>
                  <FaHandshake size={60} className="mb-4 opacity-50" />
                  <h4 className="fw-bold mb-3">Belum Ada Transaksi</h4>
                  <p className="opacity-75 mb-4">
                    Mulai pengajuan jual beli barang kebutuhan Anda melalui
                    koperasi.
                  </p>
                  <Button
                    variant="light"
                    className="rounded-pill px-5 fw-bold text-primary border-0"
                    onClick={handleGoToFormPembelian}
                  >
                    Buat Pengajuan
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransaksiDashboardPage;
