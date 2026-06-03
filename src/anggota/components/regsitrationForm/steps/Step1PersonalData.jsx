import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaIdCard,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaVenusMars
} from "react-icons/fa";
import Select from "react-select";
import UGlobal from "../../../../../utils/api/UGlobal";

export default function Step1PersonalData({
  formData,
  handleChange,
  errors,
  setFormData,
}) {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      border: "1.5px solid #e2e8f0",
      backgroundColor: "#f8fafc",
      padding: "2px 6px",
      minHeight: "45px",
      fontSize: "14px",
      boxShadow: state.isFocused ? "0 0 0 4px rgba(37, 99, 235, 0.1)" : "none",
      borderColor: state.isFocused ? "#2563eb" : "#e2e8f0",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#94a3b8",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#1e293b",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
        ? "rgba(37, 99, 235, 0.08)"
        : "transparent",
      color: state.isSelected ? "#ffffff" : "#1e293b",
      "&:active": {
        backgroundColor: "#2563eb",
      },
    }),
  };

  // Load Awal Provinsi
  useEffect(() => {
    UGlobal.getProvinces().then((res) => {
      setProvinces(res.data.map((p) => ({ value: p.id, label: p.name })));
    });
  }, []);

  // Sync data jika user menekan tombol "Sebelumnya" (Back)
  useEffect(() => {
    if (formData.province_id) {
      UGlobal.getRegencies(formData.province_id).then((res) =>
        setRegencies(res.data.map((r) => ({ value: r.id, label: r.name })))
      );
    }
    if (formData.city_id) {
      UGlobal.getDistricts(formData.city_id).then((res) =>
        setDistricts(res.data.map((d) => ({ value: d.id, label: d.name })))
      );
    }
    if (formData.district_id) {
      UGlobal.getVillages(formData.district_id).then((res) =>
        setVillages(res.data.map((v) => ({ value: v.id, label: v.name })))
      );
    }
  }, [formData.province_id, formData.city_id, formData.district_id]);

  const handleProvinceChange = (selectedOption) => {
    const province_id = selectedOption ? selectedOption.value : "";
    setFormData((prev) => ({
      ...prev,
      province_id,
      city_id: "",
      district_id: "",
      village_id: "",
    }));
    setRegencies([]);
    setDistricts([]);
    setVillages([]);

    if (province_id) {
      UGlobal.getRegencies(province_id).then((res) =>
        setRegencies(res.data.map((r) => ({ value: r.id, label: r.name })))
      );
    }
  };

  const handleRegencyChange = (selectedOption) => {
    const city_id = selectedOption ? selectedOption.value : "";
    setFormData((prev) => ({
      ...prev,
      city_id,
      district_id: "",
      village_id: "",
    }));
    setDistricts([]);
    setVillages([]);

    if (city_id) {
      UGlobal.getDistricts(city_id).then((res) =>
        setDistricts(res.data.map((d) => ({ value: d.id, label: d.name })))
      );
    }
  };

  const handleDistrictChange = (selectedOption) => {
    const district_id = selectedOption ? selectedOption.value : "";
    setFormData((prev) => ({
      ...prev,
      district_id,
      village_id: "",
    }));
    setVillages([]);

    if (district_id) {
      UGlobal.getVillages(district_id).then((res) =>
        setVillages(res.data.map((v) => ({ value: v.id, label: v.name })))
      );
    }
  };

  return (
    <div className="p-2">
      {/* SECTION 1: DATA IDENTITAS */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaIdCard />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Data Pribadi & Identitas</h5>
          <small className="text-muted">
            Tulis nama lengkap dan nomor identitas NIK sesuai dengan KTP Anda
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0 mb-4">
        <Row className="g-3">
          {/* NAMA LENGKAP */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">Nama Lengkap <span className="text-danger">*</span></Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaUser size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.full_name}
                  placeholder="Masukkan nama lengkap"
                  className="border-0 py-2"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.full_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* NIK KTP */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">NIK KTP <span className="text-danger">*</span></Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaIdCard size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nik_ktp"
                  value={formData.nik_ktp || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.nik_ktp}
                  placeholder="Masukkan 16 digit NIK"
                  maxLength={16}
                  className="border-0 py-2"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.nik_ktp}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* TEMPAT LAHIR */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">Tempat Lahir <span className="text-danger">*</span></Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaMapMarkerAlt size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="birth_place"
                  value={formData.birth_place || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.birth_place}
                  placeholder="Tempat lahir"
                  className="border-0 py-2"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.birth_place}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* TANGGAL LAHIR */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">Tanggal Lahir <span className="text-danger">*</span></Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaCalendarAlt size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="birth_date"
                  value={formData.birth_date || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.birth_date}
                  className="border-0 py-2"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.birth_date}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* JENIS KELAMIN */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">Jenis Kelamin <span className="text-danger">*</span></Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaVenusMars size={14} />
                </InputGroup.Text>
                <Form.Select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                  className="border-0 py-2"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.gender}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* SECTION 2: DETAIL DOMISILI */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaMapMarkerAlt />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Detail Domisili (Sesuai KTP)</h5>
          <small className="text-muted">
            Tentukan detail lokasi tempat tinggal Anda berdasarkan alamat resmi
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0 mb-3">
        <Row className="mb-3 g-3">
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">Provinsi <span className="text-danger">*</span></Form.Label>
            <Select
              styles={customStyles}
              options={provinces}
              placeholder="Pilih Provinsi..."
              onChange={handleProvinceChange}
              value={
                provinces.find((p) => p.value === formData.province_id) ||
                null
              }
            />
            {errors.province_id && (
              <div className="text-danger small mt-1">{errors.province_id}</div>
            )}
          </Col>
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">Kota / Kabupaten <span className="text-danger">*</span></Form.Label>
            <Select
              styles={customStyles}
              options={regencies}
              placeholder="Pilih Kota..."
              isDisabled={!formData.province_id}
              onChange={handleRegencyChange}
              value={
                regencies.find((r) => r.value === formData.city_id) || null
              }
            />
            {errors.city_id && (
              <div className="text-danger small mt-1">{errors.city_id}</div>
            )}
          </Col>
        </Row>

        <Row className="mb-3 g-3">
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">Kecamatan <span className="text-danger">*</span></Form.Label>
            <Select
              styles={customStyles}
              options={districts}
              placeholder="Pilih Kecamatan..."
              isDisabled={!formData.city_id}
              onChange={handleDistrictChange}
              value={
                districts.find((d) => d.value === formData.district_id) ||
                null
              }
            />
            {errors.district_id && (
              <div className="text-danger small mt-1">{errors.district_id}</div>
            )}
          </Col>
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">Kelurahan <span className="text-danger">*</span></Form.Label>
            <Select
              styles={customStyles}
              options={villages}
              placeholder="Pilih Kelurahan..."
              isDisabled={!formData.district_id}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  village_id: selectedOption ? selectedOption.value : "",
                }))
              }
              value={
                villages.find((v) => v.value === formData.village_id) ||
                null
              }
            />
            {errors.village_id && (
              <div className="text-danger small mt-1">{errors.village_id}</div>
            )}
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold small mb-2">
            Alamat KTP (Jalan / Blok / No) <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="address_ktp"
            value={formData.address_ktp || ""}
            onChange={handleChange}
            isInvalid={!!errors.address_ktp}
            placeholder="Masukkan alamat lengkap sesuai KTP"
            rows={3}
            className="rounded-12 border-0 shadow-sm py-3 px-4"
          />
          <Form.Control.Feedback type="invalid">
            {errors.address_ktp}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="alert alert-info d-flex align-items-center rounded-12 mt-4 mb-0 border-0 bg-white shadow-sm p-3">
          <FaInfoCircle className="text-primary me-2 flex-shrink-0" size={16} />
          <small className="text-muted">
            Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan
            identitas resmi KTP Anda untuk mempercepat proses verifikasi.
          </small>
        </div>
      </div>
    </div>
  );
}
