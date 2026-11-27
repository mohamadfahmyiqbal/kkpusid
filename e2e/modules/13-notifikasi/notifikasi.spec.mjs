/**
 * Module 13 — Notifikasi & Transaksi
 * Flow 13: Notifikasi → Detail Transaksi → Receipt
 * 
 * Usage:
 *   npx playwright test e2e/modules/13-notifikasi/notifikasi.spec.mjs
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

test.describe("Flow 13 — Notifikasi & Transaksi", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("notificationPage: daftar notifikasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "notificationPage", {}, 2000, authToken);
    await takeScreenshot(page, "notifikasi-main");
    
    // Verifikasi halaman
    await expect(page.locator("[class*='notification'], .NotificationPage")).toBeVisible({ timeout: 5000 });
    
    // Cek list notifikasi
    const notificationList = page.locator("[class*='notification-item'], [class*='item']");
    if (await notificationList.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[NOTIFIKASI] Notifikasi ditemukan`);
    }
    
    await assertPageLoaded(page, "Notifikasi");
  });

  test("notificationDetailPage: detail notifikasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "notificationDetailPage", { notificationId: 1 }, 2000, authToken);
    await takeScreenshot(page, "notifikasi-detail");
    
    // Cek detail konten
    const detailContent = page.locator("[class*='detail'], [class*='content']");
    if (await detailContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[NOTIFIKASI] Detail notifikasi ditemukan`);
    }
    
    await assertPageLoaded(page, "Detail Notifikasi");
  });

  test("transactionDetailPage: timeline transaksi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "transactionDetailPage", { transactionId: 1 }, 2000, authToken);
    await takeScreenshot(page, "transaksi-detail");
    
    // Cek timeline
    const timeline = page.locator("[class*='timeline'], [class*='timeline-step']");
    if (await timeline.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRANSAKSI] Timeline ditemukan`);
    }
    
    await assertPageLoaded(page, "Detail Transaksi");
  });

  test("receiptPage: unduh nota", async ({ page }) => {
    
    
    await navigateWithAuth(page, "receiptPage", { billId: 1 }, 2000, authToken);
    await takeScreenshot(page, "transaksi-receipt");
    
    // Cek nota
    const receiptContent = page.locator("[class*='receipt'], [class*='nota']");
    if (await receiptContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRANSAKSI] Nota ditemukan`);
    }
    
    await assertPageLoaded(page, "Nota / Receipt");
  });

  test("billingPage: tagihan pending", async ({ page }) => {
    
    
    await navigateWithAuth(page, "billingPage", {}, 2000, authToken);
    await takeScreenshot(page, "billing-main");
    
    // Cek tagihan
    const billList = page.locator("[class*='bill'], [class*='tagihan']");
    if (await billList.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[BILLING] Tagihan ditemukan`);
    }
    
    await assertPageLoaded(page, "Billing / Tagihan");
  });

  test("invoicePage: detail invoice", async ({ page }) => {
    
    
    await navigateWithAuth(page, "invoicePage", { billId: 1 }, 2000, authToken);
    await takeScreenshot(page, "billing-invoice");
    
    // Cek invoice
    const invoiceContent = page.locator("[class*='invoice'], [class*='factur']");
    if (await invoiceContent.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[BILLING] Invoice ditemukan`);
    }
    
    await assertPageLoaded(page, "Invoice");
  });
});
