import React from "react";
import { Form } from "react-bootstrap";
import Card from "../../../components/ui/Card";
import {
  FaUsers,
  FaLayerGroup,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import FormInputField from "./FormInputField";

export default function ArisanApplicantForm({
  formData,
  errors,
  isLoading,
  onChange,
  akadText,
}) {
  return (
    <>
      <Card variant="form" className="p-3 p-md-4 mb-4">
        <Card.Body>
          <div className="form-section-header">
            <h6 className="fw-bold font-outfit mb-0 text-dark">
              Informasi Pendaftar
            </h6>
          </div>

          <FormInputField
            label="Nama Anggota"
            name="namaAnggota"
            value={formData.namaAnggota}
            onChange={onChange}
            placeholder="Masukkan nama lengkap pendaftar"
            error={errors.namaAnggota}
            readOnly={isLoading}
            icon={FaUsers}
            required
          />

          <FormInputField
            label="Nama Peserta Ke-2"
            name="namaPeserta2"
            value={formData.namaPeserta2}
            onChange={onChange}
            placeholder="Masukkan nama perwakilan / peserta cadangan"
            error={errors.namaPeserta2}
            readOnly={isLoading}
            icon={FaUsers}
            required
          />

          <div className="form-section-header mt-5">
            <h6 className="fw-bold font-outfit mb-0 text-dark">
              Detail Program
            </h6>
          </div>

          <FormInputField
            label="Nama Program"
            name="programArisan"
            value={formData.programArisan}
            icon={FaLayerGroup}
            readOnly
          />

          <FormInputField
            label="Periode Angsuran"
            name="periode"
            value={formData.periode}
            icon={FaCalendarAlt}
            readOnly
          />

          <Form.Group className="mb-4 custom-input-group">
            <Form.Label className="form-label d-flex align-items-center">
              <FaClipboardList className="me-2 text-teal" size={14} />
              Keterangan Pembukaan Arisan
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              value={formData.keterangan}
              onChange={onChange}
              placeholder="Tambahkan keterangan pendukung pendaftaran..."
              readOnly={isLoading}
              className="custom-flat-input"
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Akad details card */}
      <Card variant="form" className="p-3 p-md-4">
        <Card.Body>
          <div className="form-section-header">
            <h6 className="fw-bold font-outfit mb-0 text-dark">
              Akad Perjanjian
            </h6>
          </div>
          <p className="small text-muted mb-0 leading-relaxed font-plus-jakarta">
            {akadText}
          </p>
        </Card.Body>
      </Card>
    </>
  );
}
