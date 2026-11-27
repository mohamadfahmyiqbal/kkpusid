/**
 * Script untuk login dan menyimpan token auth untuk E2E tests
 * Usage: node e2e/manual-login.mjs
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const AUTH_STATE_FILE = 'e2e/.auth-state.json';

// Gunakan user test yang baru dibuat
const TEST_EMAIL = process.env.TEST_EMAIL || 'e2e.test@kkpus.id';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'P@ssw0rd123!';

async function main() {
  console.log('[INFO] Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    console.log(`[INFO] Navigating to login page...`);
    // Navigate to login page using route token
    await page.goto(`${BASE_URL}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    
    // Navigate to login
    const loginToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIiwidmVyIjoiMS4wIn0.eyJwYWdlIjoiYXV0aExvZ2luIiwiX3YiOiIxLjAiLCJfdHMiOjE3MzI0MDAwMDAwMDAsIl9leHAiOjE3MzI0ODY0MDAwMDAsIl9zcmMiOiJlMmUifQ.';
    await page.goto(`${BASE_URL}/${loginToken}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    
    // Fill login form
    console.log('[INFO] Filling login form...');
    const emailField = page.locator('#login-email-phone, input[name="email"], input[placeholder*="Email"]');
    const passwordField = page.locator('#login-password, input[name="password"], input[type="password"]');
    const submitBtn = page.locator('button:has-text("Masuk Sekarang"), button[type="submit"]');
    
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    console.log(`[INFO] Email: ${TEST_EMAIL}`);
    await emailField.fill(TEST_EMAIL);
    await passwordField.fill(TEST_PASSWORD);
    
    console.log('[INFO] Submitting login...');
    await submitBtn.click();
    
    // Wait for token
    console.log('[INFO] Waiting for token...');
    await page.waitForTimeout(8000);
    
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const userData = await page.evaluate(() => localStorage.getItem('userData'));
    
    if (token) {
      console.log('[SUCCESS] Token obtained!');
      const storage = { token, userData };
      
      // Save to file
      const fullPath = path.join(process.cwd(), AUTH_STATE_FILE);
      const dir = path.dirname(fullPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(fullPath, JSON.stringify(storage, null, 2));
      console.log(`[SUCCESS] Token saved to ${AUTH_STATE_FILE}`);
      console.log(`[INFO] Token preview: ${token.substring(0, 80)}...`);
      
      // Verify by navigating to dashboard
      console.log('[INFO] Verifying token by navigating to dashboard...');
      await page.waitForTimeout(2000);
      const dashboardToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIiwidmVyIjoiMS4wIn0.eyJwYWdlIjoiZGFzaGJvYXJkIiwiX3YiOiIxLjAiLCJfdHMiOjE3MzI0MDAwMDAwMDAsIl9leHAiOjE3MzI0ODY0MDAwMDAsIl9zcmMiOiJlMmUifQ.';
      await page.goto(`${BASE_URL}/${dashboardToken}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      
      const pageTitle = await page.title();
      console.log(`[INFO] Dashboard page title: ${pageTitle}`);
      
    } else {
      console.log('[ERROR] No token found in localStorage');
      // Take screenshot for debugging
      await page.screenshot({ path: 'e2e/debug-login-error.png', fullPage: true });
      console.log('[INFO] Screenshot saved to e2e/debug-login-error.png');
    }
  } catch (err) {
    console.error('[ERROR]', err.message);
  } finally {
    await browser.close();
  }
}

main();
