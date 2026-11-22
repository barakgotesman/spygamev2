import '@testing-library/jest-dom/vitest'

// jsdom doesn't implement scrolling; the router calls it on navigation.
window.scrollTo = () => {}

// jsdom has no matchMedia; GSAP reads it on load. Nothing matches, so motion stays off in tests.
window.matchMedia = (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList
