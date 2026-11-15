import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import Select from "react-select";

export default function TabPribadiAlamat({
  formData,
  setFormData,
  errors,
  isSubmitting,
  handleChange,
  userProfile,
  provinces,
  regencies,
  districts,
  villages,
}) {
  return (
    <div>
      <div className="ap-section-header-box">
        <FaIdCard className="ap-section-header-icon" />
        <div>
          <h6 className="fw-bold mb-0 text-dark">Data Identitas Pribadi</h6>
          <small className="text-muted">
            Perbarui nama, NIK, dan kontak pribadi Anda
          </small>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="formNama">
            <Form.Label className="small fw-semibold">
              Nama Lengkap <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nama lengkap sesuai KTP"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              isInvalid={!!errors.nama}
              disabled={isSubmitting}
              className="ap-form-control"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nama}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formNik">
            <Form.Label className="small fw-semibold">
              NIK (Nomor Induk Kependudukan)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="16 digit NIK KTP"
              name="nik_ktp"
              maxLength={16}
              value={formData.nik_ktp}
              onChange={handleChange}
              disabled={isSubmitting}
              className="ap-form-control"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Form.Group controlId="formEmail">
            <Form.Label className="small fw-semibold">Alamat Email</Form.Label>
            <Form.Control
              type="email"
              value={userProfile?.email || ""}
              readOnly
              disabled
              className="bg-light ap-form-control text-muted"
            />
            <Form.Text className="text-muted fs-8">
              Email akun utama tidak dapat diubah sendiri.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formTelepon">
            <Form.Label className="small fw-semibold">
              Nomor Telepon / WA <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="tel"
              placeholder="08123456789"
              name="telepon"
              value={formData.telepon}
              onChange={handleChange}
              isInvalid={!!errors.telepon}
              disabled={isSubmitting}
              className="ap-form-control"
            />
            <Form.Control.Feedback type="invalid">
              {errors.telepon}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="ap-section-header-box mt-4">
        <FaMapMarkerAlt className="ap-section-header-icon" />
        <div>
          <h6 className="fw-bold mb-0 text-dark">
            Alamat & Domisili Sesuai KTP
          </h6>
          <small className="text-muted">
            Pilih wilayah administrasi dan alamat rumah
          </small>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Label className="small fw-semibold">Provinsi</Form.Label>
          <Select
            options={provinces}
            placeholder="Pilih Provinsi..."
            onChange={(opt) => {
              setFormData((prev) => ({
                ...prev,
                province_id: opt?.value || "",
                city_id: "",
                district_id: "",
                subdistrict_id: "",
              }));
            }}
            value={
              provinces.find((p) => p.value === formData.province_id) || null
            }
            isDisabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <Form.Label className="small fw-semibold">
            Kota / Kabupaten
          </Form.Label>
          <Select
            options={regencies}
            placeholder="Pilih Kota/Kabupaten..."
            isDisabled={!formData.province_id || isSubmitting}
            onChange={(opt) => {
              setFormData((prev) => ({
                ...prev,
                city_id: opt?.value || "",
                district_id: "",
                subdistrict_id: "",
              }));
            }}
            value={regencies.find((r) => r.value === formData.city_id) || null}
          />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Label className="small fw-semibold">Kecamatan</Form.Label>
          <Select
            options={districts}
            placeholder="Pilih Kecamatan..."
            isDisabled={!formData.city_id || isSubmitting}
            onChange={(opt) => {
              setFormData((prev) => ({
                ...prev,
                district_id: opt?.value || "",
                subdistrict_id: "",
              }));
            }}
            value={
              districts.find((d) => d.value === formData.district_id) || null
            }
          />
        </Col>
        <Col md={6}>
          <Form.Label className="small fw-semibold">Kelurahan / Desa</Form.Label>
          <Select
            options={villages}
            placeholder="Pilih Kelurahan/Desa..."
            isDisabled={!formData.district_id || isSubmitting}
            onChange={(opt) => {
              setFormData((prev) => ({
                ...prev,
                subdistrict_id: opt?.value || "",
              }));
            }}
            value={
              villages.find((v) => v.value === formData.subdistrict_id) || null
            }
          />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Label className="small fw-semibold">RT</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contoh: 001"
            name="rt"
            value={formData.rt}
            onChange={handleChange}
            disabled={isSubmitting}
            className="ap-form-control"
          />
        </Col>
        <Col md={6}>
          <Form.Label className="small fw-semibold">RW</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contoh: 005"
            name="rw"
            value={formData.rw}
            onChange={handleChange}
            disabled={isSubmitting}
            className="ap-form-control"
          />
        </Col>
      </Row>

      <Form.Group className="mb-2" controlId="formAlamat">
        <Form.Label className="small fw-semibold">
          Alamat Lengkap (Jalan / No. Rumah / RT / RW){" "}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Contoh: Jl. Diponegoro No. 45"
          name="alamat"
          value={formData.alamat}
          onChange={handleChange}
          isInvalid={!!errors.alamat}
          disabled={isSubmitting}
          className="ap-form-control"
        />
        <Form.Control.Feedback type="invalid">
          {errors.alamat}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}
