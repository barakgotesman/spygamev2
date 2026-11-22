import { Autoplay, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useI18n } from '../i18n/useI18n'
import type { Location } from '../types/game'
import { Scene } from './Scene'

const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Endless, slowly drifting row of postcards; hover/touch pauses it, and it stays still with reduced motion. */
export function PlacesCarousel({ locations }: { locations: readonly Location[] }): React.JSX.Element {
  const { dir, locationName } = useI18n()
  const still = prefersReducedMotion()

  return (
    <Swiper
      // Re-mount when direction flips so the loop clones are rebuilt for RTL.
      key={dir}
      dir={dir}
      modules={[Autoplay, FreeMode]}
      loop
      loopAdditionalSlides={locations.length}
      slidesPerView="auto"
      spaceBetween={16}
      speed={still ? 300 : 5000}
      freeMode={{ enabled: true, momentum: false }}
      autoplay={still ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
      allowTouchMove
      className="places-carousel -mx-5 px-5! pt-1! pb-6!"
    >
      {locations.map((loc, i) => (
        <SwiperSlide key={loc.id} className="w-56!">
          <figure
            className={`rounded-lg border-[3px] border-ink bg-card p-1.5 shadow-hard ${i % 2 ? 'rotate-1' : '-rotate-1'}`}
          >
            <Scene location={loc} className="aspect-[4/3] w-full rounded-sm" />
            <figcaption className="display px-1 pt-2 pb-1 text-xl">
              <bdi>{locationName(loc)}</bdi>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
