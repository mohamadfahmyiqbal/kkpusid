# Plan: Fix "Kembali ke Dashboard" Button Forcing Users Out of Training Pages

## Objective

Fix the bug where clicking "Kembali ke Dashboard" in training sub-pages (Ranking, Evaluasi, DetailMateri, BacaMateri) ejects the user to the public landing page — perceived by users as being forcibly logged out — because the navigation token encodes a non-existent route key.

## Root Cause

Four handlers encode `jwtEncode({ page: "trainingDashboard" })`, but the registered route key in `src/routes/pages/trainingRoutes.jsx` is `trainingPage`. `PAGE_COMPONENTS["trainingDashboard"]` resolves to `undefined`, so `EncryptedPage.jsx` falls through to `<Navigate to="/" replace />`, which always routes to `globalSplash` → (after splash timer/skip) → `landingPage` (public page). This strands the authenticated user outside the protected layout, which looks and feels like a forced logout, even though no token/localStorage is actually cleared.

Affected locations (all use the wrong key `"trainingDashboard"`):

- `src/pages/training/Ranking/Ranking.jsx:110` (`handleBack`)
- `src/pages/training/Evaluasi/Evaluasi.jsx:140` (`handleBackToDashboard`)
- `src/pages/training/DetailMateri/DetailMateri.jsx:151` (`handleBack`)
- `src/pages/training/BacaMateri/BacaMateri.jsx:70` (`handleBackToDashboard`)

Correct key confirmed in `src/routes/pages/trainingRoutes.jsx`:

```js
trainingPage: {
  component: lazy(() => import("../../pages/training/TrainingDashboardPage")),
  isProtected: true,
},
```

## Scope

- Fix only the 4 incorrect `jwtEncode({ page: "trainingDashboard" })` calls → `jwtEncode({ page: "trainingPage" })`.
- No UI overhaul, no change to component structure, styling, or unrelated logic.
- No changes to `package.json`, Node engine config, or lockfiles.

## Files to Change

1. `src/pages/training/Ranking/Ranking.jsx` — line ~110
2. `src/pages/training/Evaluasi/Evaluasi.jsx` — line ~140
3. `src/pages/training/DetailMateri/DetailMateri.jsx` — line ~151
4. `src/pages/training/BacaMateri/BacaMateri.jsx` — line ~70

Each change: replace `page: "trainingDashboard"` with `page: "trainingPage"` inside the respective `jwtEncode({...})` call.

## Verification Plan

1. `grep -rn "trainingDashboard" src` → expect no matches after fix (confirms no other dangling reference).
2. Run existing test suite: `NODE_OPTIONS="--no-webstorage" npx vitest run` (or project's test script) — expect same pass count as baseline, no regressions.
3. Run `eslint` on the 4 changed files — expect 0 errors.
4. Run `prettier --check` on the 4 changed files — expect clean (or run `--write` if formatting-only diffs appear).
5. Run `npm run build` — expect successful build.
6. Manual trace re-check: confirm `trainingRoutes.jsx` key `trainingPage` is the only valid key, and all 4 files now reference it correctly.

## Post-Fix Git Workflow

1. `git fetch origin`
2. `git pull origin rollback/2026-11-02` (resolve any conflicts if remote has moved)
3. Re-run verification steps above after any merge
4. `git add -A && git commit -m "fix(training): correct back-to-dashboard route key to prevent forced logout"`
5. `git push origin rollback/2026-11-02`

## Risks

- Low risk: single string value fix, no logic/structure change.
- Only risk is if `trainingPage` route itself has other bugs unrelated to this key mismatch — out of scope unless discovered during verification.
