// src/pages/simpanan/PenarikanSimpananPage/hooks/useWithdrawalData.js
import { useEffect, useState, useCallback, useMemo } from "react";
import { useProfile } from "../../../../contexts/ProfileContext";
import { useSocket } from "../../../../contexts/SocketContext";

export const useWithdrawalData = (categoryCode) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState({
    balance: true,
    history: true,
  });

  const { userData } = useProfile();
  const { socket } = useSocket();

  const balance = useMemo(() => {
    return userData?.balance || 0;
  }, [userData?.balance]);

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
        console.log("Update penarikan:", data);
        if (data.category === categoryCode) {
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
  }, [socket, categoryCode, requestWithdrawals]);

  useEffect(() => {
    if (userData) {
      setLoading((prev) => ({ ...prev, balance: false }));
    }
  }, [userData]);

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
