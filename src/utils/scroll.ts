function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId)

  if (!target) {
    return
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
  target.focus({ preventScroll: true })

  if (window.location.hash !== `#${sectionId}`) {
    window.history.replaceState(null, '', `#${sectionId}`)
  }
}
