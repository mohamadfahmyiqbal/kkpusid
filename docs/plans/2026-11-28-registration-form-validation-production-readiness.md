# Production-Ready Validation Plan — Registration Form Anggota

## Primary goal

Calon anggota dapat menyelesaikan formulir pendaftaran delapan langkah dengan data yang tervalidasi konsisten, mendapatkan pesan kesalahan yang jelas dan aksesibel, serta tidak dapat mengirim data yang tidak memenuhi kontrak pendaftaran.

## Scope and outcome

This plan strengthens the client-side validation and form handlers in `src/pages/anggota/RegistrationFormDetail/components/steps/` and the form orchestrator that supplies their props. It preserves the existing React 18 + React Bootstrap architecture and the current `/anggota/pendaftaran` API call.

This is client-side hardening only. Backend validation remains mandatory and is not replaced by this work.

## Current-state evidence

| Area | Evidence | Production risk |
| --- | --- | --- |
| Validation ownership | `components/registrationFormHelpers.js:14-63` holds one `validateStep(step, data)` function. | Rules only test presence for most fields; input format and normalization are inconsistent. |
| Form orchestration | `pages/RegistrationFormDetail.jsx:74-93` clears an error on field change and validates only on Next. | Select and camera changes bypass the shared handler, so their errors may remain visible. |
| Final submission | `pages/RegistrationFormDetail.jsx:100-141` revalidates steps 1–7, then posts the original `formData`. | Invalid data after editing from summary has no deterministic navigation to the first invalid step; payload is not normalized at the boundary. |
| Step components | `steps/Step1PersonalData.jsx:44-98`, `Step3CaptureKTP.jsx:18-27`, and `Step4Swafoto.jsx:17-26` write state directly. | Duplicated mutation paths create inconsistent error-clearing and make rules harder to evolve. |
| Step 2 select feedback | `steps/Step2Account.jsx:61-71` uses `Form.Control.Feedback` without a corresponding invalid control state. | The membership-type error may not render reliably. |
| Persisted sensitive data | `pages/RegistrationFormDetail.jsx:29-32,65-68` saves all `formData`, including `foto_ktp` and `foto_swafoto`, to `localStorage`. | KTP/selfie data remain in browser storage; this is already listed as an open privacy finding in `docs/checklist-kkpusid.md:53`. |
| Camera capture | `components/ui/WebcamCaptureField.jsx:47-59` saves `getScreenshot()` output without guarding a null/empty result or a file-size policy. | A failed capture can be treated as a successful update; payload may be unnecessarily large. |
| Automated coverage | No registration form test files were found under `src/pages/anggota/`. | Validation regressions are unprotected. |

## Phase 0 — Documentation and contract discovery

**How this serves the primary goal:** Production validation is only reliable when every client rule is derived from the actual registration contract and used through documented React state patterns.

### What to implement

1. Confirm the API request/response contract for `POST /anggota/pendaftaran` with the backend owner or authoritative API specification before setting final format and length rules. Record for every field: required status, accepted characters, min/max length, normalization, conditionality, uniqueness checks, expected photo MIME/size/dimensions, and server error shape.
2. Build a field-to-step validation matrix from the currently rendered fields in `steps/Step1PersonalData.jsx` through `steps/Step7BankData.jsx` and the summary commitment in `Step8Summary.jsx`.
3. Capture the approved UX policy: validation timing (on blur, on Next, and on Submit), handling of server-side field errors, whether empty employer data is allowed for non-employed applicants, and whether emergency contact may equal the applicant's phone number.
4. Document approved validation APIs before implementation. The project has no installed schema/form library in `package.json:5-32`; keep the initial enhancement dependency-free unless an explicit dependency-installation approval is obtained.

### Allowed APIs and patterns

