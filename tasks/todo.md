# UnitFlow Prototype Completion Tasks

## Phase 1 — Connected foundation

- [x] Task 1: Define connected record types and initial demo state
  - Acceptance: Viewings, contracts, payments, template metadata, maintenance allocations, and deposit ledger have explicit types and realistic sample records.
  - Verify: `cd prototype; pnpm run typecheck`
  - Files: `src/domain/types.ts`, `src/data/mockData.ts`

- [x] Task 2: Add tested connected-state operations
  - Acceptance: Viewing conversion, direct tenant creation, payment balance, and deposit-deduction rules are pure and tested.
  - Verify: `cd prototype; pnpm test`
  - Files: `src/domain/appData.ts`, `src/domain/appData.test.ts`, `src/domain/occupancy.ts`

- [x] Task 3: Migrate browser store to complete AppData
  - Acceptance: All pages read connected data; reset restores the complete demo; invalid old storage safely falls back.
  - Verify: tests, type check, and build
  - Files: `src/store/AppStore.tsx`, `src/data/mockData.ts`

## Phase 2 — Viewings

- [x] Task 4: Build Viewings directory and scheduling form
  - Acceptance: User can add and filter viewings with prospect needs and suggested units.
  - Verify: component test and browser form check
  - Files: `src/pages/ViewingsPage.tsx`, `src/components/ViewingDialog.tsx`, `styles.css`

- [x] Task 5: Convert viewing without blocking direct tenant entry
  - Acceptance: Conversion reuses prospect details and marks the viewing Converted; Add tenant remains independent.
  - Verify: domain test and browser end-to-end flow
  - Files: `src/pages/ViewingsPage.tsx`, `src/components/TenantAssignmentDialog.tsx`, store/domain files

## Phase 3 — Tenant workspace

- [x] Task 6: Add tenant detail route and summary workspace
  - Acceptance: Tenant directory opens a profile showing connected occupancy, contract, payments, deposit, and maintenance.
  - Verify: route/component test and browser navigation
  - Files: `src/App.tsx`, `src/pages/TenantDetailPage.tsx`, `src/pages/RecordsPage.tsx`, `styles.css`

## Phase 4 — Contracts and payments

- [x] Task 7: Add contract template and agreement recording
  - Acceptance: User can record template metadata, agreement terms, and signed-copy metadata without implying durable upload.
  - Verify: component test and browser flow
  - Files: contract page/dialog, store/domain files

- [x] Task 8: Add payment-proof recording
  - Acceptance: User can record bank transfer, billing period, status, reference, and screenshot filename; tenant totals update.
  - Verify: calculation test and browser flow
  - Files: payment dialog/page, store/domain files

## Phase 5 — Maintenance and deposits

- [x] Task 9: Add maintenance expense allocation
  - Acceptance: Owner, deposit, and shared allocation choices are explicit and connected to a unit and optional tenant.
  - Verify: domain and form tests
  - Files: maintenance dialog/page, store/domain files

- [x] Task 10: Add deposit ledger and safeguards
  - Acceptance: Tenant profile shows original, deductions, and remaining deposit; excess deductions are rejected.
  - Verify: domain tests and browser flow
  - Files: tenant detail, store/domain files

## Phase 6 — Usability and release

- [x] Task 11: Connect navigation, dashboard actions, guidance, and responsive states
  - Acceptance: All primary workflows are reachable with plain language and work at mobile and desktop widths.
  - Verify: browser accessibility/console/responsive checks
  - Files: layout, dashboard, shared UI, styles

- [x] Task 12: Review, verify, and deploy
  - Acceptance: No material review findings; all tests, type checking, build, and Pages verification pass; live site serves the new bundle.
  - Verify: full command suite plus GitHub Actions and live URL
  - Files: only issue-specific fixes discovered during review
