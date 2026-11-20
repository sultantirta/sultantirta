import type { Lang } from '../i18n/LanguageProvider'
import { ui } from '../i18n/ui-strings'

const locale = (lang: Lang) => (lang === 'id' ? 'id-ID' : 'en-US')

export function fmtMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split('-').map(Number)
  if (!m) return String(y)
  return new Date(y, m - 1, 1).toLocaleDateString(locale(lang), { month: 'short', year: 'numeric' })
}

export function fmtPeriod(start: string, end: string | null, lang: Lang) {
  return `${fmtMonth(start, lang)} — ${end ? fmtMonth(end, lang) : ui.exp_present[lang]}`
}

export function monthsBetween(start: string, end: string | null) {
  const [sy, sm] = start.split('-').map(Number)
  const now = new Date()
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1]
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1)
}

export function fmtDuration(start: string, end: string | null, lang: Lang) {
  const total = monthsBetween(start, end)
  const y = Math.floor(total / 12)
  const m = total % 12
  const parts: string[] = []
  if (y) parts.push(`${y} ${ui.exp_yr[lang]}`)
  if (m) parts.push(`${m} ${ui.exp_mo[lang]}`)
  return parts.join(' ')
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
