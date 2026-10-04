import React from "react";
import { Card } from "react-bootstrap";

export default function TransactionDetailSkeleton() {
  return (
    <div className="container-fluid py-4 px-3 px-md-4 min-vh-100 d-flex justify-content-center">
      <div className="w-100">
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4">
                <div className="skeleton-box skeleton-title mb-3"></div>
                <div className="skeleton-box skeleton-line-full mb-2"></div>
                <div className="skeleton-box skeleton-line-partial"></div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
