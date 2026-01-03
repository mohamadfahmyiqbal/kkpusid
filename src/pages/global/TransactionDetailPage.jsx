// 📁 src/pages/transaction/TransactionDetailPage.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import {
  FaArrowLeft,
  FaPrint,
  FaRegFilePdf,
  FaShoppingBag,
  FaUniversity,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import ApprovalPlaceholder from "../../components/ui/ApprovalPlaceholder";
import USimpanan from "../../utils/api/USimpanan";
import useSocketListener from "../../utils/helper/SocketListener";
import UTransaksi from "../../utils/api/UTransaksi";

/**
 * Sub-komponen baris informasi (Scannable)
 */
const InfoRow = ({ label, value, isPrimary = false, isTotal = false }) => (
  <div
    className={`d-flex justify-content-between mb-2 border-bottom border-light pb-1 ${
      isTotal ? "pt-2 border-dark border-top" : ""
    }`}
  >
    <span className={`${isTotal ? "fw-bold" : "text-muted"} small`}>
      {label}
    </span>
    <span
      className={`small ${
        isPrimary || isTotal ? "text-primary fw-bold" : "text-dark"
      } ${isTotal ? "fs-6" : ""}`}
    >
      {value || "-"}
    </span>
  </div>
);

const TransactionDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();

  // 1. DETEKSI TIPE TRANSAKSI
  const isFinancing = !!decodedToken?.financingId;
  const transactionId = isFinancing
    ? decodedToken?.financingId
    : decodedToken?.withdrawalId;
  const returnPage = decodedToken?.return || "dashboard";

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  /**
   * 2. FETCH DATA
   */
  const fetchDetail = useCallback(
    async (showLoading = true) => {
      if (!transactionId) return;
      if (showLoading) setLoading(true);
      try {
        const res = isFinancing
          ? await UTransaksi.getFinancingDetail(transactionId)
          : await USimpanan.getWithdrawalDetail(transactionId);
        setDetail(res.data.data);
      } catch (err) {
        console.error("Fetch Detail Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [transactionId, isFinancing]
  );

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleBack = () => {
    const backToken = jwtEncode({ page: returnPage });
    navigate(`/${backToken}`);
  };

  useSocketListener(
    useCallback(
      (data) => {
        // Validasi apakah entityId yang dikirim socket sama dengan transaksi yang dibuka
        if (String(data.entityId) === String(transactionId)) {
          // Lakukan fetch data terbaru tanpa memicu loading spinner (silent refresh)
          fetchDetail(false);

          // Opsional: Gunakan SweetAlert2 untuk memberitahu user secara formal
          // Swal.fire("Update!", "Status transaksi ini baru saja diperbarui.", "info");
        }
      },
      [fetchDetail, transactionId]
    )
  );

  /**
   * 3. LOGIKA APPROVAL
   */
  const approvalStatus = useMemo(() => {
    if (!detail)
      return {
        pengawasDone: false,
        ketuaDone: false,
        bendaharaDone: false,
        isRejected: false,
      };
    const status = (detail.status || "").toLowerCase();
    const isRejected = ["rejected", "ditolak"].includes(status);

    const pengawasDone = [
      "pending_ketua",
      "pending_bendahara",
      "approved",
      "completed",
    ].includes(status);
    const ketuaDone = ["pending_bendahara", "approved", "completed"].includes(
      status
    );
    const bendaharaDone = ["approved", "completed"].includes(status);

    return { pengawasDone, ketuaDone, bendaharaDone, isRejected };
  }, [detail]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
      <div className="d-flex align-items-center mb-3 px-2 d-print-none">
        <Button
          variant="link"
          onClick={handleBack}
          className="p-0 me-3 text-secondary"
        >
          <FaArrowLeft size={18} />
        </Button>
        <h5 className="mb-0 fw-bold">
          Detail {isFinancing ? "Pengajuan" : "Penarikan"}
        </h5>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              {/* SECTION: IDENTITAS ANGGOTA (Sesuai Gambar 3 & 4) */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2 mb-3">
                  Informasi Anggota
                </h6>
                <InfoRow label="Nama" value={detail?.member?.full_name} />
                <InfoRow
                  label="Nomor Anggota"
                  value={detail?.member?.member_code || "24032101"}
                />
                {!isFinancing && (
                  <InfoRow label="Status Anggota" value="Reguler" />
                )}
              </div>

              {/* SECTION: DETAIL TRANSAKSI */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2 mb-3">
                  {isFinancing ? "Detail Pengajuan" : "Pembayaran"}
                </h6>
                {isFinancing ? (
                  <>
                    <InfoRow
                      label="Tipe"
                      value={detail?.purpose?.split(":")[0]}
                    />
                    <InfoRow
                      label="Nama"
                      value={detail?.purpose?.split(":")[1] || detail?.purpose}
                    />
                    <InfoRow
                      label="Harga"
                      value={`Rp ${(
                        Number(detail?.item_price) || 0
                      ).toLocaleString("id-ID")}`}
                    />
                    <InfoRow
                      label="DP"
                      value={`Rp ${(
                        Number(detail?.down_payment) || 0
                      ).toLocaleString("id-ID")}`}
                    />
                    <InfoRow
                      label="Jumlah term"
                      value={`${detail?.cooperation_months}x Pembayaran`}
                    />
                  </>
                ) : (
                  <>
                    <InfoRow
                      label="Setoran Simpanan Sukarela"
                      value={`Rp ${(Number(detail?.amount) || 0).toLocaleString(
                        "id-ID"
                      )}`}
                    />
                    <InfoRow
                      label="Biaya Admin"
                      value={`Rp ${Number(
                        detail?.admin_fee || 4000
                      ).toLocaleString("id-ID")}`}
                    />
                    <InfoRow
                      label="Total"
                      value={`Rp ${(
                        Number(detail?.amount) +
                        Number(detail?.admin_fee || 4000)
                      ).toLocaleString("id-ID")}`}
                      isTotal
                    />
                  </>
                )}
              </div>

              {/* SECTION: INFORMASI PENGEMBALIAN (Hanya untuk Withdrawal) */}
              {!isFinancing && (
                <div className="mb-4">
                  <h6 className="fw-bold border-bottom pb-2 mb-3">
                    Informasi Pengembalian
                  </h6>
                  <InfoRow
                    label="Metode Pembayaran"
                    value={detail?.payment_method || "Bank Transfer"}
                  />
                  <InfoRow
                    label="Bank"
                    value={detail?.bank_name || "Bank Mandiri"}
                  />
                  <InfoRow
                    label="Nama Nasabah"
                    value={detail?.account_name || detail?.member?.full_name}
                  />
                  <InfoRow
                    label="No Rekening"
                    value={detail?.account_number || "2342342423424234"}
                  />
                </div>
              )}

              {/* SECTION: SUMMARY & AKAD (Hanya untuk Financing) */}
              {isFinancing && (
                <>
                  <div className="mb-4 bg-light p-3 rounded-3 border">
                    <h6 className="fw-bold border-bottom pb-2 mb-3">
                      Summary Detail
                    </h6>
                    <Row>
                      <Col xs={6}>
                        <p className="text-muted small mb-1">Nominal</p>
                        <p className="fw-bold text-primary">
                          Rp
                          {(
                            Number(detail?.amount_requested) || 0
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                      <Col xs={6}>
                        <p className="text-muted small mb-1">
                          Estimasi Angsuran
                        </p>
                        <p className="fw-bold text-dark">
                          Rp
                          {(
                            Number(detail?.monthly_installment) || 0
                          ).toLocaleString("id-ID")}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-bold border-bottom pb-2 mb-3">
                      Akad dan Syarat & Ketentuan
                    </h6>
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="success" className="me-2">
                        ✓
                      </Badge>{" "}
                      <span className="small">
                        Akad ({detail?.akad_type || "Murabahah"})
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Badge bg="success" className="me-2">
                        ✓
                      </Badge>{" "}
                      <span className="small">Syarat & Ketentuan</span>
                    </div>
                  </div>
                </>
              )}

              {/* SECTION: APPROVAL TRACKING */}
              <section className="mb-4 pt-3 border-top">
                <h6 className="fw-bold small text-uppercase text-secondary mb-4 text-center">
                  Approval
                </h6>
                <div className="d-flex justify-content-around pb-3">
                  {isFinancing ? (
                    <>
                      <ApprovalPlaceholder
                        role="Pengawas"
                        isApproved={approvalStatus.pengawasDone}
                        isRejected={approvalStatus.isRejected}
                      />
                      <ApprovalPlaceholder
                        role="Ketua"
                        isApproved={approvalStatus.ketuaDone}
                        isRejected={approvalStatus.isRejected}
                      />
                      <ApprovalPlaceholder
                        role="Bendahara"
                        isApproved={approvalStatus.bendaharaDone}
                        isRejected={approvalStatus.isRejected}
                      />
                    </>
                  ) : (
                    <ApprovalPlaceholder
                      role="Bendahara"
                      isApproved={approvalStatus.bendaharaDone}
                      isRejected={approvalStatus.isRejected}
                    />
                  )}
                </div>
              </section>
              {/* BUTTON ACTIONS */}
              <div className="d-grid gap-2 mt-4">
                {/* 1. TOMBOL UNTUK FINANCING (Invoice) */}
                {isFinancing &&
                  approvalStatus.bendaharaDone &&
                  !approvalStatus.isRejected && (
                    <Button
                      variant="success"
                      className="rounded-pill fw-bold py-2 shadow-sm"
                      onClick={() => {
                        const detailToken = jwtEncode({
                          page: "invoicePage",
                          financingId: transactionId,
                          return: "transactionDetailPage",
                        });
                        navigate(`/${detailToken}`);
                      }}
                    >
                      <FaRegFilePdf className="me-2" />
                      Lihat Invoice & Angsuran
                    </Button>
                  )}

                {/* 2. TOMBOL UNTUK WITHDRAWAL (Resi) */}
                {!isFinancing &&
                  approvalStatus.bendaharaDone &&
                  !approvalStatus.isRejected && (
                    <Button
                      variant="primary"
                      className="rounded-pill fw-bold py-2 shadow-sm"
                      onClick={() => {
                        const detailToken = jwtEncode({
                          page: "invoicePage", // Menggunakan page yang sama atau 'resiPage' jika berbeda
                          withdrawalId: transactionId,
                          return: "transactionDetailPage",
                        });
                        navigate(`/${detailToken}`);
                      }}
                    >
                      <FaPrint className="me-2" />
                      Lihat Resi Penarikan
                    </Button>
                  )}

                {/* 3. TOMBOL KEMBALI */}
                <Button
                  variant="outline-secondary"
                  className="rounded-pill fw-bold"
                  onClick={handleBack}
                >
                  Kembali
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionDetailPage;
