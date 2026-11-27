/**
 * E2E Test — Account Register Page (@public)
 * Captures screenshots of the registration form from AccountRegisterPage.jsx
 *
 * Usage:
 *   npx playwright test e2e/account-register.spec.mjs
 *
 *   npx playwright test e2e/account-register.spec.mjs --project=mobile
 */

import { test, expect } from "@playwright/test";
import { BASE_URL, SCREENSHOT_DIR } from "../playwright.config.mjs";
import { navigateTo, takeScreenshot, clearAuth, jwtEncodePage } from "./helpers.mjs";
import fs from "fs";

// ── Folder khusus untuk screenshot registrasi ──
const REGISTER_SCREENSHOT_DIR = `${SCREENSHOT_DIR}/account-register`;

// ── Helper: Take screenshot dengan folder khusus register ──
async function takeRegisterScreenshot(page, name) {
  const dir = REGISTER_SCREENSHOT_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Detect mobile mode
  const viewport = await page.viewportSize();
  const isMobile = viewport && viewport.width < 480;
  const finalName = isMobile ? `${name}-mobile` : name;

  await page.waitForTimeout(1000); // Wait for animations
  const path = `${dir}/${finalName}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`[REGISTER SCREENSHOT] ${path}`);
  return path;
}

// ── Test Suite: Account Register Page ──
test.describe("Account Register Page — Visual Test", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
  });

  // Test 1: Full page screenshot (desktop)
  test("register-fullpage: screenshot halaman registrasi penuh", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    await takeRegisterScreenshot(page, "register-fullpage");

    // Verify form elements
    await expect(page.locator('input[name="nama"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.locator("button.pbs-submit-v2")).toBeVisible();
  });

  // Test 2: Header & branding
  test("register-header: screenshot header dengan logo & login link", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot header area only
    const header = page.locator(".pbs-register-topbar");
    await header.waitFor({ state: "visible", timeout: 5000 });
    await takeRegisterScreenshot(page, "register-header");
  });

  // Test 3: Left side benefits (desktop only)
  test("register-benefits: screenshot panel manfaat (desktop)", async ({ page }) => {
    const viewport = await page.viewportSize();
    if (viewport && viewport.width < 992) {
      test.skip("Panel manfaat hanya tampil di desktop (lg+)");
    }

    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot left panel
    const leftPanel = page.locator(".pbs-register-left-v2");
    await leftPanel.waitFor({ state: "visible", timeout: 5000 });
    await takeRegisterScreenshot(page, "register-benefits");
  });

  // Test 4: Registration form card
  test("register-form-card: screenshot kartu formulir", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot form card
    const formCard = page.locator(".pbs-register-card-v2");
    await formCard.waitFor({ state: "visible", timeout: 5000 });
    await takeRegisterScreenshot(page, "register-form-card");
  });

  // Test 5: Form fields closeup
  test("register-form-fields: screenshot input fields", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Focus on form area
    const formArea = page.locator(".pbs-register-card-body form");
    await formArea.waitFor({ state: "visible", timeout: 5000 });
    await takeRegisterScreenshot(page, "register-form-fields");
  });

  // Test 6: Password field with eye toggle
  test("register-password-visible: screenshot password field (visible)", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Fill password field
    await page.locator('input[name="password"]').fill("P@ssw0rd123!");

    // Click eye toggle to show password
    const eyeBtn = page.locator("button.pbs-password-eye-btn").first();
    await eyeBtn.click();
    await page.waitForTimeout(500);

    await takeRegisterScreenshot(page, "register-password-visible");
  });

  // Test 7: Form validation errors
  test("register-validation: screenshot validasi error", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Try to submit empty form to trigger validation
    await page.locator("button.pbs-submit-v2").click();
    await page.waitForTimeout(1000);

    await takeRegisterScreenshot(page, "register-validation");
  });

  // Test 8: Form with data filled
  test("register-filled: screenshot formulir terisi", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Fill all fields
    await page.locator('input[name="nama"]').fill("Ahmad Hidayat");
    await page.locator('input[name="email"]').fill("ahmad.hidayat@example.com");
    await page.locator('input[name="password"]').fill("P@ssw0rd123!");
    await page.locator('input[name="confirmPassword"]').fill("P@ssw0rd123!");

    await page.waitForTimeout(500);
    await takeRegisterScreenshot(page, "register-filled");
  });

  // Test 9: Submit button loading state
  test("register-loading: screenshot tombol loading", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Fill minimal required fields
    await page.locator('input[name="nama"]').fill("Test User");
    await page.locator('input[name="email"]').fill("test@example.com");
    await page.locator('input[name="password"]').fill("P@ssw0rd123!");
    await page.locator('input[name="confirmPassword"]').fill("P@ssw0rd123!");

    // Click submit (will fail but show loading)
    await page.locator("button.pbs-submit-v2").click();
    await page.waitForTimeout(500);

    await takeRegisterScreenshot(page, "register-loading");
  });

  // Test 10: Customer support info
  test("register-support: screenshot info customer support", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot bottom area with support info
    const supportArea = page.locator(".pbs-register-left-v2 .bg-light");
    if (await supportArea.isVisible().catch(() => false)) {
      await takeRegisterScreenshot(page, "register-support");
    } else {
      // Fallback: full page if support info not found
      await takeRegisterScreenshot(page, "register-support");
    }
  });

  // Test 11: Responsive - Mobile view
  test("register-mobile: screenshot tampilan mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    await takeRegisterScreenshot(page, "register-mobile");
  });

  // Test 12: Responsive - Tablet view
  test("register-tablet: screenshot tampilan tablet", async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    await takeRegisterScreenshot(page, "register-tablet");
  });

  // Test 13: Benefits icons
  test("register-benefits-icons: screenshot ikon manfaat", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot benefits section
    const benefitsSection = page.locator(".pbs-register-left-v2 .d-flex.flex-column.gap-4");
    if (await benefitsSection.isVisible().catch(() => false)) {
      await takeRegisterScreenshot(page, "register-benefits-icons");
    }
  });

  // Test 14: Terms & Conditions text
  test("register-terms: screenshot teks syarat & ketentuan", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Screenshot bottom area with terms
    const termsArea = page.locator(".pbs-terms-text");
    await termsArea.waitFor({ state: "visible", timeout: 5000 });
    await takeRegisterScreenshot(page, "register-terms");
  });

  // Test 15: Complete registration flow
  test("register-complete-flow: screenshot seluruh proses registrasi", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);

    // Step 1: Empty form
    await takeRegisterScreenshot(page, "flow-01-empty-form");

    // Step 2: Fill name
    await page.locator('input[name="nama"]').fill("Budi Santoso");
    await page.waitForTimeout(300);
    await takeRegisterScreenshot(page, "flow-02-fill-name");

    // Step 3: Fill email
    await page.locator('input[name="email"]').fill("budi.santoso@example.com");
    await page.waitForTimeout(300);
    await takeRegisterScreenshot(page, "flow-03-fill-email");

    // Step 4: Fill password
    await page.locator('input[name="password"]').fill("SecurePass123!");
    await page.waitForTimeout(300);
    await takeRegisterScreenshot(page, "flow-04-fill-password");

    // Step 5: Fill confirm password
    await page.locator('input[name="confirmPassword"]').fill("SecurePass123!");
    await page.waitForTimeout(300);
    await takeRegisterScreenshot(page, "flow-05-fill-confirm");

    // Step 6: Ready to submit
    await takeRegisterScreenshot(page, "flow-06-ready-submit");
  });
});
