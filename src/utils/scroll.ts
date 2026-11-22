import type { MouseEvent } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function followSectionLink(event: MouseEvent<HTMLAnchorElement>) {
  const link = event.currentTarget
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
      event.shiftKey || event.altKey || link.origin !== window.location.origin ||
      link.pathname !== window.location.pathname || link.search !== window.location.search) {
    return
  }

  const target = document.getElementById(link.hash.slice(1))
  if (!target) {
    return
  }

  event.preventDefault()
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  target.focus({ preventScroll: true })

  if (window.location.hash !== link.hash) {
    window.history.replaceState(null, '', link.hash)
  }
}
