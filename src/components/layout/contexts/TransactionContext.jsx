import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";

const TransactionContext = createContext();
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_ORIGIN ||
  "https://localhost:3000";

export const TransactionProvider = ({ children }) => {
  const [activeFinancing, setActiveFinancing] = useState([]);
  const socketRef = useRef(null);

  const connectTransactionSocket = useCallback(() => {
    const token = localStorage.getItem("authToken");
    if (!token || socketRef.current?.connected) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socket.on("financing:status_update", (data) => {
      setActiveFinancing((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index > -1) {
          const newData = [...prev];
          newData[index] = { ...newData[index], ...data };
          return newData;
        }
        return [data, ...prev];
      });
    });

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    connectTransactionSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectTransactionSocket]);

  return (
    <TransactionContext.Provider
      value={{ activeFinancing, setActiveFinancing }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
