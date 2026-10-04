import React from "react";
import { Form, Button } from "react-bootstrap";
import { AUTH_CONSTANTS } from "../../constants/authConstants";

export default function OtpInputFields({
  useSeparateInputs,
  onToggleMode,
  otpCode,
  setOtpCode,
  inputRefs,
  onInputChange,
  onKeyDown,
  onSeparatePaste,
  onPaste,
  loading,
  isBlocked,
}) {
  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="link"
          size="sm"
          className="text-decoration-none p-0"
          onClick={onToggleMode}
        >
          {useSeparateInputs
            ? "Gunakan input tunggal"
            : "Gunakan input terpisah"}
        </Button>
      </div>

      {useSeparateInputs ? (
        <div className="d-flex gap-2" onPaste={onSeparatePaste}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Form.Control
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="text-center"
              style={{
                width: "50px",
                height: "58px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              value={otpCode[index] || ""}
              onChange={(e) => onInputChange(index, e.target.value)}
              onKeyDown={(e) => onKeyDown(index, e)}
              maxLength={1}
              required
              disabled={loading || isBlocked}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>
      ) : (
        <Form.Control
          type="text"
          placeholder={AUTH_CONSTANTS.PLACEHOLDERS.OTP_CODE}
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          onPaste={onPaste}
          maxLength={6}
          required
          disabled={loading || isBlocked}
          inputMode="numeric"
          autoComplete="one-time-code"
          style={{
            letterSpacing: "8px",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
      )}
    </>
  );
}
