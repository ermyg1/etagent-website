# Codex Instructions for E.T Agent Website

Status: Version 2 permanent repository engineering standard

This document defines the default operating rules for automated implementation work in this repository. It is binding for future changes unless a human maintainer explicitly overrides it.

## 1. Primary Mission

The repository is the official E.T Agent Website. Its purpose is to present E.T Agent as governance-first enterprise AI with human-approved execution.

Implementation work must preserve that positioning, the existing enterprise design system and the approved website architecture.

## 2. Authorities

The following authorities govern the repository:

- Product Authority: approves product positioning, messaging, copy direction and milestone intent.
- Architectural Authority: approves the structure, section order, information architecture and design direction.
- Implementation Authority: executes the approved milestone within the current repository state.
- Repository Authority: maintains the Git repository as the authoritative source of truth for implementation status.
- Documentation Authority: maintains the engineering documentation so it reflects the actual working standards of the project.

## 3. Repository Authority

The Git repository is the authoritative source of truth.

Once work has been committed, previous conversations are no longer authoritative. Existing repository documentation overrides assumptions. Implementation must be grounded in the repository state that exists at the time of execution.

## 4. Repository Inspection Before Implementation

Before implementation, always require:

- repository inspection,
- architecture review,
- affected file identification,
- documentation review.

Never assume. If the repository state, architecture or implementation scope is unclear, stop and verify before proceeding.

## 5. Non-Negotiable Rules

- Do not modify application code unless the request explicitly requires it.
- Do not refactor existing code for style, cleanup or simplification unless the work request specifically asks for it.
- Do not change architecture, section order, information hierarchy or product narrative without explicit approval.
- Do not introduce a new design language, new tokens, new layout system or new visual pattern.
- Preserve the existing theme, components, layout primitives, accessibility behavior and motion standards.
- Reuse existing primitives before introducing new abstractions.
- Keep changes scoped to the request. Avoid unrelated edits.
- Do not commit changes without explicit user approval.

## 6. Standard Workflow

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

## 7. Scope Control

Implement only the requested milestone.

Never implement future milestones.

Never bundle unrelated work.

Never perform speculative improvements.

## 8. Source of Truth

Use the following documents as the authoritative reference set:

- docs/design/DESIGN_SYSTEM.md
- docs/website/LANDING_PAGE_INFORMATION_ARCHITECTURE.md
- docs/website/LANDING_PAGE_USER_JOURNEY.md
- docs/ARCHITECTURE_RULES.md
- docs/DEVELOPMENT_WORKFLOW.md

When a requirement conflicts with these documents, follow the documents above and surface the conflict rather than improvising.

## 9. Implementation Expectations

When making changes:

1. Read the relevant architecture and design references first.
2. Keep the implementation aligned with the existing homepage and website intent.
3. Prefer existing components, tokens and layout primitives over new ones.
4. Preserve semantic structure, accessibility and responsive behavior.
5. Keep copy enterprise-appropriate and avoid unverified claims.
6. If a requested change would alter the architecture, stop and ask for clarification.

## 10. Design and Content Guardrails

- Use the existing enterprise visual language: calm, precise, infrastructure-grade and credible.
- Avoid startup-style hype, decorative illustration, excessive gradients and playful motion.
- Use text, structure and controlled workflow visuals to communicate the product story.
- Keep the workflow as the main signature visual concept for the homepage experience.
- Do not add compliance claims, logos or certifications unless they are explicitly approved and verified.

## 11. Accessibility and Responsiveness

- Preserve keyboard accessibility and semantic HTML structure.
- Respect reduced-motion preferences.
- Ensure content remains understandable in mobile and desktop layouts.
- Avoid relying on color alone to communicate meaning.

## 12. Validation Rules

Do not claim that lint, build or tests passed unless they were actually executed successfully.

Failures must always be reported clearly.

For implementation work, verify the result before reporting completion. At minimum:

- run the relevant build and lint commands when code changes are involved,
- review the diff to confirm that changes are limited to the requested scope,
- confirm that no unrelated application code was changed.

For documentation-only changes, verify that the new files were created and that no application source files were modified.

## 13. Git Discipline

- Never commit automatically.
- Never push automatically.
- One milestone should normally correspond to one logical commit.
- The repository should remain clean after completion.

## 14. Frozen Milestones

Completed milestones should not be revisited unless explicitly authorised.

Once a milestone is frozen, the implementation focus moves to the next approved task rather than revisiting earlier work.

## 15. Handover Standard

Every completed milestone should report:

- Summary.
- Files Modified.
- Validation Results.
- Repository Status.
- Outstanding Issues.
- Recommended Next Step.

## 16. Definition of Done

A milestone is complete only when:

- the requested work is complete,
- validation is complete,
- repository status is verified,
- documentation is updated if required,
- the repository is left in a clean state.

## 17. Communication Standard

When work is complete, report:

- what changed,
- what was intentionally left unchanged,
- what verification was performed,
- any open questions or follow-up recommendations.

Do not claim success without evidence from the relevant verification step.
