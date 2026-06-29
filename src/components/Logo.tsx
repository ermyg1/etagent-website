import type { HTMLAttributes } from 'react'

type LogoProps = HTMLAttributes<HTMLAnchorElement> & {
  href?: string
  tone?: 'light' | 'dark'
}

export function Logo({
  className = '',
  href = '/',
  tone = 'dark',
  ...props
}: LogoProps) {
  const logoClassName = ['site-logo', `site-logo--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <a aria-label="E.T Agent home" className={logoClassName} href={href} {...props}>
      <span className="site-logo__mark" aria-hidden="true">
        ET
      </span>
      <span className="site-logo__text">E.T Agent</span>
    </a>
  )
}
