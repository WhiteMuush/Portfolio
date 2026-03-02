import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

const TABLET_BREAKPOINT = 1024
const SMALL_MOBILE_BREAKPOINT = 480

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`
    )
    const onChange = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    onChange()
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isTablet
}

export function useIsSmallMobile() {
  const [isSmallMobile, setIsSmallMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${SMALL_MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsSmallMobile(window.innerWidth < SMALL_MOBILE_BREAKPOINT)
    }
    mql.addEventListener('change', onChange)
    onChange()
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isSmallMobile
}

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl'

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('lg')

  React.useEffect(() => {
    const getBreakpoint = (): Breakpoint => {
      const width = window.innerWidth
      if (width < SMALL_MOBILE_BREAKPOINT) return 'sm'
      if (width < MOBILE_BREAKPOINT) return 'md'
      if (width < TABLET_BREAKPOINT) return 'lg'
      return 'xl'
    }

    const onChange = () => setBreakpoint(getBreakpoint())

    window.addEventListener('resize', onChange)
    onChange()
    return () => window.removeEventListener('resize', onChange)
  }, [])

  return breakpoint
}

export function useIsTouchDevice() {
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