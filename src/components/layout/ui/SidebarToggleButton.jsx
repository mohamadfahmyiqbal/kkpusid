import React, { memo } from "react";
import { ACCESSIBILITY_LABELS } from "../../../constants/layout";

const SidebarToggleButton = memo(({ sidebarShown, onClick, controlsId }) => {
  const actionLabel = sidebarShown ? "Tutup sidebar" : "Buka sidebar";

  return (
    <button
      className={`sidebar-toggle-btn mobile-sidebar-toggle${sidebarShown ? " is-open" : ""}`}
      type="button"
      onClick={onClick}
      aria-label={`${ACCESSIBILITY_LABELS.TOGGLE_SIDEBAR}: ${actionLabel}`}
      aria-expanded={sidebarShown}
      aria-pressed={sidebarShown}
      aria-controls={controlsId}
      title={actionLabel}
    >
      <span className="mobile-sidebar-toggle__bars" aria-hidden="true">
        <span className="mobile-sidebar-toggle__line"></span>
        <span className="mobile-sidebar-toggle__line"></span>
        <span className="mobile-sidebar-toggle__line"></span>
      </span>
      <span className="visually-hidden">{actionLabel}</span>
    </button>
  );
});

SidebarToggleButton.displayName = "SidebarToggleButton";

export default SidebarToggleButton;
