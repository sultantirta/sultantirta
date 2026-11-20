import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, isFinePointer, prefersReducedMotion } from '../lib/motion'

/** Tilts toward the pointer in 3D with a soft glare, like a framed print catching light. */
export function TiltCard({ children, className = '', max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const glare = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = wrap.current
    const c = card.current
    if (!w || !c || !isFinePointer() || prefersReducedMotion()) return
    const rx = gsap.quickTo(c, 'rotationX', { duration: 0.6, ease: 'power3' })
    const ry = gsap.quickTo(c, 'rotationY', { duration: 0.6, ease: 'power3' })
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      ry((px - 0.5) * max * 2)
      rx((0.5 - py) * max * 2)
      if (glare.current) {
        glare.current.style.opacity = '1'
        glare.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgb(255 244 225 / 0.35), transparent 55%)`
      }
    }
    const leave = () => {
      rx(0)
      ry(0)
      if (glare.current) glare.current.style.opacity = '0'
    }
    w.addEventListener('pointermove', move)
    w.addEventListener('pointerleave', leave)
    return () => {
      w.removeEventListener('pointermove', move)
      w.removeEventListener('pointerleave', leave)
    }
  }, [max])

  return (
    <div ref={wrap} className={className} style={{ perspective: 900 }}>
      <div ref={card} className="relative h-full w-full will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
        {children}
        <div
          ref={glare}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light transition-opacity duration-500"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  )
}
