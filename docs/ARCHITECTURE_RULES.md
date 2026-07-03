# Architecture Rules for E.T Agent Website

Status: Version 2 permanent repository engineering standard

This document captures the architectural standards that must govern future work in this repository. It preserves the approved homepage and website direction without allowing implementation drift.

## 1. Architectural Intent

The product must remain positioned as governance-first enterprise AI.

The website must communicate a disciplined, controlled and accountable model of execution. Intelligence may recommend action, but authority remains governed by policy, approval and auditability.

The visual and editorial language must feel like enterprise software infrastructure rather than a consumer AI product.

## 2. Repository Scope

The repository is the official website for E.T Agent. The homepage is the first public module of that website, but the broader website is expected to grow over time.

Future work must:

- preserve the homepage as the primary public narrative module,
- reuse the existing design system rather than redefining it,
- extend the site modularly without undermining the current architecture.

## 3. Authority and Repository Governance

The repository is the authoritative source of truth for implementation status. Once work has been committed, previous conversations are no longer authoritative. Existing repository documentation overrides assumptions.

The project authorities are:

- Product Authority for positioning and messaging.
- Architectural Authority for structure and direction.
- Implementation Authority for execution against the approved milestone.
- Repository Authority for repository state and repository discipline.
- Documentation Authority for preserving the engineering record.

## 4. Scope Control and Milestone Discipline

Implement only the requested milestone.

Never implement future milestones.

Never bundle unrelated work.

Never perform speculative improvements.

Completed milestones should be frozen. They should not be revisited unless explicitly authorised.

## 5. Design System Rules

The enterprise design system is frozen for this repository. Future work must reuse the existing foundation rather than redesigning it.

Required constraints:

- Reuse existing theme tokens and CSS custom properties.
- Reuse existing layout primitives such as PageLayout, Section, Stack and LayoutContainer where appropriate.
- Reuse existing interface primitives such as Button, Badge, Card, Icon, Logo and Navigation.
- Preserve the current dark-theme architecture and the established visual tone.
- Avoid introducing new component patterns that duplicate existing primitives.

Do not redesign navigation, typography, buttons, cards, layout primitives or accessibility foundations unless a human maintainer explicitly approves a new system.

## 6. Homepage Architecture Rules

The homepage content structure is fixed by the approved information architecture. The section order and message hierarchy remain the source of truth.

The current homepage sequence is:

1. Hero
2. Enterprise Trust Banner
3. The Problem
4. Why Governance Matters
5. Introducing E.T Agent
6. How E.T Agent Works
7. Comparison: Traditional AI vs E.T Agent
8. Core Capabilities
9. Architecture Principles
10. Industry Use Cases
11. Development Roadmap
12. Final CTA

Implementation work must preserve that order unless architecture authority explicitly changes it.

## 7. Content and Messaging Rules

The messaging must remain disciplined and evidence-led.

Required positioning:

- governance-first enterprise AI,
- human-approved execution,
- policy-controlled action,
- fail-closed behavior,
- immutable auditability,
- explainability and accountability.

Copy must avoid hype, exaggerated automation claims and unsupported compliance language.

## 8. Interaction and Motion Rules

Motion should support comprehension rather than attract attention.

Rules:

- Prefer subtle fade and translate motion.
- Keep motion within existing timing tokens.
- Respect prefers-reduced-motion.
- Avoid theatrical animation, bouncing, parallax or continuous ambient effects.

## 9. Accessibility Rules

Accessibility is part of the architecture, not an afterthought.

All implementation work must preserve:

- semantic HTML structure,
- clear heading hierarchy,
- keyboard access for interactive elements,
- readable text contrast,
- content that remains understandable without visual decoration,
- reduced-motion support.

## 10. Extensibility Rules

The architecture should support future website expansion without breaking the current homepage foundation.

Future additions should:

- be modular,
- reuse the existing design system,
- preserve the calm infrastructure-grade experience,
- avoid rewriting the existing homepage narrative.

New sections or pages should extend the website in a governance-aligned way rather than replacing the current architecture.

## 11. Explicit Non-Goals

The following are not part of the current implementation mandate unless a maintainer requests them explicitly:

- redesigning the visual system,
- introducing new brand language,
- changing the homepage narrative structure,
- adding unverified product claims,
- adding new runtime architecture patterns,
- broad refactoring of existing application code.

## 12. Decision Standard

When a proposed change would alter the structure, tone, interaction model or design language of the site, treat it as an architectural decision and require explicit review before implementation.
