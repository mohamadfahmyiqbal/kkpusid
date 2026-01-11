// src/utils/helper/SocketListener.js (contoh)
import { useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { toast } from "react-toastify";

const useSocketListener = () => {
  const { socket } = useSocket(); // ✅ Sekarang aman karena App.js di-wrap SocketProvider

  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        toast.info(data.message);
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket]);
};

export default useSocketListener;
