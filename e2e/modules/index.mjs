/**
 * Master Index — E2E Test User Workflow
 *
 * Import user workflow test untuk dijalankan bersama.
 *
 * Usage:
 *   # Jalankan semua test
 *   npx playwright test e2e/modules/user-workflow/
 *
 *   # Jalankan workflow tertentu
 *   npx playwright test e2e/modules/user-workflow/user-workflow.spec.mjs
 *
 *   # Dengan login (protected pages)
 *   TEST_EMAIL=user@example.com TEST_PASSWORD=P@ssw0rd123! \
 *     npx playwright test e2e/modules/user-workflow/
 *
 *   # Mode headed (lihat browser)
 *   npx playwright test e2e/modules/user-workflow/ --headed
 *
 *   # HTML report
 *   npx playwright test e2e/modules/user-workflow/ --reporter=html
 *   npx playwright show-report
 */

// ── User Workflow E2E (New & Returning Member) ──
import "./user-workflow/user-workflow.spec.mjs";