- React controlled input updates: use functional state updates with object spread, as already used in `RegistrationFormDetail.jsx:74-78`. React documentation confirms controlled fields should synchronously write `e.target.value`, and object state must be copied rather than mutated (React `input` and `useState` references, retrieved 2026-11-28).
- React asynchronous effect cleanup: use an abort/cancellation guard in geographic-data effects before adding request-state handling; React `useEffect` documentation requires cleanup for externally connected work (React `useEffect` reference, retrieved 2026-11-28).
- Existing app service boundary: retain `AnggotaService.submitRegistration(formData)` at `services/AnggotaService.js:3-9`; enhance its payload/error mapping only once the backend contract is confirmed.
- Existing test stack: use Vitest and React Testing Library already declared in `package.json:39-40,99-103`; do not introduce another runner.

### Anti-pattern guards

- Do not invent Indonesian government, bank-account, photo-size, or backend uniqueness rules without the contract owner’s approval.
- Do not add React Hook Form, Zod, Yup, or an image-processing dependency without explicit approval to install dependencies.
- Do not regard client validation as authorization or as the only protection for malformed/malicious requests.

### Verification checklist

- [ ] API contract and validation matrix are reviewed by the backend/product owner.
- [ ] Every UI field has an explicit owner, rule source, client rule, server rule, and error-copy decision.
- [ ] All unresolved business rules are recorded as decisions before coding.

## Phase 1 — Consolidate field mutations and validation result model

**How this serves the primary goal:** A single mutation and error model ensures every step—text input, select, and camera—behaves predictably for the applicant.

### What to implement

1. Replace the current ad-hoc `validateStep` implementation in `components/registrationFormHelpers.js` with small pure helpers: trim/string normalization, presence, digit-only/length validation, email and telephone format validation, option membership validation, and image-presence validation. Keep `validateStep(step, data)` as the compatibility-facing step validator and add a complete-form validator that returns both errors and the earliest invalid step.
2. Define one field metadata/rule map keyed by the exact existing payload names (`nik_ktp`, `province_id`, `tipeAnggota`, `foto_ktp`, `bank_account_no`, etc.) so step and final validation cannot drift.
3. In `RegistrationFormDetail.jsx`, introduce one `updateFormField(name, value)` handler that updates state functionally and clears only the corresponding error. Route native inputs, `react-select` values, geographic select resets, and captured images through it.
4. Normalize whitespace and only safe client transforms at the submission boundary, without changing opaque IDs, account number leading zeros, or base64 image values. Submit the normalized snapshot rather than a stale/implicit state object.
5. Preserve the existing form shape and field names consumed by `Step8Summary.jsx:91-180` and `AnggotaService.submitRegistration`.

### Documentation references

- Current reusable rule location: `components/registrationFormHelpers.js:14-63`.
- Current orchestration and functional updates: `pages/RegistrationFormDetail.jsx:74-93`.
- Existing direct geographic state paths to replace: `steps/Step1PersonalData.jsx:44-98,268-274`.
- Existing direct camera paths to replace: `steps/Step3CaptureKTP.jsx:18-27` and `steps/Step4Swafoto.jsx:17-26`.

### Anti-pattern guards

- Do not mutate `formData` or `errors` objects in place.
- Do not clear every error when one field changes.
- Do not coerce NIK, telephone, RT/RW, or bank account numbers to JavaScript numbers.
- Do not duplicate validation conditions inside each step component.

### Verification checklist

- [ ] Unit tests prove each helper’s valid/invalid/boundary behavior.
- [ ] Tests prove `updateFormField` clears only the changed field error.
- [ ] A grep confirms form-field writes no longer bypass the shared mutation handler, except intentional initial hydration.

## Phase 2 — Enforce step-specific rules and accessible feedback

**How this serves the primary goal:** Applicants receive immediate, understandable correction guidance at the field they need to fix, before progressing or submitting.

### What to implement

