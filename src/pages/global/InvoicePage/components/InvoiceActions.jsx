import React, { useState, useEffect } from "react";
import {
  Button,
  Spinner,
  Row,
  Col,
  Card,
  Form,
  Badge,
  Table,
} from "react-bootstrap";
import {
  FaMoneyBillWave,
  FaArrowLeft,
  FaCheckCircle,
  FaBuilding,
  FaUpload,
  FaCopy,
  FaClock,
  FaTimesCircle,
  FaUserCheck,
  FaReceipt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Alert from "../../../../components/ui/SwalAlert";
import Swal from "sweetalert2";
import UBilling from "../../../../utils/api/UBilling";

const InvoiceActions = ({
  isPaid,
  billData,
  onBack,
  returnPageName,
  totalAmount,
  billItemIds,
  category,
  financingId,
  onPaymentSubmitted,
}) => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [selectedBankId, setSelectedBankId] = useState(null);

  // Form State
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [senderName, setSenderName] = useState("");
  const [senderBank, setSenderBank] = useState("");
  const [senderAccountNo, setSenderAccountNo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  // Local state hasil submission agar langsung berganti tampilan ke summary detail
  const [submittedData, setSubmittedData] = useState(null);

  const txData = submittedData || billData?.transaction;

  const isPendingVerification =
    submittedData?.status === "PENDING_VERIFICATION" ||
    billData?.status === "PENDING_VERIFICATION" ||
    billData?.status === "pending_verification" ||
    billData?.bill_status === "pending_verification";

  const isRejected =
    billData?.status === "rejected" || billData?.status === "REJECTED";

  // Fetch daftar rekening koperasi dari database
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoadingBanks(true);
        const res = await UBilling.getCooperativeBanks();
        if (res.data?.status && Array.isArray(res.data.data)) {
          setBankAccounts(res.data.data);
          if (res.data.data.length > 0) {
            setSelectedBankId(res.data.data[0].id);
          }
        }
      } catch (err) {
        console.error("Gagal memuat rekening koperasi:", err);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const handleCopy = (text, bankId) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(bankId);
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "Ukuran File Terlalu Besar",
          text: "Maksimal ukuran file adalah 5MB.",
        });
        return;
      }
      setProofFile(file);
      if (file.type.startsWith("image/")) {
        setProofPreview(URL.createObjectURL(file));
      } else {
        setProofPreview(null);
      }
    }
  };

  const handleSubmitProof = async (e) => {
    e.preventDefault();

    if (!proofFile) {
      Swal.fire({
        icon: "warning",
        title: "Bukti Transfer Diperlukan",
        text: "Silakan pilih foto struk atau screenshot bukti transfer terlebih dahulu.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("proof", proofFile);
      if (billData?.bill_id) formData.append("bill_id", billData.bill_id);
      if (billItemIds && billItemIds.length > 0) {
        formData.append("bill_item_ids", JSON.stringify(billItemIds));
      }
      formData.append("amount", totalAmount);
      formData.append("bank_id", selectedBankId || "");
      formData.append("sender_name", senderName);
      formData.append("sender_bank", senderBank);
      formData.append("sender_account_no", senderAccountNo);
      formData.append("tx_category", category || "SETORAN_SIMPANAN");
      if (financingId) formData.append("financing_id", financingId);

      const response = await UBilling.submitManualPayment(formData);

      if (response.data?.status) {
        const resultData = response.data.data;
        // Simpan ke local state agar langsung tampil ke view ringkasan & approval flow
        setSubmittedData({
          ...resultData,
          sender_name: senderName,
          sender_bank: senderBank,
          sender_account_no: senderAccountNo,
          amount: totalAmount,
          bank_name: selectedBank?.bank_name,
          proof_of_transfer: resultData.proof_url,
          created_at: new Date().toISOString(),
        });

        Swal.fire({
          icon: "success",
          title: "Bukti Pembayaran Terkirim!",
          text: "Data pembayaran berhasil disimpan dan diteruskan ke Bendahara Koperasi untuk verifikasi.",
          confirmButtonColor: "#007bff",
        });

        if (onPaymentSubmitted) {
          onPaymentSubmitted(resultData);
        }
      }
    } catch (err) {
      console.error("Upload proof error:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Mengunggah",
        text:
          err.response?.data?.message ||
          "Terjadi kendala saat mengunggah bukti transfer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedBank =
    bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 d-print-none"
    >
      {/* 1. STATUS SUDAH LUNAS */}
      {isPaid ? (
        <div className="text-center">
          <Alert
            variant="success"
            className="rounded-4 py-4 mb-4 text-center border-0 shadow-sm bg-success bg-opacity-10 text-success"
          >
            <div className="d-flex flex-column align-items-center gap-2">
              <FaCheckCircle size={36} />
              <div className="fw-bold h5 mb-0">Pembayaran Terverifikasi & Disetujui</div>
              <p className="small mb-0 opacity-75">
                Tagihan ini telah diverifikasi dan dinyatakan Lunas oleh Bendahara Koperasi.
              </p>
            </div>
          </Alert>
          <Button
            variant="outline-primary"
            size="lg"
            className="w-100 py-3 fw-bold rounded-4 shadow-sm border-2 d-flex align-items-center justify-content-center gap-2"
            onClick={onBack}
          >
            <FaArrowLeft />
            <span>KEMBALI KE {returnPageName ? returnPageName.toUpperCase() : "HALAMAN UTAMA"}</span>
          </Button>
        </div>
      ) : isPendingVerification ? (
        /* 2. SUMMARY DETAIL PROSES & TAHAPAN APPROVAL BENDAHARA */
        <div className="p-4 border rounded-4 bg-white shadow-sm mb-4">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle">
                <FaClock size={28} />
              </div>
              <div>
                <h5 className="fw-bold text-dark mb-0">Detail Proses Pembayaran</h5>
                <span className="text-muted small">Status: Menunggu Verifikasi & Rekonsiliasi</span>
              </div>
            </div>
            <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill fs-6">
              MENUNGGU VERIFIKASI
            </Badge>
          </div>

          {/* TAHAP ALUR APPROVAL BENDAHARA */}
          <div className="mb-4 p-3 bg-light rounded-3 border">
            <h6 className="fw-bold text-secondary mb-3 d-flex align-items-center gap-2">
              <FaUserCheck className="text-primary" />
              Alur Verifikasi Bendahara
            </h6>
            <div className="d-flex flex-column flex-md-row gap-3">
              {/* Step 1: Member Submit */}
              <div className="flex-fill p-3 bg-white rounded-3 border border-success border-2 shadow-xs">
                <div className="d-flex align-items-center gap-2 text-success fw-bold small mb-1">
                  <FaCheckCircle /> Tahap 1: Pengiriman Bukti
                </div>
                <div className="fw-bold text-dark small">Telah Dikirim oleh Anggota</div>
                <div className="text-muted" style={{ fontSize: "11px" }}>
                  File struk transfer tersimpan di sistem
                </div>
              </div>

              {/* Step 2: Bendahara Approval */}
              <div className="flex-fill p-3 bg-white rounded-3 border border-warning border-2 shadow-xs">
                <div className="d-flex align-items-center gap-2 text-warning fw-bold small mb-1">
                  <FaClock /> Tahap 2: Approval Bendahara
                </div>
                <div className="fw-bold text-dark small">Pemeriksaan Mutasi Rekening</div>
                <div className="text-muted" style={{ fontSize: "11px" }}>
                  Bendahara memvalidasi dana masuk ke rekening koperasi
                </div>
              </div>

              {/* Step 3: Ledger & Lunas */}
              <div className="flex-fill p-3 bg-white rounded-3 border border-light-subtle shadow-xs opacity-75">
                <div className="d-flex align-items-center gap-2 text-muted fw-bold small mb-1">
                  <FaReceipt /> Tahap 3: Pembukuan Ledger
                </div>
                <div className="fw-bold text-dark small">Penerbitan Saldo & Lunas</div>
                <div className="text-muted" style={{ fontSize: "11px" }}>
                  Otomatis update saldo simpanan setelah di-approve
                </div>
              </div>
            </div>
          </div>

          {/* TABEL RINCIAN PEMBAYARAN YANG DIKIRIM */}
          <h6 className="fw-bold text-secondary mb-3">Ringkasan Bukti Pembayaran:</h6>
          <Table responsive bordered hover className="align-middle mb-4">
            <tbody>
              <tr>
                <td className="bg-light fw-semibold text-muted" style={{ width: "35%" }}>
                  Nomor Referensi Transaksi
                </td>
                <td className="fw-bold text-primary font-monospace">
                  {txData?.order_id || txData?.midtrans_order_id || "-"}
                </td>
              </tr>
              <tr>
                <td className="bg-light fw-semibold text-muted">Total Pembayaran</td>
                <td className="fw-bold fs-5 text-dark">
                  Rp {parseFloat(txData?.amount || totalAmount).toLocaleString("id-ID")}
                </td>
              </tr>
              <tr>
                <td className="bg-light fw-semibold text-muted">Rekening Tujuan Koperasi</td>
                <td>
                  <strong>{txData?.bank_name || selectedBank?.bank_name || "Bank Koperasi"}</strong>
                </td>
              </tr>
              <tr>
                <td className="bg-light fw-semibold text-muted">Nama Pengirim</td>
                <td>{txData?.sender_name || senderName || "-"}</td>
              </tr>
              {txData?.sender_bank && (
                <tr>
                  <td className="bg-light fw-semibold text-muted">Bank Pengirim</td>
                  <td>{txData.sender_bank}</td>
                </tr>
              )}
              {txData?.sender_account_no && (
                <tr>
                  <td className="bg-light fw-semibold text-muted">Nomor Rekening Pengirim</td>
                  <td>{txData.sender_account_no}</td>
                </tr>
              )}
              <tr>
                <td className="bg-light fw-semibold text-muted">Lampiran Bukti Transfer</td>
                <td>
                  {txData?.proof_of_transfer || txData?.proof_url ? (
                    <a
                      href={txData?.proof_of_transfer || txData?.proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 rounded-pill"
                    >
                      <FaExternalLinkAlt size={12} /> Buka Bukti Struk
                    </a>
                  ) : (
                    <span className="text-muted small">Tersimpan</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="bg-light fw-semibold text-muted">Waktu Pengiriman</td>
                <td className="text-muted small">
                  {new Date(txData?.created_at || Date.now()).toLocaleString("id-ID", {
                    dateStyle: "full",
                    timeStyle: "medium",
                  })}
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              className="flex-fill py-2 rounded-3 fw-bold"
              onClick={onBack}
            >
              <FaArrowLeft className="me-2" /> Kembali ke {returnPageName ? returnPageName.toUpperCase() : "Daftar Tagihan"}
            </Button>
            <Button
              variant="outline-secondary"
              className="py-2 px-3 rounded-3"
              onClick={() => window.print()}
            >
              Cetak Bukti Kirim
            </Button>
          </div>
        </div>
      ) : (
        /* 3. ALUR TRANSFER MANUAL: PILIH REKENING & FORM UPLOAD BUKTI */
        <div className="bg-white p-4 rounded-4 shadow-sm border">
          {isRejected && (
            <Alert variant="danger" className="mb-4">
              <div className="d-flex align-items-center gap-2">
                <FaTimesCircle size={20} />
                <div>
                  <strong>Pembayaran Sebelumnya Ditolak oleh Bendahara</strong>
                  <div className="small">
                    {billData?.transaction?.admin_note
                      ? `Catatan Bendahara: ${billData.transaction.admin_note}`
                      : "Silakan pastikan Anda mentransfer ke rekening resmi koperasi dan upload foto struk yang terbaca jelas."}
                  </div>
                </div>
              </div>
            </Alert>
          )}

          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
            <div>
              <h5 className="fw-bold text-primary mb-1">
                <FaBuilding className="me-2" />
                Transfer Bank Manual
              </h5>
              <div className="text-muted small">
                Pilih rekening resmi koperasi di bawah dan transfer sesuai nominal pas.
              </div>
            </div>
            <div className="text-end">
              <div className="text-muted small">Total yang Ditransfer</div>
              <div className="fs-4 fw-bold text-primary">
                Rp {totalAmount.toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* PILIHAN REKENING KOPERASI */}
          <h6 className="fw-bold mb-3 text-secondary">1. Pilih Rekening Tujuan Transfer:</h6>
          {loadingBanks ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" size="sm" />
              <div className="small text-muted mt-2">Memuat rekening tujuan...</div>
            </div>
          ) : (
            <Row className="g-3 mb-4">
              {bankAccounts.map((bank) => {
                const isSelected = selectedBankId === bank.id;
                return (
                  <Col md={6} key={bank.id}>
                    <Card
                      as={motion.div}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedBankId(bank.id)}
                      className={`cursor-pointer border-2 transition-all rounded-3 ${
                        isSelected
                          ? "border-primary bg-primary bg-opacity-10 shadow-sm"
                          : "border-light-subtle bg-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body className="p-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span className="badge bg-primary text-uppercase px-2 py-1">
                            {bank.bank_code}
                          </span>
                          {isSelected && (
                            <FaCheckCircle className="text-primary" size={18} />
                          )}
                        </div>
                        <div className="fw-bold text-dark">{bank.bank_name}</div>
                        <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top">
                          <div>
                            <div className="text-muted" style={{ fontSize: "11px" }}>
                              Nomor Rekening:
                            </div>
                            <div className="fw-bold fs-6 text-primary">
                              {bank.account_number}
                            </div>
                            <div className="text-muted small">
                              a.n. {bank.account_holder}
                            </div>
                          </div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(bank.account_number, bank.id);
                            }}
                          >
                            <FaCopy className="me-1" />
                            {copySuccess === bank.id ? "Tersalin!" : "Salin"}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}

          {/* INSTRUKSI TRANSFER */}
          {selectedBank && selectedBank.instructions && (
            <div className="bg-light p-3 rounded-3 mb-4 border border-light-subtle small text-muted">
              <strong>Catatan:</strong> {selectedBank.instructions}
            </div>
          )}

          {/* FORM UPLOAD BUKTI TRANSFER */}
          <h6 className="fw-bold mb-3 text-secondary">2. Konfirmasi & Upload Bukti Pembayaran:</h6>
          <Form onSubmit={handleSubmitProof}>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="senderName">
                  <Form.Label className="small fw-semibold">Nama Pengirim (Pemilik Rekening)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="senderBank">
                  <Form.Label className="small fw-semibold">Bank Pengirim</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Contoh: BCA / Mandiri / BRI"
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="proofFile">
                  <Form.Label className="small fw-semibold">
                    Unggah Bukti Struk / Screenshot Transfer <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Format: JPG, PNG, WEBP, atau PDF (Maksimal 5MB).
                  </Form.Text>
                </Form.Group>

                {proofPreview && (
                  <div className="mt-3 p-2 border rounded-3 text-center bg-light">
                    <div className="text-muted small mb-1">Pratinjau Bukti:</div>
                    <img
                      src={proofPreview}
                      alt="Preview Bukti Transfer"
                      style={{ maxHeight: "200px", maxWidth: "100%", borderRadius: "8px" }}
                    />
                  </div>
                )}
              </Col>
            </Row>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-100 py-3 fw-bold rounded-4 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Mengunggah Bukti Pembayaran...</span>
                </>
              ) : (
                <>
                  <FaUpload />
                  <span>KIRIM BUKTI PEMBAYARAN KE BENDAHARA</span>
                </>
              )}
            </Button>
          </Form>

          <Button
            variant="link"
            className="w-100 text-muted text-decoration-none mt-2"
            onClick={onBack}
          >
            <FaArrowLeft className="me-2" /> Batal & Kembali
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default InvoiceActions;
