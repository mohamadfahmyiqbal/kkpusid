import React, { useCallback } from "react";
import { Button, Spinner, Alert, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import InformasiRekeningCard from "../../SimpananPage/components/InformasiRekeningCard";
import useDetailSaldo from "../hooks/useDetailSaldo";
import SummaryCard from "../component/SummaryCard";
import FilterControls from "../component/FilterControls";
import TransactionTable from "../component/TransactionTable";
import ActionButtons from "../component/ActionButtons";

const DetailSaldoPage = ({ decodedToken }) => {
  const navigate = useNavigate();

  const {
    loading,
    error,
    balanceSummary,
    transactions,
    filteredTransactions,
    summary,
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
    transactionType,
    setTransactionType,
    categoryCode,
    displayName,
    returnPage,
    fetchData,
  } = useDetailSaldo(decodedToken);

  const handleBack = useCallback(() => {
    try {
      const token = jwtEncode({ page: returnPage });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Back navigation error:", error);
      const fallbackPages = ["simpananPage", "dashboard", "landingPage"];
      for (const page of fallbackPages) {
        try {
          const fallbackToken = jwtEncode({ page });
          navigate(`/${fallbackToken}`);
          break;
        } catch {
          continue;
        }
      }
    }
  }, [returnPage, navigate]);

  const handleExport = useCallback(() => {
    alert("Fitur export akan segera tersedia");
  }, []);

  const handleTransactionClick = useCallback(
    (transaction) => {
      try {
        const token = jwtEncode({
          page: "transactionDetailPage",
          transactionId: transaction.id,
          return: "detailSaldoPage",
          category: categoryCode,
        });
        navigate(`/${token}`);
      } catch (error) {
        console.error("Transaction detail navigation error:", error);
        alert("Tidak dapat membuka detail transaksi. Silakan coba lagi.");
      }
    },
    [categoryCode, navigate],
  );

  const handlePenarikanClick = useCallback(() => {
    try {
      const token = jwtEncode({
        page: "penarikanSimpananPage",
        category: categoryCode,
        displayName: displayName,
        return: "detailSaldoPage",
      });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Penarikan navigation error:", error);
      alert("Tidak dapat membuka halaman penarikan.");
    }
  }, [categoryCode, displayName, navigate]);

  const handleSetoranClick = useCallback(() => {
    try {
      const token = jwtEncode({
        page: "billingPage",
        category: categoryCode,
        displayName: displayName,
        return: "detailSaldoPage",
      });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Setoran navigation error:", error);
      alert("Tidak dapat membuka halaman setoran.");
    }
  }, [categoryCode, displayName, navigate]);

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted small">Memuat detail saldo...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Button
            variant="light"
            onClick={handleBack}
            className="rounded-circle me-3 shadow-sm"
          >
            <FaArrowLeft />
          </Button>
          <div>
            <h5 className="fw-bold mb-0">Detail Saldo</h5>
            <small className="text-muted">{displayName}</small>
          </div>
        </div>
        <Button
          variant="outline-primary"
          onClick={handleExport}
          className="d-flex align-items-center"
        >
          <FaDownload className="me-2" />
          Export
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="rounded-4 shadow-sm border-0 mb-4">
          {error}
        </Alert>
      )}

      <Row className="mb-4">
        <Col lg={8}>
          <InformasiRekeningCard
            activeType={categoryCode}
            displayName={displayName}
            variant="primary"
            showActions={false}
          />
        </Col>
        <Col lg={4}>
          <SummaryCard
            summary={summary}
            balanceSummary={balanceSummary}
            transactionsLength={transactions.length}
          />
        </Col>
      </Row>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateRange={dateRange}
        setDateRange={setDateRange}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <TransactionTable
        filteredTransactions={filteredTransactions}
        handleTransactionClick={handleTransactionClick}
        transactionsLength={transactions.length}
        setSearchTerm={setSearchTerm}
        setTransactionType={setTransactionType}
      />

      <ActionButtons
        handlePenarikanClick={handlePenarikanClick}
        handleSetoranClick={handleSetoranClick}
        fetchData={fetchData}
        balanceSummary={balanceSummary}
      />
    </div>
  );
};

export default DetailSaldoPage;