1. Apply the approved validation matrix to all steps:
   - Step 1: NIK character/length policy, required identity/address/location hierarchy, and approved RT/RW constraints.
   - Step 2: restrict `tipeAnggota` to the two rendered option values, normalize and validate telephone format, validate the disabled profile email defensively.
   - Steps 3–4: require a non-empty successful capture and enforce only the contract-approved image policy.
   - Steps 5–7: required/conditional rules, whitespace-only rejection, phone format, and approved bank-account/name constraints.
   - Step 8: require the applicant declaration before network submission and show a clear error/focus target when it is missing.
2. Validate on an approved schedule: retain Next-step gating, add field-level validation on blur for native fields and select/camera completion for custom controls, and revalidate the full form before submitting.
3. Standardize error markup: associate each error with `id`, `aria-describedby`, `aria-invalid`, and an alert/live region appropriate to the existing Bootstrap control pattern. For `react-select`, use an explicit accessible error element instead of relying on `Form.Control.Feedback`.
4. Focus the first invalid field after a blocked Next/Submit action; when final validation fails from Step 8, navigate to the earliest invalid step and then focus that control after render.
5. Convert non-semantic click targets where touched. In particular, replace the clickable progress dot in `RegistrationProgressBar.jsx:56-72` with a keyboard-operable button or leave it out of scope if no change is required by the accepted UI design.

### Documentation references

- Existing field/error rendering: `steps/Step1PersonalData.jsx:143-179,204-283,320-332`; `Step5Employment.jsx:32-98`; `Step6EmergencyContact.jsx:32-97`; `Step7BankData.jsx:31-93`.
- Existing select error inconsistency: `steps/Step2Account.jsx:61-71`.
- Existing footer blocks final send only by commitment: `components/RegistrationFormFooter.jsx:31-48`.
- Existing project a11y checklist: `docs/checklist-kkpusid.md:23-41`.

### Anti-pattern guards

- Do not validate only on submit; errors must appear before a user leaves an invalid step.
- Do not use placeholders as labels or deliver error state through color alone.
- Do not make the final submit button permanently disabled in a way that hides why submission cannot proceed.
- Do not permit forward step navigation that bypasses the same validation gate.

### Verification checklist

- [ ] Component tests cover every step’s blocked and allowed forward transition.
- [ ] Keyboard tests demonstrate focus moves to the first invalid control and errors are announced/associated correctly.
- [ ] Manual responsive check confirms select, camera, and standard input errors are readable on mobile and desktop.

## Phase 3 — Submission reliability, server errors, and privacy hardening

**How this serves the primary goal:** Valid applicants can submit once reliably, while failed attempts retain safe draft data and surface actionable server feedback without exposing identity documents.

### What to implement

1. Make `handleSubmit` use the full-form validator’s earliest-invalid-step result; clear the generic error when corrected; prevent duplicate requests for the full request lifecycle; retain the existing `isSubmitting` control.
2. Map the confirmed backend error contract into field-level errors when available; otherwise display the existing safe generic failure copy. Never inject server messages as HTML.
3. Implement an explicit draft persistence policy: immediately stop persisting `foto_ktp` and `foto_swafoto` to `localStorage`; persist only the approved non-sensitive fields with a schema/version and TTL, or remove drafts entirely if product chooses no resume capability. Handle malformed/expired stored drafts without crashing `JSON.parse`.
4. Clear draft state on successful submission and provide a user-visible, approved policy for cancel/expiry. Do not log payloads, image data, NIK, account numbers, or API error bodies containing PII.
5. Harden camera completion: treat null/empty screenshots as errors, display permission/device failure feedback, and enforce only confirmed client-side photo bounds. Coordinate any image resizing/compression with backend acceptance.
6. Establish the backend validation parity checklist: the server must repeat required, format, authorization, upload, rate-limit, and data-integrity validation independent of this client implementation.

### Documentation references

- Existing submit lifecycle: `pages/RegistrationFormDetail.jsx:100-141`.
- Existing local-storage persistence: `pages/RegistrationFormDetail.jsx:29-32,65-68`.
- Existing open privacy finding: `docs/checklist-kkpusid.md:45-59`, especially line 53.
- Existing webcam behavior: `components/ui/WebcamCaptureField.jsx:47-68,102-177`.
- Existing HTTP timeout boundary: `services/AnggotaService.js:3-9`.

