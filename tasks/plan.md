# Implementation Plan: Complete UnitFlow Frontend Prototype

## Overview

Extend the current React prototype through small connected workflow slices. First replace fragmented mock arrays with one versioned browser-store contract. Then add viewings and tenant profiles, followed by contracts/payments and deposit-aware maintenance. Finish with navigation, accessibility, responsive behavior, and deployment verification.

## Architecture decisions

- Use one `AppData` state containing all related records so updates cannot leave pages inconsistent.
- Keep cross-record transitions as pure tested domain functions.
- Store file names, types, sizes, and demonstration timestamps only; do not serialize file contents.
- Use route-based tenant details so users can move naturally from directories to complete records.
- Keep direct tenant creation and viewing conversion as equal entry points.

## Dependency order

`Domain types → connected store → viewings → tenant details → contracts/payments → maintenance/deposits → dashboard/navigation polish`

## Phases

### Phase 1: Connected data foundation

- Define the complete frontend record model and realistic initial data.
- Migrate the store to one versioned `AppData` shape with safe reset behavior.
- Add pure calculations for account balance and deposit balance.

### Checkpoint: Foundation

- Domain tests, existing tests, type checking, and build pass.

### Phase 2: Viewing-to-tenant workflow

- Add the Viewings navigation and page with cards, filtering, and scheduling form.
- Add conversion to the existing tenant-assignment dialog.
- Prove direct tenant entry still works independently.

### Phase 3: Tenant workspace

- Add tenant detail routes and a summary workspace.
- Connect occupancy, contract, payment, deposit, and maintenance sections.
- Add contextual actions using shared forms.

### Checkpoint: Core workflow

- Real browser: schedule viewing, convert it, open tenant, and confirm unit occupancy.

### Phase 4: Contract and payment records

- Add contract-template metadata and agreement form.
- Add signed-copy metadata and contract statuses.
- Add bank-transfer recording with billing period and screenshot-proof metadata.

### Phase 5: Deposit-aware maintenance

- Expand maintenance records with expense allocation and evidence.
- Deduct only explicit tenant/shared allocations and enforce available balance.
- Surface ledger history on tenant and maintenance pages.

### Checkpoint: Financial workflow

- Test payment and deposit calculations; verify forms and connected views in a browser.

### Phase 6: Usability and delivery

- Revise dashboard shortcuts, global wording, empty states, and responsive layouts.
- Run a code-quality review and resolve material findings.
- Run the full verification suite, commit in atomic increments, push, and confirm GitHub Pages.

## Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Prototype mistaken for durable storage | High | Persistent notices and metadata-only file handling |
| Complex forms overwhelm non-technical users | High | Guided sections, contextual defaults, plain labels |
| Cross-page records drift | High | Single store and pure atomic transitions |
| Unknown client accounting rules | Medium | Flexible categories and visible prototype assumptions |
| Existing local demo data has an older shape | Medium | New storage version with safe fallback/reset |

## Open questions

The confirmed prototype can proceed with flexible fields. Client-specific rules remain explicitly deferred to the client discovery session listed in the specification.

