import { createContext, type CSSProperties } from 'react'

export type ThemeName = 'dark'

export type ThemeTokens = {
  colorScheme: 'dark'
  cssVariables: CSSProperties & Record<`--${string}`, string>
  name: ThemeName
}

export const darkTheme: ThemeTokens = {
  name: 'dark',
  colorScheme: 'dark',
  cssVariables: {
    '--color-primary': '#1d4ed8',
    '--color-primary-strong': '#2563eb',
    '--color-primary-soft': '#dbeafe',
    '--color-secondary': '#7eb6ff',
    '--color-accent': '#8b7cf6',
    '--color-success': '#22c55e',
    '--color-success-soft': '#bbf7d0',
    '--color-warning': '#f59e0b',
    '--color-warning-soft': '#fde68a',
    '--color-error': '#ef4444',
    '--color-error-soft': '#fecaca',

    '--color-neutral-50': '#f8fafc',
    '--color-neutral-100': '#eef2f7',
    '--color-neutral-200': '#d8dee8',
    '--color-neutral-300': '#b7c0cf',
    '--color-neutral-400': '#8c98aa',
    '--color-neutral-500': '#677386',
    '--color-neutral-600': '#475569',
    '--color-neutral-700': '#334155',
    '--color-neutral-800': '#1e293b',
    '--color-neutral-900': '#0f172a',
    '--color-neutral-950': '#08111f',

    '--color-background': '#08111f',
    '--color-background-raised': '#0c1728',
    '--color-surface': '#101c2f',
    '--color-surface-hover': '#142238',
    '--color-surface-elevated': '#16243a',
    '--color-border': '#24324a',
    '--color-border-strong': '#34455f',
    '--color-text': '#d8dee8',
    '--color-text-strong': '#f8fafc',
    '--color-text-muted': '#9aa7ba',
    '--color-focus': '#93c5fd',
    '--color-focus-ring': 'rgb(147 197 253 / 0.14)',
    '--color-header-background':
      'color-mix(in srgb, var(--color-background) 88%, transparent)',
    '--color-destructive-background':
      'color-mix(in srgb, var(--color-error) 84%, black)',
    '--color-disabled-background':
      'color-mix(in srgb, var(--color-background-raised) 70%, black)',
    '--color-swatch-border': 'rgb(255 255 255 / 0.12)',

    '--font-sans':
      "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    '--font-mono': "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",

    '--type-display': '3.5rem',
    '--type-heading-1': '3rem',
    '--type-heading-2': '2rem',
    '--type-heading-3': '1.375rem',
    '--type-heading-4': '1.125rem',
    '--type-body-large': '1.125rem',
    '--type-body': '1rem',
    '--type-small': '0.875rem',
    '--type-caption': '0.75rem',
    '--type-mono': '0.875rem',

    '--line-tight': '1.1',
    '--line-heading': '1.2',
    '--line-body': '1.6',

    '--space-xs': '0.25rem',
    '--space-sm': '0.5rem',
    '--space-md': '1rem',
    '--space-lg': '1.5rem',
    '--space-xl': '2rem',
    '--space-2xl': '3rem',
    '--space-3xl': '4rem',

    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',
    '--radius-xl': '0.75rem',

    '--shadow-sm': '0 1px 2px rgb(0 0 0 / 0.24)',
    '--shadow-md': '0 10px 28px rgb(0 0 0 / 0.22)',
    '--shadow-lg': '0 18px 48px rgb(0 0 0 / 0.28)',
    '--shadow-xl': '0 28px 70px rgb(0 0 0 / 0.34)',

    '--container-default': '1180px',
    '--container-narrow': '880px',
    '--container-wide': '1360px',
    '--container-padding': 'clamp(1rem, 4vw, 2.5rem)',

    '--motion-fast': '150ms',
    '--motion-base': '200ms',
    '--motion-slow': '250ms',
    '--motion-ease': 'cubic-bezier(0.2, 0, 0, 1)',
  },
}

export type ThemeContextValue = {
  theme: ThemeTokens
  themeName: ThemeName
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
