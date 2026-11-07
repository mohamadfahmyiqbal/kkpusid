import { http, HttpResponse } from "msw";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export const handlers = [
  // Auth
  http.post(`${API_BASE}/auth/login`, async ({ request }) => {
    const body = await request.json();
    if (body.email === "admin@kkpus.id" && body.password === "password") {
      return HttpResponse.json({
        token: "mock-jwt-token",
        user: { id: 1, email: "admin@kkpus.id", role: "admin" },
      });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  http.get(`${API_BASE}/auth/me`, () => {
    return HttpResponse.json({
      user: { id: 1, email: "admin@kkpus.id", role: "admin" },
    });
  }),

  // Transaksi simpanan
  http.post(`${API_BASE}/simpanan`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      { id: 1001, ...body, status: "created" },
      { status: 201 }
    );
  }),

  http.get(`${API_BASE}/simpanan/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      amount: 100000,
      status: "active",
    });
  }),

  // Fallthrough untuk endpoint lain
  http.all("*", () => {
    return new HttpResponse(null, { status: 404 });
  }),
];
