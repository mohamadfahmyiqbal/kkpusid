/**
 * Module 01 — Splash & Landing
 * Flow 1: Splash Screen → Landing Page
 * 
 * Usage:
 *   npx playwright test e2e/modules/01-splash-landing/splash-landing.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  jwtEncodePage,
} from "../../helpers.mjs";

test.describe("Flow 1 — Splash & Landing (@public)", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  test("01-globalSplash: Splash Screen", async ({ page }) => {
    // Splash auto-redirect ke landing setelah 5 detik (DEFAULT_SPLASH_DELAY),
    // jadi screenshot harus diambil SEGERA setelah page load (bukan setelah
    // network idle) agar splash masih tampil.
    const token = jwtEncodePage({ page: "globalSplash" });
    await page.goto(`${BASE_URL}/${token}`, { waitUntil: "domcontentloaded" });
    
    // Tunggu render splash sebentar
    await page.waitForTimeout(800);
    
    // Verifikasi splash screen muncul
    const splashElement = page.locator(".splashx-screen, .SplashPage, [class*='splashx']");
    await expect(splashElement.first()).toBeVisible({ timeout: 3000 });
    
    // Screenshot splash
    const dir = "e2e/screenshots/01-splash-landing";
    const fs = await import("fs");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const viewport = page.viewportSize();
    const suffix = viewport && viewport.width < 480 ? "-mobile" : "";
    await page.screenshot({ path: `${dir}/01-globalSplash${suffix}.png`, fullPage: true });
    console.log(`[SCREENSHOT] ${dir}/01-globalSplash${suffix}.png`);
    
    await assertPageLoaded(page, "Splash Screen");
  });

  test("02-landingPage: Landing Page", async ({ page }) => {
    await navigateTo(page, "landingPage", {}, 2500);
    await takeScreenshot(page, "02-landingPage");

    // Verifikasi landing page elements
    const heroSection = page.locator("header, .hero, [class*='hero'], main");
    await expect(heroSection.first()).toBeVisible({ timeout: 5000 });

    // Tombol "Daftar Sekarang" ada di dalam Navbar.Collapse (expand="lg").
    // Di mobile (375px) menu ini tersembunyi di balik hamburger, jadi user
    // harus membuka hamburger terlebih dahulu sebelum bisa men-tap tombol.
    const daftarBtn = page.locator("button:has-text('Daftar Sekarang')").first();

    if (!(await daftarBtn.isVisible())) {
      // Buka hamburger menu (Navbar.Toggle) seperti user di mobile
      const navToggle = page.locator(".navbar-toggler").first();
      await expect(navToggle).toBeVisible({ timeout: 5000 });
      await navToggle.click();
      await page.waitForTimeout(500);
    }

    // Tap tombol "Daftar Sekarang"
    await expect(daftarBtn).toBeVisible({ timeout: 5000 });
    await daftarBtn.click();

    // Verifikasi navigasi ke halaman registrasi (URL token berubah dari landingPage)
    await page.waitForTimeout(1500);
    const url = page.url();
    const navigatedToRegister = !url.includes("landingPage") || url.includes("accountRegisterPage");
    expect(navigatedToRegister).toBeTruthy();

    await assertPageLoaded(page, "Landing Page → Registrasi");
  });

  test("02-landingPage: scroll dan load artikel", async ({ page }) => {
    await navigateTo(page, "landingPage", {}, 2500);
    
    // Scroll ke section artikel
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(2000);
    
    // Scroll lagi ke bawah
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    
    await takeScreenshot(page, "02-landingPage-scrolled");
  });
});
