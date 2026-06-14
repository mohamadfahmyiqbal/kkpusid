// src/pages/simpanan/PenarikanSimpananPage/hooks/useWithdrawalData.js
import { useEffect, useState, useCallback, useMemo } from "react";
import { useProfile, useSocket } from "../../../../components/layout/contexts";

export const useWithdrawalData = (categoryCode) => {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState({
    balance: true,
    history: true,
  });

  const { userData } = useProfile();
  const { socket } = useSocket();

  const bankInfo = useMemo(() => {
    return userData?.bank_info || null;
  }, [userData?.bank_info]);

  const requestWithdrawals = useCallback(() => {
    if (socket?.connected) {
      socket.emit("withdrawals:request", {
        category: categoryCode || "SS_SUKARELA",
      });
    } else {
      console.warn("Socket belum terhubung");
    }
  }, [socket, categoryCode]);

  useEffect(() => {
    if (socket) {
      const handleWithdrawalsUpdate = (data) => {

        if (data.category === categoryCode) {
          setHistory(data.withdrawals || []);
          setBalance(data.balance || 0);
          setLoading((prev) => ({ ...prev, history: false, balance: false }));
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
  }, [socket, categoryCode, requestWithdrawals]);

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
