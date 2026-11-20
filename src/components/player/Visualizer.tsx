import { useEffect, useRef } from 'react'
import { engine } from '../../audio/engine'

/** Tiny bar visualizer driven by the shared AnalyserNode. */
export function Visualizer({ playing, bars = 14, width = 56, height = 22 }: { playing: boolean; bars?: number; width?: number; height?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = width * dpr
    c.height = height * dpr
    const ctx = c.getContext('2d')!
    ctx.scale(dpr, dpr)
    const data = new Uint8Array(new ArrayBuffer(64))
    const levels = new Array(bars).fill(0.08)
    const amber = getComputedStyle(document.documentElement).getPropertyValue('--color-amber').trim() || '#e8a54b'
    let raf = 0
    let idleFrames = 0

    const draw = () => {
      const has = engine.getFrequencyData(data)
      for (let i = 0; i < bars; i++) {
        // skip the very lowest bins, they are mostly rumble
        const v = has ? data[2 + Math.floor((i / bars) * 30)] / 255 : 0
        const target = playing ? Math.max(0.08, v) : 0.08
        levels[i] += (target - levels[i]) * 0.25
      }
      ctx.clearRect(0, 0, width, height)
      const gap = 2
      const w = (width - gap * (bars - 1)) / bars
      ctx.fillStyle = amber
      for (let i = 0; i < bars; i++) {
        const h = Math.max(2, levels[i] * height)
        ctx.globalAlpha = 0.45 + levels[i] * 0.55
        ctx.fillRect(i * (w + gap), height - h, w, h)
      }
      // stop the loop once bars have settled while paused
      if (!playing && levels.every((l) => Math.abs(l - 0.08) < 0.005)) idleFrames++
      else idleFrames = 0
      if (idleFrames < 5) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [playing, bars, width, height])

  return <canvas ref={canvas} aria-hidden style={{ width, height }} />
}
