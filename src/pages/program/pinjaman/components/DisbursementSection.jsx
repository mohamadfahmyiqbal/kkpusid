import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import {
  FaUniversity,
  FaWallet,
  FaCalendarAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FormInputField from "./FormInputField";

const MethodSelectorCards = ({ selectedValue, onChange }) => {
  const options = [
    {
      value: "Non Tunai",
      title: "Transfer Bank",
      subtitle: "Cairkan ke rekening bank",
      icon: FaUniversity,
    },
    {
      value: "Tunai",
      title: "Pencairan Tunai",
      subtitle: "Ambil langsung di koperasi",
      icon: FaWallet,
    },
  ];

  return (
    <div className="method-selector-row">
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        const Icon = opt.icon;
        return (
          <motion.div
            key={opt.value}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.99 }}
            className={`method-select-card ${isSelected ? "selected" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <div className="method-icon-wrap">
              <Icon size={18} />
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-dark font-outfit" style={{ fontSize: "14px" }}>
                {opt.title}
              </h6>
              <small className="text-muted" style={{ fontSize: "11px" }}>
                {opt.subtitle}
              </small>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function DisbursementSection({ formData, errors, handleInputChange }) {
  return (
    <>
      {/* Section 2: Metode Pencairan */}
      <div className="form-section-header">
        <h5 className="fw-bold mb-0 text-dark font-outfit">Metode & Detail Pencairan</h5>
        <small className="text-muted">Pilih cara Anda ingin menerima dana pembiayaan</small>
      </div>

      <Form.Group className="mb-4">
        <Form.Label className="small text-muted mb-2 font-outfit fw-bold">
          Metode Pencairan
        </Form.Label>
        <MethodSelectorCards
          selectedValue={formData.metodePencairan}
          onChange={(val) =>
            handleInputChange({ target: { name: "metodePencairan", value: val } })
          }
        />
      </Form.Group>

      <AnimatePresence mode="wait">
        {formData.metodePencairan === "Non Tunai" ? (
          <motion.div
            key="non-tunai"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Row className="g-3 mb-3">
              <Col md={6}>
                <FormInputField
                  label="No. Rekening Penerima"
                  name="noRekening"
                  value={formData.noRekening}
                  onChange={handleInputChange}
                  required
                  icon={FaUniversity}
                  error={errors.noRekening}
                  placeholder="Masukkan nomor rekening"
                />
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3 custom-input-group">
                  <Form.Label className="small mb-1 text-muted font-outfit fw-bold">
                    Bank Tujuan
                  </Form.Label>
                  <Form.Select
                    name="bankTujuan"
                    value={formData.bankTujuan}
                    onChange={handleInputChange}
                    className="custom-flat-input"
                  >
                    <option value="Bank Syariah Indonesia">Bank Syariah Indonesia (BSI)</option>
                    <option value="Bank Mandiri">Bank Mandiri</option>
                    <option value="BCA">BCA</option>
                    <option value="BRI">BRI</option>
                    <option value="BNI">BNI</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </motion.div>
        ) : (
          <motion.div
            key="tunai"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mb-3">
              <FormInputField
                label="Lokasi Pengambilan Tunai"
                name="lokasiPencairan"
                value={formData.lokasiPencairan}
                onChange={handleInputChange}
                required
                icon={FaUniversity}
                error={errors.lokasiPencairan}
                placeholder="Contoh: Kantor Pusat Koperasi"
              />
              <Row className="g-3">
                <Col md={6}>
                  <FormInputField
                    label="Tanggal Pengambilan"
                    name="tanggalPencairan"
                    type="date"
                    value={formData.tanggalPencairan}
                    onChange={handleInputChange}
                    required
                    icon={FaCalendarAlt}
                    error={errors.tanggalPencairan}
                  />
                </Col>
                <Col md={6}>
                  <FormInputField
                    label="Jam Pengambilan"
                    name="jamPencairan"
                    type="time"
                    value={formData.jamPencairan}
                    onChange={handleInputChange}
                    required
                    icon={FaClock}
                    error={errors.jamPencairan}
                  />
                </Col>
              </Row>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FormInputField
        label="Nama Lengkap Pemohon (Sesuai Identitas)"
        name="namaNasabah"
        value={formData.namaNasabah}
        onChange={handleInputChange}
        required
        icon={FaUser}
        error={errors.namaNasabah}
        placeholder="Masukkan nama lengkap Anda"
      />
    </>
  );
}
