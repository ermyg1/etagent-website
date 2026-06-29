import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'hover' | 'bordered' | 'elevated'

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  variant?: CardVariant
}

export function Card({
  children,
  className = '',
  variant = 'default',
  ...props
}: CardProps) {
  const cardClassName = ['ui-card', `ui-card--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={cardClassName} {...props}>
      {children}
    </section>
  )
}
