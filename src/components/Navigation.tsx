import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Button } from './Button'
import { Logo } from './Logo'
import { scrollToSection } from '../utils/scroll'

const navItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#governance-model', label: 'Governance model' },
  { href: '/governance-demo', label: 'Interactive Governance' },
  { href: '/use-cases', label: 'Use Cases' },
  { href: '/demo/command-centre', label: 'Command Centre' },
  { href: '/trust', label: 'Trust Centre' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigationRef = useRef<HTMLElement>(null)
  const releaseScrollRef = useRef<(() => void) | null>(null)
  const currentPath = window.location.pathname
  const currentHash = window.location.hash
  const contactTarget = '/#contact'

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const mobileQuery = window.matchMedia('(max-width: 1320px)')
    const scrollPosition = window.scrollY
    const { documentElement } = document
    const previousDocumentStyles = {
      overflow: documentElement.style.overflow,
      overscrollBehavior: documentElement.style.overscrollBehavior,
    }
    let isScrollLocked = false

    const preventBackgroundScroll = (event: Event) => {
      if (!(event.target instanceof Node) || !navigationRef.current?.contains(event.target)) {
        event.preventDefault()
      }
    }

    const lockScroll = () => {
      if (isScrollLocked) {
        return
      }

      // An overflow-hidden body becomes the sticky header's scroll container.
      // Lock only the viewport so the header keeps its visible sticky position.
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
      documentElement.style.overflow = previousDocumentStyles.overflow
      documentElement.style.overscrollBehavior = previousDocumentStyles.overscrollBehavior
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
      isScrollLocked = false
    }

    releaseScrollRef.current = restoreScroll

    const syncScrollLock = () => {
      if (mobileQuery.matches) {
        lockScroll()
        return
      }

      restoreScroll()
      setIsOpen(false)
    }

    if (mobileQuery.matches) {
      lockScroll()
    }
    mobileQuery.addEventListener('change', syncScrollLock)

    return () => {
      mobileQuery.removeEventListener('change', syncScrollLock)
      restoreScroll()
      releaseScrollRef.current = null
    }
  }, [isOpen])

  const closeMenu = () => {
    // Restore before a link or contact action moves to its destination.
    releaseScrollRef.current?.()
    setIsOpen(false)
  }

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isOpen || event.defaultPrevented) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      closeMenu()
      event.currentTarget.querySelector<HTMLButtonElement>('.site-header__toggle')
        ?.focus({ preventScroll: true })
      return
    }

    if (event.key === 'Tab') {
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a, button'))
        .filter((control) => control.getClientRects().length > 0 && getComputedStyle(control).visibility !== 'hidden')
      const first = controls[0]
      const last = controls[controls.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
  }

  const isActive = (href: string) => {
    if (href === '/use-cases') {
      return ['/use-cases', '/demo/delivery-exception-review', '/demo/fraud-reimbursement-review'].includes(currentPath)
    }
    if (href === '/#home') {
      return currentPath === '/' && (currentHash === '' || currentHash === '#home')
    }

    if (href.startsWith('/#')) {
      return currentPath === '/' && currentHash === href.slice(1)
    }

    return currentPath === href
  }
  const navigateToContact = () => {
    closeMenu()

    if (window.location.pathname === '/') {
      scrollToSection('contact')
      return
    }

    window.location.assign(contactTarget)
  }

  return (
    <header className="site-header" onKeyDown={handleMenuKeyDown}>
      <div className="site-header__inner">
        <Logo />
        <nav
          aria-label="Primary navigation"
          className={isOpen ? 'site-nav site-nav--open' : 'site-nav'}
          id="primary-navigation"
          ref={navigationRef}
        >
          {navItems.map((item) => (
            <a
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={isActive(item.href) ? 'site-nav__link site-nav__link--active' : 'site-nav__link'}
              href={item.href}
              key={item.href}
              onClick={closeMenu}
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
          onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}
