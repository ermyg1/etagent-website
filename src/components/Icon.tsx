import type { ComponentProps, ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

type IconProps = Omit<ComponentProps<'span'>, 'children'> & {
  icon: ComponentType<LucideProps>
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Icon({
  className = '',
  icon: IconGlyph,
  label,
  size = 'md',
  ...props
}: IconProps) {
  const iconClassName = ['ui-icon', `ui-icon--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-hidden={label ? undefined : 'true'}
      aria-label={label}
      className={iconClassName}
      role={label ? 'img' : undefined}
      {...props}
    >
      <IconGlyph aria-hidden="true" focusable="false" strokeWidth={1.8} />
    </span>
  )
}
