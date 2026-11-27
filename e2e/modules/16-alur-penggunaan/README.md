# Module 16 — Alur Penggunaan (@public)

**Flow 16: Alur Penggunaan**  
Tests simulate the complete end-to-end user journey through the kkpusid public website:

## 📋 Covered User Flows
1. **Splash → Landing → Login → Dashboard**
   - Splash screen auto-redirect to landing page
   - Login via credentials (TEST_EMAIL/TEST_PASSWORD)
   - Dashboard navigation with real-time data

2. **Dashboard → Simpanan → Product Selection → Setoran/Pencairan**
   - Navigate to simpananPage via dashboard button
   - Switch between product tabs (Pokok, Wajib, Sukarela)
   - Setoran flow (fill form)
   - Penarikan flow (fill withdrawal form)

3. **Tabungan → Akun & Profil → Logout**
   - Tabungan page navigation and verification
   - Akun/profil page navigation and editing
   - Complete logout flow

## 🧪 Test Structure
- Each test follows click-based navigation where possible
- Screenshots saved to `e2e/screenshots/16-alur-penggunaan/`
- Uses Playwright's `navigateWithAuth` for authenticated flows
- Mobile view tests included (iPhone X dimensions)

## 🛠️ Prerequisites
- Test data: `TEST_EMAIL` and `TEST_PASSWORD` environment variables
- Running Playwright tests requires module 16 to be imported in `e2e/modules/index.mjs`

## 🚀 Running Tests
```bash
# Run all e2e modules (desktop)
npm run e2e

# Run specifically module 16
npx playwright test e2e/modules/16-alur-penggunaan/
```

## 📌 Notes
- Module 16 builds upon existing flows (02-15)
- Tests verify navigation between pages using actual UI elements
- Mobile tests included with iPhone X viewport (375x812)
- Screenshots organized by module folder structure