import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";

export default function ArisanSkeleton() {
  return (
    <Row className="g-3">
      {[1, 2, 3].map((i) => (
        <Col md={6} lg={6} xl={4} key={i} className="mb-3">
          <div className="arisan-skeleton-card arisan-skeleton">
            <div className="d-flex justify-content-between">
              <div
                className="arisan-skeleton"
                style={{ width: "60px", height: "16px" }}
              />
              <div
                className="arisan-skeleton"
                style={{
                  width: "80px",
                  height: "20px",
                  borderRadius: "12px",
                }}
              />
            </div>
            <div className="my-3">
              <div
                className="arisan-skeleton mb-2"
                style={{ width: "80%", height: "24px" }}
              />
              <div
                className="arisan-skeleton"
                style={{ width: "50%", height: "16px" }}
              />
            </div>
            <div
              className="grid gap-3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="arisan-skeleton"
                  style={{ height: "40px", borderRadius: "8px" }}
                />
              ))}
            </div>
            <div
              className="mt-3 arisan-skeleton"
              style={{ height: "40px", borderRadius: "20px" }}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
}
