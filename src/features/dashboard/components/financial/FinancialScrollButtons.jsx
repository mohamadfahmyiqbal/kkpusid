// fe/src/features/dashboard/components/financial/FinancialScrollButtons.jsx

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FinancialScrollButtons = ({ onScrollLeft, onScrollRight }) => {
  return (
    <>
      <button 
        onClick={onScrollLeft}
        className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-left"
      >
        <FaChevronLeft />
      </button>
      
      <button 
        onClick={onScrollRight}
        className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-right"
      >
        <FaChevronRight />
      </button>
    </>
  );
};

export default FinancialScrollButtons;
