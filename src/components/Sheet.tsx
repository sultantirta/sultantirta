import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useUI } from '../lib/ui-store'
import { useLang } from '../i18n/LanguageProvider'
import { IconClose } from './icons'

/** Right-side drawer (bottom sheet on mobile). */
export function Sheet({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
}) {
  const { t } = useLang()
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<Element | null>(null)
  const push = useUI((s) => s.pushOverlay)
  const pop = useUI((s) => s.popOverlay)

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement
      setMounted(true)
      push()
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(id)
    }
    if (mounted) {
      setShown(false)
      pop()
      const id = window.setTimeout(() => {
        setMounted(false)
        ;(lastFocus.current as HTMLElement | null)?.focus?.()
      }, 650)
      return () => clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!shown) return
    closeBtn.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [shown, onClose])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-[75]" role="dialog" aria-modal="true" aria-label={label}>
      <div
        className="absolute inset-0 bg-[rgb(8_7_5/0.65)] backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: shown ? 1 : 0 }}
        onClick={onClose}
      />
      <div
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-bg-2 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(680px,92vw)] md:rounded-none md:rounded-l-2xl"
        style={{
          transform: shown ? 'none' : window.innerWidth >= 768 ? 'translateX(104%)' : 'translateY(104%)',
          transition: 'transform .65s var(--ease-out-expo)',
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg-2/90 px-5 py-4 backdrop-blur md:px-8">
          <span className="label">{label}</span>
          <button
            ref={closeBtn}
            onClick={onClose}
            className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors hover:border-ink/40 hover:text-ink"
          >
            {t('close')} <IconClose size={14} />
          </button>
        </div>
        <div className="px-5 pb-10 pt-6 md:px-8">{children}</div>
      </div>
    </div>
  )
}
