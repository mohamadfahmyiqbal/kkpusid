import React, { useState, useCallback, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button, Spinner, Alert, Card } from "react-bootstrap";
import InformasiRekeningCard from "../../components/simpanan/InformasiRekeningCard";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import USimpanan from "../../utils/api/USimpanan";

const SimpananPage = () => {
  const [savingsData, setSavingsData] = useState({});
  const [activeSavingsType, setActiveSavingsType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSavingsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Mengambil data dari USimpanan API
      const response = await USimpanan.getSavingsHistory();

      if (response.data && response.data.status) {
        const transactions = response.data.data;

        const grouped = transactions.reduce((acc, tx) => {
          const category = tx.tx_category || "LAINNYA";

          if (!acc[category]) {
            acc[category] = {
              product: category.replace(/_/g, " "),
              akad: tx.billType?.category_map || "Wadi'ah",
              nominal: 0,
              saldoAkhir: 0,
              tanggalBuka: tx.created_at,
              nama: "Anggota",
            };
          }
          acc[category].saldoAkhir += parseFloat(tx.amount || 0);
          acc[category].nominal = parseFloat(tx.amount || 0);
          return acc;
        }, {});

        setSavingsData(grouped);
        const keys = Object.keys(grouped);
        if (keys.length > 0) setActiveSavingsType(keys[0]);
      } else {
        setError(response.data?.message || "Gagal memuat data simpanan.");
      }
    } catch (err) {
      console.error("Error fetching savings:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavingsData();
  }, [fetchSavingsData]);

  const activeData = savingsData[activeSavingsType];

  const handleActionNavigation = useCallback(
    (pageKey, returnPageKey) => {
      const payload = { page: pageKey };
      if (returnPageKey) payload.return = returnPageKey;

      const token = jwtEncode(payload);
      navigate(`/${token}`);
    },
    [navigate]
  );

  return (
    <DashboardLayout>
      <div
        className="container-fluid py-4"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <h4 className="mb-4 mx-3 fw-bold" style={{ color: "#005a8d" }}>
          Simpanan
        </h4>
      </div>
    </DashboardLayout>
  );
};

export default SimpananPage;
