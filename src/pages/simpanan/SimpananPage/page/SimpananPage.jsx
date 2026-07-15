import React, { useState, useEffect, useRef, useCallback } from "react";
import { MdSavings, MdAccountBalanceWallet, MdStars } from "react-icons/md";
import USimpanan from "../../../../utils/api/USimpanan";
import InformasiRekeningCard from "../components/InformasiRekeningCard";
import Alert from "../../../../components/ui/SwalAlert";
;


/**
 * Skeleton Loader untuk SimpananPage
 */
const SimpananSkeleton = () => (
  <div className="animate-pulse">
    <div className="simpanan-tabs-container mb-4 px-2">
      <div className="d-flex flex-column flex-md-row gap-2 overflow-hidden pb-2 simpanan-scroll-hide">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-light rounded-pill simpanan-skeleton-tab" style={{ border: '1px solid #f1f5f9' }} />
        ))}
      </div>
    </div>
    <div className="px-2">
      <div 
        className="w-100 shadow-sm" 
        style={{ 
          height: '280px', 
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)' 
        }} 
      />
    </div>
  </div>
);

const SimpananPage = ({ decodedToken }) => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState({ code: null, name: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(new AbortController());

  const fetchMasterProducts = useCallback(async () => {
    const controller = abortControllerRef.current;
    try {
      setLoading(true);
      setError(null);
      const response = await USimpanan.getProducts({
        signal: controller.signal,
      });

      if (response.data?.status) {
        const products = response.data.data;
        setCategories(products);

        if (products.length > 0) {
          const targetCode = decodedToken?.activeTab;
          const targetProduct = targetCode ? products.find(p => p.product_code === targetCode) : null;
          
          if (targetProduct) {
            setActiveTab({ code: targetProduct.product_code, name: targetProduct.product_name });
          } else {
            setActiveTab({ code: products[0].product_code, name: products[0].product_name });
          }
        }
      } else {
        setError("Gagal memuat kategori simpanan.");
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error Fetching Products:", err);
        setError(err.response?.data?.message || "Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMasterProducts();
    const controller = abortControllerRef.current;
    return () => {
      controller.abort();
    };
  }, [fetchMasterProducts]);

  const getProductIcon = (code) => {
    if (code?.includes("POKOK")) return <MdStars size={18} />;
    if (code?.includes("WAJIB")) return <MdAccountBalanceWallet size={18} />;
    return <MdSavings size={18} />;
  };

  return (
    <div className="simpanan-page-container pb-5">
      {error && (
        <Alert variant="danger" className="mx-2 shadow-sm rounded-4 border-0 animate-fade-in">
          {error}
        </Alert>
      )}

      {loading ? (
        <SimpananSkeleton />
      ) : (
        <>
          {/* Tabs Navigation */}
          <div className="simpanan-tabs-container mb-4 px-2">
            <div className="d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 simpanan-scroll-hide">
              {categories.map((cat) => {
                const isActive = activeTab.code === cat.product_code;
                return (
                  <button
                    key={cat.product_code}
                    onClick={() => setActiveTab({ code: cat.product_code, name: cat.product_name })}
                    className={`simpanan-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    {getProductIcon(cat.product_code)}
                    <span>{cat.product_name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Content */}
          <div className="px-2 animate-fade-in">
            {activeTab.code ? (
              <>
                <InformasiRekeningCard
                  activeType={activeTab.code}
                  displayName={activeTab.name}
                  fromPage="simpananPage"
                />
              </>
            ) : (
              <div className="text-center py-5 bg-light rounded-4 text-muted">
                <MdSavings size={48} className="opacity-20 mb-3" />
                <p className="mb-0">Data simpanan tidak tersedia.</p>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        .simpanan-scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .simpanan-scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .simpanan-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1px solid #f1f5f9;
          background: white;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .simpanan-skeleton-tab {
          width: 100%;
          height: 40px;
        }
        @media (min-width: 768px) {
          .simpanan-skeleton-tab {
            width: 120px;
          }
        }

        .simpanan-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .simpanan-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SimpananPage;
