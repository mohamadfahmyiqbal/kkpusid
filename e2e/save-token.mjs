/**
 * Script untuk login via UI dan menyimpan token
 * Usage: node e2e/save-token.mjs
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const TEST_EMAIL = process.env.TEST_EMAIL || 'e2e.test@kkpus.id';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'P@ssw0rd123!';
const AUTH_STATE_FILE = 'e2e/.auth-state.json';

async function main() {
  console.log('[INFO] Starting browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    console.log(`[INFO] Navigating to login page...`);
    await page.goto(`${BASE_URL}`, { waitUntil: 'domcontentloaded' });
    
    // Wait for app to load and navigate to login
    console.log('[INFO] Waiting for app to load...');
    await page.waitForTimeout(3000);
    
    // Navigate to login page using the app's routing
    await page.evaluate((email) => {
      // Try to navigate to login by clicking or direct route
      const loginBtn = document.querySelector('a[href*="login"], button:has-text("Login"), button:has-text("Masuk")');
      if (loginBtn) loginBtn.click();
    });
    
    await page.waitForTimeout(2000);
    
    // Fill login form
    console.log('[INFO] Filling login form...');
    const emailField = page.locator('#login-email-phone, input[name="email"], input[placeholder*="Email"]');
    const passwordField = page.locator('#login-password, input[name="password"], input[type="password"]');
    const submitBtn = page.locator('button:has-text("Masuk"), button:has-text("Login"), button[type="submit"]');
    
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    await emailField.fill(TEST_EMAIL);
    await passwordField.fill(TEST_PASSWORD);
    
    console.log('[INFO] Submitting login...');
    await submitBtn.click();
    
    // Wait for token
    console.log('[INFO] Waiting for token...');
    await page.waitForTimeout(5000);
    
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
      console.log(`[INFO] Token preview: ${token.substring(0, 50)}...`);
    } else {
      console.log('[ERROR] No token found in localStorage');
    }
  } catch (err) {
    console.error('[ERROR]', err.message);
  } finally {
    await browser.close();
  }
}

main();
