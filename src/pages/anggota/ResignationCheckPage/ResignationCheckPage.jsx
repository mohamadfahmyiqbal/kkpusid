import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Container, Row, Col, Badge } from "react-bootstrap";
import { FaExclamationCircle, FaCheckCircle, FaFileInvoiceDollar, FaArrowLeft, FaBan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtEncode } from "../../../utils/helpers";
import uBilling from "../../../utils/api/UBilling";
import uGlobal from "../../../utils/api/UGlobal";
import profileService from "../../../services/profileService";
import "./ResignationCheckPage.css";

// Helper untuk format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export default function ResignationCheckPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingBills, setPendingBills] = useState([]);
  const [savingsInfo, setSavingsInfo] = useState(null);
  const [jualBeliBill, setJualBeliBill] = useState(0);
  const [programBill, setProgramBill] = useState({ pinjaman: 0, arisan: 0 });
  const [otherAssets, setOtherAssets] = useState({ tabunganList: [], investasi: 0 });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await uBilling.getPendingBills();
      // Asumsikan data tagihan ada di response.data atau response.data.data
      const bills = response.data?.data || response.data || [];
      
      // Jika bills tidak berbentuk array, pastikan menjadi array kosong
      const validBills = Array.isArray(bills) ? bills : [];
      
      const grouped = validBills.reduce((acc, bill) => {
        const name = bill.billing_name || bill.description || "Tagihan";
        const amt = Number(bill.amount) || Number(bill.total_amount) || 0;
        if (amt > 0) {
          if (!acc[name]) {
            acc[name] = { billing_name: name, total_amount: 0 };
          }
          acc[name].total_amount += amt;
        }
        return acc;
      }, {});

      setPendingBills(Object.values(grouped));

      // Ambil data simpanan
      const finResponse = await uGlobal.getFinancialSummary();
      const details = finResponse.data?.data?.details || [];
      const savings = {
        pokok: details.find(d => d.type === "SW_POKOK")?.balance || 0,
        wajib: details.find(d => d.type === "SW_WAJIB")?.balance || 0,
        sukarela: details.find(d => d.type === "SS_SUKARELA")?.balance || 0,
      };
      setSavingsInfo(savings);
      
      const sisaJualBeli = finResponse.data?.data?.sisaCicilanJualBeli || 0;
      setJualBeliBill(sisaJualBeli);

      const sisaPinjaman = finResponse.data?.data?.sisaCicilanPinjaman || 0;
      const sisaArisan = finResponse.data?.data?.sisaCicilanArisan || 0;
      setProgramBill({ pinjaman: sisaPinjaman, arisan: sisaArisan });

      const listTabungan = details
        .filter(d => d.type.startsWith("TABUNGAN_") && Number(d.balance) > 0)
        .map(d => ({ name: d.name, balance: Number(d.balance) }));

      const totalInvestasi = finResponse.data?.data?.totalInvestasi || 0;
      setOtherAssets({ tabunganList: listTabungan, investasi: totalInvestasi });

    } catch (err) {
      console.error("Gagal mengambil data tagihan:", err);
      setError("Terjadi kesalahan saat memeriksa status kewajiban Anda. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(`/${jwtEncode({ page: "accountPage" })}`);
  };

  const handleTerminate = async () => {
    // Validasi tambahan
    if (pendingBills.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Pengajuan Ditolak',
        text: 'Anda masih memiliki kewajiban yang belum diselesaikan.'
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi Akhir",
      text: "Apakah Anda sangat yakin ingin mengajukan penghentian keanggotaan? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hentikan Keanggotaan",
      cancelButtonText: "Batal"
    });

    if (result.isConfirmed) {
      try {
        setIsSubmitting(true);
        Swal.fire({
          title: "Memproses...",
          text: "Sedang mengirim pengajuan...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Memanggil API berhenti keanggotaan
        // Menggunakan fetch manual jika profileService belum memiliki methodnya
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://localhost:3445/api"}/anggota/berhenti-keanggotaan`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ reason: "Pengajuan dari halaman profil" })
        });
        
        const data = await res.json();
        
        if (data.success || res.ok) {
          Swal.fire(
            "Berhasil!",
            "Pengajuan penghentian keanggotaan berhasil dikirim ke pengurus. Silakan tunggu konfirmasi.",
            "success"
          ).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire("Gagal", data.message || "Gagal mengajukan penghentian keanggotaan.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Terjadi kesalahan sistem.", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Sedang memeriksa kewajiban dan tagihan Anda...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-5">
          <FaExclamationCircle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
          <h5>Gagal Memeriksa Data</h5>
          <p className="text-muted">{error}</p>
          <Button variant="outline-primary" onClick={fetchData}>Coba Lagi</Button>
        </div>
      );
    }

    const hasProgramBill = programBill.pinjaman > 0 || programBill.arisan > 0;
    const hasBills = pendingBills.length > 0 || jualBeliBill > 0 || hasProgramBill;
    const totalSimpanan = savingsInfo ? (savingsInfo.pokok + savingsInfo.wajib + savingsInfo.sukarela) : 0;
    const hasJualBeliBill = jualBeliBill > 0;

    return (
      <div className="rcp-content animate-fade-in">
        <div className="text-center mb-5">
          {hasBills ? (
            <>
              <div className="rcp-icon-wrapper danger-bg mx-auto mb-3">
                <FaBan className="rcp-icon text-danger" />
              </div>
              <h3 className="fw-bold text-dark mb-2">Tidak Dapat Berhenti Keanggotaan</h3>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Kami menemukan bahwa Anda masih memiliki kewajiban atau tagihan yang belum diselesaikan. Harap melunasi semua tagihan di bawah ini sebelum Anda dapat mengajukan berhenti keanggotaan.
              </p>
            </>
          ) : (
            <>
              <div className="rcp-icon-wrapper success-bg mx-auto mb-3">
                <FaCheckCircle className="rcp-icon text-success" />
              </div>
              <h3 className="fw-bold text-dark mb-2">Pengecekan Selesai</h3>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Anda tidak memiliki kewajiban atau tagihan yang tertunggak. Anda dapat melanjutkan proses pengajuan berhenti keanggotaan.
              </p>
            </>
          )}
        </div>

        {/* Informasi Simpanan */}
        {savingsInfo && (
          <div className="rcp-savings-section mb-4 p-4 rounded bg-light border border-secondary border-opacity-10">
            <h5 className="fw-bold mb-3">Informasi Simpanan Anda</h5>
            <Row className="g-3 text-start">
              <Col md={4}>
                <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                  <small className="text-muted d-block">Simpanan Pokok</small>
                  <span className="fw-bold text-dark fs-5">{formatRupiah(savingsInfo.pokok)}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                  <small className="text-muted d-block">Simpanan Wajib</small>
                  <span className="fw-bold text-dark fs-5">{formatRupiah(savingsInfo.wajib)}</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                  <small className="text-muted d-block">Simpanan Sukarela</small>
                  <span className="fw-bold text-dark fs-5">{formatRupiah(savingsInfo.sukarela)}</span>
                </div>
              </Col>
            </Row>
            <div className="mt-3 text-end">
              <small className="text-muted me-2">Total Simpanan:</small>
              <strong className="text-primary fs-5">{formatRupiah(totalSimpanan)}</strong>
            </div>
            <p className="text-muted small mt-3 mb-0">
              * Total simpanan ini akan dikembalikan kepada Anda setelah proses pemberhentian keanggotaan disetujui (dikurangi tagihan/kewajiban jika ada dan sesuai AD/ART).
            </p>
          </div>
        )}

        {/* Informasi Tabungan */}
        {otherAssets && otherAssets.tabunganList.length > 0 && (
          <div className="rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25">
            <h5 className="fw-bold mb-3 text-info-emphasis">Informasi Tabungan Anda</h5>
            <Row className="g-3 text-start">
              {otherAssets.tabunganList.map((tab, idx) => (
                <Col md={4} key={idx}>
                  <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                    <small className="text-muted d-block">{tab.name}</small>
                    <span className="fw-bold text-dark fs-5">{formatRupiah(tab.balance)}</span>
                  </div>
                </Col>
              ))}
            </Row>
            <p className="text-muted small mt-3 mb-0">
              * Saldo tabungan ini akan dikembalikan atau diselesaikan sesuai dengan ketentuan koperasi saat pemberhentian keanggotaan Anda disetujui.
            </p>
          </div>
        )}

        {/* Informasi Investasi */}
        {otherAssets && otherAssets.investasi > 0 && (
          <div className="rcp-savings-section mb-4 p-4 rounded bg-info bg-opacity-10 border border-info border-opacity-25">
            <h5 className="fw-bold mb-3 text-info-emphasis">Informasi Investasi Anda</h5>
            <Row className="g-3 text-start">
              <Col md={4}>
                <div className="p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                  <small className="text-muted d-block">Total Investasi</small>
                  <span className="fw-bold text-dark fs-5">{formatRupiah(otherAssets.investasi)}</span>
                </div>
              </Col>
            </Row>
            <p className="text-muted small mt-3 mb-0">
              * Saldo investasi ini akan diselesaikan sesuai dengan ketentuan koperasi saat pemberhentian keanggotaan Anda disetujui.
            </p>
          </div>
        )}

        {/* Informasi Tagihan Jual Beli */}
        <div className={`rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${hasJualBeliBill ? 'bg-danger bg-opacity-10 border-danger' : 'bg-success bg-opacity-10 border-success'}`}>
          <h5 className={`fw-bold mb-3 ${hasJualBeliBill ? 'text-danger' : 'text-success'}`}>
            Kewajiban Tagihan Jual Beli
          </h5>
          <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
            <div>
              <small className="text-muted d-block">Sisa Tagihan Jual Beli</small>
              <span className={`fw-bold fs-5 ${hasJualBeliBill ? 'text-danger' : 'text-success'}`}>
                {formatRupiah(jualBeliBill)}
              </span>
            </div>
            <div>
              {hasJualBeliBill ? (
                <Badge bg="danger" className="p-2">Belum Lunas</Badge>
              ) : (
                <Badge bg="success" className="p-2">Lunas / Tidak Ada</Badge>
              )}
            </div>
          </div>
          {hasJualBeliBill && (
            <p className="text-danger small mt-3 mb-0">
              * Anda memiliki tunggakan/sisa tagihan jual beli. Harap lunasi tagihan ini sebelum mengajukan berhenti keanggotaan.
            </p>
          )}
        </div>

        {/* Informasi Tagihan Program (Pinjaman & Arisan) */}
        <div className={`rcp-savings-section mb-5 p-4 rounded border border-opacity-25 ${hasProgramBill ? 'bg-danger bg-opacity-10 border-danger' : 'bg-success bg-opacity-10 border-success'}`}>
          <h5 className={`fw-bold mb-3 ${hasProgramBill ? 'text-danger' : 'text-success'}`}>
            Kewajiban Program (Pinjaman Lunak & Arisan)
          </h5>
          <Row className="g-3 text-start">
            <Col md={6}>
              <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                <div>
                  <small className="text-muted d-block">Sisa Pinjaman Lunak</small>
                  <span className={`fw-bold fs-5 ${programBill.pinjaman > 0 ? 'text-danger' : 'text-success'}`}>
                    {formatRupiah(programBill.pinjaman)}
                  </span>
                </div>
                <div>
                  {programBill.pinjaman > 0 ? (
                    <Badge bg="danger" className="p-2">Belum Lunas</Badge>
                  ) : (
                    <Badge bg="success" className="p-2">Lunas</Badge>
                  )}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10">
                <div>
                  <small className="text-muted d-block">Sisa Tagihan Arisan</small>
                  <span className={`fw-bold fs-5 ${programBill.arisan > 0 ? 'text-danger' : 'text-success'}`}>
                    {formatRupiah(programBill.arisan)}
                  </span>
                </div>
                <div>
                  {programBill.arisan > 0 ? (
                    <Badge bg="danger" className="p-2">Belum Lunas</Badge>
                  ) : (
                    <Badge bg="success" className="p-2">Lunas</Badge>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          {hasProgramBill && (
            <p className="text-danger small mt-3 mb-0">
              * Anda masih memiliki kewajiban program yang belum dilunasi. Harap lunasi pinjaman dan/atau arisan Anda sebelum mengajukan berhenti keanggotaan.
            </p>
          )}
        </div>

        {/* Informasi Tagihan Lainnya (General Bills) */}
        {pendingBills.length > 0 && (
          <div className="rcp-savings-section mb-5 p-4 rounded border border-danger border-opacity-25 bg-danger bg-opacity-10">
            <h5 className="fw-bold mb-3 text-danger">
              Kewajiban Tagihan Lainnya (Iuran, dll)
            </h5>
            <Row className="g-3 text-start">
              {pendingBills.map((bill, idx) => (
                <Col md={6} key={idx}>
                  <div className="d-flex align-items-center justify-content-between p-3 bg-white rounded shadow-sm border border-secondary border-opacity-10 h-100">
                    <div>
                      <small className="text-muted d-block">{bill.billing_name}</small>
                      <span className="fw-bold fs-5 text-danger">
                        {formatRupiah(bill.total_amount)}
                      </span>
                    </div>
                    <div>
                      <Badge bg="danger" className="p-2">Belum Lunas</Badge>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <p className="text-danger small mt-3 mb-0">
              * Anda memiliki tagihan lain yang belum lunas. Harap lunasi tagihan ini sebelum mengajukan berhenti keanggotaan.
            </p>
          </div>
        )}

        <div className="rcp-action-section d-flex flex-column align-items-center pt-4 border-top">
          {!hasBills ? (
            <Button 
              variant="danger" 
              className="rcp-btn rcp-btn-danger mb-3" 
              onClick={handleTerminate}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Spinner as="span" animation="border" size="sm" className="me-2" /> Memproses...</>
              ) : (
                "Ajukan Berhenti Keanggotaan"
              )}
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              className="rcp-btn mb-3" 
              disabled
              title="Lunasi tagihan terlebih dahulu"
            >
              Ajukan Berhenti Keanggotaan
            </Button>
          )}
          
          <Button variant="link" className="text-muted text-decoration-none" onClick={handleGoBack}>
            Batal & Kembali ke Profil
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Container className="rcp-container py-4">
      
      <Card className="rcp-main-card border-0 shadow-sm">
        <Card.Body className="p-4 p-md-5">
          {renderContent()}
        </Card.Body>
      </Card>
    </Container>
  );
}
