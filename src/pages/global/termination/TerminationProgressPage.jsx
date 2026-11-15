import React, { useState, useEffect } from 'react';
import { useProfile } from '../../../components/layout/contexts';
import { Button, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from "react-icons/fa";
import { apiClient } from '../../../utils/api';

const TerminationProgressPage = () => {
  const { fetchUserProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [termination, setTermination] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setFetching(true);
        const res = await apiClient.get('/anggota/berhenti-keanggotaan/status');
        if (res.data?.data) {
          setTermination(res.data.data);
        }
      } catch (err) {
        console.error("Gagal memuat status pengajuan", err);
      } finally {
        setFetching(false);
      }
    };
    fetchStatus();
  }, []);

  if (fetching) {
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-3">Memuat detail pengajuan...</h5>
      </div>
    );
  }

  if (!termination) {
    return (
      <div className="container mt-5 text-center">
        <h4>Anda tidak memiliki pengajuan berhenti keanggotaan yang aktif.</h4>
      </div>
    );
  }

  const handleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await apiClient.post('/anggota/berhenti-keanggotaan/konfirmasi');
      await fetchUserProfile(); // Fetch profile again (will likely result in unauth or non-aktif state handled by layout)
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal melakukan konfirmasi');
    } finally {
      setLoading(false);
    }
  };

  const isWaitingConfirmation = termination.status === 'WAITING_CONFIRMATION';
  const submitDate = termination.submitted_at || termination.createdAt || termination.created_at;
  const approvals = termination.approvals || [];
  
  const pengawasDone = approvals.some(a => a.step?.verifierRole?.role_name === 'PENGAWAS' && a.status === 'APPROVED');
  const ketuaDone = approvals.some(a => a.step?.verifierRole?.role_name === 'KETUA' && a.status === 'APPROVED');
  const bendaharaDone = approvals.some(a => a.step?.verifierRole?.role_name === 'BENDAHARA' && a.status === 'APPROVED');

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4 p-md-5">
          <h3 className="mb-4 text-center fw-bold">Proses Pengunduran Diri Anggota</h3>
          
          <div className="alert alert-info border-info border-opacity-25 bg-info bg-opacity-10 mb-4">
            <h5 className="alert-heading text-info-emphasis"><i className="fa fa-info-circle me-2"></i>Akun Dalam Proses Penutupan</h5>
            <p className="mb-0 text-info-emphasis">
              Selama proses pengunduran diri berjalan, Anda tidak dapat mengakses menu aplikasi lainnya.
            </p>
          </div>

          <div className="mb-5 text-center">
            <h5 className="fw-bold mb-2">Status Pengajuan: <span className="badge bg-primary px-3 py-2 ms-2">{termination.status}</span></h5>
            <p className="text-muted">Diajukan pada: {submitDate ? new Date(submitDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</p>
          </div>

          {/* Approval Chain using nice badges */}
          <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3 text-center">Status Persetujuan Pengurus</h6>
          <Row className="mb-5 gy-3 justify-content-center">
            {[
              { role: "Pengawas", done: pengawasDone },
              { role: "Ketua", done: ketuaDone },
              { role: "Bendahara", done: bendaharaDone }
            ].map((step, idx) => (
              <Col xs={4} md={3} key={idx}>
                <div className={`p-3 rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center ${step.done ? 'bg-success bg-opacity-10 border border-success border-opacity-25' : 'bg-light border'}`}>
                  <div className={`mb-2 ${step.done ? 'text-success' : 'text-muted'}`}>
                    {step.done ? <FaCheckCircle size={28} /> : <div className="spinner-grow spinner-grow-sm" role="status"><span className="visually-hidden">Loading...</span></div>}
                  </div>
                  <small className="d-block fw-bold text-dark mb-1">{step.role}</small>
                  <small className={`fw-medium ${step.done ? 'text-success' : 'text-muted'}`}>
                    {step.done ? "Disetujui" : "Menunggu"}
                  </small>
                </div>
              </Col>
            ))}
          </Row>

          {isWaitingConfirmation && (
            <div className="border border-success border-opacity-25 p-4 rounded-4 bg-success bg-opacity-10">
              <h5 className="text-success mb-3 fw-bold"><i className="fa fa-check-circle me-2"></i>Dana Hak Anggota Telah Ditransfer</h5>
              <p className="text-success-emphasis">Bendahara telah memproses pengembalian hak Anda. Silakan periksa rekening Anda dan konfirmasi jika dana sudah diterima.</p>
              
              {termination.payment_proof_path && (
                <div className="mb-4">
                  <a href={`${import.meta.env.VITE_API_BASE_URL || 'https://localhost:3445/api'}/${termination.payment_proof_path.startsWith('/') ? termination.payment_proof_path.slice(1) : (termination.payment_proof_path.startsWith('uploads/') ? termination.payment_proof_path.replace(/^uploads\//, 'uploads/') : termination.payment_proof_path)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">
                    <i className="fa fa-file-image-o me-2"></i>Lihat Bukti Transfer
                  </a>
                </div>
              )}
              
              {error && <Alert variant="danger">{error}</Alert>}

              <Button 
                variant="success" 
                onClick={handleConfirm} 
                disabled={loading}
                className="w-100 fw-bold py-3 mt-2 rounded-pill shadow-sm"
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Konfirmasi Dana Diterima & Nonaktifkan Akun Saya'}
              </Button>
            </div>
          )}

          {!isWaitingConfirmation && (
            <div className="text-center p-4 bg-light rounded-4 border">
              <Spinner animation="border" variant="primary" className="mb-3" />
              <h5 className="fw-bold">Menunggu Proses Persetujuan...</h5>
              <p className="text-muted mb-0">Pengajuan Anda sedang diperiksa secara berurutan oleh Pengawas, Ketua, dan Bendahara.</p>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <style>{`
        .ls-1 { letter-spacing: 1px; }
      `}</style>
    </div>
  );
};

export default TerminationProgressPage;
