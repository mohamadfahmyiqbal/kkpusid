import React, { useCallback, useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft } from "react-icons/fa";

// Import komponen layout
import DashboardLayout from "../../components/layout/DashboardLayout";

// --- DATA MOCKUP INVOICE (Diambil dari BillingPage.jsx) ---
const mockInvoiceDetail = {
  // Data statis, dalam aplikasi nyata ini akan berasal dari state/API
  to: "Avhan Hadi",
  invoiceNumber: "234234324234234",
  bankName: "Bank Syariah Mandiri",
  invoiceDate: "05 Maret 2025 08:00",
  expiredDate: "06 Maret 2025 08:00",
  virtualAccount: "12312312312312313",
  status: "Menunggu Pembayaran",
  items: [
    {
      description: "Pembayaran simpanan pokok periode Maret 2025",
      amount: 200000,
    },
    {
      description: "Pembayaran simpanan pokok periode April 2025",
      amount: 200000,
    },
    {
      description: "Pembayaran simpanan pokok periode Mei 2025",
      amount: 200000,
    },
  ],
  fee: 2500,
};

export default function InvoicePage() {
  const navigate = useNavigate();

  // Hitung total item dan total akhir
  const { totalItems, grandTotal } = useMemo(() => {
    const total = mockInvoiceDetail.items.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const grand = total + mockInvoiceDetail.fee;
    return {
      totalItems: total,
      grandTotal: grand.toLocaleString("id-ID"),
    };
  }, []);

  // Handler untuk kembali ke halaman sebelumnya (misalnya BillingPage)
  const handleBack = useCallback(() => {
    // Navigasi kembali ke halaman BillingPage
    const token = jwtEncode({ page: "billingPage" });
    navigate(`/${token}`);
  }, [navigate]);

  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBack}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Invoice
          </h3>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <Card className="invoice-card">
            <Card.Body>
              {/* Header Info */}
              <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-3">
                <div className="mb-2">
                  <small className="text-muted">To</small>
                  <h5>{mockInvoiceDetail.to}</h5>
                </div>
                <div className="mb-2 text-end">
                  <small className="text-muted">Invoice Number</small>
                  <h5>{mockInvoiceDetail.invoiceNumber}</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between flex-wrap border-bottom pb-2 mb-4">
                <div className="mb-2">
                  <small className="text-muted">Invoice Date</small>
                  <h6 className="fw-bold">{mockInvoiceDetail.invoiceDate}</h6>
                </div>
                <div className="mb-2 text-end">
                  <small className="text-muted">Expired Date</small>
                  <h6 className="fw-bold text-danger">
                    {mockInvoiceDetail.expiredDate}
                  </h6>
                </div>
              </div>

              {/* Detail Item (Tabel) */}
              <h5 className="mb-3">Description</h5>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr className="bg-light">
                      <th style={{ width: "70%" }}>Deskripsi</th>
                      <th className="text-end" style={{ width: "30%" }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockInvoiceDetail.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td className="text-end">
                          Rp {item.amount.toLocaleString("id-ID")},-
                        </td>
                      </tr>
                    ))}
                    {/* Biaya Admin */}
                    <tr className="border-top">
                      <td>Biaya Admin</td>
                      <td className="text-end">
                        Rp {mockInvoiceDetail.fee.toLocaleString("id-ID")},-
                      </td>
                    </tr>
                  </tbody>
                  {/* Total */}
                  <tfoot>
                    <tr>
                      <th className="text-start">Total</th>
                      <th className="text-end text-danger fs-5">
                        Rp {grandTotal},-
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment Info */}
              <div className="mt-4 border-top pt-3">
                <div className="row">
                  <div className="col-6">
                    <small className="text-muted d-block">Bank</small>
                    <strong className="d-block">
                      {mockInvoiceDetail.bankName}
                    </strong>
                  </div>
                  <div className="col-6 text-end">
                    <small className="text-muted d-block">
                      Virtual Account
                    </small>
                    <strong className="text-danger d-block fs-5">
                      {mockInvoiceDetail.virtualAccount}
                    </strong>
                  </div>
                </div>
                <div className="text-center mt-3">
                  <span className={`badge bg-warning text-dark p-2`}>
                    {mockInvoiceDetail.status}
                  </span>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="success" className="me-2">
                Cetak Invoice
              </Button>
              <Button variant="secondary">Bantuan</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
