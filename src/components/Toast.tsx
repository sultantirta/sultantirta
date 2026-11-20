import { useEffect, useState } from 'react'
import { useUI } from '../lib/ui-store'

export function Toast() {
  const toast = useUI((s) => s.toast)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) return
    setVisible(true)
    const id = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(id)
  }, [toast])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed bottom-24 left-1/2 z-[90] md:bottom-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : 12}px)`,
        transition: 'opacity .3s ease, transform .5s var(--ease-out-expo)',
      }}
    >
      {toast && (
        <span className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-bg shadow-lg">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" /> {toast.message}
        </span>
      )}
    </div>
  )
}
