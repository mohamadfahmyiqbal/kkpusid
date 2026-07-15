import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';

const SwalAlert = ({ variant = 'info', children, onClose, dismissible, show = true, asSwal = false, ...props }) => {
  useEffect(() => {
    if (!show || !asSwal) return;

    // Helper to extract text from React children
    const extractText = (node) => {
      if (typeof node === 'string' || typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractText).join(' ');
      if (node && node.props && node.props.children) return extractText(node.props.children);
      return '';
    };
    
    let text = extractText(children);
    if (!text && typeof children === 'string') {
      text = children;
    }
    
    if (text) {
      const isError = variant === 'danger' || variant === 'warning';
      const iconMap = {
        danger: 'error',
        warning: 'warning',
        success: 'success',
        info: 'info'
      };
      
      Swal.fire({
        title: isError ? 'Perhatian' : 'Informasi',
        text: text,
        icon: iconMap[variant] || 'info',
        confirmButtonText: 'Tutup'
      }).then(() => {
        if (onClose) {
          onClose();
        }
      });
    }
  }, [children, variant, onClose, show, asSwal]);

  if (asSwal) return null; // Do not render anything in DOM if asSwal is true

  return (
    <Alert variant={variant} onClose={onClose} dismissible={dismissible} show={show} {...props}>
      {children}
    </Alert>
  );
};

SwalAlert.Heading = Alert.Heading;
SwalAlert.Link = Alert.Link;

export default SwalAlert;
