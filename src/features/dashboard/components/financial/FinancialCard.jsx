// fe/src/features/dashboard/components/financial/FinancialCard.jsx

import React from "react";
import { FaEye, FaEyeSlash, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

const FinancialCard = ({ 
  title, icon: Icon, showBalance, onToggleBalance, isRefreshing, onRefresh, onDetail, 
  subItems, variant, formattedAmount 
}) => (
  <div
    className={`card border-0 shadow-sm overflow-hidden financial-card ${variant ? `card-variant-${variant}` : ""}`}
  >
    {/* Decorative Background Elements */}
    <div className="financial-card-decor-top" />
    <div className="financial-card-decor-bottom" />

    <div className="card-body p-4 position-relative financial-card-body">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center gap-2">
          <div className="financial-card-icon-wrapper bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center">
            <Icon size={16} />
          </div>
          <h6 className="fw-semibold mb-0 opacity-90 financial-card-title">
            {title}
          </h6>
        </div>
        
        <div className="d-flex gap-2">
          {onDetail && (
            <button type="button" className="btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all" onClick={onDetail} aria-label="Detail">
              <FaInfoCircle size={16} />
            </button>
          )}
          <button type="button" className={`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? 'fa-spin' : ''}`} onClick={onRefresh} disabled={isRefreshing} aria-label="Refresh">
            <FaSyncAlt size={16} />
          </button>
          <button type="button" className="btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all" onClick={onToggleBalance} aria-label="Toggle">
            {showBalance ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <div className="py-3">
        <h2 className="fw-bold mb-0 d-flex align-items-baseline financial-card-amount">
          {showBalance ? formattedAmount : <span className="financial-card-amount-hidden">Rp ••••••••</span>}
        </h2>
      </div>

      <div className="row g-2 mt-0">
        {subItems && (
          <div className="col-12">
            <div className="d-flex flex-column gap-2 text-white mt-1">
              {subItems.map((item, idx) => (
                <div key={idx} className={`d-flex justify-content-between align-items-center ${idx !== subItems.length - 1 ? 'border-bottom border-white border-opacity-10 pb-2' : ''}`}>
                  <div className="d-flex align-items-center gap-2">
                    {item.icon && <item.icon size={12} className="opacity-75" />}
                    <div className="opacity-75 fw-bold financial-card-subitem-label">{item.label}</div>
                  </div>
                  <div className="fw-bold financial-card-subitem-amount">{showBalance ? item.formattedAmount : 'Rp ••••••••'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default FinancialCard;
