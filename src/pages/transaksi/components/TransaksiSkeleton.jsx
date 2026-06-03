import React from "react";

const TransaksiSkeleton = () => (
  <div className="animate-pulse">
    {/* Card Skeleton */}
    <div className="bg-light rounded-4 w-100 mb-4 skeleton-card" />
    
    {/* Stats Grid Skeleton */}
    <div className="row g-3 mb-4 px-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="col-4">
          <div className="bg-light rounded-3 w-100 skeleton-stat" />
        </div>
      ))}
    </div>

    {/* Search & Filter Skeleton */}
    <div className="d-flex flex-column gap-3 mb-4 px-2">
      <div className="bg-light rounded-pill w-100 skeleton-search" />
      <div className="d-flex gap-2">
        <div className="bg-light rounded-pill skeleton-filter-1" />
        <div className="bg-light rounded-pill skeleton-filter-2" />
        <div className="bg-light rounded-pill skeleton-filter-3" />
      </div>
    </div>

    {/* List Skeleton */}
    <div className="px-2">
      <div className="placeholder col-3 mb-3 rounded skeleton-title"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="d-flex align-items-center gap-3 mb-3 p-3 bg-white rounded-3 shadow-sm">
          <div className="bg-light rounded-circle skeleton-avatar" />
          <div className="flex-grow-1">
            <div className="placeholder col-8 mb-1 rounded skeleton-line-1"></div>
            <div className="placeholder col-4 rounded skeleton-line-2"></div>
          </div>
          <div className="placeholder col-3 rounded skeleton-line-3"></div>
        </div>
      ))}
    </div>
  </div>
);

export default TransaksiSkeleton;
