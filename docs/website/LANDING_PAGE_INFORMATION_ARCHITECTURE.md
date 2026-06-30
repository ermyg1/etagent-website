# E.T Agent Homepage Information Architecture

Status: W3A architecture specification; W3A.6 website scope revision  
Scope: Homepage content model, section order, hierarchy and implementation blueprint for the official E.T Agent Website.

Historical note: the original planning centred around a Landing Page. As the project matured, the scope expanded into the official E.T Agent Website. The Homepage is now one module within the wider website, and this document preserves the frozen W3A Homepage information architecture.

## 1. Page Structure

Canonical section order:

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

This order is fixed for W3B Homepage Implementation unless JD changes architecture authority.

## 2. Heading Model

Recommended heading structure:

```text
h1 Hero: Enterprise AI, controlled by policy and approved by humans.
  h2 Enterprise Trust Banner: Built for controlled enterprise adoption.
  h2 The Problem: AI can recommend action faster than organizations can govern it.
  h2 Why Governance Matters: Governance turns AI capability into accountable enterprise systems.
  h2 Introducing E.T Agent: Governance-first enterprise AI for controlled execution.
  h2 How E.T Agent Works: Every action passes through intelligence, policy and approval.
  h2 Comparison: E.T Agent separates intelligence from authority.
  h2 Core Capabilities: Controls for AI-assisted operations.
  h2 Architecture Principles: Designed for accountable automation.
  h2 Industry Use Cases: For teams where AI actions must be controlled.
  h2 Development Roadmap: Built in controlled phases.
  h2 Final CTA: Design AI execution around governance from the start.
```

Use section captions for scannability, but captions are not heading replacements.

## 3. Anchor Model

Recommended Homepage section IDs for W3B:

| Section | ID |
| --- | --- |
| Hero | `home` |
| Enterprise Trust Banner | `trust` |
| The Problem | `problem` |
| Why Governance Matters | `why-governance-matters` |
| Introducing E.T Agent | `introducing-et-agent` |
| How E.T Agent Works | `workflow` |
| Comparison | `comparison` |
| Core Capabilities | `capabilities` |
| Architecture Principles | `principles` |
| Industry Use Cases | `industries` |
| Development Roadmap | `roadmap` |
| Final CTA | `contact` |

Navigation changes are not authorized in W3A. These anchors are provided for W3B Homepage Implementation.

## 4. Content Model by Section

### Hero

Fields:

- Eyebrow/caption.
- H1.
- Supporting paragraph.
- Primary CTA.
- Secondary CTA.
- Workflow preview.

Primary copy direction:

- Avoid claiming autonomous AI execution.
- Emphasize governed, approved and auditable execution.

### Enterprise Trust Banner

Fields:

- Short heading.
- Five trust pillar items.
- Optional support sentence.

Trust pillar content:

- Governance First.
- Policy Controlled.
- Human Approved.
- Fail Closed.
- Audit Ready.

### The Problem

Fields:

- Caption.
- H2.
- Explanation paragraph.
- Three risk items.

Risk item model:

- Title.
- One-sentence explanation.
- Optional risk label.

Risk items:

- Authority ambiguity.
- Execution risk.
- Audit weakness.

### Why Governance Matters

Fields:

- Caption.
- H2.
- Explanation paragraph.
- Three bridge points.

Bridge point model:

- Title.
- One-sentence explanation.

Bridge points:

- Capability requires control.
- Governance creates accountability.
- Architected from the beginning.

Primary copy direction:

- Explain that AI capability without governance creates operational risk.
- Explain that governance transforms AI from unpredictable automation into accountable enterprise systems.
- Explain that E.T Agent was architected around governance from the beginning rather than adding it later.

### Introducing E.T Agent

Fields:

- Caption.
- H2.
- Product definition paragraph.
- Differentiator list.

Differentiator model:

- Verb phrase.
- One-sentence explanation.

Differentiators:

- Intelligence proposes.
- Policy evaluates.
- Humans approve.
- Systems execute with audit trail.

### How E.T Agent Works

Fields:

- Caption.
- H2.
- Supporting paragraph.
- Seven workflow steps.
- Fail-closed callout.

Workflow step model:

- Step number.
- Step title.
- Step description.
- Optional metadata badge.

Workflow steps:

1. Request: user or system submits intent.
2. Intelligence: AI interprets the request and proposes a plan.
3. Policy Engine: rules, permissions and context are evaluated.
4. Impact Summary: expected effects and risks are explained.
5. Human Approval: authorized reviewer approves, rejects or requests changes.
6. Execution: approved changes run through controlled integrations.
7. Immutable Audit Log: decision path, approver, policy result and outcome are recorded.

Fail-closed callout:

- Execution must not proceed when policy validation, approval or audit capture fails.

### Comparison

Fields:

- Caption.
- H2.
- Intro sentence.
- Comparison rows.

Comparison row model:

- Criterion.
- Traditional AI.
- E.T Agent.

Rows:

- Decision model.
- Execution.
- Failure mode.
- Audit.
- Governance.

### Core Capabilities

Fields:

- Caption.
- H2.
- Supporting paragraph.
- Capability cards.

Capability card model:

