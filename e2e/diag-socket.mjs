// Diagnostic: does socket profile:request work for a brand-new member account?
import { io } from "socket.io-client";

const API = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const SOCKET_URL = process.env.VITE_SOCKET_URL || "http://localhost:3445";

const uniq = Date.now();
const email = `e2e.diag.${uniq}@kkpus.id`;
const password = "P@ssw0rd123!";
const nik = `31710${String(uniq).slice(-11).padStart(11, "0")}`;

const reg = await fetch(`${API}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    full_name: "E2E Diag Candidate",
    email,
    password,
    phone_number: "081234567890",
    nik_ktp: nik,
    gender: "L",
    address: "Jl. Diag No. 1",
    date_of_birth: "1990-01-01",
  }),
});
console.log("[DIAG] register status:", reg.status);
const regBody = await reg.json();
console.log("[DIAG] register token?", !!regBody?.data?.token, "member_id:", regBody?.data?.member_id);

const login = await fetch(`${API}/auth/accountLogin`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ emailHp: email, password }),
});
console.log("[DIAG] login status:", login.status);
const loginBody = await login.json();
const token = loginBody?.data?.token;
console.log("[DIAG] login token?", !!token);

const socket = io(SOCKET_URL, {
  auth: { token },
  transports: ["websocket", "polling"],
  timeout: 20000,
});

const done = (code) => {
  try { socket.disconnect(); } catch {}
  setTimeout(() => process.exit(code), 300);
};

socket.on("connect", () => {
  console.log("[DIAG] socket connected:", socket.id);
  socket.emit("register", loginBody?.data?.user?.member_id);
  socket.emit("profile:request");
});
socket.on("profile:update", (data) => {
  console.log("[DIAG] profile:update received:", JSON.stringify(data));
  done(0);
});
socket.on("auth:fail", () => {
  console.log("[DIAG] auth:fail received");
  done(2);
});
socket.on("connect_error", (err) => {
  console.log("[DIAG] connect_error:", err.message);
  done(3);
});

setTimeout(() => {
  console.log("[DIAG] TIMEOUT waiting for profile:update / auth:fail");
  done(4);
}, 25000);
