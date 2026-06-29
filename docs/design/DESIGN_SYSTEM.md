# E.T Agent Design System

Status: W2 Brand Foundation approved for implementation.

This document is the authoritative design reference for future E.T Agent website work. It defines the theme architecture, shared tokens, reusable interface primitives and baseline accessibility requirements. It does not define landing page structure, marketing sections or product copy.

## Design Principles

- Enterprise, premium and calm.
- Trustworthy, modern and security-focused.
- Minimal, professional and restrained.
- Designed for executives, architects, compliance teams and enterprise customers.
- Avoid startup-style visuals, excessive gradients, neon colour and flashy animation.

## Theme Architecture

`ThemeProvider` lives in `src/theme/ThemeProvider.tsx` and wraps the application from `src/main.tsx`.

The active theme is dark only. The provider applies theme tokens as CSS custom properties and exposes the active theme through `ThemeContext` and `useTheme`. This prepares the site for future light theme, customer branding and accessibility theme support without requiring component-level refactoring.

Theme files:

- `src/theme/ThemeContext.tsx`: theme types, context and current dark theme token values.
- `src/theme/ThemeProvider.tsx`: application-level provider and CSS variable application.
- `src/theme/useTheme.ts`: typed hook for reading the active theme.

Components should consume CSS variables from the active theme rather than hardcoding colours, spacing, type scale, radius, shadows or motion values.

## Colour Palette

All colours are stored in the active theme and applied as CSS custom properties by `ThemeProvider`.

| Role | Token | Value |
| --- | --- | --- |
| Primary | `--color-primary` | `#1d4ed8` |
| Primary strong | `--color-primary-strong` | `#2563eb` |
| Primary soft | `--color-primary-soft` | `#dbeafe` |
| Secondary light blue | `--color-secondary` | `#7eb6ff` |
| Accent purple | `--color-accent` | `#8b7cf6` |
| Success | `--color-success` | `#22c55e` |
| Warning | `--color-warning` | `#f59e0b` |
| Error | `--color-error` | `#ef4444` |
| Background | `--color-background` | `#08111f` |
| Raised background | `--color-background-raised` | `#0c1728` |
| Surface | `--color-surface` | `#101c2f` |
| Surface hover | `--color-surface-hover` | `#142238` |
| Surface elevated | `--color-surface-elevated` | `#16243a` |
| Border | `--color-border` | `#24324a` |
| Strong border | `--color-border-strong` | `#34455f` |
| Text | `--color-text` | `#d8dee8` |
| Strong text | `--color-text-strong` | `#f8fafc` |
| Muted text | `--color-text-muted` | `#9aa7ba` |
| Focus | `--color-focus` | `#93c5fd` |

Neutral greys are available from `--color-neutral-50` through `--color-neutral-950`. Semantic soft colour tokens are available for status text, including `--color-success-soft`, `--color-warning-soft` and `--color-error-soft`.

The default and only active theme is dark. Future light theme support should be added as a new theme object, not as component overrides.

## Typography

Google fonts:

- Sans: Inter
- Mono: IBM Plex Mono

Typography is tokenized by the active theme and exposed through utility classes.

| Style | Token | Class |
| --- | --- | --- |
| Display | `--type-display` | `.type-display` |
| Heading 1 | `--type-heading-1` | `.type-heading-1` |
| Heading 2 | `--type-heading-2` | `.type-heading-2` |
| Heading 3 | `--type-heading-3` | `.type-heading-3` |
| Heading 4 | `--type-heading-4` | `.type-heading-4` |
| Body large | `--type-body-large` | `.type-body-large` |
| Body | `--type-body` | `.type-body` |
| Small | `--type-small` | token |
| Caption | `--type-caption` | `.type-caption` |
| Mono | `--type-mono` | `code` |

Do not hardcode type scale values in components.

## Spacing

Spacing tokens:

| Token | Value |
| --- | --- |
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.5rem` |
| `--space-md` | `1rem` |
| `--space-lg` | `1.5rem` |
| `--space-xl` | `2rem` |
| `--space-2xl` | `3rem` |
| `--space-3xl` | `4rem` |

Use these for component padding, layout gaps and section rhythm. Prefer `Stack` and `Section` for page-level rhythm before adding one-off spacing classes.

## Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `0.25rem` | Small controls |
| `--radius-md` | `0.375rem` | Buttons, inputs, badges |
| `--radius-lg` | `0.5rem` | Navigation panels, swatches |
| `--radius-xl` | `0.75rem` | Cards and larger surfaces |

## Shadows

Enterprise shadows are subtle and reserved for depth, not decoration.

| Token | Use |
| --- | --- |
| `--shadow-sm` | Default card shadow |
| `--shadow-md` | Elevated card |
| `--shadow-lg` | Mobile navigation panel |
| `--shadow-xl` | Future overlays and modal surfaces |

## Breakpoints

Reusable breakpoint values are exported in `src/design/tokens.ts`.

| Name | Value |
| --- | --- |
| Mobile | `360px` |
| Tablet | `768px` |
| Laptop | `1024px` |
| Desktop | `1280px` |
| Wide | `1536px` |

## Layout Primitives

Layout primitives live in `src/components/layout/`.

### Stack

`Stack` lives at `src/components/layout/Stack.tsx`.

Purpose:

- Reusable vertical spacing.
- Configurable gap using spacing token names: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`.
- Optional alignment through the `align` prop.

