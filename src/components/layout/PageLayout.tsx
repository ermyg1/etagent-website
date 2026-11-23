import type { ReactNode } from 'react'
import { Navigation } from '../Navigation'
import { followSectionLink } from '../../utils/scroll'

type PageLayoutProps = {
  children: ReactNode
  footer?: ReactNode
}

const footerGroups = [
  {
    links: [
      { href: '/governance-demo', label: 'Interactive Governance' },
      { href: '/trust', label: 'Trust Centre' },
      { href: '/trust#documentation-hub', label: 'Document availability' },
    ],
    title: 'Product',
  },
  {
    links: [
      { href: 'https://github.com/ermyg1/etagent-website', label: 'GitHub' },
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
            Explore E.T Agent’s proposed governance architecture and synthetic enterprise workflows.
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
                      onClick={link.href.includes('#') ? followSectionLink : undefined}
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
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navigation />
      <main className="page-layout__main" id="main-content" tabIndex={-1}>{children}</main>
      <footer className="page-layout__footer">
        {footer ?? <DefaultFooter />}
      </footer>
    </div>
  )
}
