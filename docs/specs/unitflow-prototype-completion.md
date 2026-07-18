# Spec: UnitFlow Prototype Completion

## Objective

Complete the frontend prototype as a single-role internal tool for the client's condominium management team. It should replace tenant tracking spread across Messenger conversations and digital files with connected viewing, tenant, room, contract, payment, deposit, and maintenance records.

The prototype succeeds when a non-technical user can begin from either a scheduled viewing or a direct tenant entry, assign a room, record the agreement and initial payment, and later understand the tenant's complete account and unit history without searching Messenger.

## Confirmed assumptions

- One internal management role only; no role or permission screens.
- Messenger remains the inquiry and communication channel.
- Structured tracking begins when a viewing is scheduled, but direct tenant creation remains available.
- Contracts are completed by hand using a printable client template.
- The system stores contract-template and signed-copy metadata in the prototype; actual durable file storage requires a backend.
- Bank transfers are recorded manually with screenshot-proof metadata; the system does not process payments.
- Maintenance expenses are allocated by the client as owner expense, tenant-deposit deduction, or shared expense.
- This phase remains React, TypeScript, browser storage, and realistic demo data only.

## Core workflows and acceptance criteria

### Viewings

- Create a viewing with prospect contact, date/time, budget, intended stay, notes, and suggested units.
- Track Scheduled, Completed, Converted, Cancelled, and Declined statuses.
- Convert a successful viewing into a tenant without retyping their basic information.
- Continue to support direct tenant creation independent of a viewing.

### Tenant profile

- Open a tenant detail view from the tenant directory.
- Show contact, occupancy, move-in, contract, deposit, payment, and maintenance information together.
- Provide contextual actions for assignment, contract, payment, and maintenance.

### Contracts

- Maintain one active printable template record with filename and update date.
- Record flexible agreement dates, monthly rent, deposit, initial payment, status, and signed-copy filename per tenant.
- Support Draft, Active, Expiring, and Ended states without forcing 6- or 12-month terms.

### Payments

- Record a bank transfer against a tenant and billing period.
- Capture amount, transfer date, reference, status, and screenshot filename.
- Support Paid, Partial, Pending, and Overdue statuses.
- Show payments in both the Payments page and tenant profile.

### Deposits and maintenance

- Show original deposit, deductions, and remaining refundable balance per tenant.
- Record maintenance against a unit with category, description, date, amount, evidence filename, status, and payer allocation.
- For tenant-deposit or shared allocation, select the affected tenant and deduction amount.
- Never deduct a maintenance expense automatically without an explicit payer choice.

### Connected navigation

- Add Viewings to primary navigation.
- Link tenant, unit, contract, payment, and maintenance records through clear contextual actions.
- Use plain labels, helper copy, visible status text, confirmations, and useful empty states.

## Tech stack

- React 19 and React Router
- TypeScript
- Vite
- Vitest and Testing Library
- Browser localStorage for demo persistence
- GitHub Actions and GitHub Pages

## Commands

- Development: `cd prototype; pnpm dev`
- Tests: `cd prototype; pnpm test`
- Type check: `cd prototype; pnpm run typecheck`
- Production build: `cd prototype; pnpm build`
- Pages verification: `cd prototype; pnpm run verify:pages`

## Project structure

- `prototype/src/domain/` — record contracts and pure state transitions
- `prototype/src/store/` — connected browser-persisted demo state
- `prototype/src/pages/` — workflow pages and record details
- `prototype/src/components/` — reusable dialogs, cards, status, and form UI
- `prototype/src/data/` — realistic initial demonstration data
- `prototype/src/test/` — shared test setup
- `docs/specs/` — confirmed product behavior
- `tasks/` — implementation plan and progress checklist

## Code style

Use explicit domain types and pure operations for cross-record behavior:

```ts
export function convertViewingToTenant(
  state: AppData,
  viewingId: string,
  assignment: RoomAssignment,
): AppData {
  // Return a new connected state; never mutate the current state.
}
```

Components should use semantic HTML, visible labels, keyboard-accessible controls, and project design tokens. Domain logic must not be embedded inside table rendering.

## Testing strategy

- Unit tests for viewing conversion, balances, deposit deductions, and cross-record updates.
- Component tests for critical forms and validation where behavior is not covered by pure functions.
- Real-browser verification of viewing conversion, direct tenant creation, payment recording, and maintenance allocation.
- Every checkpoint must pass tests, type checking, production build, and Pages asset verification.

## Boundaries

- **Always:** preserve direct tenant entry; update connected records atomically; show that files are prototype metadata; prevent deductions above available deposit; keep the interface usable on mobile.
- **Ask first:** add dependencies; add a backend; change deployment; introduce authentication; infer accounting or legal rules not confirmed by the client.
- **Never:** claim uploaded files are durably stored; process real payments; generate legal contracts; expose multiple roles; commit secrets or real tenant information.

## Out of scope

- Messenger integration and inquiry inbox
- Automatic contract generation or editing
- Durable file uploads, database, Python API, and authentication
- Online payment collection and bank reconciliation
- Tenant-facing portal and notifications
- Formal accounting, tax, and legal compliance workflows

## Open questions for the client session

- Exact fields and terminology used in their current tenant files
- Deposit and advance-rent rules
- Rent due dates, grace periods, and partial-payment policy
- Maintenance approval and shared-expense calculation rules
- Required contract reminders and retention period
- Actual contract template and acceptable signed-copy formats

