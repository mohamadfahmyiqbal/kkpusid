import React from "react";

/**
 * Skeleton Loader untuk ProgramPage
 */
const ProgramSkeleton = () => (
  <div className="animate-pulse px-1">
    {/* Tabs Skeleton */}
    <div className="d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1">
      <div className="bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab" />
      <div className="bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab" />
    </div>
    
    {/* Card Skeleton Mockup */}
    <div className="bg-secondary bg-opacity-10 rounded-5 w-100 p-4 animate-pulse" style={{ height: "340px", border: "1px solid rgba(0,0,0,0.03)" }}>
      <div className="d-flex justify-content-between mb-4">
        <div className="bg-secondary bg-opacity-20 rounded" style={{ width: "140px", height: "20px" }} />
        <div className="bg-secondary bg-opacity-20 rounded-pill" style={{ width: "80px", height: "24px" }} />
      </div>
      <div className="bg-secondary bg-opacity-25 rounded mb-4" style={{ width: "42px", height: "30px" }} />
      <div className="bg-secondary bg-opacity-20 rounded mb-4" style={{ width: "70%", height: "22px" }} />
      <div className="row g-3 mb-4">
        <div className="col-6">
          <div className="bg-secondary bg-opacity-10 rounded mb-1" style={{ width: "40px", height: "10px" }} />
          <div className="bg-secondary bg-opacity-20 rounded" style={{ width: "90px", height: "16px" }} />
        </div>
        <div className="col-6">
          <div className="bg-secondary bg-opacity-10 rounded mb-1" style={{ width: "40px", height: "10px" }} />
          <div className="bg-secondary bg-opacity-20 rounded" style={{ width: "90px", height: "16px" }} />
        </div>
      </div>
      <div className="border-top border-secondary border-opacity-10 pt-3 d-flex justify-content-between">
        <div className="bg-secondary bg-opacity-10 rounded" style={{ width: "60px", height: "12px" }} />
        <div className="bg-secondary bg-opacity-20 rounded" style={{ width: "120px", height: "24px" }} />
      </div>
    </div>
  </div>
);

export default ProgramSkeleton;
