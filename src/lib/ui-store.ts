import { create } from 'zustand'

type UIState = {
  /** intro finished, page is live */
  entered: boolean
  paletteOpen: boolean
  mixerOpen: boolean
  /** a modal/drawer is open (pauses smooth scroll) */
  overlay: number
  toast: { id: number; message: string } | null
  setEntered: (v: boolean) => void
  setPaletteOpen: (v: boolean) => void
  setMixerOpen: (v: boolean) => void
  pushOverlay: () => void
  popOverlay: () => void
  showToast: (message: string) => void
}

export const useUI = create<UIState>((set, get) => ({
  entered: false,
  paletteOpen: false,
  mixerOpen: false,
  overlay: 0,
  toast: null,
  setEntered: (entered) => set({ entered }),
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setMixerOpen: (mixerOpen) => set({ mixerOpen }),
  pushOverlay: () => set({ overlay: get().overlay + 1 }),
  popOverlay: () => set({ overlay: Math.max(0, get().overlay - 1) }),
  showToast: (message) => set({ toast: { id: Date.now(), message } }),
}))
