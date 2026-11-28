# Registration Validation Handler Repair Plan

## Primary goal

Calon anggota dapat mulai dan melanjutkan pengisian setiap field tanpa fokus berpindah sendiri atau pesan error muncul prematur, sementara validasi tetap memblokir langkah dan submit yang tidak valid.

## Review scope

Reviewed current branch `rollback/2026-11-02` after fast-forwarding from `bf929c2` to `3b5c76b`. This plan changes validation-state behavior only; it must not redesign the eight-step registration UI or modify the registration API contract.

## Evidence-backed findings

| Severity | Location                                                                                                                                                                                                                | Finding                                                                                                                                       | User impact                                                                                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Critical | `pages/RegistrationFormDetail.jsx:89-96`                                                                                                                                                                                | The focus effect executes whenever `errors` changes and focuses the first key returned by `Object.keys(errors)`.                              | After a blocked Next/Submit, typing in one invalid field removes its error, makes another field first, and steals focus to it. This matches the reported inability to fill values normally. |
| Critical | `pages/RegistrationFormDetail.jsx:124-129`                                                                                                                                                                              | `handleFieldBlur` writes `{ [name]: fieldError }` even when `fieldError` is `undefined`.                                                      | `Object.keys(errors)` still treats a valid field as an error entry, which can trigger the auto-focus effect and produce false “error present” state.                                        |
| High     | `pages/RegistrationFormDetail.jsx:102-122`                                                                                                                                                                              | `handleChange` and `handleFieldChange` remove error keys, but have no touched/attempt state.                                                  | Validation timing is inferred from an overloaded `errors` object; components cannot distinguish an untouched field, a field blurred once, and a form blocked by Next/Submit.                |
| High     | `steps/Step1PersonalData.jsx:173-176,220-223,279,313,348,385,468`; `steps/Step2Account.jsx:116`; `steps/Step5Employment.jsx:42,71,103`; `steps/Step6EmergencyContact.jsx:42,70,100`; `steps/Step7BankData.jsx:41,67,96` | Blur validation is implemented inconsistently across fields, while select controls can blur as a consequence of menu interaction.             | A premature error can appear when users interact with controls before they meaningfully complete input.                                                                                     |
| Medium   | `components/RegistrationStepContent.jsx:63-73`                                                                                                                                                                          | Runtime now requires `handleFieldChange` and `handleFieldBlur`, but its PropTypes do not declare them; unused `setFormData` remains required. | Missing prop contract checks can hide handler wiring regressions.                                                                                                                           |
| Medium   | `components/registrationFormHelpers.test.js:32-80`                                                                                                                                                                      | Tests cover pure validation formats but not handler state transitions, focus sequencing, or error removal.                                    | The reported regression was not test-protected.                                                                                                                                             |
| Low      | `steps/Step1PersonalData.jsx:7-21`                                                                                                                                                                                      | `useFocusManagement` only toggles visual state and duplicates native focus lifecycle.                                                         | Extra state and callbacks obscure validation flow without owning validation behavior.                                                                                                       |

## Desired validation behavior

1. A pristine field shows no validation error merely because the user clicks or begins typing.
2. A field first becomes eligible to show a client validation error after the user blurs it, or after the current step/form submission attempt fails.
3. While an error is visible, editing the corresponding field clears that error immediately; it must not move focus anywhere.
4. A blocked **Next** action validates only its current step, displays that step’s errors, and focuses its first invalid field once.
5. A blocked **Submit** action validates all required steps, opens the earliest invalid step, displays that step’s errors, and focuses its first invalid field once after the step renders.
6. Select, camera, and text inputs use the same state contract. The visual form structure remains unchanged.

## Phase 0 — Define and lock the validation state contract

**How this serves the primary goal:** A dedicated state model prevents normal typing and deliberate validation attempts from being confused with one another.

### What to implement

1. Define three distinct concepts in `RegistrationFormDetail.jsx`:
   - `errors`: only fields with a current non-empty validation message; no keys with `undefined` values.
   - `touched`: fields whose first meaningful blur or custom-control completion occurred.
   - a one-shot focus request such as `focusRequest` containing `{ fieldName, requestId }`, set only by blocked Next/Submit validation.
2. Add a small pure helper in `registrationFormHelpers.js` to retrieve one field’s validation error from its step rule without exposing a second, divergent rule set.
3. Specify the event rules in code comments and tests: change clears that field error; blur marks touched then validates that one field; custom-control selection marks and validates the selected control only when a deliberate selection has completed.

### References

- Current field map and step validator: `components/registrationFormHelpers.js:14-141`.
- Existing state/handler ownership: `pages/RegistrationFormDetail.jsx:31-44,102-146`.
- React controlled-state pattern used by this module: `pages/RegistrationFormDetail.jsx:102-122`.

### Anti-pattern guards

- Do not store “valid” as `undefined` in `errors`; delete the key instead.
- Do not use `Object.keys(errors)` as a proxy for whether a validation action occurred.
- Do not duplicate each field’s validation condition inside components.

### Verification checklist

- [ ] Unit tests prove valid field blur produces no error key.
- [ ] Unit tests prove invalid field blur creates one error key.
- [ ] Unit tests prove editing a field clears only its own error.

## Phase 1 — Make focus explicit and one-shot

**How this serves the primary goal:** Users retain keyboard and pointer control while filling fields, but receive focused correction guidance when an explicit validation action is blocked.

### What to implement

