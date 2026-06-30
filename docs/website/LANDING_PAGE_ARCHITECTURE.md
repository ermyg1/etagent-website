# E.T Agent Website Architecture - Homepage Module

Status: W3A architecture specification; W3A.6 website scope revision  
Authority: W3A Homepage architecture frozen by JD; product direction frozen by E.T.; implementation authority delegated to Codex for W3B Homepage Implementation  
Scope: Official E.T Agent Website architecture direction, with the Homepage defined as the first public website module. No Homepage implementation decisions remain open except copy finalization, icon selection and asset availability.

## 1. Architectural Intent

The E.T Agent Website must establish the product as governance-first enterprise AI: an AI platform where intelligence can recommend action, but authority remains controlled by policy and human approval.

The Homepage is the first module of that website. Its job remains unchanged from W3A: establish the product category, communicate the governance model and create an architecture-led path to engagement.

The page should feel like enterprise software infrastructure. It should be calm, precise and credible, closer to GitHub Enterprise, Stripe, Linear, Azure and Vercel than to a typical AI startup page.

The existing Enterprise Design System is frozen and must be reused. Do not redesign tokens, navigation, typography, buttons, cards, forms, layout primitives or accessibility foundations.

## 2. Website Scope Evolution

### Original objective

The original planning centred around a Landing Page. That scope was historically correct for W1, W2, W2.1, W2.2 and W3A because the immediate task was to define the first public-facing page, its design foundation and its governance-first narrative.

### Why scope expanded

As the project matured, the repository became the official E.T Agent Website rather than a single-page artifact. The frozen Homepage architecture remains correct, but it now sits inside a wider website programme with future public, customer and product-support surfaces.

### Current objective

The current objective is to build the official E.T Agent Website in controlled phases. The Homepage remains the first implementation target and the primary public narrative module. W3B should therefore be treated as Homepage Implementation, not as a complete website build-out.

### Relationship between Homepage and Website

The Homepage is one module within the wider E.T Agent Website. It defines the first visitor journey, the governance-first positioning and the signature controlled execution workflow. Future website modules should extend this architecture without changing the frozen Homepage section order, messaging ladder, governance philosophy or workflow model.

### Long-term website vision

The official website is expected to grow beyond the Homepage over time. Future areas may include:

- Platform.
- Governance.
- Architecture.
- Documentation.
- Resources.
- Security.
- Enterprise.
- Login.
- Waitlist.
- Customer Portal.
- Blog / Updates.

These are future capabilities and do not imply current implementation, routing or content approval.

### Future expansion philosophy

Future website expansion should be modular, evidence-led and governance-aligned. New sections or pages should reuse the Enterprise Design System, preserve the calm infrastructure-grade visual language and avoid unverified product, compliance or customer claims. Website growth should not rewrite W1 through W3A history; it should build on those milestones.

## 3. Existing System Dependencies

Use these existing foundations:

- `PageLayout` for page shell and navigation placement.
- `Section` for page-level spacing, max width and responsive padding.
- `Stack` for vertical rhythm.
- `LayoutContainer` only for simple contained regions where `Section` is not sufficient.
- `Logo`, `Navigation`, `Button`, `Badge`, `Card`, `Icon` and form primitives as already defined.
- Existing typography utility classes: `type-display`, `type-heading-*`, `type-body-large`, `type-body`, `type-caption`.
- Existing theme tokens, dark theme, border system, restrained radius, subtle shadows and motion tokens.

Implementation must not introduce a new design language. New page-specific layout classes are acceptable in W3B, but only to arrange Homepage content using the existing system.

## 4. Page-Level Principles

### Visual Language

- Enterprise, infrastructure-grade, precise.
- Dense enough to feel useful, spacious enough to feel premium.
- Use borders, panels, grids and structured diagrams rather than decorative illustration.
- Use restrained dark surfaces and blue accents from the existing theme.
- Avoid sci-fi motifs, neon, robots, abstract AI brains, excessive gradients and hype copy.

### Messaging

Primary message:

> Governance-first enterprise AI with human-approved execution.

Supporting concepts:

- Policy before power.
- Intelligence separated from authority.
- Fail-closed execution.
- Human approval before operational change.
- Deterministic workflows.
- Immutable auditability.
- Explainability and accountability.

### Motion

Motion is supportive, never theatrical:

- Fade-in and small translate only.
- Use existing motion timings: 150ms to 250ms.
- Workflow animation may highlight steps sequentially, but must pause or disable under `prefers-reduced-motion`.
- No bouncing, spinning, parallax, particle effects or ambient animated backgrounds.

## 5. Signature Visual System

