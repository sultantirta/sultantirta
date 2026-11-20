import { useEffect, useRef } from 'react'
import { profile, type L } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { getLenis, gsap, prefersReducedMotion } from '../lib/motion'
import { SectionHead } from '../components/SectionHead'

const label = (item: string | L, lang: 'id' | 'en') => (typeof item === 'string' ? item : item[lang])

/** Infinite row that speeds up with scroll velocity and slows down on hover. */
function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el || prefersReducedMotion()) return
    gsap.set(el, { xPercent: reverse ? -50 : 0 })
    const tween = gsap.to(el, { xPercent: reverse ? 0 : -50, duration: 38, ease: 'none', repeat: -1 })
    let hovered = false
    const speed = { v: 1 }
    const apply = () => tween.timeScale(speed.v * (hovered ? 0.25 : 1))

    const lenis = getLenis()
    const onScroll = ({ velocity }: { velocity: number }) => {
      const boost = 1 + Math.min(Math.abs(velocity) / 6, 5)
      gsap.to(speed, { v: boost, duration: 0.2, overwrite: true, onUpdate: apply })
      gsap.to(speed, { v: 1, duration: 1.2, delay: 0.25, ease: 'power2.out', onUpdate: apply })
    }
    lenis?.on('scroll', onScroll)
    const enter = () => {
      hovered = true
      apply()
    }
    const leave = () => {
      hovered = false
      apply()
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    return () => {
      tween.kill()
      lenis?.off('scroll', onScroll)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
    }
  }, [reverse, items.length])

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((s, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`whitespace-nowrap px-6 leading-[1.15] transition-colors duration-300 hover:text-amber md:px-10 ${
              i % 2 ? 'accent text-[clamp(2.6rem,6.4vw,6rem)] text-ink-2' : 'display text-[clamp(2.2rem,5.6vw,5.2rem)] text-ink'
            }`}
          >
            {s}
          </span>
          <span className="text-2xl text-amber">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden py-2" aria-hidden>
      <div ref={track} className="flex w-max will-change-transform">
        {row}
        {row}
      </div>
    </div>
  )
}

export function Skills() {
  const { t, lang } = useLang()
  const core = profile.coreSkills
  const tools = profile.tools
  const rowA = core.map((c) => t(c.title))
  const rowB = tools.flatMap((g) => g.items.map((s) => label(s, lang)))

  return (
    <section id="skills" className="relative overflow-x-clip py-24 md:py-40">
      <div className="px-4 md:px-10">
        <SectionHead title={t('sec_skills')} />
      </div>

      <div className="-rotate-[1.5deg] border-y border-line bg-bg-2/60 py-4">
        <Marquee items={rowA} />
        <Marquee items={rowB} reverse />
      </div>

      <div className="mt-20 px-4 md:px-10">
        <p className="label mb-6">{t('skills_core')}</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((c, i) => (
            <li key={i} data-reveal className="group rounded-2xl bg-bg-2 p-6 transition-colors duration-300 hover:bg-bg-3 md:p-7">
              <span className="font-heading text-sm font-semibold text-amber">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug tracking-tight text-ink">{t(c.title)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{t(c.desc)}</p>
            </li>
          ))}
        </ul>

        <p className="label mb-6 mt-16">{t('skills_tools')}</p>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {tools.map((g, i) => (
            <div key={i} data-reveal>
              <h3 className="font-heading text-base font-semibold tracking-tight text-ink">{g.group}</h3>
              {g.desc && <p className="mt-1 text-sm text-muted">{t(g.desc)}</p>}
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s, j) => (
                  <li
                    key={j}
                    className="rounded-full border border-line px-4 py-2 text-sm text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber hover:bg-amber hover:text-bg"
                  >
                    {label(s, lang)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