1. Replace the `useEffect` at `RegistrationFormDetail.jsx:89-96` with an effect driven solely by the one-shot focus request, not by the complete `errors` object.
2. In `nextStep`, derive the first invalid field from `validateStep(step, formData)`, set current-step errors, then issue one focus request only when errors exist.
3. In `handleSubmit`, use the existing `validateRegistration` result, set the earliest invalid step, then issue one focus request for the first invalid field after that step has rendered.
4. Clear/consume the focus request after it is handled, so any later typing, error clearing, profile hydration, or draft persistence cannot refocus a control.
5. Ensure focus targets exist for every field in `FIELD_STEP_MAP`; retain the existing step-container targets for camera fields.

### References

- Problematic global-focus effect: `pages/RegistrationFormDetail.jsx:89-96`.
- Step gate: `pages/RegistrationFormDetail.jsx:138-146`.
- Final gate: `pages/RegistrationFormDetail.jsx:153-195`.
- Current element IDs for fields/camera containers: `steps/Step1PersonalData.jsx:179,224,273,306,341,373,469`; `Step3CaptureKTP.jsx:22`; `Step4Swafoto.jsx:21`.

### Anti-pattern guards

- Do not call `.focus()` after every `errors` mutation.
- Do not focus controls during `onChange`, `onFocus`, profile synchronization, or draft rehydration.
- Do not move focus to a disabled geographic select.

### Verification checklist

- [ ] With two invalid fields, typing in the first retains focus in that field.
- [ ] Next focuses the first invalid field of only the current step.
- [ ] Submit from summary navigates once to the earliest invalid step and focuses only its first invalid field.

## Phase 2 — Normalize field interaction timing across all steps

**How this serves the primary goal:** Every type of input gives predictable feedback at the same appropriate time instead of exhibiting step-specific surprises.

### What to implement

1. Route native text/tel/textarea fields in Steps 1, 2, 5, 6, and 7 through the same `onChange` plus touched-aware `onBlur` behavior.
2. Update `react-select` fields in Steps 1 and 2 so option selection marks/validates the selected field after state update, while menu-open/menu-close blur alone does not prematurely display a required-field error.
3. Treat camera capture as a deliberate completion event: it updates the photo, marks it touched, validates the image field, and clears only its own error. Retake clears the image and does not auto-focus unrelated fields.
4. Keep `email` disabled and do not validate it on blur; it remains validated at step/submit gates, with safe handling if profile hydration has not supplied it.
5. Remove or simplify the local `useFocusManagement` wrapper in Step 1 if it remains unnecessary after the central one-shot focus implementation, without altering focus styles.
6. Add missing `aria-describedby` IDs and `role="alert"` consistently for errors touched by the change; do not change visual layout.

### References

- Step 1 custom handlers and blur paths: `steps/Step1PersonalData.jsx:73-112,160-245,272-405,462-484`.
- Step 2 select/native paths: `steps/Step2Account.jsx:69-132`.
- Later-step native blur paths: `steps/Step5Employment.jsx:37-111`, `Step6EmergencyContact.jsx:37-108`, `Step7BankData.jsx:36-105`.
- Camera callback consumers: `Step3CaptureKTP.jsx:40-56`, `Step4Swafoto.jsx:39-54`.

### Anti-pattern guards

- Do not reintroduce direct `setFormData` state mutation in step components.
- Do not validate dependent city/district/village fields before their parent option is selected and the child is enabled.
- Do not alter existing field names, API payload shape, labels, or layout classes.

### Verification checklist

- [ ] Each field type is checked for first focus, typing, blur, invalid correction, and valid correction.
- [ ] Geographic selection and clearing reset dependent values/errors without validating disabled children.
- [ ] Photo capture/retake only affects its photo error.

## Phase 3 — Regression tests and prop-contract cleanup

**How this serves the primary goal:** The exact focus-stealing regression and related state mistakes cannot silently return in a future change.

### What to implement

1. Extend `registrationFormHelpers.test.js` with tests for field-error extraction and no-undefined-error-key behavior.
2. Add a React Testing Library test for `RegistrationFormDetail` or a narrowly extracted hook/controller that covers:
   - first focus and typing shows no error;
   - blur invalid field shows only that error;
   - correcting an error retains focus in the active field;
   - two invalid fields plus correction of one does not focus the second;
   - Next/Submit emits exactly one focus request to the expected field.
3. Mock profile, router, service, region API, and webcam dependencies; do not use real network/camera data.
4. Update `RegistrationStepContent` PropTypes to declare `handleFieldChange` and `handleFieldBlur`, and remove obsolete `setFormData` PropTypes/prop passing if no longer used.
5. Run format, lint, unit tests, and build using the repository’s synchronized lockfile and a supported Node version.

### References

- Existing pure validation coverage: `components/registrationFormHelpers.test.js:1-80`.
- Current prop contract mismatch: `components/RegistrationStepContent.jsx:12-32,63-73`.
- Repository commands and supported engine: `package.json:34-63`.

### Anti-pattern guards

- Do not test only pure validators; the defect lives in state/focus orchestration.
- Do not use timers without deterministic test cleanup.
- Do not treat unavailable Node/dependencies as a passing verification result.

### Verification checklist

- [ ] New regression tests fail before the handler repair and pass after it.
- [ ] `npm ci`, `npm run test:ci`, `npm run lint`, and `npm run build` are executed under Node 18–22.
- [ ] Manual keyboard test confirms no focus theft on each registration step.

## Out of scope

- UI redesign, field copy changes, or step reordering.
- New form/validation dependencies.
- Backend validation or database/API changes.
- Applying or deleting the existing `stash@{0}` package-lock backup.
