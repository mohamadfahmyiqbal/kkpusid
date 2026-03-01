import React from "react";

const SkeletonContent = () => (
  <div className="container-fluid animate-pulse">
    {/* Placeholder Welcome Greeting */}
    <div
      className="bg-light rounded mb-4 shadow-sm"
      style={{ height: "120px", width: "100%" }}
    ></div>

    <div className="row">
      {/* Placeholder Financial Section */}
      <div className="col-md-8">
        <div
          className="bg-light rounded mb-4 shadow-sm"
          style={{ height: "220px" }}
        ></div>
      </div>
      {/* Placeholder Promo/Side Card */}
      <div className="col-md-4">
        <div
          className="bg-light rounded mb-4 shadow-sm"
          style={{ height: "220px" }}
        ></div>
      </div>
    </div>

    {/* Placeholder Grid Menu */}
    <div className="row">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="col-3 col-md-2 mb-4">
          <div
            className="bg-light rounded shadow-sm mx-auto"
            style={{ height: "70px", width: "70px" }}
          ></div>
          <div
            className="bg-light mt-2 mx-auto"
            style={{ height: "10px", width: "50px" }}
          ></div>
        </div>
      ))}
    </div>

    <style>{`
      .animate-pulse {
        animation: pulse 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .4; }
      }
      .bg-light { background-color: #f2f4f5 !important; }
    `}</style>
  </div>
);

export default SkeletonContent;
