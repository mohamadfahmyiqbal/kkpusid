import React, { useState, useEffect } from "react";
import { Card, Button, Container, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdAccountBalanceWallet } from "react-icons/md";
import Swal from "sweetalert2";
import { jwtEncode } from "../../utils/helpers";
import UJualBeli from "../../utils/api/UJualBeli";

const PelunasanPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!decodedToken?.financingId) return;
        const res = await UJualBeli.getFinancingDetail(decodedToken.financingId);
        if (res.data?.status) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [decodedToken]);

  const handleBack = () => {
    navigate(`/${jwtEncode({ page: decodedToken?.return || "jualBeliPage" })}`);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleBayar = async () => {
    try {
      setSubmitting(true);
      const payload = {
        category: "Pelunasan Jual Beli",
        item_name: `Pelunasan ${data.purpose || data.item_name || 'Pembiayaan'}`,
        item_price: sisaTagihan,
        amount_requested: sisaTagihan,
        down_payment: 0,
        principal_amount: sisaTagihan,
        tenure: 1,
        monthly_installment: sisaTagihan,
        margin_percent: 0,
        margin_amount: 0,
        total_tagihan: sisaTagihan,
        operational_cost: 0,
        keterangan: `PELUNASAN_REF:${data.financing_id}`
      };
      
      const res = await UJualBeli.submitPengajuan(payload);
      if (res.data?.status) {
        const newFinancingId = res.data.data.financing_id;
        navigate(`/${jwtEncode({
          page: "transactionDetailPage",
          financingId: newFinancingId,
          return: "jualBeliPage"
        })}`);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ title: 'Gagal', text: "Gagal mengajukan pelunasan: " + (error.response?.data?.message || error.message), icon: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="py-5 text-center">
        <h5 className="text-muted">Data tidak ditemukan</h5>
        <Button variant="link" onClick={handleBack}>Kembali</Button>
      </Container>
    );
  }

  const totalKeseluruhan = Number(data.item_price || data.amount_requested || 0) + Number(data.operational_cost || 0) + Number(data.margin_amount || 0);
  const dp = Number(data.down_payment || 0);
  const totalCicilan = totalKeseluruhan - dp;
  const cicilanTerbayar = data.paid_installment_amount !== undefined
    ? Number(data.paid_installment_amount)
    : Math.max(0, Number(data.paid_amount || 0) - dp);
  
  const tenure = parseInt(data.tenure || data.term_months || data.cooperation_months || 1);
  const cicilanPerBulan = Math.ceil(totalCicilan / tenure);
  const termTerbayar = data.paid_term_count !== undefined 
    ? data.paid_term_count 
    : (cicilanPerBulan > 0 ? Math.floor(cicilanTerbayar / cicilanPerBulan) : 0);
  const sisaTerm = data.unpaid_term_count !== undefined
    ? data.unpaid_term_count
    : Math.max(0, tenure - termTerbayar);
  const sisaTagihan = data.unpaid_amount !== undefined 
    ? Number(data.unpaid_amount) 
    : Math.max(0, totalCicilan - cicilanTerbayar);

  return (
    <Container fluid className="py-4 px-3 px-md-4 animate-fade-in">
      {/* Page Header matching BO LayoutGlobal */}
      <div className="page-header mb-4" style={{ paddingBottom: '16px', borderBottom: '1.5px solid #f1f5f9' }}>
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
            style={{ width: '48px', height: '48px', backgroundColor: '#eff6ff', color: '#2563eb', flexShrink: 0, border: '1px solid #dbeafe' }}
          >
            <MdAccountBalanceWallet size={24} />
          </div>
          <div>
            <h1 className="h4 mb-0 fw-bold" style={{ color: '#02113d', fontSize: '20px' }}>Konfirmasi Pelunasan</h1>
            <p className="text-muted mb-0 mt-1" style={{ fontSize: '13px' }}>Tinjau dan konfirmasi detail pelunasan pembiayaan Anda</p>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
              <h5 className="fw-bold mb-0 text-dark">Rincian Pembiayaan</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Total Keseluruhan</span>
                <span className="fw-bold text-dark">Rp {totalKeseluruhan.toLocaleString("id-ID")}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Uang Muka (DP)</span>
                <span className="fw-bold text-dark">Rp {dp.toLocaleString("id-ID")}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Total Cicilan</span>
                <span className="fw-bold text-dark">Rp {totalCicilan.toLocaleString("id-ID")}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Cicilan per Bulan ({tenure}x)</span>
                <span className="fw-bold text-dark">Rp {cicilanPerBulan.toLocaleString("id-ID")}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <div>
                  <span className="text-muted d-block">Telah Dibayar</span>
                  <small className="text-muted">{termTerbayar}x term terbayar</small>
                </div>
                <span className="fw-bold text-success fs-5">Rp {cicilanTerbayar.toLocaleString("id-ID")}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mt-4 border border-danger border-opacity-25 bg-danger bg-opacity-10">
                <div>
                  <span className="text-danger fw-bold d-block">Sisa Tagihan ({sisaTerm}x)</span>
                  <small className="text-danger opacity-75">Akan dilunasi sekarang</small>
                </div>
                <span className="fw-bold text-danger fs-4">Rp {sisaTagihan.toLocaleString("id-ID")}</span>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="mb-4">
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 text-center">
              <div className="bg-primary bg-opacity-10 text-primary p-4 rounded-circle d-inline-block mb-3">
                <MdAccountBalanceWallet size={48} />
              </div>
              <h6 className="text-muted mb-2">Total Pembayaran Pelunasan</h6>
              <h1 className="fw-bold text-primary mb-4">Rp {sisaTagihan.toLocaleString("id-ID")}</h1>
              
              <Button 
                variant="primary" 
                size="lg"
                className="w-100 py-3 rounded-pill fw-bold shadow-sm d-flex justify-content-center align-items-center btn-hover-lift"
                onClick={handleBayar}
                disabled={sisaTagihan <= 0 || submitting}
              >
                {submitting ? (
                  <><Spinner size="sm" className="me-2" /> Memproses...</>
                ) : (
                  "Lanjutkan Pembayaran"
                )}
              </Button>
              <div className="mt-3 text-muted small">
                Klik tombol di atas untuk melanjutkan ke proses pembayaran.
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PelunasanPage;