The Homepage signature element is the controlled execution workflow:

```text
Request
  ↓
Intelligence
  ↓
Policy Engine
  ↓
Impact Summary
  ↓
Human Approval
  ↓
Execution
  ↓
Immutable Audit Log
```

This workflow must appear first in simplified form in the Hero, then in full detail in "How E.T Agent Works". It should become the visual anchor of the brand: structured, auditable and controlled.

Recommended representation:

- Desktop: horizontal or stepped process rail with seven labeled nodes, status metadata and controlled transitions.
- Mobile: vertical ordered timeline with clear numbered steps.
- Accessibility: semantic ordered list in source order; decorative connectors hidden from assistive technology.

## 6. Complete Homepage Section Architecture

### 1. Hero

Purpose:

- Establish the enterprise problem and E.T Agent's positioning within the first viewport.

User objective:

- Understand what E.T Agent is and why governance matters before trusting AI execution.

Business objective:

- Position E.T Agent as a serious enterprise platform, not a consumer AI tool.

Content hierarchy:

1. Badge: `Governance-first enterprise AI`.
2. H1: `Enterprise AI, controlled by policy and approved by humans.`
3. Supporting paragraph: AI can reason at speed, but enterprise action requires governance, accountability and auditable approval.
4. Primary CTA: `Request architecture review`.
5. Secondary CTA: `View governance model`.
6. Compact workflow preview showing Request to Audit Log.

Recommended components:

- `Section` with `spacing="spacious"` and `width="wide"`.
- `Stack` for text rhythm.
- `Badge` for positioning.
- `Button` primary and outline/secondary.
- Existing typography utilities.
- Page-specific workflow preview composed from semantic list and existing visual tokens.

Mobile behaviour:

- Single column.
- Headline first, CTAs second, workflow preview third.
- Workflow becomes vertical or compact scroll-free stacked list.
- Avoid placing key proof below an oversized hero; next section should be hinted within common mobile viewport heights.

Desktop behaviour:

- Two-column composition: narrative on the left, workflow preview on the right.
- Hero height should be substantial but not full-screen; trust banner or problem section should be visible below the fold on wide desktop.

Accessibility considerations:

- H1 must be unique.
- Workflow preview should use an ordered list or labelled group.
- CTA labels must describe destination or action.
- No autoplay animation required to understand the content.

Suggested animations:

- Subtle load-in fade/translate for hero text and workflow nodes.
- Optional sequential highlight across workflow nodes.

Future extensibility:

- Hero can later include a customer proof point, analyst quote or security certification row without changing the core layout.

### 2. Enterprise Trust Banner

Purpose:

- Reinforce credibility immediately after the hero.

User objective:

- See that E.T Agent is built for enterprise concerns: governance, audit, policy and human approval.

Business objective:

- Reduce skepticism and establish category fit for executives, architects and compliance teams.

Content hierarchy:

1. Short heading or caption: `Built for controlled enterprise adoption`.
2. Five trust pillars: `Governance First`, `Policy Controlled`, `Human Approved`, `Fail Closed`, `Audit Ready`.
3. Optional one-line note: `Designed for environments where AI recommendations must be explainable before execution.`

Recommended components:

- `Section` compact.
- Five-pillar stat row using existing card or bordered surface treatment.
- `Icon` with Lucide symbols such as shield, key, check, file log.

Mobile behaviour:

- Two-column grid if space permits, otherwise single column.
- If using a two-column mobile grid, the fifth pillar may span the full width to avoid awkward imbalance.

Desktop behaviour:

- Five equal columns in a restrained band.

Accessibility considerations:

- Icons are decorative unless they add unique meaning.
- Pillars must be text-readable without icon reliance.

Suggested animations:

- None required; optional hover state only if using card variant.

Future extensibility:

- Replace pillars with approved enterprise proof points once available.

### 3. The Problem

Purpose:

- Name the enterprise risk created by modern AI adoption.

User objective:

- Recognize the operational governance gap: AI may produce useful recommendations, but uncontrolled execution creates risk.

Business objective:

- Create urgency without fear-based marketing.

Content hierarchy:

1. Caption: `The governance gap`.
2. H2: `AI can recommend action faster than organizations can govern it.`
3. Short explanatory paragraph.
4. Three problem cards:
   - `Authority ambiguity`: Who approved this action?
   - `Execution risk`: What changed, and why?
   - `Audit weakness`: Can the organization reconstruct the decision path?

Recommended components:

- `Section`.
- `Stack`.
- `Card` for the three risks.
- `Badge` only for concise risk metadata if needed.

Mobile behaviour:

- Cards stack vertically.

Desktop behaviour:

