/**
 * Generate PDF from HTML tutorial
 * Uses Playwright Chromium to render HTML → PDF
 */

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDF() {
  const htmlPath = path.join(__dirname, "TUTORIAL-PDF.html");
  const pdfPath = path.join(__dirname, "TUTORIAL-KKPU-ID.pdf");

  console.log(`[PDF] HTML: ${htmlPath}`);
  console.log(`[PDF] Output: ${pdfPath}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load HTML file
  await page.goto(`file:///${htmlPath.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle",
  });

  // Wait for images to load
  await page.waitForTimeout(3000);

  // Generate PDF
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "15mm",
      right: "12mm",
      bottom: "15mm",
      left: "12mm",
    },
  });

  await browser.close();
  console.log(`[PDF] ✅ Generated: ${pdfPath}`);
}

generatePDF().catch((err) => {
  console.error("[PDF] ❌ Error:", err);
  process.exit(1);
});