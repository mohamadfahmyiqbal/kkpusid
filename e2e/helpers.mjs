/**
 * E2E Test Helpers — @kkpusid
 *
 * Replicates the route-token (unsigned JWT) encoding used by
 * src/utils/helpers.js so tests can navigate to any page via
 * `http://localhost:5173/{routeToken}`.
 */

import fs from "fs";
import path from "path";
import { test } from "@playwright/test";

export const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
export const API_BASE = process.env.VITE_API_BASE_URL || "http://localhost:3000/api";
export const SCREENSHOT_DIR = "e2e/screenshots";
export const AUTH_STATE_FILE = "e2e/.auth-state.json";

const JWT_HEADER = { alg: "none", typ: "JWT", ver: "1.0" };
const TTL_MS = 24 * 60 * 60 * 1000; // 24 jam

function encodeBase64URL(obj) {
  const jsonString = JSON.stringify(obj);
  const uriEncoded = encodeURIComponent(jsonString);
  const base64 = Buffer.from(uriEncoded, "utf8").toString("base64");
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function jwtEncodePage(payload, options = {}) {
  const enhanced = {
    ...payload,
    _v: "1.0",
    _ts: Date.now(),
    _exp: options.expiresIn ? Date.now() + options.expiresIn : Date.now() + TTL_MS,
    _src: options.source || "e2e",
  };
  return `${encodeBase64URL(JWT_HEADER)}.${encodeBase64URL(enhanced)}.`;
}

/**
 * Wait for page to be fully ready: network idle + loading skeletons gone.
 * Returns when the page is stable enough for a clean screenshot.
 */
export async function waitForPageReady(page, timeoutMs = 30000) {
  // Tunggu hingga semua jaringan idle (tidak ada request aktif)
  try {
    await page.waitForLoadState("networkidle", { timeout: 8000 });
  } catch {
    // networkidle kadang timeout karena socket polling, lanjutkan saja
  }

  // Tunggu hingga loading skeleton hilang (jika ada)
  const skeleton = page.locator(".DashboardSkeleton, .skeleton, [class*='skeleton'], .animate-pulse");
  try {
    await skeleton.waitFor({ state: "hidden", timeout: 5000 });
  } catch {
    // Tidak ada skeleton, lanjutkan
  }

  // Tunggu notification prompt muncul (jika ada) lalu dismiss via tombol close (X)
  // NotificationPrompt muncul setelah delay 2 detik, jadi tunggu 5 detik
  // Gunakan tombol close (X) karena lebih cepat (tidak trigger API call / permission request)
  try {
    const promptContainer = page.locator(".fixed-bottom.p-3");
    await promptContainer.first().waitFor({ state: "visible", timeout: 5000 });

    // Klik tombol close (X) — tombol link dengan icon FaTimes
    const closeBtn = page.locator(".fixed-bottom.p-3 button.text-secondary.p-0");
    await closeBtn.first().waitFor({ state: "visible", timeout: 2000 });
    await closeBtn.first().click();
    await page.waitForTimeout(500);

    // Tunggu prompt benar-benar hilang
    await promptContainer.first().waitFor({ state: "hidden", timeout: 2000 });
  } catch {
    // Prompt tidak muncul atau sudah hilang, lanjutkan
  }

  // Buffer agar konten terakhir sudah dirender
  await page.waitForTimeout(500);
}

/**
 * Navigasi ke halaman dan tunggu hingga siap untuk screenshot.
 */
export function navigateTo(page, pageName, extra = {}, waitMs = 2000) {
  const token = jwtEncodePage({ page: pageName, ...extra });
  const url = `${BASE_URL}/${token}`;
  return page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 }).then(async () => {
    await waitForPageReady(page);
    if (waitMs > 0) return page.waitForTimeout(waitMs);
  });
}

/**
 * Tentukan subfolder screenshot berdasarkan nama screenshot/page.
 * Struktur: e2e/screenshots/<folder>/<name>.png
 * 
 * Untuk user workflow E2E, screenshot disimpan di e2e/screenshots/user-workflow/
 */
