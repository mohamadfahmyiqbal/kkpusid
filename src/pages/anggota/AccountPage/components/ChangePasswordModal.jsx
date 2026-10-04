import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { FaKey } from "react-icons/fa";

export default function ChangePasswordModal({
  show,
  onHide,
  passwordData,
  passwordErrors,
  isChangingPassword,
  handlePasswordInputChange,
  handlePasswordSubmit,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaKey className="me-2 text-primary" />
          Ubah Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlePasswordSubmit}>
          {/* Current Password */}
          <Form.Group className="mb-3" controlId="formCurrentPassword">
            <Form.Label>
              Password Saat Ini <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password saat ini"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordInputChange}
              isInvalid={!!passwordErrors.currentPassword}
              disabled={isChangingPassword}
              className="ap-form-control"
            />
            <Form.Control.Feedback type="invalid">
              {passwordErrors.currentPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-3" controlId="formNewPassword">
            <Form.Label>
              Password Baru <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password baru (minimal 6 karakter)"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              isInvalid={!!passwordErrors.newPassword}
              disabled={isChangingPassword}
              className="ap-form-control"
            />
            <Form.Control.Feedback type="invalid">
              {passwordErrors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <Form.Label>
              Konfirmasi Password Baru <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan ulang password baru"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange}
              isInvalid={!!passwordErrors.confirmPassword}
              disabled={isChangingPassword}
              className="ap-form-control"
            />
            <Form.Control.Feedback type="invalid">
              {passwordErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Modal Actions */}
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={onHide}
              disabled={isChangingPassword}
            >
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isChangingPassword}>
              {isChangingPassword ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Mengubah...</span>
                </>
              ) : (
                "Ubah Password"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
