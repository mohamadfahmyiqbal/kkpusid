// src/contexts/SocketContext.jsx
import { useProfile } from "./ProfileContext";

export const useSocket = () => {
  const { socket } = useProfile();
  return { socket };
};