function getScreenshotFolder(name) {
  // Prioritas utama: tentukan folder dari path file spec yang sedang berjalan
  // (e.g. e2e/modules/user-workflow/user-workflow.spec.mjs → "user-workflow")
  try {
    const file = test.info().file || "";
    const m = file.match(/modules[\\/]([^/\\]+)[\\/]/);
    if (m) return m[1];
  } catch {
    // Di luar konteks test (mis. skrip capture) → pakai fallback nama.
  }

  // Fallback: semua nama screenshot dimulai dengan "wf-" atau "16-" → user-workflow
  if (name.startsWith("wf-") || name.startsWith("16-")) {
    return "user-workflow";
  }

  // Fallback untuk nama lain (legacy compat)
  if (name.includes("01-globalSplash") || name.includes("02-landingPage")) {
    return "01-splash-landing";
  }
  if (name.startsWith("reg-") || name.includes("register") || name.includes("registrasi")) {
    return "02-registrasi";
  }
  if (name.includes("login") || name.startsWith("public-authLogin")) {
    return "03-login";
  }
  if (name.includes("forgot") || name.includes("otp") || name.includes("reset-password")) {
    return "04-lupa-password";
  }
  if (name.includes("dashboard") || name.startsWith("flow-")) {
    return "05-dashboard";
  }
  if (name.startsWith("simpanan-pokok")) return "06-simpanan-pokok";
  if (name.startsWith("simpanan-wajib")) return "06-simpanan-wajib";
  if (name.startsWith("simpanan-sukarela")) return "06-simpanan-sukarela";
  if (name.includes("simpanan") || name.includes("penarikan")) return "06-simpanan";
  if (name.includes("tabungan")) return "07-tabungan";
  if (name.includes("pinjaman") || name.includes("program")) return "08-pinjaman";
  if (name.includes("arisan")) return "09-arisan";
  if (name.includes("jual") || name.includes("beli") || name.includes("pelunasan") || name.includes("nota")) return "10-jual-beli";
  if (name.includes("investasi") || name.includes("sukuk") || name.includes("pendanaan")) return "11-investasi";
  if (name.includes("training") || name.includes("materi") || name.includes("evaluasi") || name.includes("ranking")) return "12-training";
  if (name.includes("notifikasi") || name.includes("billing") || name.includes("transaksi")) return "13-notifikasi";
  if (name.includes("akun") || name.includes("profil") || name.includes("account") || name.includes("registrationPage") || name.includes("resign") || name.includes("terminasi")) return "14-akun-profil";
  if (name.includes("logout")) return "15-logout";

  return "publik";
}

/**
 * Take a full-page screenshot and save to e2e/screenshots/<folder>/<name>.png
 * Ensures directory exists. Waits for page to be ready before capturing.
 * Automatically adds "-mobile" suffix if viewport is mobile (width < 480).
 */