- Intro text in a narrow measure, then three-card grid.

Accessibility considerations:

- Each risk card needs a heading.
- Avoid color-only severity indicators.

Suggested animations:

- Simple card fade-in on viewport entry if implemented later.

Future extensibility:

- Can expand into a longer risk matrix or link to a governance whitepaper.

### 4. Why Governance Matters

Purpose:

- Provide the architectural bridge between the enterprise AI problem and the E.T Agent product definition.

User objective:

- Understand why governance is the required solution to the operational risk described in the previous section.

Business objective:

- Reframe governance as the enabling architecture for enterprise AI adoption, not as an afterthought or constraint.

Content hierarchy:

1. Caption: `Why governance matters`.
2. H2: `Governance turns AI capability into accountable enterprise systems.`
3. Short explanatory paragraph: AI capability without governance creates operational risk because decisions, authority and execution can become unclear.
4. Three bridge points:
   - `Capability requires control`: AI recommendations need authority boundaries before they affect operations.
   - `Governance creates accountability`: policy, approval and auditability make AI-assisted work explainable.
   - `Architected from the beginning`: E.T Agent was designed around governance rather than adding controls later.

Recommended components:

- `Section`.
- `Stack`.
- Structured text block or three-item row using existing surfaces and border tokens.
- `Badge` only if a concise governance label improves scannability.

Mobile behaviour:

- Single-column narrative flow.
- Bridge points stack below the explanatory paragraph.

Desktop behaviour:

- Intro text and bridge points can use a two-column layout or compact three-item row.

Accessibility considerations:

- Keep the section text explicit; do not rely on arrows or connectors to explain the transition.
- Each bridge point should have a text heading.

Suggested animations:

- None required.

Future extensibility:

- Can later link to a governance model page if routing and content are approved.

### 5. Introducing E.T Agent

Purpose:

- Define the product after the problem is clear.

User objective:

- Understand E.T Agent as a governance-first AI platform, not merely another assistant.

Business objective:

- Establish differentiated positioning.

Content hierarchy:

1. Caption: `Introducing E.T Agent`.
2. H2: `Governance-first enterprise AI for controlled execution.`
3. Definition paragraph: E.T Agent separates intelligence from authority so AI can assist with reasoning while policy and humans control execution.
4. Four concise differentiators:
   - `Intelligence proposes`.
   - `Policy evaluates`.
   - `Humans approve`.
   - `Systems execute with audit trail`.

Recommended components:

- `Section` narrow/default.
- `Stack`.
- A structured definition panel using existing surface and border tokens.
- Four-item grid.

Mobile behaviour:

- Definition text first; differentiators stack in source order.

Desktop behaviour:

- Split layout with definition on one side and differentiators on the other.

Accessibility considerations:

- Use plain language definitions.
- Avoid vague acronyms unless expanded.

Suggested animations:

- None beyond subtle section reveal.

Future extensibility:

- Can include deployment models or supported systems later.

### 6. How E.T Agent Works

Purpose:

- Explain the core operational model in enough detail for implementation and evaluation.

User objective:

- Understand the controlled workflow from request to immutable audit log.

Business objective:

- Make the product's signature differentiation memorable and concrete.

Content hierarchy:

1. Caption: `Controlled execution workflow`.
2. H2: `Every action passes through intelligence, policy and approval.`
3. Supporting paragraph.
4. Full seven-step workflow:
   - Request: user or system submits intent.
   - Intelligence: AI interprets, reasons and proposes a plan.
   - Policy Engine: permissions, constraints, risk rules and context are evaluated.
   - Impact Summary: expected changes, risks and dependencies are explained.
   - Human Approval: authorized reviewer approves, rejects or requests changes.
   - Execution: approved action is performed through controlled integrations.
   - Immutable Audit Log: inputs, reasoning summary, policy result, approver and outcome are recorded.
5. Fail-closed callout: execution does not proceed if policy, approval or audit requirements are missing.

Recommended components:

- `Section` wide.
- Workflow diagram composed from ordered list plus page-specific visual wrappers.
- `Card` or bordered callout for fail-closed behavior.
- `Badge` for status labels such as `Policy check`, `Approval gate`, `Audit event`.

Mobile behaviour:

- Vertical ordered timeline.
- Each step includes one short sentence.
- Fail-closed callout follows the list.

Desktop behaviour:

- Horizontal or stepped rail with progressive detail.
- The policy and human approval steps should be visually emphasized as gates.
- Audit log should feel like the terminal record, not an afterthought.

Accessibility considerations:

- Source order must match workflow order.
- Connectors must not be the only way sequence is communicated.
- Gate emphasis must include text labels, not color alone.