### Anti-pattern guards

- Do not store KTP/swafoto base64, NIK, bank account data, or backend error payloads in browser storage unless the approved privacy design explicitly permits each item.
- Do not assume a 30-second timeout means the server did not receive the request; do not auto-retry non-idempotent registration without an idempotency contract.
- Do not render `response.data.message` as HTML; the current success modal’s `html` use should be reviewed separately before broader alert changes.

### Verification checklist

- [ ] Tests cover success, field-level server rejection, generic server rejection, timeout/network failure, and duplicate-click prevention.
- [ ] Browser storage inspection confirms photo fields are never persisted and invalid stored drafts fail safely.
- [ ] Manual camera tests cover permission denied, no camera, empty capture, retake, and successful capture.
- [ ] Backend owner signs off on client/server validation parity and error schema.

## Phase 4 — Automated regression coverage and release gate

**How this serves the primary goal:** The validated registration flow remains dependable after future UI or API changes.

### What to implement

1. Add `registrationFormHelpers` unit tests for all contract-approved normalizers and validators, including Indonesian input edge cases confirmed in Phase 0.
2. Add React Testing Library flow tests for blocked progression, corrected field progression, summary edits, commitment gating, focus behavior, and server-error mapping. Mock `useProfile`, geographic `UGlobal` calls, `AnggotaService`, and the camera component rather than using real devices/network access.
3. Extend the existing Playwright suite only after locating its applicable authenticated registration fixture; add a production-safe browser flow for all eight steps using non-production test identities and test images.
4. Run the repository’s relevant static and production checks under the supported Node version (`>=18 <23` per `package.json:59-63`). Existing documentation reports the current environment may use Node 24 and cannot reliably run Vitest, so record any environment mismatch as BLOCKED—not passed.
5. Update `docs/checklist-kkpusid.md` only with checks actually completed and evidence links/commands.

### Documentation references

- Available commands: `package.json:34-57`.
- Existing tests: `src/utils/money.test.js`, `src/utils/fotoHelper.test.js`, and `src/App.test.jsx`.
- Existing verification/environment limitation: `docs/perbaikan-swafoto-anggota.md:39-43`.
- Existing QA acceptance intent: `docs/checklist-kkpusid.md:76-83,98-118`.

### Anti-pattern guards

- Do not mock the validator under test; test exported pure rules directly.
- Do not depend on a real camera, personal data, or production API in CI.
- Do not mark validation or privacy tasks complete solely because the production build succeeds.

### Verification checklist

- [ ] `npm run format:check` passes.
- [ ] `npm run lint` passes or pre-existing failures are separately evidenced.
- [ ] `npm run test:ci` passes under supported Node, including new validation tests.
- [ ] `npm run build` passes.
- [ ] Targeted Playwright registration flow passes when test environment/fixtures are available.
- [ ] Code review confirms no persisted photo base64 and no duplicated field validation in step components.

## Decisions required before implementation

1. What is the authoritative backend contract and error schema for `/anggota/pendaftaran`?
2. Which exact business/format rules apply to NIK, phone number, RT/RW, bank account number, account holder, and employer fields?
3. Are employment fields mandatory for all applicant types, and may an emergency phone number equal the applicant’s number?
4. What image MIME type, maximum size/dimensions, and quality policy is accepted by the backend?
5. Should applicants be able to resume a draft? If yes, which non-sensitive fields may persist and for how long?
6. Should the enhancement remain dependency-free, or is approval granted to add a schema/form validation library?

## Out of scope

- Redesigning the entire registration UI or changing its eight-step information architecture.
- Backend endpoint implementation, database migration, OCR/face matching, and KTP authenticity verification.
- Replacing the global alert system, except narrowly mapping registration submission errors.
- Any external deployment, dependency installation, branch creation, commit, or data migration.
