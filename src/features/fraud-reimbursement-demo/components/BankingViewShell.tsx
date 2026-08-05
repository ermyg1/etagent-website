import type { ReactNode } from 'react'

type BankingViewShellProps = {
  id: string
  number: string
  title: string
  intro: string
  children: ReactNode
}

export function BankingViewShell({
  id,
  number,
  title,
  intro,
  children,
}: BankingViewShellProps) {
  return (
    <section aria-labelledby={`bank-view-${id}`} className="bank-view">
      <header>
        <span className="bank-kicker">{number}</span>
        <h2 className="type-heading-2" id={`bank-view-${id}`} tabIndex={-1}>
          {title}
        </h2>
        <p>{intro}</p>
      </header>
      {children}
    </section>
  )
}
