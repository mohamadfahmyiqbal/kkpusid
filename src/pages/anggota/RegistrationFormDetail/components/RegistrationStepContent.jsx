import React from "react";
import PropTypes from "prop-types";
import Step1PersonalData from "./steps/Step1PersonalData";
import Step2Account from "./steps/Step2Account";
import Step3CaptureKTP from "./steps/Step3CaptureKTP.jsx";
import Step4Swafoto from "./steps/Step4Swafoto";
import Step5Employment from "./steps/Step5Employment";
import Step6EmergencyContact from "./steps/Step6EmergencyContact";
import Step7BankData from "./steps/Step7BankData";
import Step8Summary from "./steps/Step8Summary";

export default function RegistrationStepContent({
  step,
  formData,
  errors,
  handleChange,
  setFormData,
  handleSetCapturedImage,
  isCommitmentChecked,
  setIsCommitmentChecked,
  setStep,
}) {
  const commonProps = {
    formData,
    handleChange,
    errors,
    setFormData,
    handleSetCapturedImage,
  };

  switch (step) {
    case 1:
      return <Step1PersonalData {...commonProps} />;
    case 2:
      return <Step2Account {...commonProps} isDataLoaded={false} />;
    case 3:
      return <Step3CaptureKTP {...commonProps} />;
    case 4:
      return <Step4Swafoto {...commonProps} />;
    case 5:
      return <Step5Employment {...commonProps} />;
    case 6:
      return <Step6EmergencyContact {...commonProps} />;
    case 7:
      return <Step7BankData {...commonProps} />;
    case 8:
      return (
        <Step8Summary
          {...commonProps}
          isCommitmentChecked={isCommitmentChecked}
          setIsCommitmentChecked={setIsCommitmentChecked}
          handleEditStep={setStep}
        />
      );
    default:
      return null;
  }
}

RegistrationStepContent.propTypes = {
  step: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSetCapturedImage: PropTypes.func.isRequired,
  isCommitmentChecked: PropTypes.bool.isRequired,
  setIsCommitmentChecked: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
};
