import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
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
import {
  MdArrowBack,
  MdCategory,
  MdShoppingBag,
  MdAttachMoney,
  MdPayment,
  MdCalendarToday,
  MdInfo,
  MdCheckCircle,
  MdReceiptLong,
  MdShield,
  MdPerson,
  MdLocalAtm,
  MdAccountBalance,
  MdLocationOn,
  MdAccessTime,
} from "react-icons/md";
import { jwtEncode } from "../../utils/helpers";
import { useProfile } from "../../components/layout/contexts";
import UJualBeli from "../../utils/api/UJualBeli";
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

const FormSkeleton = () => (
  <Row className="g-4 animate-pulse">
    <Col lg={7}>
      <Card className="border-0 shadow-sm rounded-4 p-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="bg-light rounded-3 animate-pulse placeholder-icon-mock" />
          <div className="flex-grow-1">
            <div className="bg-light rounded mb-2 animate-pulse placeholder-title-mock" />
            <div className="bg-light rounded animate-pulse placeholder-subtitle-mock" />
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-3">
            <div className="bg-light rounded mb-2 animate-pulse placeholder-label-mock" />
            <div className="bg-light rounded animate-pulse placeholder-input-mock" />
          </div>
        ))}
      </Card>
    </Col>
    <Col lg={5}>
      <Card className="border-0 shadow-sm rounded-4 p-4 placeholder-card-right">
        <div className="bg-light rounded mb-4 animate-pulse placeholder-sim-title" />
        <div className="bg-light rounded mb-4 animate-pulse placeholder-sim-value" />
        <div className="bg-light rounded mb-4 animate-pulse placeholder-sim-term" />
        <div className="bg-light rounded mb-4 animate-pulse placeholder-sim-detail" />
        <hr className="opacity-10" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="d-flex justify-content-between mb-3">
            <div className="bg-light rounded animate-pulse placeholder-sim-label" />
            <div className="bg-light rounded animate-pulse placeholder-sim-val" />
          </div>
        ))}
      </Card>
    </Col>
  </Row>
);

