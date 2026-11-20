import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { useLayoutEffect, type DependencyList, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

export { gsap, ScrollTrigger, SplitText }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/* ---------- smooth scroll ---------- */
let lenis: Lenis | null = null

export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis
  lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export const getLenis = () => lenis

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.6 })
    return
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------- scoped gsap context hook ---------- */
export function useGsap(scope: RefObject<HTMLElement | null>, fn: () => void | (() => void), deps: DependencyList = []) {
  useLayoutEffect(() => {
    if (!scope.current) return
    let cleanup: void | (() => void)
    const ctx = gsap.context(() => {
      cleanup = fn()
    }, scope.current)
    return () => {
      cleanup?.()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
