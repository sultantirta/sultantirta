import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = ({ size = 16, ...rest }: P) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...rest,
})

export const IconPlay = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" stroke="none" />
  </svg>
)
export const IconPause = (p: P) => (
  <svg {...base(p)}>
    <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none" />
  </svg>
)
export const IconNext = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 5v14l10-7L5 5Z" fill="currentColor" stroke="none" />
    <path d="M18 5v14" />
  </svg>
)
export const IconPrev = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 5v14L9 12l10-7Z" fill="currentColor" stroke="none" />
    <path d="M6 5v14" />
  </svg>
)
export const IconSliders = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
)
export const IconArrowUpRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)
export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
)
export const IconPlus = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)
export const IconCopy = (p: P) => (
  <svg {...base(p)}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
)
export const IconRain = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 15a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8a3.5 3.5 0 0 1 .5 7H7Z" />
    <path d="M8 18.5 7 21M12 18.5 11 21M16 18.5 15 21" />
  </svg>
)
export const IconCup = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
    <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H16.5M8 3.5c0 1 1 1 1 2s-1 1-1 2M12 3.5c0 1 1 1 1 2s-1 1-1 2" />
  </svg>
)
export const IconFlame = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21c-3.9 0-7-2.7-7-6.5 0-3.3 2.4-5.2 3.6-7.6.3 1.6 1.2 2.7 2.4 3.2C11 7 12.4 4.6 14.5 3c-.2 3 3.2 5.1 4 8.3.3 1 .5 2.1.5 3.2 0 3.8-3.1 6.5-7 6.5Z" />
    <path d="M12 21c-1.7 0-3-1.2-3-2.9 0-1.8 1.7-2.6 2.2-4.1.9.8 1.4 1.4 1.8 2.3.4-.4.7-.9.8-1.5 1 .9 1.2 2.1 1.2 3.3 0 1.7-1.3 2.9-3 2.9Z" />
  </svg>
)
export const IconMusic = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="17.5" cy="16" r="2.5" />
  </svg>
)
export const IconMail = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
  </svg>
)
export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </svg>
)
export const IconChat = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19l-4 1Z" />
    <path d="M9.5 9.5c0 3 2 5 5 5l1-1.5-2-1-.8.8c-.9-.4-1.6-1.1-2-2l.8-.8-1-2-1.5 1Z" />
  </svg>
)
export const IconGlobe = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
  </svg>
)
export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)
export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
export const IconBriefcase = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
  </svg>
)
export const IconHash = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />
  </svg>
)
