import type { HTMLAttributes, ReactNode } from 'react'

type LayoutContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  size?: 'default' | 'narrow' | 'wide'
}

export function LayoutContainer({
  children,
  className = '',
  size = 'default',
  ...props
}: LayoutContainerProps) {
  const containerClassName = [
    'layout-container',
    `layout-container--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClassName} {...props}>
      {children}
    </div>
  )
}
