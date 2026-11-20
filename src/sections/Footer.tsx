import { profile } from '../data/profile'
import { tracks } from '../data/tracks'
import { useLang } from '../i18n/LanguageProvider'
import { useAudio } from '../audio/useAudioStore'
import { scrollToTarget } from '../lib/motion'

export function Footer() {
  const { t } = useLang()
  const playing = useAudio((s) => s.playing)
  const idx = useAudio((s) => s.trackIndex)
  const track = tracks[idx]

  return (
    <footer className="relative border-t border-line px-4 pb-28 pt-10 md:px-10 md:pb-32">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-heading text-xl font-semibold tracking-tight text-ink">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="mt-1 text-sm text-ink-2">
            {t(profile.role)} · {t(profile.location)}
          </p>
        </div>

        <div className="md:col-span-4">
          <p className="label">{playing ? t('footer_now') : t('footer_paused')}</p>
          <p className="mt-2 text-sm text-ink">
            {track?.title} <span className="text-muted">— {track?.artist}</span>
          </p>
          <p className="mt-1 text-xs text-muted">
            {t({ id: 'Musik dari', en: 'Music from' })}{' '}
            <a href="https://mixkit.co" target="_blank" rel="noreferrer" className="link-underline hover:text-ink">
              Mixkit
            </a>
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:col-span-3 md:items-end">
          <button onClick={() => scrollToTarget(0)} className="label link-underline transition-colors hover:text-ink">
            ↑ {t('footer_top')}
          </button>
          <p className="label">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
