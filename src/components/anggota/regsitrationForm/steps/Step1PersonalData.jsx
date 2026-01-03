import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaIdCard, FaInfoCircle } from "react-icons/fa";
import Select from "react-select";
import UGlobal from "../../../../utils/api/UGlobal";

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
      minHeight: "45px",
      border: state.isFocused ? "1px solid #0d6efd" : "1px solid #dee2e6",
      boxShadow: state.isFocused
        ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
        : "none",
      "&:hover": { border: "1px solid #0d6efd" },
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
  }, []);

  const handleProvinceSelect = (opt) => {
    setFormData({
      ...formData,
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
        setRegencies(res.data.map((r) => ({ value: r.id, label: r.name })))
      );
    }
  };

  const handleRegencySelect = (opt) => {
    setFormData({
      ...formData,
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
        setDistricts(res.data.map((d) => ({ value: d.id, label: d.name })))
      );
    }
  };

  const handleDistrictSelect = (opt) => {
    setFormData({
      ...formData,
      district_id: opt?.value || "",
      kecamatan: opt?.label || "",
      subdistrict_id: "",
      kelurahan: "",
    });
    setVillages([]);
    if (opt) {
      UGlobal.getVillages(opt.value).then((res) =>
        setVillages(res.data.map((v) => ({ value: v.id, label: v.name })))
      );
    }
  };

  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaIdCard />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Informasi Identitas</h5>
          <small className="text-muted">
            Gunakan data sesuai KTP fisik Anda
          </small>
        </div>
      </div>

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold small mb-2">NIK *</Form.Label>
            <Form.Control
              type="text"
              name="nik_ktp"
              value={formData.nik_ktp || ""}
              onChange={handleChange}
              isInvalid={!!errors.nik_ktp}
              maxLength={16}
              className="rounded-12 py-2"
              placeholder="Masukkan 16 digit NIK"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nik_ktp}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-bold small mb-2">
              Nama Lengkap *
            </Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.full_name}
              className="rounded-12 py-2"
              placeholder="Nama lengkap sesuai KTP"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="border-top pt-4 mt-4">
        <div className="d-flex align-items-center mb-4">
          <div className="icon-box bg-soft-primary text-primary me-3">
            <FaMapMarkerAlt />
          </div>
          <h5 className="fw-bold mb-0 text-dark">Detail Domisili</h5>
        </div>

        <div className="p-4 rounded-20 bg-light border-0 mb-3">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">Provinsi *</Form.Label>
              <Select
                styles={customStyles}
                options={provinces}
                placeholder="Pilih Provinsi..."
                onChange={handleProvinceSelect}
                value={
                  provinces.find((p) => p.value === formData.province_id) ||
                  null
                }
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">
                Kota / Kabupaten *
              </Form.Label>
              <Select
                styles={customStyles}
                options={regencies}
                placeholder="Pilih Kota..."
                isDisabled={!formData.province_id}
                onChange={handleRegencySelect}
                value={
                  regencies.find((r) => r.value === formData.city_id) || null
                }
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">
                Kecamatan *
              </Form.Label>
              <Select
                styles={customStyles}
                options={districts}
                placeholder="Pilih Kecamatan..."
                isDisabled={!formData.city_id}
                onChange={handleDistrictSelect}
                value={
                  districts.find((d) => d.value === formData.district_id) ||
                  null
                }
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">
                Kelurahan *
              </Form.Label>
              <Select
                styles={customStyles}
                options={villages}
                placeholder="Pilih Kelurahan..."
                isDisabled={!formData.district_id}
                onChange={(opt) =>
                  setFormData({
                    ...formData,
                    subdistrict_id: opt?.value || "",
                    kelurahan: opt?.label || "",
                  })
                }
                value={
                  villages.find((v) => v.value === formData.subdistrict_id) ||
                  null
                }
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">RT</Form.Label>
              <Form.Control
                type="text"
                name="rt"
                value={formData.rt || ""}
                onChange={handleChange}
                className="rounded-12 border-0 shadow-sm py-2"
                placeholder="001"
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-bold small mb-2">RW</Form.Label>
              <Form.Control
                type="text"
                name="rw"
                value={formData.rw || ""}
                onChange={handleChange}
                className="rounded-12 border-0 shadow-sm py-2"
                placeholder="001"
              />
            </Col>
          </Row>

          <Form.Group>
            <Form.Label className="fw-bold small mb-2">
              Alamat Lengkap (Jalan / Blok / No) *
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="alamat_ktp"
              value={formData.alamat_ktp || ""}
              onChange={handleChange}
              isInvalid={!!errors.alamat_ktp}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Contoh: Jl. Sudirman No. 123, Blok A5"
            />
            <Form.Control.Feedback type="invalid">
              {errors.alamat_ktp}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
    </div>
  );
}
