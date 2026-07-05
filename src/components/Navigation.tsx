import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Logo } from './Logo'
import { scrollToSection } from '../utils/scroll'

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#governance-model', label: 'Governance model' },
  { href: '/governance-demo', label: 'Interactive Governance' },
  { href: '/trust', label: 'Trust Centre' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = window.location.pathname
  const currentHash = window.location.hash
  const contactTarget = '/#contact'

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    const scrollPosition = window.scrollY
    const { body, documentElement } = document
    const previousBodyStyles = {
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    }
    const previousDocumentStyles = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    }
    let isScrollLocked = false

    const preventBackgroundScroll = (event: Event) => {
      event.preventDefault()
    }

    const lockScroll = () => {
      if (isScrollLocked) {
        return
      }

      body.style.overflow = 'hidden'
      body.style.overscrollBehavior = 'none'
      documentElement.style.overflow = 'hidden'
      documentElement.style.overscrollBehavior = 'none'
      document.addEventListener('touchmove', preventBackgroundScroll, { passive: false })
      document.addEventListener('wheel', preventBackgroundScroll, { passive: false })
      isScrollLocked = true
    }

    const restoreScroll = () => {
      if (!isScrollLocked) {
        return
      }

      document.removeEventListener('touchmove', preventBackgroundScroll)
      document.removeEventListener('wheel', preventBackgroundScroll)
      body.style.overflow = previousBodyStyles.overflow
      body.style.overscrollBehavior = previousBodyStyles.overscrollBehavior
      documentElement.style.overflow = previousDocumentStyles.overflow
      documentElement.style.overscrollBehavior = previousDocumentStyles.overscrollBehavior
      window.scrollTo(0, scrollPosition)
      isScrollLocked = false
    }

    const syncScrollLock = () => {
      if (mobileQuery.matches) {
        lockScroll()
        return
      }

      restoreScroll()
    }

    syncScrollLock()
    mobileQuery.addEventListener('change', syncScrollLock)

    return () => {
      mobileQuery.removeEventListener('change', syncScrollLock)
      restoreScroll()
    }
  }, [isOpen])

  const isActive = (href: string) => {
    if (href === '/#home') {
      return currentPath === '/' && (currentHash === '' || currentHash === '#home')
    }

    if (href.startsWith('/#')) {
      return currentPath === '/' && currentHash === href.slice(1)
    }

    return currentPath === href
  }
  const navigateToContact = () => {
    setIsOpen(false)

    if (window.location.pathname === '/') {
      scrollToSection('contact')
      return
    }

    window.location.assign(contactTarget)
  }

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
            <a
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={isActive(item.href) ? 'site-nav__link site-nav__link--active' : 'site-nav__link'}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="site-nav__contact" onClick={navigateToContact} type="button">
            Contact Enterprise Team
          </button>
        </nav>
        <Button onClick={navigateToContact} size="sm" variant="outline">
          Contact Enterprise Team
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
