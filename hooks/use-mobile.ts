import * as React from 'react'

// ─── Breakpoints ────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

// ─── Helpers internes ────────────────────────────────────────────────────────

/**
 * Factory générique : retourne true si la fenêtre correspond à la media query.
 * SSR-safe : initialise à `undefined` côté serveur.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    mql.addEventListener('change', onChange)
    setMatches(mql.matches)

    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

// ─── Hooks publics ───────────────────────────────────────────────────────────

/** < 480px */
export function useIsSmallMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.sm - 1}px)`)
}

/** < 768px */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.md - 1}px)`)
}

/** 768px – 1023px */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`
  )
}

/** ≥ 1024px */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`)
}

/** Retourne le breakpoint actif : 'sm' | 'md' | 'lg' | 'xl' */
export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'lg'
    return resolveBreakpoint(window.innerWidth)
  })

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const onChange = () => setBp(resolveBreakpoint(window.innerWidth))

    // ResizeObserver > resize event (pas de throttle natif sur resize)
    const ro = new ResizeObserver(() => onChange())
    ro.observe(document.documentElement)

    return () => ro.disconnect()
  }, [])

  return bp
}

/** Détecte les appareils tactiles */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(false)

  React.useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    )
  }, [])

  return isTouch
}

// ─── Utils ───────────────────────────────────────────────────────────────────

function resolveBreakpoint(width: number): Breakpoint {
  if (width < BREAKPOINTS.sm) return 'sm'
  if (width < BREAKPOINTS.md) return 'md'
  if (width < BREAKPOINTS.lg) return 'lg'
  return 'xl'
}