# Development Workflow for E.T Agent Website

Status: Version 2 permanent repository engineering standard

This document defines the standard workflow for future changes in this repository. It is intended to keep work disciplined, reviewable and consistent with the approved architecture.

## 1. Authorities

The working standards are governed by the same project authorities described in the repository engineering documentation:

- Product Authority for product intent and messaging.
- Architectural Authority for structure and direction.
- Implementation Authority for execution.
- Repository Authority for repository truth and discipline.
- Documentation Authority for preserving the engineering record.

## 2. Required Preparation

Before implementation, confirm:

- the request is understood,
- the relevant repository state has been inspected,
- the likely files involved are identified,
- the change fits the repository architecture,
- any content, copy or asset decisions are approved or clearly bounded.

For anything that would change the homepage narrative, design language or architectural direction, pause and confirm the change with a human maintainer.

## 3. Standard Workflow

The mandatory workflow is:

Inspect Repository

↓

Produce Implementation Plan

↓

Wait For Approval

↓

Implement

↓

Validate

↓

Review Diff

↓

Commit (only when instructed)

↓

Push (only when instructed)

↓

Freeze Milestone

↓

Produce Handover

## 4. Change Boundaries

The repository should remain stable and predictable.

Preferred behavior:

- keep changes small and focused,
- preserve existing structure and design system usage,
- avoid unrelated cleanup,
- avoid introducing new dependencies unless explicitly requested.

Avoid:

- broad refactors,
- style-only rewrites,
- architecture changes without approval,
- unrelated content changes,
- speculative improvements.

## 5. Scope Control

Implement only the requested milestone.

Never implement future milestones.

Never bundle unrelated work.

Never perform speculative improvements.

## 6. Documentation-First Discipline

When a feature or change is introduced, update the related documentation if the behavior, workflow or architecture changes.

This repository should not rely on undocumented implementation decisions. If a change alters the product narrative, user journey, component usage or engineering standards, the relevant documentation should be updated in the same change set.

## 7. Validation Requirements

Validation is mandatory before reporting completion.

Do not claim that lint, build or tests passed unless they were actually executed successfully.

Failures must always be reported.

For code changes:

- run the relevant build and lint checks,
- review the diff for unintended changes,
- confirm the result matches the requested scope.

For documentation-only changes:

- confirm the requested files were created or updated,
- verify that no application source files were modified.

## 8. Git Discipline

- Never commit automatically.
- Never push automatically.
- One milestone should normally correspond to one logical commit.
- The repository should remain clean after completion.

## 9. Review and Approval Expectations

- Do not commit changes without explicit approval from the user.
- Keep changes reviewable by limiting them to the stated task.
- Highlight any assumptions that affect product direction, content, or architecture.

## 10. Frozen Milestones

Completed milestones should not be revisited unless explicitly authorised.

Once a milestone is frozen, the work should move forward to the next approved task rather than revisiting earlier work.

## 11. Handover Standard

Every completed milestone should report:

- Summary.
- Files Modified.
- Validation Results.
- Repository Status.
- Outstanding Issues.
- Recommended Next Step.

## 12. Definition of Done

A change is considered complete only when:

- the requested work is complete,
- validation is complete,
- repository status is verified,
- documentation is updated if required,
- the repository is left in a clean state.

## 13. Working Style

The repository should be treated as a governed product surface, not as a generic sandbox.

Every change should preserve:

- the enterprise tone,
- the controlled workflow narrative,
- the calm and precise design language,
- the repository's documentation-first engineering culture.
