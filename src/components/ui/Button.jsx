import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

export const Button = ({
  variant = 'primary',
  isLoading = false,
  loadingText = 'Memproses...',
  className = '',
  children,
  disabled,
  ...props
}) => {
  let customClass = '';
  let bsVariant = variant;

  if (variant === 'premium') {
    bsVariant = 'light';
    customClass = 'premium-btn-hover premium-btn-text fw-bold text-teal shadow-sm border-0';
  } else if (variant === 'premium-outline') {
    bsVariant = 'outline-light';
    customClass = 'premium-btn-hover premium-btn-text fw-bold shadow-sm btn-pencairan';
  } else if (variant === 'form') {
    bsVariant = 'primary';
    customClass = 'btn-submit-premium shadow-md border-0 fw-bold';
  }

  const finalClassName = `${customClass} ${className}`.trim();

  return (
    <BootstrapButton
      variant={bsVariant}
      className={finalClassName}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          {loadingText}
        </>
      ) : (
        children
      )}
    </BootstrapButton>
  );
};

export default Button;
