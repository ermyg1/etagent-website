import { useEffect, useMemo, useState } from 'react'
import { scrollToSection } from '../utils/scroll'

export type SectionNavigationItem = {
  id: string
  title: string
}

type SectionNavigationProps = {
  activeId?: string
  ariaLabel: string
  sections: SectionNavigationItem[]
}

export function SectionNavigation({
  activeId,
  ariaLabel,
  sections,
}: SectionNavigationProps) {
  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections])
  const [observedActiveId, setObservedActiveId] = useState(
    activeId ?? (window.location.hash.replace('#', '') || sectionIds[0]),
  )
  const currentActiveId = activeId ?? observedActiveId

  useEffect(() => {
    if (activeId || sectionIds.length === 0) {
      return undefined
    }

    const sectionElements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sectionElements.length === 0 || !('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setObservedActiveId(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0, 0.2, 0.45, 0.7],
      },
    )

    sectionElements.forEach((sectionElement) => observer.observe(sectionElement))

    return () => observer.disconnect()
  }, [activeId, sectionIds])

  return (
    <nav aria-label={ariaLabel} className="section-nav">
      <div className="section-nav__inner">
        {sections.map((section) => (
          <a
            aria-current={currentActiveId === section.id ? 'true' : undefined}
            href={`#${section.id}`}
            key={section.id}
            onClick={(event) => {
              event.preventDefault()
              scrollToSection(section.id)
            }}
          >
            {section.title}
          </a>
        ))}
      </div>
    </nav>
  )
}
