import React from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import { FaCheckCircle, FaRegFileAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { motion } from "framer-motion";

const InvoiceCard = ({ billData, totalAmount, isPaid }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-0 shadow-lg rounded-4 overflow-hidden position-relative">
        {/* Background Decorative Element */}
        <div 
          className="position-absolute" 
          style={{ 
            top: "-50px", 
            right: "-50px", 
            width: "200px", 
            height: "200px", 
            borderRadius: "50%", 
            background: isPaid ? "rgba(40, 167, 69, 0.05)" : "rgba(0, 123, 255, 0.05)",
            zIndex: 0
          }} 
        />

        {/* Banner Status with Gradient */}
        <div
          className={`text-center py-5 position-relative ${
            isPaid ? "bg-gradient-success" : "bg-gradient-primary"
          } text-white`}
          style={{
            background: isPaid 
              ? "linear-gradient(45deg, #28a745, #20c997)" 
              : "linear-gradient(45deg, #007bff, #6610f2)",
            zIndex: 1
          }}
        >
          {isPaid ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <FaCheckCircle size={60} className="mb-3" />
              <h3 className="fw-bold mb-1">TRANSAKSI BERHASIL</h3>
              <p className="opacity-75 mb-0">Pembayaran telah kami terima dan diverifikasi</p>
            </motion.div>
          ) : (
            <>
              <FaFileInvoiceDollar size={60} className="mb-3" />
              <h3 className="fw-bold mb-1">DETAIL TAGIHAN</h3>
              <p className="opacity-75 mb-0">Silakan tinjau rincian pembayaran Anda</p>
            </>
          )}
        </div>

        <Card.Body className="p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>
          <Row className="mb-5 gy-4">
            <Col md={6}>
              <div className="mb-4">
                <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
                  Diterbitkan Untuk:
                </small>
                <h4 className="fw-bold text-dark mb-1">
                  {billData?.full_name || "Anggota"}
                </h4>
                <p className="text-primary fw-semibold mb-0">
                  {billData?.member_no || "ID Registrasi"}
                </p>
              </div>
            </Col>
            <Col md={6} className="text-md-end">
              <div>
                <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
                  Nomor Invoice:
                </small>
                <h5 className="fw-bold text-dark mb-1">
                  #{billData?.invoice_no || "INV/2024/000"}
                </h5>
                <small className="text-muted d-block fw-medium">
                  Tanggal: {new Date(billData?.createdAt).toLocaleDateString("id-ID", {
                    dateStyle: "long",
                  })}
                </small>
              </div>
            </Col>
          </Row>

          {/* Table Styling */}
          <div className="table-responsive-custom mb-5">
            <Table borderless className="align-middle">
              <thead>
                <tr className="border-bottom border-2 border-light">
                  <th className="py-3 px-0 text-muted small text-uppercase fw-bold ls-1" style={{ width: "70%" }}>DESKRIPSI ITEM</th>
                  <th className="py-3 px-0 text-end text-muted small text-uppercase fw-bold ls-1">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {billData?.details?.map((item, index) => (
                  <tr key={index} className="border-bottom border-light">
                    <td className="py-4 px-0">
                      <div className="fw-bold text-dark">{item.description}</div>
                      <small className="text-muted">Layanan Koperasi Digital</small>
                    </td>
                    <td className="py-4 px-0 text-end">
                      <span className="fw-bold text-dark h5 mb-0">
                        Rp {Number(item.amount).toLocaleString("id-ID")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Summary Section */}
          <Row className="justify-content-between align-items-end">
            <Col md={6} className="mb-4 mb-md-0">
              {isPaid && billData?.payment_type && (
                <div className="d-flex align-items-center gap-3 text-muted small">
                  <div className="bg-light p-2 rounded-3">
                    <FaCheckCircle className="text-success" />
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Dibayar via {billData.payment_type.replace(/_/g, " ").toUpperCase()}</div>
                    <div>{billData.settlement_time ? new Date(billData.settlement_time).toLocaleString("id-ID") : ""}</div>
                  </div>
                </div>
              )}
            </Col>
            <Col md={5}>
              <div className="p-4 rounded-4 bg-light border-0 shadow-sm overflow-hidden position-relative">
                <div 
                  className="position-absolute" 
                  style={{ 
                    bottom: "-10px", 
                    right: "-10px", 
                    opacity: 0.1, 
                    transform: "rotate(-15deg)" 
                  }}
                >
                  <FaRegFileAlt size={80} />
                </div>
                <p className="text-muted mb-2 fw-bold small text-uppercase ls-1">
                  Total Pembayaran
                </p>
                <h2 className="fw-bold text-primary mb-0">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </h2>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Custom Styles for this component */}
      <style>{`
        .ls-1 { letter-spacing: 1px; }
        .bg-gradient-primary { background: linear-gradient(135deg, #007bff 0%, #6610f2 100%); }
        .bg-gradient-success { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); }
        .table-responsive-custom { border-radius: 12px; }
      `}</style>
    </motion.div>
  );
};

export default InvoiceCard;
