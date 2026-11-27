/**
 * Debug: cek posisi header vs konten di viewport mobile (step 3 registrasi)
 * Usage: node e2e/debug-header.mjs
 */
import { chromium } from "playwright";
import { loadAuthState } from "./helpers.mjs";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

// Token route untuk halaman form registrasi (registrationFormDetail)
function jwtEncodePage(payload, options = {}) {
  const JWT_HEADER = { alg: "none", typ: "JWT", ver: "1.0" };
  const TTL_MS = 24 * 60 * 60 * 1000;
  function enc(obj) {
    const s = encodeURIComponent(JSON.stringify(obj));
    return Buffer.from(s, "utf8").toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  const enhanced = { ...payload, _v: "1.0", _ts: Date.now(), _exp: Date.now() + TTL_MS, _src: "e2e" };
  return `${enc(JWT_HEADER)}.${enc(enhanced)}.`;
}

async function main() {
  const auth = await loadAuthState();
  if (!auth?.token) {
    console.log("[ERROR] No auth token. Run 03-login first.");
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // mobile
    isMobile: true,
  });
  await context.addInitScript(({ t, u }) => {
    localStorage.setItem("token", t);
    if (u) localStorage.setItem("userData", u);
  }, { t: auth.token, u: auth.userData });

  const page = await context.newPage();

  // Navigasi ke form registrasi
  const token = jwtEncodePage({ page: "registrationFormDetail" });
  await page.goto(`${BASE_URL}/${token}`, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(2000);

  // Scroll ke ATAS (instant) sebelum ukur & screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // Ambil posisi header dan elemen konten pertama
  const info = await page.evaluate(() => {
    const header = document.querySelector("header.topbar, .topbar");
    const headerRect = header ? header.getBoundingClientRect() : null;

    // Cari konten pertama di bawah page-wrapper
    const main = document.querySelector("#main-content");
    const firstContent = main ? main.querySelector(".dashboard-shell, .page-header, .card") : null;
    const contentRect = firstContent ? firstContent.getBoundingClientRect() : null;

    const pageWrapper = document.querySelector(".dashboard-page-wrapper");
    const wrapperStyle = pageWrapper ? window.getComputedStyle(pageWrapper) : null;

    return {
      headerRect: headerRect ? { top: headerRect.top, bottom: headerRect.bottom, height: headerRect.height } : null,
      headerPosition: header ? window.getComputedStyle(header).position : null,
      contentRect: contentRect ? { top: contentRect.top, bottom: contentRect.bottom } : null,
      contentClass: firstContent ? firstContent.className : null,
      wrapperPaddingTop: wrapperStyle ? wrapperStyle.paddingTop : null,
      scrollY: window.scrollY,
      docHeight: document.body.scrollHeight,
      viewportHeight: window.innerHeight,
    };
  });

  console.log("=== DEBUG: Header vs Konten (viewport mobile) ===");
  console.log("Header position:", info.headerPosition);
  console.log("Header rect:", JSON.stringify(info.headerRect));
  console.log("Konten pertama class:", info.contentClass);
  console.log("Konten rect:", JSON.stringify(info.contentRect));
  console.log("page-wrapper padding-top:", info.wrapperPaddingTop);
  console.log("scrollY:", info.scrollY, "| docHeight:", info.docHeight, "| viewportH:", info.viewportHeight);

  if (info.headerRect && info.contentRect) {
    const overlap = info.headerRect.bottom > info.contentRect.top;
    console.log("\n>>> HEADER MENUTUPI KONTEN?", overlap ? "YES (overlap)" : "NO");
    console.log(">>> Header bottom:", info.headerRect.bottom, "vs Content top:", info.contentRect.top);
  }

  // Screenshot VIEWPORT (bukan fullPage) — ini yang dilihat user di layar
  await page.screenshot({ path: "e2e/debug-viewport-step3.png" });
  console.log("\n[OK] Viewport screenshot: e2e/debug-viewport-step3.png");

  await browser.close();
}

main().catch((e) => {
  console.error("[ERROR]", e.message);
  process.exit(1);
});
