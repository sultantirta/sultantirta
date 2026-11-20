import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ui, type UIKey } from './ui-strings'
import type { L } from '../data/profile'

export type Lang = 'id' | 'en'

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggleLang: () => void
  /** translate a UI key or an inline { id, en } object */
  t: (key: UIKey | L) => string
}

const LanguageContext = createContext<Ctx | null>(null)
const STORAGE_KEY = 'st-lang'

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'id' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    // brief fade so the swap doesn't feel like a glitch
    document.documentElement.animate?.([{ opacity: 1 }, { opacity: 0.55 }, { opacity: 1 }], {
      duration: 380,
      easing: 'ease-out',
    })
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang(lang === 'id' ? 'en' : 'id'),
      t: (key) => (typeof key === 'string' ? ui[key][lang] : key[lang]),
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
