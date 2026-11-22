import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { RefObject } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const rtl = (): boolean => document.documentElement.dir === 'rtl'

/**
 * The landing page's choreography: a staged hero, then each section printing itself onto the page
 * as it scrolls in. Everything lives inside `matchMedia`, so reduced motion (or no matchMedia at
 * all, as in tests) leaves the page fully static and visible.
 */
export function useLandingMotion(scope: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      if (typeof window.matchMedia !== 'function') return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Hero: eyebrow, headline, the pink highlighter sweeping across, then the rest.
        const markFrom = rtl() ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero="eyebrow"]', { y: 16, autoAlpha: 0, duration: 0.5 })
          .from('[data-hero="title"]', { y: 36, autoAlpha: 0, duration: 0.7 }, '<0.1')
          .from('[data-hero="mark"]', { clipPath: markFrom, duration: 0.6, ease: 'power2.inOut' }, '>-0.25')
          .from('[data-hero="lede"]', { y: 20, autoAlpha: 0, duration: 0.6 }, '<0.15')
          .from(
            '[data-hero="cta"] > *',
            {
              y: 24,
              autoAlpha: 0,
              scale: 0.94,
              duration: 0.5,
              stagger: 0.1,
              ease: 'back.out(1.8)',
              // Buttons carry their own CSS transitions; left on, they chase GSAP's every frame and never settle.
              onStart: function () {
                gsap.set(this.targets(), { transition: 'none' })
              },
              clearProps: 'transition,opacity,visibility,transform,scale',
            },
            '<0.1',
          )

        // The postcard fan drifts slower than the page, so it feels printed on a deeper layer.
        gsap.to('[data-hero="fan"]', {
          y: -48,
          ease: 'none',
          scrollTrigger: { trigger: '[data-hero="fan"]', start: 'top 70%', end: 'bottom top', scrub: 0.6 },
        })

        // Section titles slide in with a hard-edged wipe, like a stamp pressed down.
        gsap.utils.toArray<HTMLElement>('[data-section] > h2').forEach((h) => {
          gsap.from(h, {
            y: 28,
            rotate: -1.5,
            autoAlpha: 0,
            duration: 0.6,
            ease: 'back.out(1.6)',
            scrollTrigger: { trigger: h, start: 'top 88%', once: true },
          })
        })

        // Steps: postcards are dealt onto the table one after another. Each tween hides its card
        // immediately, so nothing flashes visible before it is dealt.
        gsap.utils.toArray<HTMLElement>('#steps ol > li').forEach((li, i) => {
          const at = { trigger: li, start: 'top 90%', once: true }
          gsap.from(li, { y: 90, rotate: i % 2 ? 6 : -6, autoAlpha: 0, duration: 0.8, delay: i * 0.12, ease: 'back.out(1.4)', scrollTrigger: at })
          gsap.from(li.querySelector('[data-badge]'), { scale: 0, rotate: -90, duration: 0.5, delay: 0.3 + i * 0.12, ease: 'back.out(3)', scrollTrigger: at })
        })

        gsap.from('#places .places-carousel', {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '#places .places-carousel', start: 'top 92%', once: true },
        })

        gsap.utils.toArray<HTMLElement>('#why ul > li').forEach((li, i) => {
          const at = { trigger: li, start: 'top 92%', once: true }
          gsap.from(li, { y: 40, scale: 0.92, autoAlpha: 0, duration: 0.5, delay: (i % 3) * 0.08, ease: 'back.out(1.6)', scrollTrigger: at })
          gsap.from(li.querySelector('[data-dot]'), { scale: 0, duration: 0.4, delay: 0.2 + (i % 3) * 0.08, ease: 'back.out(4)', scrollTrigger: at })
        })

        // The closing band grows into place as it nears the middle of the screen.
        gsap.from('[data-cta="band"]', {
          scale: 0.92,
          rotate: rtl() ? 1.5 : -1.5,
          ease: 'none',
          scrollTrigger: { trigger: '[data-cta="band"]', start: 'top 100%', end: 'top 55%', scrub: 0.5 },
        })
      })

      return () => mm.revert()
    },
    { scope },
  )
}