function FormPengajuanJualBeli() {
  const navigate = useNavigate();
  const { userData } = useProfile();

  const [tipeDipilih, setTipeDipilih] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [tenorDipilih, setTenorDipilih] = useState("12");
  const [nominalHarga, setNominalHarga] = useState(0);
  const [nominalDP, setNominalDP] = useState(0);
  const [categories, setCategories] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [errorOptions, setErrorOptions] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  // Disbursement and Recipient fields removed

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        setErrorOptions(null);
        const response = await UJualBeli.getOptions();
        if (response.data?.status) {
          const fetchedCategories = response.data.data.categories || [];
          const finalCategories = fetchedCategories.length > 0 ? fetchedCategories : TIPE_OPTIONS;
          
          const fetchedTerms = response.data.data.terms || [];
          const finalTerms = fetchedTerms.length > 0 ? fetchedTerms : TERMS_OPTIONS;

          setCategories(finalCategories);
          setTerms(finalTerms);
          
          if (finalCategories.length > 0) {
            setTipeDipilih(finalCategories[0]);
          }
        }
      } catch (err) {
        console.error(err);
        setErrorOptions("Gagal memuat opsi dari server. Menggunakan opsi default.");
        setCategories(TIPE_OPTIONS);
        setTerms(TERMS_OPTIONS);
        if (TIPE_OPTIONS.length > 0) {
          setTipeDipilih(TIPE_OPTIONS[0]);
        }
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []);

  const nominalKredit = useMemo(
    () => Math.max(0, Number(nominalHarga) - Number(nominalDP)),
    [nominalHarga, nominalDP],
  );
  const { estimasiAngsuran, totalTagihan, marginPercent, keuntunganKoperasi } = useMemo(() => {
    const harga = Number(nominalHarga) || 0;
    const dp = Number(nominalDP) || 0;
    
    if (harga <= 0 || !tenorDipilih) {
      return { estimasiAngsuran: 0, totalTagihan: 0, marginPercent: 0, keuntunganKoperasi: 0 };
    }
    
    const tenorMonths = parseInt(tenorDipilih);
    const selectedTerm = terms.find((t) => String(t.value) === String(tenorDipilih));
    
    let margin = 0;
    if (selectedTerm && selectedTerm.persentase_anggota !== undefined) {
      const isAnggota = userData?.role_id && Number(userData.role_id) !== 1;
      margin = isAnggota 
        ? Number(selectedTerm.persentase_anggota) 
        : Number(selectedTerm.persentase_reguler);
    }
    
    const profit = harga * (margin / 100);
    const totalUtang = harga + profit;
    const sisaCicilan = Math.max(0, totalUtang - dp);
    
    return {
      estimasiAngsuran: Math.ceil(sisaCicilan / tenorMonths),
      totalTagihan: totalUtang,
      marginPercent: margin,
      keuntunganKoperasi: profit
    };
  }, [nominalHarga, nominalDP, tenorDipilih, terms, userData]);

  const localValidationError = useMemo(() => {
    if (nominalHarga !== "" && Number(nominalHarga) < 0) {
      return "Harga barang tidak boleh kurang dari 0.";
    }
    if (nominalDP !== "" && Number(nominalDP) < 0) {
      return "Uang muka (DP) tidak boleh kurang dari 0.";
    }
    if (nominalHarga !== "" && nominalDP !== "" && Number(nominalDP) > Number(nominalHarga)) {
      return "Uang muka (DP) tidak boleh melebihi harga barang.";
    }
    return null;
  }, [
    nominalHarga,
    nominalDP,
  ]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      setValidationError(null);
      setSubmissionError(null);

      const amountReq = Number(nominalHarga);
      if (amountReq <= 0) {
        setValidationError("Harga barang harus lebih dari 0.");
        return;
      }
      if (!namaBarang.trim()) {
        setValidationError("Nama barang tidak boleh kosong.");
        return;
      }
      if (!tipeDipilih) {
        setValidationError("Tipe barang harus dipilih.");
        return;
      }
      if (Number(nominalDP) > amountReq) {
        setValidationError("Uang muka tidak boleh melebihi harga barang.");
        return;
      }
      // Disbursement validation removed

      try {
        const payload = {
          category: tipeDipilih,
          item_name: namaBarang,
          tenure: parseInt(tenorDipilih),
          amount_requested: amountReq,
          down_payment: Number(nominalDP),
          principal_amount: Number(nominalKredit),
          monthly_installment: Number(estimasiAngsuran),
          margin_percent: marginPercent,
          margin_amount: keuntunganKoperasi,
          total_tagihan: totalTagihan,
        };

        const res = await UJualBeli.submitPengajuan(payload);

        if (res.data?.status || res.status) {
          const targetId = res.data?.data?.financing_id;
          navigate(
            `/${jwtEncode({
              page: "transactionDetailPage",
              financingId: targetId,
              return: "jualBeliPage",
            })}`,
          );
        } else {
          setSubmissionError("Pengajuan gagal diproses. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setSubmissionError(
          error.response?.data?.message ||
            "Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.",
        );
      }
    },
    [
      nominalHarga,
      namaBarang,
      tipeDipilih,
      nominalDP,
      tenorDipilih,
      nominalKredit,
      estimasiAngsuran,
      marginPercent,
      keuntunganKoperasi,
      totalTagihan,
      navigate,
    ],
  );

  return (
    <>
      <Container fluid className="px-0 py-4">
        {loadingOptions ? (
          <FormSkeleton />
        ) : (
          <Row className="g-4">
            {/* Kolom Kiri: Form */}
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4 overflow-hidden custom-card">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light">
                    <div className="bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center">
                      <MdReceiptLong size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0 text-slate-800">Formulir Pengajuan</h5>
                      <span className="text-muted small">Lengkapi rincian pembiayaan barang Anda</span>
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    {/* Tipe Barang */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted">
                        <MdCategory size={16} /> Tipe Barang
                      </Form.Label>
                      <InputGroup className="custom-input-group shadow-sm">
                        <Form.Select
                          className="fw-bold text-slate-800"
                          value={tipeDipilih}
                          onChange={(e) => setTipeDipilih(e.target.value)}
                          disabled={loadingOptions}
                        >
                          {categories.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>

                    {/* Nama Barang */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted">
                        <MdShoppingBag size={16} /> Nama Barang
                      </Form.Label>
                      <InputGroup className="custom-input-group shadow-sm">
                        <Form.Control
                          type="text"
                          className="fw-bold text-slate-800"
                          placeholder="Contoh: Laptop Asus ROG, Honda Vario"
                          value={namaBarang}
                          onChange={(e) => setNamaBarang(e.target.value)}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* Harga Barang */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted">
                        <MdAttachMoney size={16} /> Harga Barang
                      </Form.Label>
                      <InputGroup className="custom-input-group shadow-sm">
                        <InputGroup.Text className="fw-bold">
                          Rp
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          className="fw-bold text-slate-800 border-start-0"
                          placeholder="0"
                          value={formatRupiah(nominalHarga)}
                          onChange={(e) => {
                            const val = parseRawNumber(e.target.value);
                            setNominalHarga(val ? Number(val) : 0);
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* DP (Down Payment) */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted">
                        <MdPayment size={16} /> Uang Muka (DP)
                      </Form.Label>
                      <InputGroup className="custom-input-group shadow-sm">
                        <InputGroup.Text className="fw-bold">
                          Rp
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          className="fw-bold text-slate-800 border-start-0"
                          placeholder="0"
                          value={formatRupiah(nominalDP)}
                          onChange={(e) => {
                            const val = parseRawNumber(e.target.value);
                            setNominalDP(val ? Number(val) : 0);
                          }}
                        />
                      </InputGroup>

                      {/* Quick DP Selectors */}
                      {Number(nominalHarga) > 0 && (
                        <div className="d-flex gap-2 mt-2.5 flex-wrap">
                          {[0, 10, 20, 30].map((pct) => {
                            const calculatedDP = Math.floor(Number(nominalHarga) * (pct / 100));
                            const isActive = Number(nominalDP) === calculatedDP;
                            return (
                              <button
                                key={pct}
                                type="button"
                                onClick={() => setNominalDP(calculatedDP)}
                                className={`btn-quick-dp ${isActive ? "active" : ""}`}
                              >
                                {pct}% ({pct === 0 ? "Tanpa DP" : `Rp ${formatRupiah(calculatedDP)}`})
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </Form.Group>

                    {/* Tenor / Jangka Waktu */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted">
                        <MdCalendarToday size={16} /> Jangka Waktu (Tenor)
                      </Form.Label>
                      <InputGroup className="custom-input-group shadow-sm">
                        <Form.Select
                          className="fw-bold text-slate-800"
                          value={tenorDipilih}
                          onChange={(e) => setTenorDipilih(e.target.value)}
                          disabled={loadingOptions}
                        >
                          {terms.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>


                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Kolom Kanan: Detail & Simulasi */}
            <Col lg={5}>
              <div className="sticky-lg-top sticky-calc-panel">
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4">
                  <Card.Body className="p-4 d-flex flex-column h-100">
                    <div className="d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10">
                      <MdShield size={22} className="text-warning" />
                      <div>
                        <h6 className="fw-bold mb-0 text-white">Simulasi Pembiayaan</h6>
                        <span className="text-white-50 small">Prinsip Syariah (Murabahah)</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="sim-title d-block mb-1">Total Tagihan (Termasuk Margin)</span>
                      <h2 className="sim-value-large text-warning mb-1">
                        {formatCurrency(totalTagihan)}
                      </h2>
                      <span className="text-white-50 small">
                        Tenor: {terms.find(t => String(t.value) === String(tenorDipilih))?.label || `${tenorDipilih}x Pembayaran`}
                      </span>
                    </div>

                    <div className="pt-2">
                      <div className="sim-detail-row">
                        <span className="sim-detail-label">Harga Barang</span>
                        <span className="sim-detail-val">{formatCurrency(Number(nominalHarga || 0))}</span>
                      </div>
                      <div className="sim-detail-row">
                        <span className="sim-detail-label">Uang Muka (DP)</span>
                        <span className="sim-detail-val">{formatCurrency(Number(nominalDP || 0))}</span>
                      </div>
                      <div className="sim-detail-row">
                        <span className="sim-detail-label">Pokok Pembiayaan</span>
                        <span className="sim-detail-val text-warning fw-bold">{formatCurrency(nominalKredit)}</span>
                      </div>
                      <div className="sim-detail-row">
                        <span className="sim-detail-label">Keuntungan Koperasi ({marginPercent}%)</span>
                        <span className="sim-detail-val">{formatCurrency(keuntunganKoperasi)}</span>
                      </div>
                      <div className="sim-detail-row">
                        <span className="sim-detail-label">Lama Term</span>
                        <span className="sim-detail-val">
                          {terms.find((t) => String(t.value) === String(tenorDipilih))?.label || `${tenorDipilih}x Pembayaran`}
                        </span>
                      </div>
                      <div className="sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2">
                        <span className="sim-detail-label">Estimasi Cicilan</span>
                        <span className="sim-detail-val text-warning fw-bold">
                          {formatCurrency(estimasiAngsuran)} / Bulan
                        </span>
                      </div>


                    </div>
                  </Card.Body>
                </Card>

                {/* Feedback Alerts */}
                {localValidationError && (
                  <Alert variant="danger" className="mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3">
                    <MdInfo className="flex-shrink-0" size={20} />
                    <span className="small fw-semibold">{localValidationError}</span>
                  </Alert>
                )}
                {validationError && (
                  <Alert variant="danger" className="mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3">
                    <MdInfo className="flex-shrink-0" size={20} />
                    <span className="small fw-semibold">{validationError}</span>
                  </Alert>
                )}
                {submissionError && (
                  <Alert variant="danger" className="mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3">
                    <MdInfo className="flex-shrink-0" size={20} />
                    <span className="small fw-semibold">{submissionError}</span>
                  </Alert>
                )}
                {errorOptions && (
                  <Alert variant="warning" className="mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3">
                    <MdInfo className="flex-shrink-0" size={20} />
                    <span className="small fw-semibold">{errorOptions}</span>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit"
                  disabled={nominalKredit <= 0 || !namaBarang || loadingOptions || !!localValidationError}
                >
                  <MdCheckCircle size={20} />
                  Proses Pengajuan
                </Button>

                {/* Catatan Koperasi */}
                <div className="p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4">
                  <MdInfo size={24} className="text-info flex-shrink-0 mt-0.5" />
                  <div>
                    <h6 className="fw-bold text-slate-800 mb-1 info-title">Catatan Penting</h6>
                    <p className="text-muted mb-0 small info-desc">
                      Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <style>{`
        .form-page-container {
          width: 100%;
          max-width: 100%;
        }
        .hover-primary {
          transition: all 0.2s ease;
        }
        .hover-primary:hover {
          color: #0369a1 !important;
          transform: translateX(-3px);
        }
        .bg-primary-soft {
          background-color: rgba(3, 105, 161, 0.1);
        }
        .custom-card {
          border: 1px solid #e2e8f0;
        }
        .custom-input-group {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          transition: all 0.2s ease;
        }
        .custom-input-group:focus-within {
          border-color: #0369a1;
          box-shadow: 0 0 0 4px rgba(3, 105, 161, 0.1);
        }
        .custom-input-group .form-control,
        .custom-input-group .form-select {
          border: none !important;
          box-shadow: none !important;
          font-size: 14.5px;
          padding: 11px 14px;
        }
        .custom-input-group .input-group-text {
          border: none !important;
          background-color: #f8fafc;
          color: #64748b;
          font-size: 14.5px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .btn-quick-dp {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-quick-dp:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-1px);
        }
        .btn-quick-dp.active {
          background: #0369a1;
          border-color: #0369a1;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(3, 105, 161, 0.15);
        }
        .btn-metode {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 13.5px;
          transition: all 0.2s ease;
        }
        .btn-metode:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .btn-metode.active {
          background: #e0f2fe;
          border-color: #0369a1;
          color: #0369a1;
          box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.15);
        }
        .premium-calc-card {
          background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
        }
        .premium-calc-card::before {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          top: -50px;
          right: -50px;
          border-radius: 50%;
          pointer-events: none;
        }
        .sim-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.85;
          font-weight: 700;
          color: #e0f2fe;
        }
        .sim-value-large {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-family: 'Outfit', 'Inter', sans-serif;
        }
        .sim-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sim-detail-row:last-child {
          border-bottom: none;
        }
        .sim-detail-label {
          font-size: 13.5px;
          opacity: 0.9;
          color: #f0f9ff;
        }
        .sim-detail-val {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
        }
        .premium-btn-submit {
          background-color: #0369a1 !important;
          border-color: #0369a1 !important;
          border-radius: 14px !important;
          padding: 12.5px !important;
          font-size: 15px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .premium-btn-submit:hover:not(:disabled) {
          background-color: #0284c7 !important;
          border-color: #0284c7 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(3, 105, 161, 0.3) !important;
        }
        .premium-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 991px) {
          .sticky-lg-top {
            position: static !important;
          }
        }

        /* Mock Skeleton styles */
        .placeholder-icon-mock {
          width: 38px;
          height: 38px;
        }
        .placeholder-title-mock {
          width: 120px;
          height: 16px;
        }
        .placeholder-subtitle-mock {
          width: 200px;
          height: 12px;
        }
        .placeholder-label-mock {
          width: 80px;
          height: 14px;
        }
        .placeholder-input-mock {
          width: 100%;
          height: 42px;
        }
        .placeholder-card-right {
          height: 380px;
          background: #f8fafc;
        }
        .placeholder-sim-title {
          width: 120px;
          height: 14px;
        }
        .placeholder-sim-value {
          width: 200px;
          height: 28px;
        }
        .placeholder-sim-term {
          width: 100px;
          height: 12px;
        }
        .placeholder-sim-detail {
          width: 180px;
          height: 24px;
        }
        .placeholder-sim-label {
          width: 90px;
          height: 14px;
        }
        .placeholder-sim-val {
          width: 110px;
          height: 14px;
        }

        /* Sticky Calculator & Info panel */
        .sticky-calc-panel {
          top: 130px;
          z-index: 10;
        }
        .info-title {
          font-size: 13px;
        }
        .info-desc {
          line-height: 1.4;
        }
      `}</style>
    </>
  );
}

export default memo(FormPengajuanJualBeli);
