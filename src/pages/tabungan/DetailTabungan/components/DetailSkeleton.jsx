import React from "react";

export default function DetailSkeleton() {
  return (
    <div className="detail-animate-pulse">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="bg-light rounded-3"
          style={{ width: 56, height: 56 }}
        />
        <div className="flex-grow-1">
          <div
            className="bg-light rounded-3 mb-2"
            style={{ width: 180, height: 20 }}
          />
          <div
            className="bg-light rounded-3"
            style={{ width: 140, height: 14 }}
          />
        </div>
        <div
          className="bg-light rounded-pill"
          style={{ width: 70, height: 28 }}
        />
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="detail-skeleton-balance" />
        </div>
        <div className="col-md-6">
          <div className="detail-skeleton-balance" />
        </div>
      </div>
      <div className="detail-skeleton-progress mb-4" />
      <div className="row g-3">
        <div className="col-4">
          <div className="detail-skeleton-stat" />
        </div>
        <div className="col-4">
          <div className="detail-skeleton-stat" />
        </div>
        <div className="col-4">
          <div className="detail-skeleton-stat" />
        </div>
      </div>
    </div>
  );
}
