import { useEffect, useLayoutEffect, useState } from 'react'
import { getLenis, gsap, initLenis, prefersReducedMotion, ScrollTrigger } from './lib/motion'
import { useUI } from './lib/ui-store'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { CommandPalette } from './components/CommandPalette'
import { Toast } from './components/Toast'
import { MiniPlayer } from './components/player/MiniPlayer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Education } from './sections/Education'
import { Skills } from './sections/Skills'
import { Certificates } from './sections/Certificates'
import { Portfolio } from './sections/Portfolio'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  const entered = useUI((s) => s.entered)
  const overlay = useUI((s) => s.overlay)
  const [introDone, setIntroDone] = useState(false)

  // always start at the top, set up smooth scroll
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    initLenis()
  }, [])

  // freeze scrolling during intro and while a modal is open
  useEffect(() => {
    const lenis = getLenis()
    const locked = !entered || overlay > 0
    if (lenis) {
      if (locked) lenis.stop()
      else lenis.start()
    } else {
      document.documentElement.style.overflow = locked ? 'hidden' : ''
    }
  }, [entered, overlay])

  // generic fade-up reveal for anything marked data-reveal
  useLayoutEffect(() => {
    if (!entered || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [entered])

  // keep trigger positions right when content height changes (accordions, language)
  useEffect(() => {
    let t: number | undefined
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    ro.observe(document.body)
    return () => {
      ro.disconnect()
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certificates />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      <MiniPlayer />
      <CommandPalette />
      <Toast />
    </>
  )
}
