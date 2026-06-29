import type { HTMLAttributes } from 'react'
import etAgentLogo from '../assets/images/et-agent-logo.jpg'

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
      <span className="site-logo__mark">
        <img
          alt="E.T Agent logo"
          className="site-logo__image"
          height="36"
          src={etAgentLogo}
          width="36"
        />
      </span>
      <span className="site-logo__text">E.T Agent</span>
    </a>
  )
}
