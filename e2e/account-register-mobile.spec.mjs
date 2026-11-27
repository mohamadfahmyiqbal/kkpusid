/**
 * E2E Mobile Test — Account Register Page (@public)
 * Captures screenshots of the registration page in mobile viewport.
 *
 * Usage:
 *   npx playwright test e2e/account-register-mobile.spec.mjs
 *   npx playwright test e2e/account-register-mobile.spec.mjs --project=mobile
 */

import { test, expect } from "@playwright/test";
import { SCREENSHOT_DIR } from "../playwright.config.mjs";
import { navigateTo, clearAuth } from "./helpers.mjs";
import fs from "fs";

// Mobile specific screenshot folder
const MOBILE_SCREENSHOT_DIR = `${SCREENSHOT_DIR}/account-register/mobile`;

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function takeMobileScreenshot(page, name) {
  await ensureDir(MOBILE_SCREENSHOT_DIR);
  const path = `${MOBILE_SCREENSHOT_DIR}/${name}.png`;
  await page.screenshot({ path, fullPage: true });
  console.log(`[MOBILE SCREENSHOT] ${path}`);
  return path;
}

test.describe("Account Register Page – Mobile Screenshots", () => {
  test.beforeEach(async ({ page }) => {
    await clearAuth(page);
    // Ensure mobile viewport (covers both desktop project with setViewport and mobile project)
    await page.setViewportSize({ width: 375, height: 812 });
  });

  test("mobile-fullpage", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    await takeMobileScreenshot(page, "mobile-fullpage");
    await expect(page.locator('input[name="nama"]')).toBeVisible();
  });

  test("mobile-header", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    const header = page.locator(".pbs-register-topbar");
    await header.waitFor({ state: "visible", timeout: 5000 });
    await takeMobileScreenshot(page, "mobile-header");
  });

  test("mobile-form-card", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    const card = page.locator(".pbs-register-card-v2");
    await card.waitFor({ state: "visible", timeout: 5000 });
    await takeMobileScreenshot(page, "mobile-form-card");
  });

  test("mobile-form-filled", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    await page.locator('input[name="nama"]').fill("Budi Mobile");
    await page.locator('input[name="email"]').fill("budi.mobile@example.com");
    await page.locator('input[name="password"]').fill("Pass1234!");
    await page.locator('input[name="confirmPassword"]').fill("Pass1234!");
    await page.waitForTimeout(300);
    await takeMobileScreenshot(page, "mobile-form-filled");
  });

  test("mobile-validation-errors", async ({ page }) => {
    await navigateTo(page, "accountRegisterPage", {}, 2000);
    // Submit empty form to trigger validation errors
    await page.locator("button.pbs-submit-v2").click();
    await page.waitForTimeout(1000);
    await takeMobileScreenshot(page, "mobile-validation-errors");
  });
});