Suggested animations:

- Step highlight sequence on initial view.
- Under reduced motion, render all steps statically.

Future extensibility:

- Later versions can add interactive step expansion, integration examples or downloadable architecture diagram.

### 7. Comparison: Traditional AI vs E.T Agent

Purpose:

- Clarify differentiation through a direct comparison.

User objective:

- See why separating intelligence from authority matters.

Business objective:

- Reframe the category around governance rather than model capability alone.

Content hierarchy:

1. Caption: `Why it is different`.
2. H2: `E.T Agent separates intelligence from authority.`
3. Comparison table:
   - Decision model: AI-driven recommendation vs policy-governed workflow.
   - Execution: direct/implicit action vs human-approved action.
   - Failure mode: ambiguous or open-ended vs fail-closed.
   - Audit: partial logs vs immutable decision record.
   - Governance: added after adoption vs designed into the workflow.

Recommended components:

- `Section`.
- Accessible comparison table or two-column comparison grid.
- Use existing border and surface tokens.

Mobile behaviour:

- Stacked comparison rows with paired labels.
- Avoid horizontal scrolling unless table semantics require it; if used, ensure visible affordance.

Desktop behaviour:

- Three-column table: criterion, traditional AI, E.T Agent.

Accessibility considerations:

- Prefer native table semantics for true comparison.
- Table headers must be explicit.

Suggested animations:

- None.

Future extensibility:

- Add competitor-neutral architecture comparison or procurement checklist.

### 8. Core Capabilities

Purpose:

- Translate the workflow into platform capabilities.

User objective:

- Understand what the platform can support at an enterprise level.

Business objective:

- Provide procurement-friendly feature clarity.

Content hierarchy:

1. Caption: `Enterprise capabilities`.
2. H2: `Controls for AI-assisted operations.`
3. Capability grid:
   - Policy engine and rules.
   - Approval workflows.
   - Impact summaries.
   - Immutable audit logs.
   - Role-based authority.
   - Integration-controlled execution.
   - Explainable reasoning summaries.
   - Fail-closed controls.

Recommended components:

- `Section` wide.
- `Card` grid.
- `Icon` for each capability, decorative or labelled consistently.

Mobile behaviour:

- Single column or two-column compact grid depending on content length.

Desktop behaviour:

- Four-by-two grid or responsive three-column grid.

Accessibility considerations:

- Each card requires a descriptive heading and concise body.
- Icons must not replace headings.

Suggested animations:

- Optional hover surface transition only.

Future extensibility:

- Cards can link to feature pages when routing expands.

### 9. Architecture Principles

Purpose:

- State the engineering principles behind the product.

User objective:

- Assess whether E.T Agent aligns with enterprise architecture and compliance expectations.

Business objective:

- Build trust with technical buyers and governance stakeholders.

Content hierarchy:

1. Caption: `Architecture principles`.
2. H2: `Designed for accountable automation.`
3. Principles:
   - Separation of intelligence and authority.
   - Deterministic approval paths.
   - Least-privilege execution.
   - Policy before action.
   - Fail-closed defaults.
   - Traceable state changes.
   - Human accountability.
   - Audit-first records.

Recommended components:

- `Section`.
- Principle list in structured rows, not decorative cards if content is dense.
- Use `Badge` for principle category only if useful.

Mobile behaviour:

- Vertical list with clear headings.

Desktop behaviour:

- Two-column principle matrix.

Accessibility considerations:

- Maintain readable text measure.
- Avoid dense all-caps beyond captions.

Suggested animations:

- None.

Future extensibility:

- Can become a dedicated architecture page with diagrams.

### 10. Industry Use Cases

Purpose:

- Show where governance-first AI applies.

User objective:

- Find a relevant operating environment.

Business objective:

- Signal enterprise applicability across regulated or operationally sensitive domains.

Content hierarchy:

1. Caption: `Target industries`.
2. H2: `For teams where AI actions must be controlled.`
3. Industry groups:
   - Financial services: approvals, policy enforcement, audit trails.
   - Healthcare operations: controlled administrative automation and traceability.
   - Legal and compliance: review workflows and evidence records.
   - Enterprise IT: controlled system changes and access workflows.
   - Supply chain and operations: impact-aware execution.
   - Public sector: accountability and approval governance.

Recommended components:

- `Section` wide.
- Grid of concise use case cards.
- Avoid promising domain-specific compliance unless verified.

Mobile behaviour:

- Cards stack or use two-column compact layout for short headings.

Desktop behaviour:

- Three-column grid.

Accessibility considerations:

