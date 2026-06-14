import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Nav, Spinner } from 'react-bootstrap';
import { FaFileInvoiceDollar, FaHistory, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import UBilling from '../../../../utils/api/UBilling';
import BillList from '../../../global/BillingPage/components/BillList';
import HistoryList from '../../../global/BillingPage/components/HistoryList';

const SimpananBillingTabs = ({ activeType }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [bills, setBills] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!activeType) return;
    setLoading(true);
    try {
      // The filter param needs to match the backend expectation. 
      // Usually, it's category or similar. 
      // UBilling.getPendingBills and UBilling.getBillingHistory expect { category: ... }
      // We pass activeType as the category to filter by this specific product code.
      const filter = { category: activeType };

      // TABUNGAN_DEPOSIT shouldn't fetch pending bills unless explicitly supported, but let's fetch anyway.
      // Usually Sukarela doesn't have pending bills, but let's just fetch for all to be safe.
      const [resPending, resHistory] = await Promise.all([
        UBilling.getPendingBills(filter),
        UBilling.getBillingHistory(filter)
      ]);

      const processBills = (res) => {
        if (res.data?.status) {
          let rawData = Array.isArray(res.data.data) ? res.data.data : [];
          // Filter by activeType just in case the backend returns too much
          return rawData.filter(bill => {
            if (bill.category_code) return bill.category_code === activeType || bill.category_code.includes(activeType);
            if (bill.items && Array.isArray(bill.items)) {
              return bill.items.some(item => item.category_code === activeType || item.category_code?.includes(activeType));
            }
            return false;
          });
        }
        return [];
      };

      setBills(processBills(resPending));
      setHistory(processBills(resHistory));
    } catch (err) {
      console.error('Failed to load bills/history:', err);
    } finally {
      setLoading(false);
    }
  }, [activeType]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading) {
    return (
      <div className="mt-4 text-center p-4 bg-white rounded-4 shadow-sm">
        <Spinner animation="border" variant="primary" size="sm" />
        <p className="mt-3 mb-0 small text-muted">Memuat data transaksi...</p>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm rounded-4 mt-4 overflow-hidden">
      <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
        <Nav variant="pills" className="custom-nav-pills gap-2 pb-3" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'pending'} 
              onClick={() => setActiveTab('pending')}
              className="d-flex align-items-center gap-2 rounded-pill px-4 py-2"
              style={{ fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
            >
              <FaExclamationCircle />
              Tagihan
              {bills.length > 0 && (
                <span className="badge bg-danger rounded-pill ms-1">{bills.length}</span>
              )}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              className="d-flex align-items-center gap-2 rounded-pill px-4 py-2"
              style={{ fontWeight: '600', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
            >
              <FaHistory />
              Riwayat
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="p-0 bg-light">
        {activeTab === 'pending' && (
          <div className="p-3">
             <BillList bills={bills} />
          </div>
        )}
        {activeTab === 'history' && (
          <div className="p-3">
             <HistoryList history={history} />
          </div>
        )}
      </Card.Body>

      <style>{`
        .custom-nav-pills .nav-link {
          color: #64748b;
          background: #f1f5f9;
          border: 1px solid transparent;
        }
        .custom-nav-pills .nav-link:hover {
          background: #e2e8f0;
          color: #334155;
        }
        .custom-nav-pills .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .custom-nav-pills::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </Card>
  );
};

export default SimpananBillingTabs;
