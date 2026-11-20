import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { useAudio } from '../audio/useAudioStore'
import { useUI } from '../lib/ui-store'
import { scrollToTarget } from '../lib/motion'

const isMac = typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent)

function useClock(timeZone: string) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(now)
  return { time: parts, blink: now.getSeconds() % 2 === 0 }
}

export function Nav() {
  const { t, lang, setLang } = useLang()
  const entered = useUI((s) => s.entered)
  const setPaletteOpen = useUI((s) => s.setPaletteOpen)
  const playing = useAudio((s) => s.playing)
  const toggle = useAudio((s) => s.toggle)
  const { time, blink } = useClock(profile.timezone)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // hide on scroll down, reveal on scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 300)
        last = y
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [hh, mm] = time.split(':')

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-10"
      style={{
        transform: hidden || !entered ? 'translateY(-110%)' : 'none',
        transition: 'transform .7s var(--ease-out-expo)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/90 to-transparent transition-opacity duration-500"
        style={{ opacity: scrolled ? 1 : 0 }}
      />
      <nav className="relative flex items-center justify-between gap-4">
        <button onClick={() => scrollToTarget(0)} className="group flex items-center gap-3" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line font-heading text-xs font-semibold tracking-tight text-ink transition-colors group-hover:border-amber group-hover:text-amber">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </span>
          <span className="hidden text-sm text-ink-2 transition-colors group-hover:text-ink sm:inline">
            {profile.firstName} {profile.lastName}
          </span>
        </button>

        <p className="label hidden md:block" aria-label={`${time} ${profile.timezoneLabel}`}>
          {profile.location.en.split(',')[0]} — <span className="text-ink tabular-nums">{hh}</span>
          <span className={`text-ink transition-opacity ${blink ? 'opacity-100' : 'opacity-30'}`}>:</span>
          <span className="text-ink tabular-nums">{mm}</span> {profile.timezoneLabel}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-line p-0.5 font-mono text-[11px]" role="group" aria-label="Language">
            {(['id', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${lang === l ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-ink-2 transition-colors hover:border-ink/40 hover:text-ink sm:flex"
            aria-label="Command menu"
          >
            <kbd className="font-mono">{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd className="font-mono">K</kbd>
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink-2 sm:hidden"
            aria-label={t('nav_menu')}
          >
            <span className="flex flex-col gap-[3px]">
              <span className="h-px w-3.5 bg-current" />
              <span className="h-px w-3.5 bg-current" />
            </span>
          </button>

          <button
            onClick={toggle}
            aria-label={playing ? t('sound_off') : t('sound_on')}
            aria-pressed={playing}
            className="flex h-8 items-center gap-2 rounded-full border border-line px-3 text-ink-2 transition-colors hover:border-ink/40 hover:text-ink"
          >
            <span className="flex h-3 items-end gap-[2px]" aria-hidden>
              {[0.5, 1, 0.7, 0.35].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-full bg-current"
                  style={{
                    height: playing ? `${h * 100}%` : '2px',
                    animation: playing ? `eq 0.9s ease-in-out ${i * 0.12}s infinite alternate` : 'none',
                    transition: 'height .3s',
                  }}
                />
              ))}
            </span>
            <span className="hidden font-mono text-[11px] uppercase md:inline">{playing ? 'On' : 'Off'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
