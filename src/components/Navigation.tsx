import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'
import { Logo } from './Logo'

const navItems = [
  { href: '#tokens', label: 'Tokens' },
  { href: '#components', label: 'Components' },
  { href: '#accessibility', label: 'Accessibility' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav
          aria-label="Primary navigation"
          className={isOpen ? 'site-nav site-nav--open' : 'site-nav'}
          id="primary-navigation"
        >
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button size="sm" variant="outline">
          Contact
        </Button>
        <button
          aria-controls="primary-navigation"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="site-header__toggle"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
