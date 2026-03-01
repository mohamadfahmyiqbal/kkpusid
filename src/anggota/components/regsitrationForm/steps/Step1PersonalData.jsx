import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaIdCard, FaInfoCircle } from "react-icons/fa";
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
    <div className="step-container">
      <div className="d-flex align-items-center mb-4">
        <FaIdCard className="text-primary me-3" size={24} />
        <div>
          <h5 className="mb-1 fw-bold">Data Pribadi</h5>
          <p className="text-muted mb-0 small">
            Isi data diri Anda sesuai KTP yang berlaku
          </p>
        </div>
      </div>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Nama Lengkap <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.full_name}
              placeholder="Masukkan nama lengkap"
              className="rounded-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.full_name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              NIK KTP <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="nik_ktp"
              value={formData.nik_ktp || ""}
              onChange={handleChange}
              isInvalid={!!errors.nik_ktp}
              placeholder="Masukkan 16 digit NIK"
              maxLength={16}
              className="rounded-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nik_ktp}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Tempat Lahir <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="birth_place"
              value={formData.birth_place || ""}
              onChange={handleChange}
              isInvalid={!!errors.birth_place}
              placeholder="Masukkan tempat lahir"
              className="rounded-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.birth_place}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Tanggal Lahir <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="birth_date"
              value={formData.birth_date || ""}
              onChange={handleChange}
              isInvalid={!!errors.birth_date}
              className="rounded-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.birth_date}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Jenis Kelamin <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              isInvalid={!!errors.gender}
              className="rounded-3"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.gender}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Alamat KTP <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              name="address_ktp"
              value={formData.address_ktp || ""}
              onChange={handleChange}
              isInvalid={!!errors.address_ktp}
              placeholder="Masukkan alamat lengkap sesuai KTP"
              rows={3}
              className="rounded-3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.address_ktp}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Provinsi <span className="text-danger">*</span>
            </Form.Label>
            <Select
              styles={customStyles}
              options={provinces}
              value={provinces.find((p) => p.value === formData.province_id)}
              onChange={handleProvinceChange}
              placeholder="Pilih Provinsi"
              isClearable
            />
            {errors.province_id && (
              <div className="text-danger small mt-1">{errors.province_id}</div>
            )}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Kab/Kota <span className="text-danger">*</span>
            </Form.Label>
            <Select
              styles={customStyles}
              options={regencies}
              value={regencies.find((r) => r.value === formData.city_id)}
              onChange={handleRegencyChange}
              placeholder="Pilih Kabupaten/Kota"
              isClearable
              isDisabled={!formData.province_id}
            />
            {errors.city_id && (
              <div className="text-danger small mt-1">{errors.city_id}</div>
            )}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Kecamatan <span className="text-danger">*</span>
            </Form.Label>
            <Select
              styles={customStyles}
              options={districts}
              value={districts.find((d) => d.value === formData.district_id)}
              onChange={handleDistrictChange}
              placeholder="Pilih Kecamatan"
              isClearable
              isDisabled={!formData.city_id}
            />
            {errors.district_id && (
              <div className="text-danger small mt-1">{errors.district_id}</div>
            )}
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label className="fw-semibold small">
              Kelurahan <span className="text-danger">*</span>
            </Form.Label>
            <Select
              styles={customStyles}
              options={villages}
              value={villages.find((v) => v.value === formData.village_id)}
              onChange={(selectedOption) =>
                setFormData((prev) => ({
                  ...prev,
                  village_id: selectedOption ? selectedOption.value : "",
                }))
              }
              placeholder="Pilih Kelurahan"
              isClearable
              isDisabled={!formData.district_id}
            />
            {errors.village_id && (
              <div className="text-danger small mt-1">{errors.village_id}</div>
            )}
          </Form.Group>
        </Col>

        <Col md={12}>
          <div className="alert alert-info d-flex align-items-center rounded-3">
            <FaInfoCircle className="me-2" />
            <small>
              Pastikan semua data yang Anda masukkan sudah benar dan sesuai dengan
              identitas resmi Anda.
            </small>
          </div>
        </Col>
      </Row>
    </div>
  );
}
