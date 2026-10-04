import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function ProfileSkeleton() {
  return (
    <div>
      <div className="card ap-profile-header-card mb-4 p-4 skeleton-shimmer">
        <div className="d-flex align-items-center gap-4">
          <div
            className="rounded-circle bg-light"
            style={{ width: "100px", height: "100px", opacity: 0.1 }}
          ></div>
          <div className="flex-grow-1">
            <div
              className="bg-light mb-2 rounded"
              style={{ width: "200px", height: "24px", opacity: 0.1 }}
            ></div>
            <div
              className="bg-light mb-2 rounded"
              style={{ width: "120px", height: "16px", opacity: 0.1 }}
            ></div>
            <div
              className="bg-light rounded"
              style={{ width: "150px", height: "14px", opacity: 0.1 }}
            ></div>
          </div>
        </div>
      </div>

      <Card className="ap-info-card mb-4 skeleton-shimmer">
        <Card.Header className="ap-card-header p-3">
          <div
            className="bg-light rounded"
            style={{ width: "150px", height: "20px", opacity: 0.1 }}
          ></div>
        </Card.Header>
        <Card.Body className="p-4">
          <Row>
            {[1, 2, 3].map((colIndex) => (
              <Col key={colIndex} md={4} className="mb-3">
                {[1, 2, 3].map((rowIndex) => (
                  <div key={rowIndex} className="mb-3">
                    <div
                      className="bg-light mb-1 rounded"
                      style={{ width: "80px", height: "12px", opacity: 0.1 }}
                    ></div>
                    <div
                      className="bg-light rounded"
                      style={{ width: "150px", height: "16px", opacity: 0.1 }}
                    ></div>
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
