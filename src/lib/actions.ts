import { profile } from '../data/profile'
import { useUI } from './ui-store'

export async function copyEmail(message: string) {
  try {
    await navigator.clipboard.writeText(profile.email)
  } catch {
    // fallback for older browsers / insecure contexts
    const ta = document.createElement('textarea')
    ta.value = profile.email
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  useUI.getState().showToast(message)
}

export const whatsappUrl = () => `https://wa.me/${profile.whatsapp}`
export const telUrl = () => `tel:${profile.phone.replace(/[^\d+]/g, '')}`
export const mailUrl = () => `mailto:${profile.email}`
