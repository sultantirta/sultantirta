import { useEffect, useRef } from 'react'
import { tracks } from '../../data/tracks'
import { useAudio } from '../../audio/useAudioStore'
import { useLang } from '../../i18n/LanguageProvider'
import { useUI } from '../../lib/ui-store'
import { IconNext, IconPause, IconPlay, IconPrev, IconSliders } from '../icons'
import { Magnetic } from '../Magnetic'
import { Mixer } from './Mixer'
import { Visualizer } from './Visualizer'

export function MiniPlayer() {
  const { t } = useLang()
  const entered = useUI((s) => s.entered)
  const mixerOpen = useUI((s) => s.mixerOpen)
  const setMixerOpen = useUI((s) => s.setMixerOpen)
  const { playing, trackIndex, error, toggle, next, prev } = useAudio()
  const root = useRef<HTMLDivElement>(null)
  const track = tracks[trackIndex]

  // close mixer on outside click / Escape
  useEffect(() => {
    if (!mixerOpen) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setMixerOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMixerOpen(false)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [mixerOpen, setMixerOpen])

  const btn =
    'grid h-9 w-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-bg-3 hover:text-ink disabled:opacity-40'

  return (
    <div
      ref={root}
      className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? 'none' : 'translateY(20px)',
        transition: 'opacity .8s ease .6s, transform 1s var(--ease-out-expo) .6s',
        pointerEvents: entered ? 'auto' : 'none',
      }}
    >
      <div
        className="absolute bottom-full left-0 mb-3 origin-bottom-left"
        style={{
          opacity: mixerOpen ? 1 : 0,
          transform: mixerOpen ? 'none' : 'translateY(8px) scale(.97)',
          pointerEvents: mixerOpen ? 'auto' : 'none',
          transition: 'opacity .3s ease, transform .45s var(--ease-out-expo)',
        }}
        aria-hidden={!mixerOpen}
        inert={!mixerOpen}
      >
        <Mixer />
      </div>

      <div className="flex items-center gap-1 rounded-full border border-line bg-bg-2/85 p-1.5 pr-2 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.9)] backdrop-blur-xl">
        <div className="vinyl relative h-10 w-10 shrink-0" data-playing={playing} />

        <div className="ml-2 mr-1 hidden w-[132px] min-w-0 sm:block" aria-live="polite">
          <p className="truncate text-[13px] leading-tight text-ink">{error ? t('player_nofile') : track?.title}</p>
          <p className="truncate font-mono text-[10px] uppercase tracking-wider text-muted">{error ? track?.src : track?.artist}</p>
        </div>

        <button className={`${btn} hidden sm:grid`} onClick={prev} aria-label={t('player_prev')}>
          <IconPrev size={14} />
        </button>
        <Magnetic strength={0.4}>
          <button
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bg transition-transform hover:scale-105"
            onClick={toggle}
            aria-label={playing ? t('player_pause') : t('player_play')}
          >
            {playing ? <IconPause size={14} /> : <IconPlay size={14} className="translate-x-[1px]" />}
          </button>
        </Magnetic>
        <button className={btn} onClick={next} aria-label={t('player_next')}>
          <IconNext size={14} />
        </button>

        <div className="mx-1 hidden sm:block">
          <Visualizer playing={playing} />
        </div>

        <button
          className={`${btn} ${mixerOpen ? 'bg-bg-3 text-amber' : ''}`}
          onClick={() => setMixerOpen(!mixerOpen)}
          aria-label={t('player_mixer')}
          aria-expanded={mixerOpen}
        >
          <IconSliders size={16} />
        </button>
      </div>
    </div>
  )
}
