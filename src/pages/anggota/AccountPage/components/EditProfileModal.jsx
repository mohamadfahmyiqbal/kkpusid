import React from "react";
import { Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Alert from "../../../../components/ui/SwalAlert";

import EditProfileNavTabs from "./edit-profile/EditProfileNavTabs";
import EditProfileFooter from "./edit-profile/EditProfileFooter";
import TabPribadiAlamat from "./edit-profile/TabPribadiAlamat";
import TabRekeningBank from "./edit-profile/TabRekeningBank";
import TabPekerjaan from "./edit-profile/TabPekerjaan";
import TabKontakDarurat from "./edit-profile/TabKontakDarurat";
import { useCascadingRegions } from "./edit-profile/useCascadingRegions";

export default function EditProfileModal({
  show,
  onHide,
  activeTab,
  setActiveTab,
  formData,
  setFormData,
  errors,
  isSubmitting,
  onSubmit,
  error,
  userProfile,
  handleChange,
}) {
  const { provinces, regencies, districts, villages } = useCascadingRegions(
    show,
    formData.province_id,
    formData.city_id,
    formData.district_id
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton className="border-bottom pb-3">
        <Modal.Title className="d-flex align-items-center gap-2">
          <FaEdit className="text-primary" />
          <span className="fw-bold">Edit Profil & Data Pendaftaran</span>
        </Modal.Title>
      </Modal.Header>

      {/* Navigation Tabs */}
      <EditProfileNavTabs
        activeTab={activeTab}
        onTabSelect={setActiveTab}
      />

      <Modal.Body className="p-4">
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Form onSubmit={onSubmit} id="editProfileForm">
          {/* TAB 1: PRIBADI & ALAMAT */}
          {activeTab === "pribadi" && (
            <TabPribadiAlamat
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
              userProfile={userProfile}
              provinces={provinces}
              regencies={regencies}
              districts={districts}
              villages={villages}
            />
          )}

          {/* TAB 2: REKENING BANK */}
          {activeTab === "bank" && (
            <TabRekeningBank
              formData={formData}
              errors={errors}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
            />
          )}

          {/* TAB 3: PEKERJAAN */}
          {activeTab === "pekerjaan" && (
            <TabPekerjaan
              formData={formData}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
            />
          )}

          {/* TAB 4: KONTAK DARURAT */}
          {activeTab === "darurat" && (
            <TabKontakDarurat
              formData={formData}
              isSubmitting={isSubmitting}
              handleChange={handleChange}
            />
          )}
        </Form>
      </Modal.Body>

      <EditProfileFooter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onHide={onHide}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
