import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCheck, FaHourglassHalf, FaTimes } from "react-icons/fa";

export default function ApprovalInfoSection({
  requestApprovals,
  allApproved,
  onNext,
}) {
  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold border-bottom pb-2">Approval Info</h5>
      <Container>
        <Row className="text-center justify-content-center">
          {requestApprovals?.map((app, index) => {
            const status = app?.status?.toLowerCase();
            let bgColor = "secondary";
            let icon;
            if (status === "approved") {
              icon = <FaCheck size={30} />;
            } else if (status === "rejected") {
              icon = <FaTimes size={30} />;
            } else {
              icon = <FaHourglassHalf size={40} />;
            }

            if (status === "approved") bgColor = "success";
            if (status === "rejected") bgColor = "danger";

            return (
              <Col xs={6} md={6} lg={3} className="mb-4" key={app?.id || index}>
                <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-1">
                  {/* Lingkaran Icon */}
                  <Card
                    bg={bgColor}
                    text="white"
                    className="rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-0"
                    style={{
                      width: "90px",
                      height: "90px",
                    }}
                  >
                    <div className="fs-3">{icon}</div>
                  </Card>

                  {/* Nama Approver */}
                  <div
                    className="fw-semibold text-center text-truncate"
                    style={{
                      maxWidth: "100px",
                      lineHeight: "1.2",
                    }}
                  >
                    {app?.approverAnggota?.nama || "-"}
                  </div>

                  {/* Status */}
                  <div
                    className="small fst-italic text-muted text-center"
                    style={{ lineHeight: "1.2" }}
                  >
                    {app?.status || "-"}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <Row className="border-top">
          {allApproved && (
            <Col xs={12} className="mt-3">
              <Button
                className="bg-blue700 w-100 text-white"
                onClick={onNext}
              >
                Selanjutnya
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
}
