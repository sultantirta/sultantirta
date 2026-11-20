import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion, SplitText } from '../lib/motion'

/** Heading whose lines slide up from a mask when scrolled into view. */
export function SplitHeading({
  text,
  as: Tag = 'h2',
  className = '',
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
}) {
  return <SplitInner key={text} text={text} Tag={Tag} className={className} />
}

function SplitInner({ text, Tag, className }: { text: string; Tag: 'h1' | 'h2' | 'h3' | 'p'; className: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const split = SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'split-line',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      },
    })
    return () => split.revert()
  }, [])
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}

export function SectionHead({ title, aside, className = '' }: { title: string; aside?: ReactNode; className?: string }) {
  return (
    <header className={`mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-line pt-6 md:mb-20 ${className}`}>
      <SplitHeading text={title} className="display text-[clamp(2.8rem,8vw,7rem)]" />
      {aside && <div className="pb-3 md:text-right">{aside}</div>}
    </header>
  )
}
