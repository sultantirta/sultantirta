import { useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { pad2 } from '../lib/format'
import { asset } from '../lib/asset'
import { gsap, scrollToTarget, useGsap } from '../lib/motion'
import { SectionHead } from '../components/SectionHead'
import { ProjectCover } from '../components/Artwork'
import { Sheet } from '../components/Sheet'
import { IconArrowUpRight } from '../components/icons'

/**
 * Desktop: the section pins and vertical scroll drives a horizontal reel of
 * project "sleeves" (with parallax inside each cover).
 * Mobile: a native swipe carousel with scroll-snap.
 */
export function Portfolio() {
  const { t } = useLang()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [lastIdx, setLastIdx] = useState(0)
  const [active, setActive] = useState(0)
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const projects = profile.portfolio
  const n = projects.length
  const shownIdx = openIdx ?? lastIdx
  const cur = projects[shownIdx]

  const open = (i: number) => {
    setLastIdx(i)
    setOpenIdx(i)
  }
  const setProgress = (p: number) => {
    if (bar.current) bar.current.style.transform = `scaleX(${p})`
    const i = Math.min(n - 1, Math.round(p * n))
    setActive((prev) => (prev === i ? prev : i))
  }

  useGsap(root, () => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current!
      const distance = () => el.scrollWidth - el.clientWidth
      const reel = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      })
      el.querySelectorAll<HTMLElement>('[data-parallax]').forEach((layer) => {
        gsap.fromTo(
          layer,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: layer.closest('li'),
              containerAnimation: reel,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })
    })
    return () => mm.revert()
  })

  // mobile carousel progress
  const onTrackScroll = () => {
    const el = track.current
    if (!el || window.innerWidth >= 768) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
  }

  return (
    <section ref={root} id="portfolio" className="relative py-24 md:py-0">
      <div ref={pin} className="md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden md:pt-16">
        <div className="px-4 md:px-10">
          <SectionHead
            title={t('sec_portfolio')}
            className="md:mb-8!"
            aside={
              <span className="label tabular-nums">
                <span className="text-ink">{pad2(active + 1)}</span> / {pad2(n)}
              </span>
            }
          />
        </div>

        <ul
          ref={track}
          onScroll={onTrackScroll}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:snap-none md:gap-12 md:overflow-visible md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => (
            <li key={p.slug} className="w-[84vw] shrink-0 snap-start md:w-auto">
              <button data-cursor={t('work_view')} onClick={() => open(i)} className="group block w-full text-left">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg md:h-[min(46vh,540px)] md:w-auto">
                  <div data-parallax className="absolute inset-y-0 -left-[9%] -right-[9%]">
                    <div className="h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]">
                      <ProjectCover project={p} index={i} showTitle={false} />
                    </div>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full border border-ink/20 bg-bg/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink backdrop-blur-md">
                    {p.year}
                  </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <p className="label">{t(p.category)}</p>
                    <p className="display mt-2 truncate pb-1 text-[clamp(1.8rem,3vw,2.8rem)] text-ink transition-colors duration-300 group-hover:text-amber">
                      {p.title}
                    </p>
                  </div>
                  <span className="mb-2 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-all duration-500 group-hover:rotate-45 group-hover:border-amber group-hover:bg-amber group-hover:text-bg">
                    <IconArrowUpRight size={18} />
                  </span>
                </div>
              </button>
            </li>
          ))}

          {/* closing card that hands off to Contact */}
          <li className="w-[84vw] shrink-0 snap-start md:w-auto">
            <button
              onClick={() => scrollToTarget('#contact')}
              className="group flex aspect-[16/10] w-full flex-col justify-between rounded-lg border border-dashed border-line p-6 text-left transition-colors duration-500 hover:border-amber md:h-[min(46vh,540px)] md:w-auto md:p-10"
            >
              <span className="label">{t({ id: 'Berikutnya', en: 'Up next' })}</span>
              <span className="display text-[clamp(2rem,3.4vw,3.4rem)] text-ink">
                {t({ id: 'Proyekmu', en: 'Your project' })}
                <br />
                <em className="accent font-normal text-amber">{t({ id: 'bisa jadi berikutnya.', en: 'could be next.' })}</em>
              </span>
              <span className="flex items-center gap-2 text-sm text-ink-2 transition-colors group-hover:text-amber">
                {t('sec_contact')} <IconArrowUpRight size={16} />
              </span>
            </button>
          </li>
        </ul>

        <div className="relative mx-4 mt-8 h-px bg-line md:mx-10">
          <div ref={bar} className="absolute inset-0 origin-left bg-amber" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      <Sheet open={openIdx !== null} onClose={() => setOpenIdx(null)} label={`${t('sec_portfolio')} — ${pad2(shownIdx + 1)}`}>
        {cur && (
          <article>
            <p className="label">{t(cur.category)}</p>
            <h3 className="display mt-3 text-[clamp(2.4rem,6vw,4.2rem)] text-ink">{cur.title}</h3>
            <p className="mt-4 text-lg text-ink-2">{t(cur.summary)}</p>

            <div className="mt-8 aspect-[16/10] overflow-hidden rounded-lg">
              <ProjectCover project={cur} index={shownIdx} />
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-line py-6">
              <div>
                <dt className="label">{t('work_role')}</dt>
                <dd className="mt-2 text-sm text-ink">{t(cur.role)}</dd>
              </div>
              <div>
                <dt className="label">{t('work_year')}</dt>
                <dd className="mt-2 text-sm text-ink">{cur.year}</dd>
              </div>
              <div>
                <dt className="label">{t('work_tools')}</dt>
                <dd className="mt-2 text-sm text-ink">{cur.tools.join(', ')}</dd>
              </div>
            </dl>

            <p className="mt-8 text-[17px] leading-relaxed text-ink-2">{t(cur.description)}</p>

            {cur.gallery && cur.gallery.length > 0 && (
              <div className="mt-8 grid gap-4">
                {cur.gallery.map((src) => (
                  <img key={src} src={asset(src)} alt="" loading="lazy" className="w-full rounded-lg" />
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              {cur.liveUrl && (
                <a
                  href={cur.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
                >
                  {t('work_live')} <IconArrowUpRight size={16} />
                </a>
              )}
              {cur.repoUrl && (
                <a
                  href={cur.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-ink transition-colors hover:border-ink/40"
                >
                  {t('work_repo')} <IconArrowUpRight size={16} />
                </a>
              )}
            </div>

            <div className="mt-14 flex justify-between border-t border-line pt-6">
              <button onClick={() => open((shownIdx - 1 + n) % n)} className="label transition-colors hover:text-ink">
                ← {projects[(shownIdx - 1 + n) % n].title}
              </button>
              <button onClick={() => open((shownIdx + 1) % n)} className="label transition-colors hover:text-ink">
                {projects[(shownIdx + 1) % n].title} →
              </button>
            </div>
          </article>
        )}
      </Sheet>
    </section>
  )
}
