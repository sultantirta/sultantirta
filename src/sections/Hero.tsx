import { useRef } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { useUI } from '../lib/ui-store'
import { gsap, prefersReducedMotion, scrollToTarget, SplitText, useGsap } from '../lib/motion'
import { IconArrowDown, IconPin } from '../components/icons'

export function Hero() {
  const { t } = useLang()
  const entered = useUI((s) => s.entered)
  const root = useRef<HTMLElement>(null)

  useGsap(
    root,
    () => {
      const q = gsap.utils.selector(root)
      if (prefersReducedMotion()) return
      const splits = q('[data-hero-name]').map((el) => SplitText.create(el, { type: 'chars', mask: 'chars' }))
      const chars = splits.flatMap((s) => s.chars)
      gsap.set(chars, { yPercent: 115, rotate: 6 })
      gsap.set(q('[data-hero-fade]'), { y: 24, opacity: 0 })
      gsap.set(q('[data-hero-rule]'), { scaleX: 0, transformOrigin: 'left' })
      if (!entered) return () => splits.forEach((s) => s.revert())

      const tl = gsap.timeline({ delay: 0.15 })
      tl.to(chars, { yPercent: 0, rotate: 0, duration: 1.5, ease: 'expo.out', stagger: 0.045 })
        .to(q('[data-hero-rule]'), { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.3)
        .to(q('[data-hero-fade]'), { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.6)

      // name drifts apart slightly as you scroll away
      gsap.to(q('[data-hero-name="first"]'), {
        xPercent: -6,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(q('[data-hero-name="last"]'), {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      return () => splits.forEach((s) => s.revert())
    },
    [entered],
  )

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-24 pt-24 md:px-10 md:pt-24">
      <div className="window-light -right-[25vmax] -top-[35vmax]" />

      <h1 className="relative mt-auto select-none pb-6 md:pb-10" aria-label={`${profile.firstName} ${profile.lastName}`}>
        <span data-hero-name="first" aria-hidden className="display block text-[clamp(3.6rem,min(21vw,24vh),15rem)] leading-[0.92] text-ink">
          {profile.firstName}
        </span>
        <span
          data-hero-name="last"
          aria-hidden
          className="accent block pl-[14vw] text-[clamp(4rem,min(23vw,26vh),16.5rem)] leading-[0.92] text-amber md:pl-[24vw]"
        >
          {profile.lastName}.
        </span>
      </h1>

      <div data-hero-rule className="relative h-px w-full bg-line" />

      <div className="relative grid gap-8 pt-8 md:grid-cols-12 md:items-end">
        {/* who & where, written as one readable statement */}
        <div className="md:col-span-7">
          <p data-hero-fade>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-2/70 px-3.5 py-1.5 text-xs text-ink-2 backdrop-blur">
              <span className="relative flex h-2 w-2">
                {profile.openToWork && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60" />}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${profile.openToWork ? 'bg-amber' : 'bg-muted'}`} />
              </span>
              {profile.openToWork ? t('hero_open') : t({ id: 'Sedang tidak mencari', en: 'Not looking right now' })}
            </span>
          </p>
          <p data-hero-fade className="mt-5 font-heading text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            {t(profile.role)}
          </p>
          <p data-hero-fade className="mt-1 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-ink-2">
            {t('hero_at')} <span className="accent text-[1.35em] text-amber">{profile.company}</span>
          </p>
        </div>

        <div className="flex flex-col gap-5 md:col-span-5 md:items-end">
          <p data-hero-fade className="flex items-center gap-2 text-sm text-ink-2">
            <IconPin size={16} className="text-amber" />
            {t('hero_based')} <span className="font-medium text-ink">{t(profile.location)}</span>
          </p>
          <div data-hero-fade className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollToTarget('#contact')}
              className="rounded-full bg-amber px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              {t({ id: 'Hubungi saya', en: 'Get in touch' })}
            </button>
            <button
              onClick={() => scrollToTarget('#portfolio')}
              className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink/40"
            >
              {t({ id: 'Lihat portofolio', en: 'See my work' })} <IconArrowDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
