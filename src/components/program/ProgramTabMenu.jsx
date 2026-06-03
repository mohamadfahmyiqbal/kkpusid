// components/program/ProgramTabMenu.jsx

import React from "react";

const ProgramTabMenu = ({ options, activeKey, onChange }) => {
  return (
    <div className="dc-program-tabs-container">
      <div className="d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 scroll-hide">
        {options?.map((option) => {
          const Icon = option.icon;
          const isActive = activeKey === option.key;

          return (
            <button
              key={option.key}
              onClick={() => onChange(option.key)}
              className={`dc-program-tab-btn ${isActive ? "active" : ""}`}
            >
              {Icon && <Icon size={18} />}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>

      <style>{`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .dc-program-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1px solid #f1f5f9;
          background: white;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .dc-program-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .dc-program-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
        }

        .dc-program-tab-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 767px) {
          .dc-program-tab-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProgramTabMenu;

