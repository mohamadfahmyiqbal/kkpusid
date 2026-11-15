import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { EDIT_PROFILE_TABS } from "./EditProfileNavTabs";

export default function EditProfileFooter({
  activeTab,
  setActiveTab,
  onHide,
  isSubmitting,
}) {
  const tabKeys = EDIT_PROFILE_TABS.map((t) => t.key);
  const currentIdx = tabKeys.indexOf(activeTab);

  const handlePrev = () => {
    if (currentIdx > 0) {
      setActiveTab(tabKeys[currentIdx - 1]);
    }
  };

  const handleNext = () => {
    if (currentIdx < tabKeys.length - 1) {
      setActiveTab(tabKeys[currentIdx + 1]);
    }
  };

  return (
    <div className="modal-footer d-flex justify-content-between border-top">
      <div className="d-flex gap-2">
        {currentIdx > 0 && (
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handlePrev}
          >
            ← Sebelumnya
          </Button>
        )}
        {currentIdx < tabKeys.length - 1 && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleNext}
          >
            Selanjutnya →
          </Button>
        )}
      </div>

      <div className="d-flex gap-2">
        <Button variant="light" onClick={onHide} disabled={isSubmitting}>
          Tutup
        </Button>
        <Button
          variant="primary"
          type="submit"
          form="editProfileForm"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="ms-2">Menyimpan...</span>
            </>
          ) : (
            "Simpan Semua Perubahan"
          )}
        </Button>
      </div>
    </div>
  );
}
