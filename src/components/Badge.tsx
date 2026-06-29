import type { HTMLAttributes, ReactNode } from 'react'

type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode
  variant?: BadgeVariant
}

export function Badge({
  children,
  className = '',
  variant = 'neutral',
  ...props
}: BadgeProps) {
  const badgeClassName = ['ui-badge', `ui-badge--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={badgeClassName} {...props}>
      {children}
    </span>
  )
}
