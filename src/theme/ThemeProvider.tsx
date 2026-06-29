import { useLayoutEffect, type ReactNode } from 'react'
import { darkTheme, ThemeContext } from './ThemeContext'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = darkTheme

  useLayoutEffect(() => {
    const root = document.documentElement

    root.dataset.theme = theme.name
    root.style.colorScheme = theme.colorScheme

    Object.entries(theme.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, themeName: theme.name }}>
      <div
        className="theme-root"
        data-theme={theme.name}
        style={{ ...theme.cssVariables, colorScheme: theme.colorScheme }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
