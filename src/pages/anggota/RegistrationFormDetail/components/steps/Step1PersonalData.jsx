import React, { useState, useEffect } from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaMapMarkerAlt, FaIdCard, FaInfoCircle, FaUser } from "react-icons/fa";
import Select from "react-select";
import UGlobal from "../../../../../utils/api/UGlobal";

const Step1PersonalData = ({
  formData,
  handleChange,
  errors,
  handleFieldChange,
  handleFieldBlur,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

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
        setRegencies(res.data.map((r) => ({ value: r.id, label: r.name }))),
      );
    }
    if (formData.city_id) {
      UGlobal.getDistricts(formData.city_id).then((res) =>
        setDistricts(res.data.map((d) => ({ value: d.id, label: d.name }))),
      );
    }
    if (formData.district_id) {
      UGlobal.getVillages(formData.district_id).then((res) =>
        setVillages(res.data.map((v) => ({ value: v.id, label: v.name }))),
      );
    }
  }, [formData.province_id, formData.city_id, formData.district_id]);

  const handleProvinceSelect = (opt) => {
    handleFieldChange({
      province_id: opt?.value || "",
      provinsi: opt?.label || "",
      city_id: "",
      kota_kab: "",
      district_id: "",
      kecamatan: "",
      subdistrict_id: "",
      kelurahan: "",
    });
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
    if (opt) {
      UGlobal.getRegencies(opt.value).then((res) =>
        setRegencies(res.data.map((r) => ({ value: r.id, label: r.name }))),
      );
    }
  };

  const handleRegencySelect = (opt) => {
    handleFieldChange({
      city_id: opt?.value || "",
      kota_kab: opt?.label || "",
      district_id: "",
      kecamatan: "",
      subdistrict_id: "",
      kelurahan: "",
    });
    setDistricts([]);
    setVillages([]);
    if (opt) {
      UGlobal.getDistricts(opt.value).then((res) =>
        setDistricts(res.data.map((d) => ({ value: d.id, label: d.name }))),
      );
    }
  };

  const handleDistrictSelect = (opt) => {
    handleFieldChange({
      district_id: opt?.value || "",
      kecamatan: opt?.label || "",
      subdistrict_id: "",
      kelurahan: "",
    });
    setVillages([]);
    if (opt) {
      UGlobal.getVillages(opt.value).then((res) =>
        setVillages(res.data.map((v) => ({ value: v.id, label: v.name }))),
      );
    }
  };

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      border: state.isFocused ? "1px solid #86b7fe" : "none",
      boxShadow: state.isFocused
        ? "0 0 0 0.25rem rgba(13,110,253,.25)"
        : "0 .125rem .25rem rgba(0,0,0,.075)",
      padding: "2px",
      backgroundColor: "#fff",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    }),
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

      <div>
        <Row className="g-3">
          {/* NIK KTP */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                NIK KTP <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaIdCard size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="nik_ktp"
                  value={formData.nik_ktp || ""}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur("nik_ktp")}
                  id="registration-nik_ktp"
                  aria-describedby={
                    errors.nik_ktp ? "registration-nik_ktp-error" : undefined
                  }
                  isInvalid={!!errors.nik_ktp}
                  maxLength={16}
                  className="border-0 py-2"
                  placeholder="Masukkan 16 digit NIK"
                />
                <Form.Control.Feedback
                  id="registration-nik_ktp-error"
                  type="invalid"
                  tooltip
                >
                  {errors.nik_ktp}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* NAMA LENGKAP */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Nama Lengkap <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaUser size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={formData.full_name || ""}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur("full_name")}
                  id="registration-full_name"
                  aria-describedby={
                    errors.full_name
                      ? "registration-full_name-error"
                      : undefined
                  }
                  isInvalid={!!errors.full_name}
                  placeholder="Nama lengkap sesuai KTP"
                  className="border-0 py-2"
                />
                <Form.Control.Feedback
                  id="registration-full_name-error"
                  type="invalid"
                  tooltip
                >
                  {errors.full_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* SECTION 2: DETAIL DOMISILI */}
      <div className="d-flex align-items-center mt-5 mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaMapMarkerAlt />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Detail Domisili</h5>
          <small className="text-muted">
            Tentukan lokasi tempat tinggal Anda berdasarkan alamat KTP
          </small>
        </div>
      </div>

      <div>
        <Row className="mb-3 g-3">
          {/* PROVINSI */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">
              Provinsi <span className="text-danger">*</span>
            </Form.Label>
            <Select
              inputId="registration-province_id"
              classNamePrefix="rs"
              styles={selectStyles}
              options={provinces}
              placeholder="Pilih Provinsi..."
              onChange={handleProvinceSelect}
              onBlur={() => handleFieldBlur("province_id")}
              value={
                provinces.find((p) => p.value === formData.province_id) || null
              }
            />
            {errors.province_id && (
              <div
                id="registration-province_id-error"
                className="text-danger small mt-1"
                role="alert"
              >
                {errors.province_id}
              </div>
            )}
          </Col>
          {/* KOTA / KABUPATEN */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">
              Kota / Kabupaten <span className="text-danger">*</span>
            </Form.Label>
            <Select
              inputId="registration-city_id"
              classNamePrefix="rs"
              styles={selectStyles}
              options={regencies}
              placeholder="Pilih Kota..."
              isDisabled={!formData.province_id}
              onChange={handleRegencySelect}
              onBlur={() => handleFieldBlur("city_id")}
              value={
                regencies.find((r) => r.value === formData.city_id) || null
              }
            />
            {errors.city_id && (
              <div
                id="registration-city_id-error"
                className="text-danger small mt-1"
                role="alert"
              >
                {errors.city_id}
              </div>
            )}
          </Col>
        </Row>

        <Row className="mb-3 g-3">
          {/* KECAMATAN */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">
              Kecamatan <span className="text-danger">*</span>
            </Form.Label>
            <Select
              inputId="registration-district_id"
              classNamePrefix="rs"
              styles={selectStyles}
              options={districts}
              placeholder="Pilih Kecamatan..."
              isDisabled={!formData.city_id}
              onChange={handleDistrictSelect}
              onBlur={() => handleFieldBlur("district_id")}
              value={
                districts.find((d) => d.value === formData.district_id) || null
              }
            />
            {errors.district_id && (
              <div
                id="registration-district_id-error"
                className="text-danger small mt-1"
                role="alert"
              >
                {errors.district_id}
              </div>
            )}
          </Col>
          {/* KELURAHAN */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">
              Kelurahan <span className="text-danger">*</span>
            </Form.Label>
            <Select
              inputId="registration-subdistrict_id"
              classNamePrefix="rs"
              styles={selectStyles}
              options={villages}
              placeholder="Pilih Kelurahan..."
              isDisabled={!formData.district_id}
              onChange={(opt) => {
                handleFieldChange({
                  subdistrict_id: opt?.value || "",
                  kelurahan: opt?.label || "",
                });
              }}
              onBlur={() => handleFieldBlur("subdistrict_id")}
              value={
                villages.find((v) => v.value === formData.subdistrict_id) ||
                null
              }
            />
            {errors.subdistrict_id && (
              <div
                id="registration-subdistrict_id-error"
                className="text-danger small mt-1"
                role="alert"
              >
                {errors.subdistrict_id}
              </div>
            )}
          </Col>
        </Row>

        <Row className="mb-3 g-3">
          {/* RT */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">RT</Form.Label>
            <Form.Control
              type="text"
              name="rt"
              value={formData.rt || ""}
              onChange={handleChange}
              className="rounded-12 border-0 shadow-sm py-2 px-3 bg-white"
              placeholder="Contoh: 001"
            />
          </Col>
          {/* RW */}
          <Col md={6}>
            <Form.Label className="fw-bold small mb-2">RW</Form.Label>
            <Form.Control
              type="text"
              name="rw"
              value={formData.rw || ""}
              onChange={handleChange}
              className="rounded-12 border-0 shadow-sm py-2 px-3 bg-white"
              placeholder="Contoh: 001"
            />
          </Col>
        </Row>

        {/* ALAMAT LENGKAP */}
        <Row className="mb-3 g-3">
          <Col xs={12}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Alamat Lengkap (Jalan / Blok / No){" "}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="alamat_ktp"
                value={formData.alamat_ktp || ""}
                onChange={handleChange}
                onBlur={() => handleFieldBlur("alamat_ktp")}
                id="registration-alamat_ktp"
                aria-describedby={
                  errors.alamat_ktp
                    ? "registration-alamat_ktp-error"
                    : undefined
                }
                isInvalid={!!errors.alamat_ktp}
                className="rounded-12 border-0 shadow-sm py-3 px-4"
                placeholder="Contoh: Jl. Sudirman No. 123, Blok A5"
              />
              <Form.Control.Feedback
                id="registration-alamat_ktp-error"
                type="invalid"
              >
                {errors.alamat_ktp}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* INFO TAMBAHAN */}
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
};

export default React.memo(Step1PersonalData);
