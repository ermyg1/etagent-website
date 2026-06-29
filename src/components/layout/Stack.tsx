import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

type StackSpace = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

type StackProps = HTMLAttributes<HTMLDivElement> & {
  align?: CSSProperties['alignItems']
  children: ReactNode
  space?: StackSpace
}

export function Stack({
  align,
  children,
  className = '',
  space = 'md',
  style,
  ...props
}: StackProps) {
  const stackClassName = ['layout-stack', className].filter(Boolean).join(' ')
  const stackStyle = {
    '--stack-space': `var(--space-${space})`,
    alignItems: align,
    ...style,
  } as CSSProperties & Record<'--stack-space', string>

  return (
    <div
      className={stackClassName}
      style={stackStyle}
      {...props}
    >
      {children}
    </div>
  )
}
