import io from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  process.env.REACT_APP_SOCKET_URL ||
  'http://localhost:3445';

let socket = null;

/**
 * Inisialisasi koneksi socket dengan token autentikasi
 * @param {string} token - JWT token untuk autentikasi
 * @returns {Socket} instance socket.io
 */
export const initSocket = (token) => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: {
      token: token
    },
    transports: ['websocket', 'polling'], // Fallback ke polling jika websocket gagal
    timeout: 20000,
  });

  socket.on('connect', () => {

  });

  socket.on('disconnect', (reason) => {

  });

  socket.on('connect_error', (error) => {
    console.error('❌ Error koneksi socket:', error.message);
  });

  return socket;
};

/**
 * Mendapatkan instance socket saat ini
 * @returns {Socket|null}
 */
export const getSocket = () => socket;

/**
 * Memutus koneksi socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Register member ke socket server untuk menerima pesan personal
 * @param {string|number} memberId - ID member
 */
export const registerMember = (memberId) => {
  if (socket && memberId) {
    socket.emit('register', memberId);

  }
};

// Export default untuk kompatibilitas
export default socket;
