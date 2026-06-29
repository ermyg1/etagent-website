# E.T Agent Design System

Status: W2 Brand Foundation approved for implementation.

This document is the authoritative design reference for future E.T Agent website work. It defines shared tokens, reusable interface primitives and baseline accessibility requirements. It does not define landing page structure, marketing sections or product copy.

## Design Principles

- Enterprise, premium and calm.
- Trustworthy, modern and security-focused.
- Minimal, professional and restrained.
- Designed for executives, architects, compliance teams and enterprise customers.
- Avoid startup-style visuals, excessive gradients, neon colour and flashy animation.

## Colour Palette

All colours are stored as CSS custom properties in `src/index.css`.

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

Neutral greys are available from `--color-neutral-50` through `--color-neutral-950`.

The default theme is dark. Future light theme support is prepared with `[data-theme='light']`.

## Typography

Google fonts:

- Sans: Inter
- Mono: IBM Plex Mono

Typography is tokenized in `src/index.css` and exposed through utility classes.

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

Use these for component padding, layout gaps and section rhythm.

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

## Layout Container

`LayoutContainer` lives at `src/components/LayoutContainer.tsx`.

Supported sizes:

- `default`: `--container-default`
- `narrow`: `--container-narrow`
- `wide`: `--container-wide`

Containers use responsive inline padding through `--container-padding`.

## Navigation

`Navigation` lives at `src/components/Navigation.tsx`.

It includes:

- Reusable logo placement.
- Desktop horizontal navigation.
- Mobile toggle with `aria-expanded` and `aria-controls`.
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
