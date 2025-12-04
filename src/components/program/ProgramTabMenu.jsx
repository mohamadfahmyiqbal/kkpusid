// components/program/ProgramTabMenu.jsx (Final & Optimized)

import React from 'react';
import { Button } from 'react-bootstrap'; 

const ProgramTabMenu = ({ options, activeKey, onChange }) => {
  return (
    // Wrapper div untuk menumpuk tombol secara vertikal
    <div className="mb-4"> 
      {options?.map((option, index) => (
        <Button
          key={option.key}
          // Styling menggunakan template literal yang lebih bersih
          className={`w-100 py-2 border fw-bold 
            ${index < options.length - 1 ? 'mb-2' : ''} 
            ${activeKey === option.key
              ? 'bg-primary text-white border-primary' // Aktif
              : 'bg-white text-secondary border-secondary' // Non-aktif
            }`}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ProgramTabMenu;