export async function takeScreenshot(page, name) {
  // Detect if running in mobile mode based on viewport width
  const viewport = await page.viewportSize();
  const isMobile = viewport && viewport.width < 480;
  
  const finalName = isMobile ? `${name}-mobile` : name;
  const folder = getScreenshotFolder(name); // Use original name for folder mapping
  const dir = `${SCREENSHOT_DIR}/${folder}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await waitForPageReady(page);
  const path = `${dir}/${finalName}.png`;
  // Ensure page is at top before full-page capture to avoid fixed header offset
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await page.screenshot({ path, fullPage: true });
  console.log(`[SCREENSHOT] ${path}`);
  return path;
}

/**
 * Wait until localStorage "token" is present (login succeeded).
 * Returns the token string or null.
 */
export async function waitForLoginToken(page, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const token = await page.evaluate(() => localStorage.getItem("token"));
    if (token) return token;
    await page.waitForTimeout(1000);
  }
  throw new Error(`Timeout ${timeoutMs}ms exceeded waiting for login token`);
}

/**
 * Attempt login using the login form selectors observed in LoginPage.jsx.
 * Returns true if token was set.
 */
export async function attemptLogin(page, email, password) {
  // Navigate ke halaman login
  await navigateTo(page, "authLogin", {}, 1000);

  const emailField = page.locator("#login-email-phone, input[name='emailHp'], input[placeholder*='Email' i]");
  const pwField = page.locator("#login-password, input[name='password'], input[type='password']");
  const submitBtn = page.locator("button.pbs-submit-v2, button[type='submit']:has-text('Masuk Sekarang')");

  await emailField.waitFor({ state: "visible", timeout: 5000 });
  await emailField.fill(email);
  await pwField.fill(password);
  await submitBtn.click();

  try {
    await waitForLoginToken(page, 15000);
    console.log(`[LOGIN] Berhasil login sebagai ${email}`);
    return true;
  } catch (err) {
    console.log(`[LOGIN] Gagal login via UI: ${err.message}`);
    return false;
  }
}

/**
 * Login via API call directly (bypass UI form).
 * More reliable for rate-limited backends.
 * Sets token in localStorage so the app picks it up on next navigation.
 */
export async function apiLogin(page, email, password) {
  try {
    const response = await page.request.post(`${API_BASE}/auth/accountLogin`, {
      data: { emailHp: email, password: password },
      timeout: 15000,
    });
    const body = await response.json();
    if (body?.data?.token) {
      // Inject token via addInitScript agar tersedia saat app di-load
      await page.addInitScript(({ t, u }) => {
        localStorage.setItem("token", t);
        if (u) localStorage.setItem("userData", JSON.stringify(u));
      }, { t: body.data.token, u: body.data.user });
      console.log(`[LOGIN API] Berhasil login sebagai ${email}`);
      return { success: true, token: body.data.token };
    }
    console.log(`[LOGIN API] Gagal: ${body?.message || "token tidak ditemukan"}`);
    return { success: false };
  } catch (err) {
    console.log(`[LOGIN API] Error: ${err.message}`);
    return { success: false };
  }
}

/**
 * Clear auth-related localStorage so tests start from anonymous state.
 * Navigasi ke base URL dulu agar localStorage dapat diakses (menghindari
 * SecurityError saat halaman masih di about:blank).
 */
export async function clearAuth(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("temp_reg_data");
    localStorage.removeItem("forgotPasswordSession");
    localStorage.removeItem("resetPasswordToken");
    localStorage.removeItem("app_version");
    sessionStorage.clear();
  });
}

/**
 * Inject auth token into localStorage then navigate to target page.
 * Digunakan untuk session reuse agar tidak terkena rate limit.
 * Navigasi ke BASE_URL dulu agar ProfileContext bisa baca token
 * saat aplikasi di-load, lalu pindah ke halaman target.
 */
export async function navigateWithAuth(page, pageName, extra = {}, waitMs = 2000, token = null) {
  const authToken = token;
  if (!authToken) {
    throw new Error("No auth token provided to navigateWithAuth");
  }

  // 1. Inject token ke localStorage SEBELUM app di-load (via addInitScript)
  await page.addInitScript(({ t }) => {
    localStorage.setItem("token", t);
    localStorage.setItem("userData", JSON.stringify({ _e2e: true }));
  }, { t: authToken });

  // 2. Navigasi ke halaman target via route token
  await navigateTo(page, pageName, extra, waitMs);
  // Ensure all network activity has settled before proceeding
  await page.waitForLoadState('networkidle', { timeout: 8000 });
}

/**
 * Wait for page body to have non-empty content (guard against blank/redirect).
 */
export async function assertPageLoaded(page, label) {
  const body = await page.locator("body").innerText();
  if (!body || body.length === 0) {
    throw new Error(`Page "${label}" appears blank / redirected unexpectedly`);
  }
  return body;
}

/**
 * Save auth token and user data to a file for reuse across tests.
 */
export async function saveAuthState(page, filePath = AUTH_STATE_FILE) {
  const storage = await page.evaluate(() => ({
    token: localStorage.getItem('token'),
    userData: localStorage.getItem('userData')
  }));
  
  console.log(`[AUTH] Checking storage: token=${storage.token ? 'exists' : 'null'}`);
  
  if (storage.token) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      console.log(`[AUTH] Writing to: ${fullPath}`);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, JSON.stringify(storage, null, 2));
      console.log(`[AUTH] ✓ Token saved to ${filePath}`);
      return storage;
    } catch (err) {
      console.error(`[AUTH] Error saving token: ${err.message}`);
    }
  }
  console.log(`[AUTH] No token to save`);
  return null;
}

/**
 * Load auth token from saved file.
 */
export async function loadAuthState(filePath = AUTH_STATE_FILE) {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const storage = JSON.parse(content);
    console.log(`[AUTH] Token loaded from ${filePath}`);
    return storage;
  }
  console.log(`[AUTH] No saved token found`);
  return null;
}

/**
 * Restore auth state from saved file to page.
 */
export async function restoreAuthState(page, filePath = AUTH_STATE_FILE) {
  const storage = await loadAuthState(filePath);
  if (storage?.token) {
    await page.addInitScript(({ t, u }) => {
      localStorage.setItem('token', t);
      if (u) localStorage.setItem('userData', u);
    }, { t: storage.token, u: storage.userData });
    return true;
  }
  return false;
}
