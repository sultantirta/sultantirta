import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { useAudio } from '../audio/useAudioStore'
import { engine } from '../audio/engine'
import { useUI } from '../lib/ui-store'
import { gsap, prefersReducedMotion, SplitText } from '../lib/motion'
import { Magnetic } from './Magnetic'

const SEEN_KEY = 'st-intro-seen'

/**
 * Loading gate. Preloads fonts + the first track, then asks the visitor
 * how they want to enter. That click is also the gesture browsers require
 * before audio may play.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t, lang, toggleLang } = useLang()
  const start = useAudio((s) => s.start)
  const setEntered = useUI((s) => s.setEntered)
  const root = useRef<HTMLDivElement>(null)
  const counter = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const leaving = useRef(false)

  // loading sequence
  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* ignore */
    }
    const reduced = prefersReducedMotion()
    const minTime = reduced ? 300 : seen ? 900 : 2400
    const progress = { v: 0 }
    const render = () => {
      if (counter.current) counter.current.textContent = String(Math.round(progress.v)).padStart(3, '0')
    }
    const crawl = gsap.to(progress, { v: 88, duration: minTime / 1000, ease: 'power2.out', onUpdate: render })

    let cancelled = false
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      engine.preload(0),
      new Promise((r) => setTimeout(r, minTime)),
    ]).then(() => {
      if (cancelled) return
      crawl.kill()
      gsap.to(progress, {
        v: 100,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate: render,
        onComplete: () => setReady(true),
      })
    })
    return () => {
      cancelled = true
      crawl.kill()
    }
  }, [])

  // name reveal
  useEffect(() => {
    const el = root.current?.querySelector('[data-intro-name]')
    if (!el || prefersReducedMotion()) return
    const split = SplitText.create(el, { type: 'chars', mask: 'chars' })
    gsap.from(split.chars, { yPercent: 120, duration: 1.3, ease: 'expo.out', stagger: 0.05, delay: 0.2 })
    return () => split.revert()
  }, [])

  // choices fade in
  useEffect(() => {
    if (!ready || !root.current) return
    const items = root.current.querySelectorAll('[data-intro-choice]')
    gsap.fromTo(items, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 })
    ;(items[0]?.querySelector('button') as HTMLButtonElement | null)?.focus({ preventScroll: true })
  }, [ready])

  const enter = (withSound: boolean) => {
    if (leaving.current) return
    leaving.current = true
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
    start(withSound) // must run synchronously inside the click handler

    const el = root.current!
    if (prefersReducedMotion()) {
      setEntered(true)
      onDone()
      return
    }
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(el.querySelectorAll('[data-intro-content]'), { y: -40, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
      .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, '-=0.15')
      .call(() => setEntered(true), [], '-=0.75')
  }

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[70] flex flex-col bg-bg px-4 py-5 md:px-10 md:py-8"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      role="dialog"
      aria-label="Intro"
    >
      <div className="window-light -left-[30vmax] -top-[30vmax] opacity-60" />

      <div data-intro-content className="label relative flex items-center justify-between">
        <span>
          {profile.firstName} {profile.lastName} — Portfolio
        </span>
        <div className="flex items-center gap-4">
          <button onClick={toggleLang} className="transition-colors hover:text-ink" aria-label="Language">
            <span className={lang === 'id' ? 'text-ink' : ''}>ID</span> / <span className={lang === 'en' ? 'text-ink' : ''}>EN</span>
          </button>
          {!ready && (
            <button onClick={() => enter(false)} className="transition-colors hover:text-ink">
              {t('intro_skip')} →
            </button>
          )}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <div data-intro-content className="relative mb-10 h-[clamp(120px,22vw,220px)] w-[clamp(120px,22vw,220px)]">
          <div className="vinyl absolute inset-0" data-playing="true" style={{ animationDuration: ready ? '2s' : '6s' }} />
          {/* tonearm */}
          <div
            className="absolute -right-[18%] -top-[8%] h-[70%] w-[6px] origin-top rounded-full bg-ink-2/70 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)]"
            style={{ transform: ready ? 'rotate(28deg)' : 'rotate(8deg)' }}
          />
        </div>

        <h1 data-intro-content className="display text-[clamp(3rem,9vw,8rem)] text-ink">
          <span data-intro-name className="inline-block">
            {profile.firstName} <em className="accent font-normal text-amber">{profile.lastName}</em>
          </span>
        </h1>
        <p data-intro-content className="label mt-6">
          {t('intro_tagline')}
        </p>

        <div className="mt-12 flex min-h-[64px] flex-col items-center gap-4 sm:flex-row">
          {ready ? (
            <>
              <div data-intro-choice>
                <Magnetic>
                  <button
                    onClick={() => enter(true)}
                    className="group flex items-center gap-3 rounded-full bg-amber px-7 py-4 text-[15px] font-medium text-bg transition-transform hover:scale-[1.03]"
                  >
                    <span className="flex h-3 items-end gap-[2px]" aria-hidden>
                      {[0.6, 1, 0.4, 0.8].map((h, i) => (
                        <span
                          key={i}
                          className="w-[2px] origin-bottom animate-pulse bg-bg"
                          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </span>
                    {t('intro_enter_sound')}
                  </button>
                </Magnetic>
              </div>
              <div data-intro-choice>
                <Magnetic>
                  <button
                    onClick={() => enter(false)}
                    className="rounded-full border border-line px-7 py-4 text-[15px] text-ink-2 transition-colors hover:border-ink/40 hover:text-ink"
                  >
                    {t('intro_enter_silent')}
                  </button>
                </Magnetic>
              </div>
            </>
          ) : (
            <p className="label animate-pulse">{t('intro_loading')}…</p>
          )}
        </div>
      </div>

      <div data-intro-content className="relative flex items-end justify-between">
        <span className="label">© {new Date().getFullYear()}</span>
        <span ref={counter} className="font-mono text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight text-ink tabular-nums">
          000
        </span>
      </div>
    </div>
  )
}
