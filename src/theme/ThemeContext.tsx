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
    '--color-primary': '#7FA8C9',
    '--color-primary-strong': '#A7C6DD',
    '--color-primary-soft': '#D4E4EF',
    '--color-secondary': '#9AB7AE',
    '--color-accent': '#B8C7D8',
    '--color-success': '#58D68D',
    '--color-success-soft': '#BDF4D3',
    '--color-warning': '#F6C068',
    '--color-warning-soft': '#FFE1A3',
    '--color-error': '#E57373',
    '--color-error-soft': '#FFC9C9',

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
    '--color-neutral-950': '#0B0F14',

    '--color-background': '#090B0E',
    '--color-background-raised': '#101317',
    '--color-surface': '#15181D',
    '--color-surface-hover': '#1C2026',
    '--color-surface-elevated': '#20242A',
    '--color-border': 'rgb(255 255 255 / 0.075)',
    '--color-border-strong': 'rgb(255 255 255 / 0.145)',
    '--color-text': '#B9C0C8',
    '--color-text-strong': '#F5F7FA',
    '--color-text-muted': '#8A97A6',
    '--color-focus': '#A7C6DD',
    '--color-focus-ring': 'rgb(127 168 201 / 0.2)',
    '--color-header-background':
      'rgb(9 11 14 / 0.66)',
    '--color-destructive-background':
      'color-mix(in srgb, var(--color-error) 78%, #0B0F14)',
    '--color-disabled-background':
      'color-mix(in srgb, var(--color-background-raised) 70%, #0B0F14)',
    '--color-swatch-border': 'rgb(255 255 255 / 0.12)',

    '--font-sans':
      "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    '--font-mono': "'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace",

    '--type-display': '3.9rem',
    '--type-heading-1': '3.125rem',
    '--type-heading-2': '2.125rem',
    '--type-heading-3': '1.375rem',
    '--type-heading-4': '1.125rem',
    '--type-body-large': '1.125rem',
    '--type-body': '1rem',
    '--type-small': '0.875rem',
    '--type-caption': '0.75rem',
    '--type-mono': '0.875rem',

    '--line-tight': '1.06',
    '--line-heading': '1.18',
    '--line-body': '1.72',

    '--space-xs': '0.25rem',
    '--space-sm': '0.5rem',
    '--space-md': '1rem',
    '--space-lg': '1.5rem',
    '--space-xl': '2.35rem',
    '--space-2xl': '3.5rem',
    '--space-3xl': '5.25rem',

    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.625rem',
    '--radius-xl': '0.875rem',

    '--shadow-sm': '0 1px 2px rgb(0 0 0 / 0.34), 0 0 0 1px rgb(255 255 255 / 0.018)',
    '--shadow-md': '0 18px 46px rgb(0 0 0 / 0.3), 0 1px 0 rgb(255 255 255 / 0.025) inset',
    '--shadow-lg': '0 28px 72px rgb(0 0 0 / 0.38), 0 1px 0 rgb(255 255 255 / 0.035) inset',
    '--shadow-xl': '0 44px 110px rgb(0 0 0 / 0.48), 0 1px 0 rgb(255 255 255 / 0.04) inset',

    '--container-default': '1180px',
    '--container-narrow': '880px',
    '--container-wide': '1360px',
    '--container-padding': 'clamp(1rem, 4vw, 2.5rem)',

    '--motion-fast': '200ms',
    '--motion-base': '240ms',
    '--motion-slow': '300ms',
    '--motion-ease': 'cubic-bezier(0.2, 0, 0, 1)',
  },
}

export type ThemeContextValue = {
  theme: ThemeTokens
  themeName: ThemeName
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
