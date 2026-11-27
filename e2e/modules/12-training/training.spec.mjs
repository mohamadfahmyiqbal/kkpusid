/**
 * Module 12 — Training & Evaluasi
 * Flow 12: Training → Materi → Evaluasi → Ranking
 * 
 * Usage:
 *   npx playwright test e2e/modules/12-training/training.spec.mjs
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

test.describe("Flow 12 — Training & Evaluasi", () => {
  let authToken = null;
  
  test.beforeEach(async ({ page }) => {
    if (!authToken && TEST_EMAIL && TEST_PASSWORD) {
      const loginResult = await apiLogin(page, TEST_EMAIL, TEST_PASSWORD);
      if (loginResult?.success) {
        authToken = loginResult.token;
      }
    }
  });

  test("trainingPage: daftar materi training", async ({ page }) => {
    
    
    await navigateWithAuth(page, "trainingPage", {}, 2000, authToken);
    await takeScreenshot(page, "training-main");
    
    // Verifikasi halaman (gunakan selector spesifik untuk menghindari strict mode violation)
    await expect(page.locator(".custom-training-tabs")).toBeVisible({ timeout: 5000 });
    
    // Cek materi
    const materialCard = page.locator("[class*='material'], [class*='materi'], [class*='card']");
    if (await materialCard.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRAINING] Materi training ditemukan`);
    }
    
    await assertPageLoaded(page, "Training");
  });

  test("detailMateri: detail materi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "detailMateri", { materialId: 1 }, 2000, authToken);
    await takeScreenshot(page, "training-detail");
    
    // Cek konten materi
    const content = page.locator("[class*='content'], [class*='konten']");
    if (await content.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRAINING] Konten materi ditemukan`);
    }
    
    await assertPageLoaded(page, "Detail Materi");
  });

  test("bacaMateri: baca materi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "bacaMateri", { materialId: 1 }, 2000, authToken);
    await takeScreenshot(page, "training-baca");
    
    // Scroll baca materi
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(1000);
    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    await takeScreenshot(page, "training-baca-scrolled");
  });

  test("evaluasi: kuis / evaluasi", async ({ page }) => {
    
    
    await navigateWithAuth(page, "evaluasi", { materialId: 1 }, 2000, authToken);
    await takeScreenshot(page, "training-evaluasi");
    
    // Cek soal kuis
    const quizQuestions = page.locator("[class*='quiz'], [class*='question'], [class*='soal']");
    if (await quizQuestions.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRAINING] Soal evaluasi ditemukan`);
    }
    
    await assertPageLoaded(page, "Evaluasi / Kuis");
  });

  test("ranking: peringkat anggota", async ({ page }) => {
    
    
    await navigateWithAuth(page, "ranking", {}, 2000, authToken);
    await takeScreenshot(page, "training-ranking");
    
    // Cek leaderboard
    const leaderboard = page.locator("[class*='leaderboard'], [class*='ranking'], [class*='peringkat']");
    if (await leaderboard.isVisible({ timeout: 3000 }).catch(() => false)) {
      console.log(`[TRAINING] Leaderboard ditemukan`);
    }
    
    await assertPageLoaded(page, "Ranking");
  });
});
