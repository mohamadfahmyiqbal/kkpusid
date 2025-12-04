// components/program/ProgramStatusCard.jsx (Final & Optimized)

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaFileAlt } from 'react-icons/fa'; // Mengganti Placeholder dengan ikon

const ProgramStatusCard = ({
 title,
 message,
 buttonText,
 onButtonClick
}) => {
 return (
  // Card berwarna Merah (danger) dengan teks putih
  <Card className="shadow-lg bg-danger text-white text-center border-0">
   <Card.Body className="p-5">

    <h4 className="fw-bold mb-1">{title}</h4>
    <p className="mb-4">{message}</p>

    {/* Tombol Aksi "Pengajuan" */}
    {buttonText && onButtonClick && (
     <Button
      variant="light"
      onClick={onButtonClick}
      className="p-0 border-0 bg-transparent"
      style={{ opacity: 0.9, transition: 'opacity 0.2s' }}
     >
      <div className="d-flex flex-column align-items-center">
       {/* Menggunakan ikon FaFileAlt */}
       <div 
        className="d-flex justify-content-center align-items-center rounded-circle bg-white shadow-sm mb-1" 
        style={{ width: '50px', height: '50px' }}
       >
        <FaFileAlt size={20} className="text-secondary" />
       </div>
       <span className="text-white mt-2 small fw-bold">{buttonText}</span>
      </div>
     </Button>
    )}
   </Card.Body>
  </Card>
 );
};

export default ProgramStatusCard;