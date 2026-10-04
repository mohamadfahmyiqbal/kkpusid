import React from "react";
import PropTypes from "prop-types";
import { MdAccountBalance, MdGroup } from "react-icons/md";

export const PROGRAM_OPTIONS = [
  { label: "Pinjaman Lunak", key: "pinjaman", icon: MdAccountBalance },
  { label: "Arisan", key: "arisan", icon: MdGroup },
];

export default function ArisanProgramTabs({ activeTab, onTabChange }) {
  return (
    <div className="arisan-tabs-container mb-4 px-2">
      <div className="d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 arisan-scroll-hide">
        {PROGRAM_OPTIONS.map((opt) => {
          const isActive = activeTab === opt.key;
          const IconComponent = opt.icon;
          return (
            <button
              key={opt.key}
              onClick={() => onTabChange(opt.key)}
              className={`arisan-tab-btn ${isActive ? "active" : ""}`}
            >
              <IconComponent size={18} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

ArisanProgramTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};