- Icon.
- Title.
- Description.

Capabilities:

- Policy engine and rules.
- Approval workflows.
- Impact summaries.
- Immutable audit logs.
- Role-based authority.
- Integration-controlled execution.
- Explainable reasoning summaries.
- Fail-closed controls.

### Architecture Principles

Fields:

- Caption.
- H2.
- Supporting paragraph.
- Principle list.

Principle item model:

- Title.
- Description.

Principles:

- Separation of intelligence and authority.
- Deterministic approval paths.
- Least-privilege execution.
- Policy before action.
- Fail-closed defaults.
- Traceable state changes.
- Human accountability.
- Audit-first records.

### Industry Use Cases

Fields:

- Caption.
- H2.
- Supporting paragraph.
- Industry cards.

Industry card model:

- Industry.
- Governance need.
- Example controlled action.

Industries:

- Financial services.
- Healthcare operations.
- Legal and compliance.
- Enterprise IT.
- Supply chain and operations.
- Public sector.

### Development Roadmap

Fields:

- Caption.
- H2.
- Supporting paragraph.
- Ordered phase list.
- Roadmap disclaimer.

Phase model:

- Phase name.
- Status or timeframe if available.
- Description.

Phases:

1. Foundation: design system, theme architecture and accessibility baseline.
2. Governance model: policy gates, approval flow and audit architecture.
3. Enterprise platform: integrations, authority controls and operational workflows.
4. Operational expansion: industry-specific controls and deployment models.

### Final CTA

Fields:

- H2.
- Supporting paragraph.
- Primary CTA.
- Secondary CTA.
- Optional audience reassurance.

CTA copy:

- Primary: `Request architecture review`.
- Secondary: `Contact the team`.

## 5. Component Mapping

| Content need | Existing component/foundation |
| --- | --- |
| Page shell | `PageLayout` |
| Section rhythm | `Section` |
| Vertical spacing | `Stack` |
| Brand mark | `Logo` |
| Primary and secondary actions | `Button` |
| Status labels and metadata | `Badge` |
| Repeated capability/use-case/risk items | `Card` |
| Symbolic support | `Icon` with Lucide React |
| Typography | Existing type utility classes |
| Responsive padding and widths | Existing container tokens |

No new reusable design-system component is required for W3B Homepage Implementation. A page-specific workflow visual is expected, but it should be composed from semantic HTML and existing theme tokens.

## 6. Content Density Rules

- Hero paragraph: one to two sentences.
- Problem cards: one sentence each.
- Workflow step descriptions: one sentence each.
- Capability cards: one short sentence each.
- Architecture principles: one to two sentences each.
- Industry cards: avoid dense domain claims.
- Roadmap: concise and transparent.

## 7. Accessibility Information Architecture

Required:

- One H1 only.
- H2 for every major section.
- Ordered list semantics for workflow and roadmap.
- Native table semantics for comparison if implemented as a table.
- Descriptive CTA labels.
- Decorative connectors and visual lines hidden from assistive technology.
- All content available without animation.

Avoid:

- Icon-only meaning.
- Color-only statuses.
- Tooltips as the only source of important content.
- Copy embedded in images.

## 8. Responsive Information Architecture

Mobile:

- Preserve section order exactly.
- Use single-column flow for narrative content.
- Convert workflow to vertical ordered timeline.
- Keep CTAs close to the claim they support.
- Keep comparison rows readable without requiring pinch zoom.

Tablet:

- Two-column grids may be used for cards.
- Workflow can remain vertical or become stepped depending on available width.

Desktop:

- Use split hero layout.
- Use full workflow rail.
- Use comparison table.
- Use multi-column grids for capabilities and industries.

## 9. Copy Guardrails

Use:

- `governance-first`
- `human-approved`
- `policy-controlled`
- `fail-closed`
- `auditable`
- `deterministic`
- `accountable`
- `enterprise`

Avoid:

- `autonomous workforce`
- `AI that runs your company`
- `magic`
- `revolutionary`
- `10x`
- `agentic future`
- `unleash`
- `sci-fi`

## 10. Implementation-Ready ASCII Workflow

Desktop concept:

```text
[Request] → [Intelligence] → [Policy Engine] → [Impact Summary]
                                              ↓
[Audit Log] ← [Execution] ← [Human Approval] ←┘
```

Mobile concept:

```text
1. Request
2. Intelligence
3. Policy Engine
4. Impact Summary
5. Human Approval
6. Execution
7. Immutable Audit Log
```

Policy Engine and Human Approval must visually read as gates. Immutable Audit Log must visually read as the permanent record of the completed workflow.

## 11. W3B Homepage Implementation Acceptance Checklist

- All required sections are present in canonical order.
- H1 and H2 hierarchy matches this document.
- Workflow is the signature visual element.
- Mobile workflow is readable without horizontal scrolling.
- Comparison clearly explains separation of intelligence and authority.
- Existing design system primitives are reused.
- No design-system redesign is introduced.
- No sci-fi, neon, robot or hype-oriented visual language is introduced.
- Motion is restrained and reduced-motion compatible.
- Enterprise trust, governance, accountability and human approval are visible above and throughout the fold.
