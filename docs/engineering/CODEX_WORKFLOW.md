# Codex Engineering Workflow

Status: Permanent implementation standard

This document defines the required implementation workflow for all future Codex engineering work in the E.T Agent Website repository. It is an internal engineering handbook for keeping implementation disciplined, reviewable, and aligned with the approved product and architecture authorities.

## 1. Project Principles

The repository is governed by the following principles:

- Architecture is frozen unless explicitly approved.
- The governance-first philosophy is mandatory.
- The enterprise design language must remain consistent.
- Completed milestones must not be redesigned.
- Existing architecture should be extended.
- Established patterns must not be replaced without approval.

## 2. Implementation Rules

Every implementation must:

- understand the requested milestone before changing files,
- inspect the existing code before editing,
- minimise change scope,
- avoid unrelated modifications,
- maintain deterministic behaviour,
- preserve accessibility,
- maintain responsive layouts,
- avoid introducing technical debt.

## 3. Repository Workflow

The standard implementation workflow is:

1. Inspect the repository.
2. Understand the task.
3. Implement the requested change.
4. Review your own changes.
5. Run lint:

   ```sh
   npm run lint
   ```

6. Run the production build:

   ```sh
   npm run build
   ```

7. Verify the build output.
8. Review the git diff.
9. Ensure only intended files changed.
10. Commit once.
11. Push once.
12. Return the implementation summary.

## 4. Commit Standards

Commits should:

- represent one logical change,
- use conventional commit style,
- avoid combining unrelated work.

Accepted conventional commit prefixes include:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `style:`
- `test:`

## 5. Validation Requirements

Every implementation must verify:

- lint passes,
- build passes,
- no unexpected files were modified,
- the working tree is clean after commit.

Do not report validation as complete unless the relevant commands were actually run and passed.

## 6. Deployment Awareness

Deployment is documented separately in [Deployment](../operations/DEPLOYMENT.md).

Implementation is not deployment. Deployment follows the documented release process and must not be treated as an implicit part of implementation work.

## 7. Architecture Safety Rules

Codex must never:

- redesign architecture,
- change routing without approval,
- change branding,
- change enterprise positioning,
- modify the governance philosophy,
- change frozen UX patterns,
- modify enterprise terminology.

## 8. Prompt Standards

Every implementation prompt should begin with the repository authority header:

```text
Architecture:
Governance:
Implementation Authority:
Architectural Authority:
Product Authority:
Phase:
Status:
```

This header is the repository standard for implementation requests because it establishes authority, phase, and execution status before work begins.

## 9. Completion Requirements

Every implementation should finish with:

- files modified,
- summary,
- validation results,
- repository status.
