import React, { useState, useEffect } from "react";
import { Button, Spinner, Row, Col, Card } from "react-bootstrap";
import { FaMoneyBillWave, FaArrowLeft, FaCheckCircle, FaLock, FaBuilding, FaWallet, FaStore, FaCreditCard, FaQrcode } from "react-icons/fa";
import { motion } from "framer-motion";
import Alert from "../../../../components/ui/SwalAlert";
import UBilling from "../../../../utils/api/UBilling";

const InvoiceActions = ({ isPaid, isProcessing, onPay, onBack, returnPageName, totalAmount }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [feeConfigs, setFeeConfigs] = useState([]);
  const [isLoadingFees, setIsLoadingFees] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await UBilling.getPaymentFeeConfigs();
        if (response.data && response.data.success) {
          setFeeConfigs(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch payment fees, using defaults", error);
      } finally {
        setIsLoadingFees(false);
      }
    };
    fetchFees();
  }, []);

  const calculateFee = (type) => {
    const config = feeConfigs.find(c => c.payment_type === type);
    
    if (config) {
      const flatFee = parseFloat(config.flat_fee) || 0;
      const percentageFee = parseFloat(config.percentage_fee) || 0;
      
      switch (config.fee_type) {
        case 'FLAT':
          return flatFee;
        case 'PERCENTAGE':
          return Math.round(totalAmount * (percentageFee / 100));
        case 'FLAT_AND_PERCENTAGE':
          return Math.round(flatFee + (totalAmount * (percentageFee / 100)));
        default:
          return 0;
      }
    }

    // Default fallback if not found in DB
    switch (type) {
      case 'bank_transfer':
        return 4440; // Rp 4.000 + 11% PPN
      case 'ewallet':
        return Math.round(totalAmount * 0.02); // 2% fee
      case 'qris':
        return Math.round(totalAmount * 0.007); // 0.7% fee
      case 'cstore':
        return 5550; // Rp 5.000 + 11% PPN
      case 'credit_card':
        return Math.round(totalAmount * 0.029) + 2000; // 2.9% + Rp 2.000
      default:
        return 0;
    }
  };

  const paymentMethods = [
    { id: 'bca', name: 'BCA Virtual Account', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'bni', name: 'BNI Virtual Account', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'bri', name: 'BRI Virtual Account', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'mandiri', name: 'Mandiri Bill Payment', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'permata', name: 'Permata Virtual Account', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'cimb', name: 'CIMB Virtual Account', type: 'bank_transfer', icon: <FaBuilding /> },
    { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: <FaWallet /> },
    { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', icon: <FaWallet /> },
    { id: 'qris', name: 'QRIS', type: 'qris', icon: <FaQrcode /> },
    { id: 'indomaret', name: 'Indomaret', type: 'cstore', icon: <FaStore /> },
    { id: 'alfamart', name: 'Alfamart', type: 'cstore', icon: <FaStore /> },
    { id: 'credit_card', name: 'Kartu Kredit / Debit', type: 'credit_card', icon: <FaCreditCard /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 d-print-none"
    >
      {!isPaid ? (
        <div className="text-center">
          <div className="text-start mb-4 p-4 border rounded shadow-sm bg-white">
            <h6 className="fw-bold mb-3 border-bottom pb-2">Metode Pembayaran</h6>
            
            {!selectedMethod ? (
              <div className="payment-methods-container" style={{ maxHeight: '60vh', overflowY: 'auto', overflowX: 'hidden', paddingRight: '10px' }}>
                {[
                  { title: "Transfer Bank (Virtual Account)", types: ['bank_transfer'] },
                  { title: "E-Wallet & QRIS", types: ['ewallet', 'qris'] },
                  { title: "Gerai Retail", types: ['cstore'] },
                  { title: "Kartu Kredit / Debit", types: ['credit_card'] }
                ].map((category, idx) => (
                  <div key={idx} className="mb-4">
                    <h6 className="text-muted small fw-bold text-uppercase mb-3 ps-1">{category.title}</h6>
                    <Row className="g-3">
                      {paymentMethods.filter(m => category.types.includes(m.type)).map((method) => (
                        <Col md={6} key={method.id}>
                          <Card 
                            as={motion.div}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-100 cursor-pointer border-light-subtle shadow-sm"
                            onClick={() => setSelectedMethod(method.id)}
                            style={{ cursor: 'pointer', borderRadius: '12px' }}
                          >
                            <Card.Body className="d-flex align-items-center p-3">
                              <div 
                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary me-3"
                                style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}
                              >
                                {method.icon}
                              </div>
                              <div className="flex-grow-1">
                                <div className="fw-bold text-dark">{method.name}</div>
                                <div className="text-muted small">Biaya: Rp {calculateFee(method.type).toLocaleString('id-ID')}</div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            ) : (
              <div className="payment-confirmation">
                {paymentMethods.filter(m => m.id === selectedMethod).map(method => {
                  const fee = calculateFee(method.type);
                  const total = totalAmount + fee;
                  return (
                    <motion.div 
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-1"
                    >
                      <div className="d-flex align-items-center justify-content-between p-3 border rounded-4 mb-4 bg-light shadow-sm">
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="d-flex align-items-center justify-content-center rounded-circle bg-white text-primary shadow-sm"
                            style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                          >
                            {method.icon}
                          </div>
                          <div>
                            <div className="text-muted small mb-1">Metode Dipilih</div>
                            <div className="fw-bold fs-5 text-dark lh-1">{method.name}</div>
                          </div>
                        </div>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          className="rounded-pill px-3 fw-semibold" 
                          onClick={() => setSelectedMethod("")}
                        >
                          Ubah
                        </Button>
                      </div>

                      <div className="p-4 border rounded-4 mb-4 bg-white shadow-sm">
                        <h6 className="fw-bold mb-3 border-bottom pb-2">Rincian Pembayaran</h6>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Subtotal Tagihan</span>
                          <span className="fw-semibold">Rp {totalAmount.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">Biaya Layanan</span>
                          <span className="fw-semibold">Rp {fee.toLocaleString('id-ID')}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                          <span className="fw-bold fs-5 text-dark">Total</span>
                          <span className="fw-bold fs-3 text-primary">Rp {total.toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        className="w-100 py-3 fw-bold rounded-4 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
                        onClick={() => onPay(selectedMethod)}
                        disabled={isProcessing}
                        style={{ 
                          background: "linear-gradient(45deg, #007bff, #0056b3)",
                          border: "none",
                          fontSize: "1.1rem"
                        }}
                      >
                        {isProcessing ? (
                          <>
                            <Spinner animation="border" size="sm" />
                            <span>Memproses Pembayaran...</span>
                          </>
                        ) : (
                          <>
                            <FaMoneyBillWave /> 
                            <span>PROSES PEMBAYARAN SEKARANG</span>
                          </>
                        )}
                      </Button>
                      <div className="d-flex align-items-center justify-content-center gap-2 text-muted small">
                        <FaLock size={12} className="text-success" />
                        <span>Pembayaran aman via <strong>Midtrans Secure Payment</strong></span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Alert
            variant="success"
            className="rounded-4 py-4 mb-4 text-center border-0 shadow-sm bg-success bg-opacity-10 text-success"
          >
            <div className="d-flex flex-column align-items-center gap-2">
              <FaCheckCircle size={30} />
              <div className="fw-bold h5 mb-0">Pembayaran Terverifikasi</div>
              <p className="small mb-0 opacity-75">
                Transaksi ini telah dibayar lunas. Terima kasih atas kontribusi Anda.
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
            <span>KEMBALI KE {returnPageName.toUpperCase()}</span>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default InvoiceActions;
