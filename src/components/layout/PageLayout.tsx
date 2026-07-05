import type { MouseEvent, ReactNode } from 'react'
import { Navigation } from '../Navigation'
import { scrollToSection } from '../../utils/scroll'

type PageLayoutProps = {
  children: ReactNode
  footer?: ReactNode
}

const footerGroups = [
  {
    links: [
      { href: '/governance-demo', label: 'Interactive Governance' },
      { href: '/trust', label: 'Trust Centre' },
      { href: '/trust#documentation-hub', label: 'Documentation' },
    ],
    title: 'Product',
  },
  {
    links: [
      { href: 'https://github.com/ermyg1/etagent-website', label: 'GitHub' },
      { href: 'https://www.linkedin.com/in/ermiyas-t/', label: 'LinkedIn' },
      { href: '/#contact', label: 'Contact' },
    ],
    title: 'Company',
  },
  {
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-use', label: 'Terms of Use' },
    ],
    title: 'Legal',
  },
] as const

function DefaultFooter() {
  const currentYear = new Date().getFullYear()
  const navigateToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== '/') {
      return
    }

    event.preventDefault()
    scrollToSection('contact')
  }

  return (
    <div className="site-footer">
      <div className="site-footer__primary">
        <div className="site-footer__identity">
          <p className="site-footer__brand">E.T Agent</p>
          <p className="site-footer__tagline">Governance-first Enterprise AI</p>
          <p className="site-footer__copyright">
            © {currentYear} E.T Agent.
            <br />
            All rights reserved.
          </p>
          <p className="site-footer__positioning">
            E.T Agent™ is a governance-first AI platform designed for
            organisations that require intelligent automation with
            human-approved execution.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="site-footer__groups">
          {footerGroups.map((group) => (
            <div className="site-footer__group" key={group.title}>
              <h2 className="site-footer__group-title">{group.title}</h2>
              <ul className="site-footer__links">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.label === 'Contact' ? navigateToContact : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function PageLayout({ children, footer }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <Navigation />
      <main className="page-layout__main">{children}</main>
      <footer className="page-layout__footer">
        {footer ?? <DefaultFooter />}
      </footer>
    </div>
  )
}
