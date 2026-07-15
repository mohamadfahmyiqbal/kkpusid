import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Spinner} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import {
  FaKaaba,
  FaGraduationCap,
  FaUtensils,
  FaReceipt,
} from "react-icons/fa";

import SetoranAccountSummary from "./components/SetoranAccountSummary";
import SetoranTagihanList from "./components/SetoranTagihanList";
import SetoranPaymentSummary from "./components/SetoranPaymentSummary";
import Alert from "../../../components/ui/SwalAlert";


// Product configurations
const TABUNGAN_CONFIG = {
  haji: {
    label: "Tabungan Haji",
    icon: <FaKaaba size={40} />,
    color: "success",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  umrah: {
    label: "Tabungan Umrah",
    icon: <FaKaaba size={40} />,
    color: "primary",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  },
  pendidikan: {
    label: "Tabungan Pendidikan",
    icon: <FaGraduationCap size={40} />,
    color: "info",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
  },
  qurban: {
    label: "Tabungan Qurban",
    icon: <FaUtensils size={40} />,
    color: "warning",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
  },
};

const SetoranTabungan = () => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState("haji");
  const [accountData, setAccountData] = useState(null);
  const [tagihanList, setTagihanList] = useState([]);
  const [selectedTagihan, setSelectedTagihan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [flexibleAmount, setFlexibleAmount] = useState("");

  const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;

  useEffect(() => {
    let currentProduct = "haji";
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) {
        currentProduct = decoded.product;
        setProductType(currentProduct);
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const { default: TabunganService } = await import("../../../services/tabungan.service");
        const accountRes = await TabunganService.checkAccountStatus(currentProduct);
        
        if (accountRes?.data?.hasAccount) {
          setAccountData({
            memberSavingTargetId: accountRes.data.member_saving_target_id,
            accountNumber: `TBG-${accountRes.data.member_saving_target_id.toString().padStart(6, '0')}`,
            currentBalance: accountRes.data.current_balance,
            targetAmount: accountRes.data.target_amount,
            monthlyTarget: accountRes.data.min_monthly_deposit || 0,
            accountName: accountRes.data.target_name || "Tabungan"
          });

          if (accountRes.data.member_saving_target_id) {
            const billsRes = await TabunganService.getTabunganBills(accountRes.data.member_saving_target_id);
            if (billsRes?.data) {
              setTagihanList(billsRes.data.map(bill => ({
                id: bill.bill_item_id,
                period: bill.description,
                dueDate: bill.due_date,
                amount: bill.amount,
                status: bill.status.toLowerCase(),
                virtualAccount: "Menunggu Pembayaran",
              })));
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch tabungan data:", error);
        setError("Gagal memuat data rekening tabungan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleSelectTagihan = useCallback((tagihan) => {
    setSelectedTagihan(tagihan);
    setFlexibleAmount(tagihan.amount.toString());
  }, []);

  const handleProsesSetoran = async () => {
    if (!selectedTagihan) return;

    setSubmitting(true);
    setError(null);

    try {
      const { default: TabunganService } = await import("../../../services/tabungan.service");
      const paymentAmount = flexibleAmount ? parseFloat(flexibleAmount) : selectedTagihan.amount;
      
      const paymentData = {
        bill_item_ids: [selectedTagihan.id],
        amount: paymentAmount,
        tx_category: "TABUNGAN_DEPOSIT",
        payment_method: "BANK_TRANSFER", 
      };
      
      const response = await TabunganService.processPayment(paymentData);

      if (response?.data?.snapToken || response?.data?.billId) {
        const token = jwtEncode({
          page: "invoicePage",
          billItemIds: [selectedTagihan.id],
          billId: response.data.billId,
          category: "TABUNGAN_DEPOSIT",
          return: "setoranTabungan",
          product: productType,
          id: accountData.member_saving_target_id,
        });
        navigate(`/${token}`);
      } else if (response?.data?.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        // Fallback
        const token = jwtEncode({
          page: "invoicePage",
          billItemIds: [selectedTagihan.id],
          billId: response?.data?.billId,
          status: "success",
          return: "setoranTabungan",
          product: productType,
          id: accountData.member_saving_target_id,
        });
        navigate(`/${token}`);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal memproses pembayaran");
      setSubmitting(false);
    }
  };

  const handleBack = useCallback(() => {
    const token = jwtEncode({
      page: "detailTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const handleKembaliKeDetail = useCallback(() => {
    const token = jwtEncode({
      page: "detailTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-secondary fw-medium">Memuat data tagihan...</p>
      </div>
    );
  }

  return (
    <Container className="py-4 pb-5 min-vh-100 bg-light" fluid>
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Account Summary Card */}
            <motion.div variants={cardVariants}>
              <SetoranAccountSummary
                productConfig={productConfig}
                accountData={accountData}
                formatCurrency={formatCurrency}
              />
            </motion.div>

            {error && (
              <motion.div variants={cardVariants}>
                <Alert variant="danger" className="border-0 shadow-sm rounded-4 mb-4 d-flex align-items-center gap-2">
                  <FaReceipt /> {error}
                </Alert>
              </motion.div>
            )}

            <Row className="g-4">
              <Col lg={7}>
                {/* Tagihan List */}
                <motion.div variants={cardVariants} className="h-100">
                  <SetoranTagihanList
                    tagihanList={tagihanList}
                    selectedTagihan={selectedTagihan}
                    handleSelectTagihan={handleSelectTagihan}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                  />
                </motion.div>
              </Col>

              <Col lg={5}>
                <motion.div variants={cardVariants} className="position-sticky" style={{ top: '2rem' }}>
                  <SetoranPaymentSummary
                    selectedTagihan={selectedTagihan}
                    flexibleAmount={flexibleAmount}
                    setFlexibleAmount={setFlexibleAmount}
                    handleProsesSetoran={handleProsesSetoran}
                    submitting={submitting}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                  />
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default SetoranTabungan;

