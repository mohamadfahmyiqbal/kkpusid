import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaCoins, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import FormInputField from "./FormInputField";

const QUICK_NOMINALS = [
  { label: "500 Rb", value: 500000 },
  { label: "1 Jt", value: 1000000 },
  { label: "2 Jt", value: 2000000 },
  { label: "3 Jt", value: 3000000 },
];

const QUICK_TENORS = [1, 2, 3];

function angkaToTerbilang(num) {
  if (isNaN(num) || num <= 0) return "";
  const ones = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas",
  ];

  function terbilang(n) {
    if (n < 12) return ones[n];
    if (n < 20) return ones[n - 10] + " Belas";
    if (n < 100) return ones[Math.floor(n / 10)] + " Puluh " + ones[n % 10];
    if (n < 200) return "Seratus " + terbilang(n - 100);
    if (n < 1000) return ones[Math.floor(n / 100)] + " Ratus " + terbilang(n % 100);
    if (n < 2000) return "Seribu " + terbilang(n - 1000);
    if (n < 1000000) return terbilang(Math.floor(n / 1000)) + " Ribu " + terbilang(n % 1000);
    if (n < 1000000000)
      return terbilang(Math.floor(n / 1000000)) + " Juta " + terbilang(n % 1000000);
    if (n < 1000000000000)
      return terbilang(Math.floor(n / 1000000000)) + " Miliar " + terbilang(n % 1000000000);
    return "";
  }

  const result = terbilang(num).replace(/\s+/g, " ").trim();
  if (!result) return "";

  let formatted = result.replace("Satu Ratus", "Seratus").replace("Satu Ribu", "Seribu");

  return formatted + " Rupiah";
}

const ProductCardSelector = ({ products, selectedValue, onChange, isLoading }) => {
  if (isLoading) {
    return (
      <div className="d-flex gap-3 mb-4 overflow-hidden">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-secondary bg-opacity-10 rounded-4 animate-pulse flex-grow-1"
            style={{ height: "105px" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="product-selector-grid">
      {products.map((p) => {
        const isSelected = selectedValue === p.name;
        return (
          <motion.div
            key={p.product_id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`product-select-card ${isSelected ? "selected" : ""}`}
            onClick={() => onChange(p.name)}
          >
            {isSelected && (
              <div className="selected-badge">
                <FaCheck size={10} />
              </div>
            )}
            <div>
              <span
                className={`badge mb-2 font-outfit ${
                  p.akad_type === "Murabahah"
                    ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                    : "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"
                }`}
                style={{ fontSize: "10px", padding: "5px 8px", borderRadius: "6px" }}
              >
                Akad {p.akad_type}
              </span>
              <h6 className="fw-bold mb-1 text-dark font-outfit" style={{ fontSize: "14.5px" }}>
                {p.name}
              </h6>
              <span className="text-muted small font-outfit" style={{ fontSize: "11.5px" }}>
                Tenor Default: {p.default_term} Bln
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function NominalTenorSection({
  loanProducts,
  formData,
  errors,
  isLoadingProducts,
  handleInputChange,
  setNominalQuick,
  setTenorQuick,
}) {
  const nominalVal = parseInt(formData.nominalPinjaman) || 0;

  return (
    <>
      {/* Section 1: Produk & Nominal */}
      <div className="form-section-header">
        <h5 className="fw-bold mb-0 text-dark font-outfit">Pilih Produk & Nominal</h5>
        <small className="text-muted">Pilih produk pembiayaan yang sesuai kebutuhan Anda</small>
      </div>

      <Form.Group className="mb-4">
        <Form.Label className="small text-muted mb-2 font-outfit fw-bold">
          Jenis Pinjaman
        </Form.Label>
        <ProductCardSelector
          products={loanProducts}
          selectedValue={formData.jenisPinjaman}
          onChange={(val) =>
            handleInputChange({ target: { name: "jenisPinjaman", value: val } })
          }
          isLoading={isLoadingProducts}
        />
      </Form.Group>

      <Row className="g-3 mb-4">
        <Col md={12}>
          <FormInputField
            label="Nominal Pengajuan (Rp)"
            name="nominalPinjaman"
            value={formData.nominalPinjaman}
            onChange={handleInputChange}
            type="currency"
            required
            icon={FaCoins}
            error={errors.nominalPinjaman}
            placeholder="Contoh: 5.000.000"
          />
          <div className="chip-container">
            {QUICK_NOMINALS.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`chip-btn ${nominalVal === item.value ? "active" : ""}`}
                onClick={() => setNominalQuick(item.value)}
              >
                Rp {item.label}
              </button>
            ))}
          </div>

          {nominalVal > 0 && (
            <div className="mt-2 font-outfit d-flex align-items-center gap-1 flex-wrap">
              <span className="text-muted small fw-semibold">Terbilang:</span>
              <span
                className="fw-bold italic px-2 py-1 rounded font-plus-jakarta"
                style={{
                  fontSize: "11.5px",
                  backgroundColor: "#eff6ff",
                  color: "#1e40af",
                  border: "1px solid #bfdbfe",
                  display: "inline-block"
                }}
              >
                {angkaToTerbilang(nominalVal)}
              </span>
            </div>
          )}
        </Col>


      </Row>

      <Form.Group className="mb-4">
        <Form.Label className="small text-muted mb-2 font-outfit fw-bold d-flex justify-content-between">
          <span>Tenor Pembayaran</span>
          <span className="text-teal font-outfit fw-bold">{formData.termPembayaran} Bulan</span>
        </Form.Label>
        <div className="slider-container">
          <Form.Range
            min={1}
            max={3}
            step={1}
            value={formData.termPembayaran}
            name="termPembayaran"
            onChange={handleInputChange}
            className="custom-range-slider"
          />
          <div className="chip-container mt-3">
            {QUICK_TENORS.map((val) => (
              <button
                key={val}
                type="button"
                className={`chip-btn ${
                  parseInt(formData.termPembayaran) === val ? "active" : ""
                }`}
                onClick={() => setTenorQuick(val)}
              >
                {val} Bulan
              </button>
            ))}
          </div>
        </div>
      </Form.Group>
    </>
  );
}
