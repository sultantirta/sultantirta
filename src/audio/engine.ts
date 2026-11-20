import { ambient, tracks, type AmbientKey } from '../data/tracks'
import { asset } from '../lib/asset'

export type Channel = 'music' | AmbientKey

type Events = {
  play: () => void
  pause: () => void
  ended: () => void
  error: (src: string) => void
  ready: () => void
}

/** perceptual-ish curve so the slider feels linear to the ear */
const curve = (v: number) => Math.max(0, Math.min(1, v)) ** 2

/**
 * Small Web Audio graph:
 *   music ──► gain ─┐
 *   rain  ──► gain ─┼─► master ─► analyser ─► speakers
 *   cafe  ──► gain ─┤
 *   fire  ──► gain ─┘
 * The AudioContext is only created after a user gesture (browsers block autoplay).
 */
class AudioEngine {
  private ctx: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private gains: Partial<Record<Channel, GainNode>> = {}
  private els: Record<Channel, HTMLAudioElement>
  private volumes: Record<Channel, number> = { music: 0.7, rain: 0, cafe: 0, fire: 0 }
  private listeners: { [K in keyof Events]: Set<Events[K]> } = {
    play: new Set(),
    pause: new Set(),
    ended: new Set(),
    error: new Set(),
    ready: new Set(),
  }
  private trackIndex = 0
  private pauseTimer: number | undefined
  private wantPlaying = false

  constructor() {
    const make = () => {
      const a = new Audio()
      a.preload = 'none'
      return a
    }
    this.els = { music: make(), rain: make(), cafe: make(), fire: make() }
    for (const k of ['rain', 'cafe', 'fire'] as const) this.els[k].loop = true

    const m = this.els.music
    m.addEventListener('play', () => this.emit('play'))
    m.addEventListener('pause', () => this.emit('pause'))
    m.addEventListener('ended', () => this.emit('ended'))
    m.addEventListener('error', () => {
      if (m.src) this.emit('error', tracks[this.trackIndex]?.src ?? '')
    })
  }

  on<K extends keyof Events>(ev: K, cb: Events[K]) {
    this.listeners[ev].add(cb)
    return () => this.listeners[ev].delete(cb)
  }
  private emit<K extends keyof Events>(ev: K, ...args: Parameters<Events[K]>) {
    this.listeners[ev].forEach((cb) => (cb as (...a: unknown[]) => void)(...args))
  }

  /** start buffering the first track during the intro (no sound yet) */
  preload(index = 0, timeoutMs = 3500): Promise<void> {
    const t = tracks[index]
    if (!t) return Promise.resolve()
    const m = this.els.music
    this.trackIndex = index
    m.preload = 'auto'
    m.src = asset(t.src)
    return new Promise((resolve) => {
      const done = () => {
        clearTimeout(timer)
        m.removeEventListener('canplay', done)
        m.removeEventListener('error', done)
        resolve()
      }
      const timer = window.setTimeout(done, timeoutMs)
      m.addEventListener('canplay', done)
      m.addEventListener('error', done)
      m.load()
    })
  }

  private ensureGraph() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume()
      return true
    }
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return false
    const ctx = new AC()
    const master = ctx.createGain()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.82
    master.connect(analyser)
    analyser.connect(ctx.destination)
    ;(Object.keys(this.els) as Channel[]).forEach((ch) => {
      const g = ctx.createGain()
      g.gain.value = 0
      ctx.createMediaElementSource(this.els[ch]).connect(g)
      g.connect(master)
      this.gains[ch] = g
    })
    this.ctx = ctx
    this.analyser = analyser
    return true
  }

  private ramp(ch: Channel, to: number, seconds: number) {
    const g = this.gains[ch]
    if (!g || !this.ctx) {
      this.els[ch].volume = to
      return
    }
    const now = this.ctx.currentTime
    g.gain.cancelScheduledValues(now)
    g.gain.setValueAtTime(g.gain.value, now)
    g.gain.linearRampToValueAtTime(to, now + seconds)
  }

  get index() {
    return this.trackIndex
  }
  get isPlaying() {
    return !this.els.music.paused
  }

  async play(fadeSeconds = 1.2) {
    this.ensureGraph()
    clearTimeout(this.pauseTimer)
    this.wantPlaying = true
    const m = this.els.music
    if (!m.src) {
      m.src = asset(tracks[this.trackIndex].src)
    }
    try {
      this.ramp('music', 0, 0)
      await m.play()
      this.ramp('music', curve(this.volumes.music), fadeSeconds)
    } catch {
      this.wantPlaying = false
      /* error event reports a missing file; NotAllowedError means no gesture */
    }
  }

  pause(fadeSeconds = 0.5) {
    this.wantPlaying = false
    this.ramp('music', 0, fadeSeconds)
    clearTimeout(this.pauseTimer)
    this.pauseTimer = window.setTimeout(() => this.els.music.pause(), fadeSeconds * 1000)
  }

  load(index: number, autoplay: boolean) {
    const n = tracks.length
    this.trackIndex = ((index % n) + n) % n
    const m = this.els.music
    m.src = asset(tracks[this.trackIndex].src)
    m.load()
    if (autoplay) void this.play(0.6)
  }

  next(autoplay = this.wantPlaying) {
    this.load(this.trackIndex + 1, autoplay)
  }
  prev(autoplay = this.wantPlaying) {
    // like a real player: restart if we're a few seconds in
    if (this.els.music.currentTime > 4) {
      this.els.music.currentTime = 0
      return
    }
    this.load(this.trackIndex - 1, autoplay)
  }

  setVolume(ch: Channel, v: number) {
    this.volumes[ch] = v
    if (ch === 'music') {
      if (this.isPlaying) this.ramp('music', curve(v), 0.15)
      return
    }
    const el = this.els[ch]
    if (v > 0) {
      this.ensureGraph()
      if (!el.src) {
        el.preload = 'auto'
        el.src = asset(ambient[ch].src) // lazy: only fetched once the slider moves
      }
      if (el.paused) void el.play().catch(() => {})
      this.ramp(ch, curve(v), 0.4)
    } else {
      this.ramp(ch, 0, 0.4)
      window.setTimeout(() => {
        if (this.volumes[ch] === 0) el.pause()
      }, 450)
    }
  }

  /** restore saved volumes without starting playback */
  primeVolumes(v: Record<Channel, number>) {
    this.volumes = { ...v }
  }

  getFrequencyData(arr: Uint8Array<ArrayBuffer>) {
    if (!this.analyser) return false
    this.analyser.getByteFrequencyData(arr)
    return true
  }
}

export const engine = new AudioEngine()
