import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const SwalAlert = ({ variant = 'info', children, onClose, dismissible, show = true, ...props }) => {
  useEffect(() => {
    if (!show) return;

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
  }, [children, variant, onClose, show]);

  return null; // Do not render anything in DOM
};

SwalAlert.Heading = ({ children }) => <>{children}</>;
SwalAlert.Link = ({ children }) => <>{children}</>;

export default SwalAlert;
