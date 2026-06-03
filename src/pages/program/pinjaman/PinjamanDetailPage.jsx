// pages/program/pinjaman/PinjamanDetailPage.jsx (Final Code)

import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Perhatikan path relative yang diubah (naik 3 tingkat)
import { jwtEncode } from "../../../utils/helpers";
import ApprovalPlaceholder from "../../../components/ui/ApprovalPlaceholder"; // <-- IMPORT DARI COMPONENTS/UI
import useSocketListener from "../../../utils/helper/SocketListener";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

export default function PinjamanDetailPage({ decodedToken }) {
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get financingId from decodedToken prop ONLY (URL parameter)
  const financingId = decodedToken?.financingId;

  // Fungsi untuk mengambil detail pengajuan
  const fetchFinancingDetail = async (financingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const baseUrl = API_BASE_URL.endsWith("/api")
        ? API_BASE_URL.slice(0, -4)
        : API_BASE_URL;
      const response = await fetch(
        `${baseUrl}/api/financing/detail/${financingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil detail pengajuan");
      }

      return result;
    } catch (error) {
      console.error("Error fetching financing detail:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!financingId) {
          throw new Error("Financing ID tidak ditemukan.");
        }

        const result = await fetchFinancingDetail(financingId);
        console.log("[PinjamanDetailPage] API Response:", result);
        console.log("[PinjamanDetailPage] Detail Data:", result.data);
        console.log("[PinjamanDetailPage] Approval Flags:", {
          is_approved_pengawas: result.data?.is_approved_pengawas,
          is_approved_ketua: result.data?.is_approved_ketua,
          is_approved_bendahara: result.data?.is_approved_bendahara,
          approvalChain: result.data?.approvalChain,
        });
        setDetailData(result.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Detail",
          text: error.message,
          confirmButtonText: "Kembali",
          confirmButtonColor: "#dc3545",
        }).then(() => {
          navigate(`/${jwtEncode({ page: "programPage" })}`);
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Socket listener untuk real-time update saat approval berubah
  useSocketListener((payload) => {
    // Refresh data jika ada update untuk financing_applications dengan ID yang sama
    if (
      payload?.entityRef === "financing_applications" &&
      payload?.entityId === financingId
    ) {
      console.log(
        "🔄 Socket update received for financing, refreshing data...",
      );
      setIsLoading(true);
      fetchFinancingDetail(financingId)
        .then((result) => {
          setDetailData(result.data);
          console.log("✅ Data refreshed via socket");
        })
        .catch((error) => {
          console.error("❌ Failed to refresh data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col lg={10} md={12}>
          {isLoading ? (
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Memuat detail pengajuan...</p>
              </Card.Body>
            </Card>
          ) : detailData ? (
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                {/* BAGIAN DETAIL PENGAJUAN */}
                <h5 className="fw-bold mb-3 text-primary">Detail Pengajuan</h5>
                <Row className="mb-4 small">
                  <Col xs={6}>
                    <small className="d-block text-muted">Jenis</small>
                    <h6 className="fw-bold">
                      {detailData.category || "Pinjaman Lunak"}
                    </h6>
                  </Col>
                  <Col xs={6}>
                    <small className="d-block text-muted">
                      Jumlah Pinjaman
                    </small>
                    <h6 className="fw-bold">
                      Rp{" "}
                      {Number(detailData.amount_requested || 0).toLocaleString(
                        "id-ID",
                      )}
                    </h6>
                  </Col>
                  <Col xs={12} className="mt-3">
                    <small className="d-block text-muted">Jangka Waktu</small>
                    <h6 className="fw-bold">
                      {detailData.cooperation_months || 0} Bulan
                    </h6>
                  </Col>
                </Row>
                <hr />

                {/* BAGIAN SUMMARY DETAIL */}
                <h5 className="fw-bold mb-3 text-primary">Summary Detail</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-muted">Nominal</span>
                  <span className="fw-bold">
                    Rp{" "}
                    {Number(detailData.amount_requested || 0).toLocaleString(
                      "id-ID",
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="small text-muted">Estimasi Angsuran</span>
                  <span className="fw-bold text-success">
                    Rp{" "}
                    {Number(detailData.monthly_installment || 0).toLocaleString(
                      "id-ID",
                    )}
                  </span>
                </div>
                <hr />

                {/* BAGIAN AKAD DAN SYARAT & KETENTUAN */}
                <h5 className="fw-bold mb-3 text-primary">
                  Akad dan Syarat & Ketentuan
                </h5>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    readOnly
                    id="checkAkad"
                  />
                  <label className="form-check-label" htmlFor="checkAkad">
                    Akad {detailData.akad_type || "Murabahah"}
                  </label>
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked
                    readOnly
                    id="checkSyarat"
                  />
                  <label className="form-check-label" htmlFor="checkSyarat">
                    Syarat & Ketentuan
                  </label>
                </div>
                <hr />

                {/* BAGIAN APPROVAL (Menggunakan ApprovalPlaceholder) */}
                <h5 className="fw-bold mb-3 text-primary">Approval</h5>
                <Row className="text-center">
                  {(() => {
                    // Default approval chain (selalu tampilkan semua step)
                    const defaultChain = [
                      { role: "PENGAWAS", key: "is_approved_pengawas" },
                      { role: "KETUA", key: "is_approved_ketua" },
                      { role: "BENDAHARA", key: "is_approved_bendahara" },
                    ];

                    // Map dengan status dari backend
                    return defaultChain.map((step, index) => (
                      <Col xs={4} key={index}>
                        <ApprovalPlaceholder
                          role={step.role}
                          isApproved={detailData[step.key]}
                        />
                      </Col>
                    ));
                  })()}
                </Row>
              </Card.Body>
              <Card.Footer className="text-center bg-white border-0">
                {(() => {
                  const isAllApproved =
                    detailData.is_approved_pengawas &&
                    detailData.is_approved_ketua &&
                    detailData.is_approved_bendahara;

                  if (isAllApproved) {
                    return (
                      <>
                        <div className="mb-3">
                          <h6 className="text-success fw-bold">
                            ✅ Pinjaman Disetujui
                          </h6>
                          <p className="text-muted small mb-0">
                            Semua tahap approval telah selesai
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          className="fw-bold me-2"
                          onClick={() =>
                            navigate(
                              `/${jwtEncode({
                                page: "pinjamanReceiptPage",
                                financingId,
                              })}`,
                            )
                          }
                        >
                          📄 Lihat Resi Pembayaran
                        </Button>
                        <Button
                          variant="secondary"
                          className="fw-bold"
                          onClick={() =>
                            navigate(`/${jwtEncode({ page: "programPage" })}`)
                          }
                        >
                          Kembali
                        </Button>
                      </>
                    );
                  }

                  return (
                    <Button
                      variant="secondary"
                      className="fw-bold"
                      onClick={() =>
                        navigate(`/${jwtEncode({ page: "programPage" })}`)
                      }
                    >
                      Selesai
                    </Button>
                  );
                })()}
              </Card.Footer>
            </Card>
          ) : (
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center p-5">
                <p className="text-muted">Data tidak ditemukan.</p>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(`/${jwtEncode({ page: "programPage" })}`)
                  }
                >
                  Kembali
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
