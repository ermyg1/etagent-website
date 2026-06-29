import type { HTMLAttributes, ReactNode } from 'react'

type SectionWidth = 'default' | 'narrow' | 'wide'

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  spacing?: 'compact' | 'default' | 'spacious'
  width?: SectionWidth
}

export function Section({
  children,
  className = '',
  spacing = 'default',
  width = 'default',
  ...props
}: SectionProps) {
  const sectionClassName = [
    'layout-section',
    `layout-section--${spacing}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionClassName} {...props}>
      <div className={`layout-section__inner layout-section__inner--${width}`}>
        {children}
      </div>
    </section>
  )
}
