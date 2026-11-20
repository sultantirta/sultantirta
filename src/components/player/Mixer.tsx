import type { ReactNode } from 'react'
import { useAudio } from '../../audio/useAudioStore'
import type { Channel } from '../../audio/engine'
import { useLang } from '../../i18n/LanguageProvider'
import type { UIKey } from '../../i18n/ui-strings'
import { IconCup, IconFlame, IconMusic, IconRain } from '../icons'

const CHANNELS: { ch: Channel; key: UIKey; icon: ReactNode }[] = [
  { ch: 'music', key: 'mix_music', icon: <IconMusic size={16} /> },
  { ch: 'rain', key: 'mix_rain', icon: <IconRain size={16} /> },
  { ch: 'cafe', key: 'mix_cafe', icon: <IconCup size={16} /> },
  { ch: 'fire', key: 'mix_fire', icon: <IconFlame size={16} /> },
]

export function Mixer() {
  const { t } = useLang()
  const volumes = useAudio((s) => s.volumes)
  const setVolume = useAudio((s) => s.setVolume)
  const toggleChannel = useAudio((s) => s.toggleChannel)

  return (
    <div className="w-[min(300px,calc(100vw-32px))] rounded-2xl border border-line bg-bg-2/95 p-5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl">
      <div className="mb-4">
        <p className="font-heading text-base font-semibold leading-tight tracking-tight text-ink">{t('player_mixer')}</p>
        <p className="label mt-1">{t('mix_hint')}</p>
      </div>
      <ul className="space-y-3">
        {CHANNELS.map(({ ch, key, icon }) => {
          const v = volumes[ch]
          const on = v > 0
          return (
            <li key={ch} className="grid grid-cols-[32px_1fr_32px] items-center gap-3">
              <button
                onClick={() => toggleChannel(ch)}
                aria-label={`${t(key)} ${on ? 'off' : 'on'}`}
                aria-pressed={on}
                className={`grid h-8 w-8 place-items-center rounded-full border transition-colors ${
                  on ? 'border-amber bg-amber/15 text-amber' : 'border-line text-muted hover:text-ink'
                }`}
              >
                {icon}
              </button>
              <label className="block">
                <span className="mb-0.5 block text-xs text-ink-2">{t(key)}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={v}
                  onChange={(e) => setVolume(ch, Number(e.target.value))}
                  className="range"
                  style={{ ['--fill' as string]: `${v * 100}%` }}
                  aria-label={t(key)}
                />
              </label>
              <span className="text-right font-mono text-[10px] text-muted">{Math.round(v * 100)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
