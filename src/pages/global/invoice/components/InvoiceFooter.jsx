import React from "react";

const InvoiceFooter = () => {
  return (
    <>
      {/* Footer Branding */}
      <div className="text-center mt-5 d-print-none opacity-50">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Koperasi Digital - System Generated
          Invoice
        </small>
      </div>

      {/* Print Specific Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .container { padding: 0 !important; max-width: 100% !important; }
          .card { border: none !important; box-shadow: none !important; }
          .bg-gradient-primary, .bg-gradient-success { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact;
          }
          .d-print-none { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default InvoiceFooter;
