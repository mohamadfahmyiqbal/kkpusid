// src/pages/tabungan/PenarikanTabunganPage/hooks/useWithdrawalTabunganData.js
import { useEffect, useState, useCallback, useMemo } from "react";
import { useProfile, useSocket } from "../../../../components/layout/contexts";
import http from "../../../../utils/api/common";
import { profileService } from "../../../../services/profileService";

export const useWithdrawalTabunganData = (tabunganId) => {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState({
    balance: true,
    history: true,
  });
  const [fallbackBankInfo, setFallbackBankInfo] = useState(null);

  const { userData } = useProfile();
  const { socket } = useSocket();

  useEffect(() => {
    if (!userData?.bank_info?.bank_account_no && !fallbackBankInfo) {
      profileService
        .getProfile()
        .then((res) => {
          if (res?.data?.bank_info) {
            setFallbackBankInfo(res.data.bank_info);
          }
        })
        .catch((err) => {
          console.warn("Fallback fetch profile in useWithdrawalTabunganData:", err.message);
        });
    }
  }, [userData?.bank_info, fallbackBankInfo]);

  const bankInfo = useMemo(() => {
    return userData?.bank_info || fallbackBankInfo || null;
  }, [userData?.bank_info, fallbackBankInfo]);

  const requestWithdrawals = useCallback(() => {
    if (socket?.connected && tabunganId) {
      socket.emit("withdrawals:request", {
        category: `TAB_DEP_${tabunganId}`,
      });
    }
  }, [socket, tabunganId]);

  const fetchBalance = useCallback(async () => {
    if (!tabunganId) return;
    try {
      const response = await http.get(`/tabungan/pengajuan/detail/${tabunganId}`);
      if (response.data?.status) {
        setBalance(response.data.data.current_balance || 0);
      }
    } catch (err) {
      console.error("Error fetching balance", err);
    } finally {
      setLoading((prev) => ({ ...prev, balance: false }));
    }
  }, [tabunganId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    if (socket && tabunganId) {
      const handleWithdrawalsUpdate = (data) => {
        if (data.category === `TAB_DEP_${tabunganId}`) {
          setHistory(data.withdrawals || []);
          setLoading((prev) => ({ ...prev, history: false }));
        }
      };

      socket.on("withdrawals:update", handleWithdrawalsUpdate);

      if (socket.connected) {
        requestWithdrawals();
      } else {
        socket.once("connect", requestWithdrawals);
      }

      return () => {
        socket.off("withdrawals:update", handleWithdrawalsUpdate);
        socket.off("connect", requestWithdrawals);
      };
    }
  }, [socket, tabunganId, requestWithdrawals]);

  return {
    balance,
    history,
    loading,
    userData: {
      ...userData,
      bank_info: bankInfo,
      full_name: userData?.full_name || "",
    },
    refreshHistory: requestWithdrawals,
  };
};