Use `Stack` instead of creating repeated vertical gap rules in feature components.

### Section

`Section` lives at `src/components/layout/Section.tsx`.

Purpose:

- Consistent horizontal padding through `--container-padding`.
- Responsive max width through `default`, `narrow` and `wide` widths.
- Vertical rhythm through `compact`, `default` and `spacious` spacing.

Future landing page sections should compose from `Section` without adding marketing content to the design system foundation page.

### PageLayout

`PageLayout` lives at `src/components/layout/PageLayout.tsx`.

Responsibilities:

- Shared page container.
- Navigation placement.
- Main landmark placement.
- Footer slot for future use.

Future pages should compose from `PageLayout` before adding page-specific content.

### LayoutContainer

`LayoutContainer` lives at `src/components/LayoutContainer.tsx` and remains available for simple contained regions.

Supported sizes:

- `default`: `--container-default`
- `narrow`: `--container-narrow`
- `wide`: `--container-wide`

Containers use responsive inline padding through `--container-padding`.

## Folder Organisation

Current reusable component structure:

- `src/components/layout/`: page and section composition primitives.
- `src/components/Navigation.tsx`: primary navigation.
- `src/components/Logo.tsx`: brand mark placement.
- `src/components/Button.tsx`, `Badge.tsx`, `Card.tsx`, `FormControls.tsx`, `Icon.tsx`: interface primitives.
- `src/theme/`: theme provider, context, hook and active token contract.

Avoid moving files unless the move improves ownership or future reuse. New reusable primitives should be placed by responsibility rather than by page.

## Navigation

`Navigation` lives at `src/components/Navigation.tsx`.

It includes:

- Reusable logo placement.
- Desktop horizontal navigation.
- Mobile toggle with `aria-expanded` and `aria-controls`.
- Sticky positioning.
- Subtle backdrop blur.
- Tokenized border rendering.
- Keyboard-accessible links and controls.

Navigation is a component only; it should not contain page content.

## Buttons

`Button` lives at `src/components/Button.tsx`.

Variants:

- `primary`
- `secondary`
- `outline`
- `ghost`
- `destructive`

Sizes:

- `sm`
- `md`
- `lg`

States are handled through CSS for default, hover, focus, active and disabled. Loading is supported with `isLoading`, disables the control and renders a Lucide loader icon without spin animation.

## Cards

`Card` lives at `src/components/Card.tsx`.

Variants:

- `default`
- `hover`
- `bordered`
- `elevated`

Cards use restrained borders, surfaces and shadows. Do not nest cards inside other cards.

## Badges

`Badge` lives at `src/components/Badge.tsx`.

Variants:

- `primary`
- `secondary`
- `success`
- `warning`
- `error`
- `neutral`

Badges are for statuses and concise metadata only.

## Forms

Form primitives live at `src/components/FormControls.tsx`.

Included:

- `Field`
- `TextInput`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio`
- `Toggle`

Shared styles include focus states, disabled states, validation with `aria-invalid`, helper text and error messages with `role="alert"`.

## Icons

The project standard is Lucide React.

`Icon` lives at `src/components/Icon.tsx` and wraps Lucide icons with shared sizing and accessible label support. Prefer Lucide icons for buttons, tools and status symbols when a matching icon exists.

## Motion

Motion tokens:

- `--motion-fast`: `150ms`
- `--motion-base`: `200ms`
- `--motion-slow`: `250ms`
- `--motion-ease`: `cubic-bezier(0.2, 0, 0, 1)`

Allowed motion:

- Fade.
- Opacity.
- Small translate.

Avoid bouncing, spinning and flashy motion. `prefers-reduced-motion` is respected globally.

## Logo

`Logo` lives at `src/components/Logo.tsx`.

The component prepares reusable logo placement and supports light or dark background tones. It does not redesign the brand; replace its internal mark with the approved logo asset when that asset is supplied.

## Favicon

Favicon integration is prepared in `index.html` with `/favicon.svg`. Replace `public/favicon.svg` with an approved final asset when available.

## Accessibility

Baseline requirements:

- Semantic HTML.
- Keyboard navigation for all interactive controls.
- Visible `:focus-visible` states.
- Sufficient colour contrast for text, borders and controls.
- ARIA only where it improves clarity.
- `prefers-reduced-motion` support.
- Disabled and validation states represented visually and semantically.
