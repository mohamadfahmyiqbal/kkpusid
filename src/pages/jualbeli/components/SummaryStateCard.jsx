import React from "react";
import { Card, Button } from "react-bootstrap";
import { 
  MdAccountBalance, 
  MdAddCircleOutline, 
  MdReceiptLong, 
  MdCached, 
  MdHandshake 
} from "react-icons/md";

const SummaryStateCard = ({
  isApproved,
  approvedFinancing,
  hasPending,
  transactions,
  handleGoToSetoran,
  handleGoToPelunasan,
  handleGoToFormPembelian,
  handleGoToDetail
}) => {
  if (isApproved) {
    return (
      <Card className="premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg">
        <div className="glass-sheen" />
        <Card.Body className="p-4 relative" style={{ zIndex: 2 }}>
          {/* Card Top */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect">
              <MdAccountBalance size={14} className="text-light" />
              <span className="fw-bold tracking-wider card-type-label">INFORMASI PEMBIAYAAN</span>
            </div>
            <span className="premium-status-badge">AKTIF</span>
          </div>

          {/* Saldo Display */}
          <div className="dc-saldo-display mb-4">
            <div className="small opacity-75 mb-1 fw-medium">Total Terbayar</div>
            <h2 className="fw-bold mb-0 text-white font-outfit card-amount-value" style={{ fontSize: '30px' }}>
              Rp {Number(approvedFinancing?.paid_amount || 0).toLocaleString("id-ID")}
            </h2>
          </div>

          {/* Info Details */}
          <div className="row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start">
            <div className="col-4">
              <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">NAMA PRODUK</div>
              <div className="fw-bold small text-white-90">{approvedFinancing?.description || 'Item'}</div>
            </div>
            <div className="col-4">
              <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">CICILAN / BULAN</div>
              <div className="fw-bold small text-white-90">
                Rp {(() => {
                  const dp = Number(approvedFinancing?.down_payment || 0);
                  const total = Number(approvedFinancing?.item_price || approvedFinancing?.amount_requested || 0) + Number(approvedFinancing?.operational_cost || 0) + Number(approvedFinancing?.margin_amount || 0);
                  const tenure = parseInt(approvedFinancing?.tenure || approvedFinancing?.term_months || approvedFinancing?.cooperation_months || 1);
                  return Math.ceil((total - dp) / tenure);
                })().toLocaleString("id-ID")}
              </div>
            </div>
            <div className="col-4">
              <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">SISA TAGIHAN</div>
              <div className="fw-bold small text-white-90">
                Rp {(() => {
                  const dp = Number(approvedFinancing?.down_payment || 0);
                  const total = Number(approvedFinancing?.item_price || approvedFinancing?.amount_requested || 0) + Number(approvedFinancing?.operational_cost || 0) + Number(approvedFinancing?.margin_amount || 0);
                  const tenure = parseInt(approvedFinancing?.tenure || approvedFinancing?.term_months || approvedFinancing?.cooperation_months || 1);
                  const cicilanPerBulan = Math.ceil((total - dp) / tenure);
                  const cicilanTerbayar = approvedFinancing?.paid_installment_amount !== undefined
                    ? Number(approvedFinancing.paid_installment_amount)
                    : Math.max(0, Number(approvedFinancing?.paid_amount || 0) - dp);
                  return approvedFinancing?.unpaid_amount !== undefined 
                    ? Number(approvedFinancing.unpaid_amount) 
                    : Math.max(0, (total - dp) - cicilanTerbayar);
                })().toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mb-2">
            <Button 
              variant="light" 
              className="w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-teal d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text"
              onClick={handleGoToSetoran}
            >
              <MdAddCircleOutline size={20} /> Bayar Setoran
            </Button>
            <Button 
              variant="outline-light" 
              className="w-100 border shadow-sm rounded-3 py-2.5 fw-bold text-white d-flex align-items-center justify-content-center gap-2 premium-btn-hover btn-pelunasan"
              onClick={handleGoToPelunasan}
            >
              <MdAccountBalance size={20} /> Pelunasan
            </Button>
          </div>
          <div className="d-flex">
            <Button
              variant="link"
              className="w-100 border-0 rounded-3 py-2 fw-semibold text-white-50 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
              style={{ fontSize: '0.8rem' }}
              onClick={() => handleGoToDetail(approvedFinancing?.financing_id || approvedFinancing?.financingId || approvedFinancing?.id)}
            >
              Lihat Detail Pengajuan
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (hasPending) {
    const pendingTx = transactions.find(t => t.status === "PENDING");
    const pendingId = pendingTx?.financing_id || pendingTx?.financingId || pendingTx?.id;
    const pendingDesc = pendingTx?.description || "Pengajuan Pembiayaan Murabahah";
    const pendingAmount = pendingTx?.nominal_kredit || pendingTx?.nominal_debet || 0;

    return (
      <Card className="premium-card premium-card-pending border-0 text-white text-center p-4 p-md-5 shadow-lg">
        <div className="glass-sheen" />
        <Card.Body className="relative" style={{ zIndex: 2 }}>
          {/* Pulsing Radar Container */}
          <div className="pending-radar-pulse mb-4">
            <div className="bg-warning bg-opacity-15 p-4 rounded-circle text-warning">
              <MdCached size={48} className="animate-spin-slow" />
            </div>
          </div>

          <h4 className="fw-bold mb-2 text-white">Pengajuan Sedang Diproses</h4>

          {pendingAmount > 0 && (
            <div className="my-3 py-2 px-4 rounded-pill d-inline-block blur-effect">
              <span className="small opacity-75 d-block text-uppercase fw-bold" style={{ fontSize: '9px', letterSpacing: '0.5px' }}>Nominal Pengajuan</span>
              <strong className="text-warning font-outfit" style={{ fontSize: '18px' }}>
                Rp {Number(pendingAmount).toLocaleString("id-ID")}
              </strong>
            </div>
          )}

          <p className="opacity-90 mb-4 px-3 pending-card-desc text-white-90">
            {pendingDesc}. Mohon tunggu verifikasi admin koperasi. Kami sedang memproses berkas Anda secara berkala.
          </p>

          {/* Stepper Status tracker */}
          <div className="stepper-container mb-4">
            <div className="stepper-line">
              <div className="stepper-line-progress" style={{ width: '50%' }} />
            </div>
            <div className="stepper-step completed">
              <div className="stepper-node">✓</div>
              <div className="stepper-label">Pengajuan</div>
            </div>
            <div className="stepper-step active">
              <div className="stepper-node">2</div>
              <div className="stepper-label">Verifikasi</div>
            </div>
            <div className="stepper-step">
              <div className="stepper-node">3</div>
              <div className="stepper-label">Pencairan</div>
            </div>
          </div>

          <Button 
            variant="light" 
            className="rounded-pill px-5 py-2 fw-bold text-warning border-0 premium-btn-action shadow-md"
            onClick={() => handleGoToDetail(pendingId)}
          >
            Lihat Detail Pengajuan
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="premium-card premium-card-empty border-0 text-white text-center p-4 p-md-5 shadow-lg">
      <div className="card-decor-circle c1" />
      <div className="card-decor-circle c2" />
      <div className="glass-sheen" />
      <Card.Body className="relative" style={{ zIndex: 2 }}>
        <div className="mb-4 text-white opacity-90">
          <MdHandshake size={56} className="animate-pulse" />
        </div>
        
        <h4 className="fw-bold mb-2">Mulai Pengajuan Pembiayaan</h4>
        <p className="opacity-80 mb-4 px-3 empty-card-desc">
          Dapatkan barang kebutuhan Anda secara syariah dengan akad Murabahah yang mudah, adil, dan transparan.
        </p>

        {/* Benefits Grid */}
        <div className="benefits-grid mb-5 text-center">
          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <MdHandshake size={22} />
            </div>
            <div className="benefit-title">100% Syariah</div>
            <div className="benefit-desc">Akad transparan Murabahah tanpa bunga riba.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <MdReceiptLong size={22} />
            </div>
            <div className="benefit-title">Proses Instan</div>
            <div className="benefit-desc">Pengajuan online cepat langsung diverifikasi admin.</div>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon-wrapper">
              <MdAccountBalance size={22} />
            </div>
            <div className="benefit-title">Limit Sesuai</div>
            <div className="benefit-desc">Limit pembiayaan bersahabat kapasitas finansial Anda.</div>
          </div>
        </div>

        <Button 
          variant="light" 
          className="rounded-pill px-5 py-2.5 fw-bold text-primary border-0 premium-btn-action shadow-md d-inline-flex align-items-center gap-2"
          onClick={handleGoToFormPembelian}
        >
          Buat Pengajuan Baru <MdAddCircleOutline size={18} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SummaryStateCard;