- Industry headings should be clear and scannable.
- Avoid implying unsupported certifications.

Suggested animations:

- Optional hover state only.

Future extensibility:

- Each industry card can later link to a solution page.

### 11. Development Roadmap

Purpose:

- Set transparent expectations about current development stage and future direction.

User objective:

- Understand maturity and planned evolution.

Business objective:

- Build credibility through honest roadmap framing.

Content hierarchy:

1. Caption: `Development roadmap`.
2. H2: `Built in controlled phases.`
3. Roadmap phases:
   - Foundation: design system, theme architecture, accessibility baseline.
   - Governance model: controlled workflow, policy gates, approval architecture.
   - Enterprise platform: integrations, audit workflows, role-based authority.
   - Operational expansion: industry-specific controls and deployment models.
4. Note: roadmap is directional and subject to product validation.

Recommended components:

- `Section`.
- Timeline or ordered phase list.
- `Badge` for phase status if statuses are available.

Mobile behaviour:

- Vertical timeline.

Desktop behaviour:

- Horizontal phase timeline or four-column phase list.

Accessibility considerations:

- Use ordered list semantics.
- Do not rely on line connectors alone.

Suggested animations:

- None, or subtle phase reveal.

Future extensibility:

- Can connect to changelog, release notes or product updates.

### 12. Final CTA

Purpose:

- Convert enterprise interest into a concrete next step.

User objective:

- Know how to engage with the product team.

Business objective:

- Drive qualified conversations around architecture, governance and implementation.

Content hierarchy:

1. H2: `Design AI execution around governance from the start.`
2. Short paragraph reinforcing human-approved, policy-controlled execution.
3. Primary CTA: `Request architecture review`.
4. Secondary CTA: `Contact the team`.
5. Optional reassurance: `For enterprise architecture, compliance and operational leaders.`

Recommended components:

- `Section` spacious.
- Centered or split CTA layout.
- `Button` primary and outline/secondary.

Mobile behaviour:

- Full-width stacked CTA buttons if needed.

Desktop behaviour:

- Contained CTA band with clear text hierarchy.

Accessibility considerations:

- CTA buttons must remain keyboard reachable and descriptive.
- Do not hide essential context inside decorative visual treatments.

Suggested animations:

- None.

Future extensibility:

- Can include lead capture form, calendar scheduling or enterprise contact routing.

## 7. Homepage Wireframe

```text
┌──────────────────────────────────────────────────────────────┐
│ Navigation                                                   │
├──────────────────────────────────────────────────────────────┤
│ Hero                                                         │
│ [Badge] Enterprise AI, controlled by policy and humans       │
│ [Copy] [Primary CTA] [Secondary CTA]     [Workflow Preview]  │
├──────────────────────────────────────────────────────────────┤
│ Trust Banner: Governance First | Policy Controlled | Human   │
│ Approved | Fail Closed | Audit Ready                         │
├──────────────────────────────────────────────────────────────┤
│ The Problem: governance gap + three risk cards               │
├──────────────────────────────────────────────────────────────┤
│ Why Governance Matters: capability becomes accountability    │
├──────────────────────────────────────────────────────────────┤
│ Introducing E.T Agent: definition + differentiators          │
├──────────────────────────────────────────────────────────────┤
│ How It Works: seven-step controlled execution workflow       │
├──────────────────────────────────────────────────────────────┤
│ Comparison: Traditional AI vs E.T Agent                      │
├──────────────────────────────────────────────────────────────┤
│ Core Capabilities                                            │
├──────────────────────────────────────────────────────────────┤
│ Architecture Principles                                      │
├──────────────────────────────────────────────────────────────┤
│ Industry Use Cases                                           │
├──────────────────────────────────────────────────────────────┤
│ Development Roadmap                                          │
├──────────────────────────────────────────────────────────────┤
│ Final CTA                                                    │
└──────────────────────────────────────────────────────────────┘
```

## 8. Navigation Alignment

Future W3B Homepage Implementation should update navigation labels to page anchors only if approved for implementation. Recommended Homepage anchors:

- `Problem`
- `Workflow`
- `Capabilities`
- `Roadmap`
- `Contact`

This document does not authorize modifying `Navigation.tsx` during W3A.

## 9. W3B Homepage Implementation Guardrails

- Preserve the existing design system.
- Implement Homepage sections using existing primitives first.
- Add page-specific classes only where layout requires them.
- Keep all content in semantic source order.
- Use the workflow as the primary custom visual element.
- Avoid creating decorative image assets unless separately approved.
- Use Lucide icons where icons are needed.
- Preserve global reduced-motion behavior.
- Do not add unverified compliance claims, logos or certifications.
