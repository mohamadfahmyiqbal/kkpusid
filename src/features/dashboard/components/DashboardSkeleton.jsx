import React from 'react';
import { Spinner } from 'react-bootstrap';

const DashboardSkeleton = () => {
  return (
    <div className="container-fluid pb-5">
      {/* Welcome Section Skeleton */}
      <div className="mb-4">
        <div className="placeholder-glow">
          <div className="placeholder col-6 mb-2" style={{ height: '2rem' }}></div>
          <div className="placeholder col-4 mb-3" style={{ height: '1.5rem' }}></div>
        </div>
      </div>

      {/* Registration Card Skeleton */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="placeholder-glow">
            <div className="placeholder col-12 mb-3" style={{ height: '1.5rem' }}></div>
            <div className="placeholder col-8 mb-2" style={{ height: '1rem' }}></div>
            <div className="placeholder col-10 mb-3" style={{ height: '1rem' }}></div>
            <div className="placeholder col-6" style={{ height: '2.5rem' }}></div>
          </div>
        </div>
      </div>

      {/* Alert Skeleton */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="d-flex align-items-center">
            <div className="placeholder me-2" style={{ width: '1rem', height: '1rem' }}></div>
            <div className="placeholder-glow flex-grow-1">
              <div className="placeholder col-12" style={{ height: '1.2rem' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections Skeleton */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          {/* Financial Section Skeleton */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="placeholder-glow mb-3">
                <div className="placeholder col-4" style={{ height: '1.5rem' }}></div>
              </div>
              <div className="row g-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="col-md-6">
                    <div className="placeholder-glow">
                      <div className="placeholder col-8 mb-2" style={{ height: '0.8rem' }}></div>
                      <div className="placeholder col-6" style={{ height: '1.5rem' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Section Skeleton */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="placeholder-glow mb-3">
                <div className="placeholder col-6" style={{ height: '1.5rem' }}></div>
              </div>
              <div className="row g-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="col-md-4 col-6">
                    <div className="placeholder-glow">
                      <div className="placeholder" style={{ height: '4rem' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Article Section Skeleton */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="placeholder-glow mb-3">
                <div className="placeholder col-8" style={{ height: '1.5rem' }}></div>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="mb-3">
                  <div className="placeholder-glow">
                    <div className="placeholder col-12 mb-2" style={{ height: '2rem' }}></div>
                    <div className="placeholder col-10 mb-1" style={{ height: '0.8rem' }}></div>
                    <div className="placeholder col-8" style={{ height: '0.8rem' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="text-center py-3">
        <Spinner animation="border" variant="primary" size="sm" />
        <small className="d-block mt-2 text-muted">Memuat dashboard...</small>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
