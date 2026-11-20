import { create } from 'zustand'
import { engine, type Channel } from './engine'

const VOL_KEY = 'st-volumes'
const DEFAULT_VOLUMES: Record<Channel, number> = { music: 0.7, rain: 0, cafe: 0, fire: 0 }

function loadVolumes(): Record<Channel, number> {
  try {
    const raw = localStorage.getItem(VOL_KEY)
    if (raw) return { ...DEFAULT_VOLUMES, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return { ...DEFAULT_VOLUMES }
}
function saveVolumes(v: Record<Channel, number>) {
  try {
    localStorage.setItem(VOL_KEY, JSON.stringify(v))
  } catch {
    /* ignore */
  }
}

type AudioState = {
  playing: boolean
  trackIndex: number
  error: string | null
  volumes: Record<Channel, number>
  /** remembers the last non-zero ambient level for quick toggles */
  lastAmbient: Record<Channel, number>
  start: (withSound: boolean) => void
  play: () => void
  pause: () => void
  toggle: () => void
  next: () => void
  prev: () => void
  setVolume: (ch: Channel, v: number) => void
  toggleChannel: (ch: Channel) => void
}

const initialVolumes = loadVolumes()
engine.primeVolumes(initialVolumes)

export const useAudio = create<AudioState>((set, get) => ({
  playing: false,
  trackIndex: 0,
  error: null,
  volumes: initialVolumes,
  lastAmbient: { music: 0.7, rain: 0.5, cafe: 0.4, fire: 0.5 },

  start: (withSound) => {
    if (!withSound) return
    void engine.play(2)
    const v = get().volumes
    for (const ch of ['rain', 'cafe', 'fire'] as const) if (v[ch] > 0) engine.setVolume(ch, v[ch])
  },
  play: () => {
    set({ error: null })
    void engine.play()
  },
  pause: () => engine.pause(),
  toggle: () => (engine.isPlaying ? get().pause() : get().play()),
  next: () => {
    set({ error: null })
    engine.next(engine.isPlaying)
    set({ trackIndex: engine.index })
  },
  prev: () => {
    set({ error: null })
    engine.prev(engine.isPlaying)
    set({ trackIndex: engine.index })
  },
  setVolume: (ch, v) => {
    engine.setVolume(ch, v)
    const volumes = { ...get().volumes, [ch]: v }
    const lastAmbient = v > 0 ? { ...get().lastAmbient, [ch]: v } : get().lastAmbient
    set({ volumes, lastAmbient })
    saveVolumes(volumes)
  },
  toggleChannel: (ch) => {
    const cur = get().volumes[ch]
    get().setVolume(ch, cur > 0 ? 0 : get().lastAmbient[ch] || 0.5)
  },
}))

engine.on('play', () => useAudio.setState({ playing: true, error: null }))
engine.on('pause', () => useAudio.setState({ playing: false }))
engine.on('ended', () => {
  engine.next(true)
  useAudio.setState({ trackIndex: engine.index })
})
engine.on('error', (src) => useAudio.setState({ playing: false, error: src }))
