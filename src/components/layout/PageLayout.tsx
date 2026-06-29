import type { ReactNode } from 'react'
import { Navigation } from '../Navigation'

type PageLayoutProps = {
  children: ReactNode
  footer?: ReactNode
}

export function PageLayout({ children, footer }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <Navigation />
      <main className="page-layout__main">{children}</main>
      {footer ? <footer className="page-layout__footer">{footer}</footer> : null}
    </div>
  )
}
