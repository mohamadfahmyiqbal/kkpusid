/**
 * Module 14 — Akun & Profil
 * Flow 14: Account Page → Registration Status → Resignation
 * 
 * Usage:
 *   npx playwright test e2e/modules/14-akun-profil/akun-profil.spec.mjs
 */

import { test, expect } from "@playwright/test";
import {
  BASE_URL,
  API_BASE_URL,
  SCREENSHOT_DIR,
  TEST_EMAIL,
  TEST_PASSWORD,
} from "../../../playwright.config.mjs";
import {
  navigateTo,
  takeScreenshot,
  clearAuth,
  assertPageLoaded,
  apiLogin,
  navigateWithAuth,
} from "../../helpers.mjs";

test.describe("Flow 14 — Akun & Profil", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("accountPage: data profil lengkap", async ({ page }) => {
    
    
    await navigateWithAuth(page, "accountPage", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".ap-container")).toBeVisible({ timeout: 5000 });
    
    // Cek data profil
    const profileInfo = page.locator("[class*='profile'], [class*='info']");
    if (await profileInfo.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[AKUN] Data profil ditemukan`);
    }
    
    await assertPageLoaded(page, "Akun / Profil");
  });

  test("accountPage: edit data diri", async ({ page }) => {
    
    
    await navigateWithAuth(page, "accountPage", {}, 2000, authToken);
    
    // Klik edit profile
    const editBtn = page.locator("button:has-text('Edit'), button:has-text('Ubah')");
    if (await editBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await editBtn.click();
      await page.waitForTimeout(2000);
      
      // Form edit
      const nameInput = page.locator("input[name='name'], input[name='nama']");
      if (await nameInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await nameInput.fill("E2E Test Edit");
      }
      
      await takeScreenshot(page, "akun-profil-edit-form");
    }
  });

  test("registrationPage: status verifikasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "registrationPage", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-registrasi");
    
    // Cek status
    const statusBadge = page.locator("[class*='status'], [class*='badge']");
    if (await statusBadge.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[AKUN] Status pendaftaran ditemukan`);
    }
    
    await assertPageLoaded(page, "Status Pendaftaran");
  });

  test("registrationFormDetail: detail form", async ({ page }) => {
    
    
    await navigateWithAuth(page, "registrationFormDetail", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-form-detail");
    
    await assertPageLoaded(page, "Formulir Pendaftaran");
  });

  test("detailPendaftaranAnggota: detail pendaftaran", async ({ page }) => {
    
    
    await navigateWithAuth(page, "detailPendaftaranAnggota", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-detail-registrasi");
    
    // Cek detail data
    const detailContent = page.locator("[class*='detail'], [class*='data']");
    if (await detailContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[AKUN] Detail pendaftaran ditemukan`);
    }
    
    await assertPageLoaded(page, "Detail Pendaftaran Anggota");
  });

  test("resignationCheck: pengajuan keluar", async ({ page }) => {
    
    
    await navigateWithAuth(page, "resignationCheck", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-resignasi");
    
    // Verifikasi halaman
    await expect(page.locator(".rcp-container")).toBeVisible({ timeout: 5000 });
    
    await assertPageLoaded(page, "Resignasi Anggota");
  });

  test("termination_progress: progres terminasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "termination_progress", {}, 2000, authToken);
    await takeScreenshot(page, "akun-profil-terminasi");
    
    // Cek timeline terminasi
    const timeline = page.locator("[class*='timeline'], [class*='progress']");
    if (await timeline.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[AKUN] Timeline terminasi ditemukan`);
    }
    
    await assertPageLoaded(page, "Progres Terminasi");
  });
});
