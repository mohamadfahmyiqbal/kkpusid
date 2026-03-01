import React, { useMemo } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "utils/helpers";
import { useWithdrawalValidation } from "./hooks/useWithdrawalValidation";
import WithdrawalForm from "./components/WithdrawalForm";
import HistoryList from "./components/HistoryList";
import SaldoHeader from "./components/SaldoHeader";
import { useWithdrawalData } from "./hooks/useWithdrawalData";

const PenarikanSimpananPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { categoryCode } = decodedToken || {};
  const effectiveCategory = useMemo(
    () => categoryCode || "SS_SUKARELA",
    [categoryCode],
  );

  const { balance, history, loading, refreshHistory, userData } =
    useWithdrawalData(effectiveCategory);
  const { validate } = useWithdrawalValidation();

  const handleItemClick = (item) => {
    const withdrawalId = item.withdrawal_id || item.id;
    navigate(
      `/${jwtEncode({
        page: "transactionDetailPage",
        withdrawalId: withdrawalId,
      })}`,
    );
  };

  console.log("User Data for Withdrawal:", userData);
  console.log("Balance:", balance);
  console.log("Category:", effectiveCategory);

  return (
    <Container fluid className="p-0 bg-light min-vh-100">
      <div
        className="bg-white pb-4 px-3 pt-2 shadow-sm mb-4"
        style={{ borderRadius: "0 0 30px 30px" }}
      >
        <SaldoHeader balance={balance} loading={loading.balance} />
      </div>

      <div className="px-3">
        <Row className="g-4">
          <Col lg={7}>
            <Card
              className="border-0 shadow-sm overflow-hidden"
              style={{ borderRadius: "20px" }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary-subtle p-2 rounded-3 me-3">
                    <i className="bi bi-wallet2 text-primary fs-4"></i>
                  </div>
                  <h5 className="fw-bold mb-0 text-dark">
                    Form Pengajuan Pencairan
                  </h5>
                </div>

                <WithdrawalForm
                  balance={balance}
                  categoryCode={effectiveCategory}
                  validate={validate}
                  onSuccess={refreshHistory}
                  userData={userData}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card
              className="border-0 shadow-sm"
              style={{ borderRadius: "20px" }}
            >
              <Card.Header className="bg-white border-0 pt-4 px-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-0 text-dark">Riwayat Transaksi</h6>
                  <span className="badge bg-light text-primary rounded-pill px-3">
                    Terbaru
                  </span>
                </div>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <HistoryList
                  history={history}
                  loading={loading.history}
                  onItemClick={handleItemClick}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default React.memo(PenarikanSimpananPage);
