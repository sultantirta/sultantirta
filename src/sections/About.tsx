import { useRef } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { gsap, prefersReducedMotion, useGsap } from '../lib/motion'
import { monthsBetween, pad2 } from '../lib/format'
import { SectionHead } from '../components/SectionHead'
import { asset } from '../lib/asset'

export function About() {
  const { t, lang } = useLang()
  const root = useRef<HTMLElement>(null)
  const words = t(profile.summary).split(' ')

  const totalMonths = profile.experience.reduce((sum, e) => sum + monthsBetween(e.start, e.end), 0)
  const years = Math.max(1, Math.round(totalMonths / 12))

  useGsap(
    root,
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: '[data-summary]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
    },
    [lang],
  )

  const facts = [
    { k: { id: 'Pengalaman', en: 'Experience' }, v: `${years}+`, u: { id: 'tahun', en: 'years' } },
    { k: { id: 'Proyek', en: 'Projects' }, v: pad2(profile.portfolio.length), u: { id: 'pilihan', en: 'selected' } },
    { k: { id: 'Sertifikat', en: 'Certificates' }, v: pad2(profile.certificates.length), u: { id: 'diraih', en: 'earned' } },
  ]

  return (
    <section ref={root} id="about" className="relative px-4 py-24 md:px-10 md:py-40">
      <SectionHead title={t('sec_about')} />

      <div className="grid grid-cols-12 gap-x-6 gap-y-12">
        <div className="col-span-12 md:col-span-3">
          <AlbumSleeve />
        </div>

        <div className="relative z-10 col-span-12 md:col-span-9">
          <p className="label mb-6">{t('about_kicker')}</p>
          <p data-summary className="font-heading text-[clamp(1.4rem,2.6vw,2.4rem)] font-normal leading-[1.35] tracking-[-0.02em] text-ink">
            {words.map((w, i) => (
              <span key={`${lang}-${i}`} data-word className="inline">
                {w}{' '}
              </span>
            ))}
          </p>

          <dl className="mt-16 grid grid-cols-3 border-t border-line">
            {facts.map((f) => (
              <div key={f.k.en} data-reveal className="border-r border-line py-6 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-8">
                <dt className="label">{t(f.k)}</dt>
                <dd className="mt-3 flex items-baseline gap-2">
                  <span className="display text-[clamp(2.4rem,5vw,4.2rem)] text-ink">{f.v}</span>
                  <span className="font-mono text-xs text-muted">{t(f.u)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

/** Portrait as a record sleeve; the vinyl slides out on hover. */
function AlbumSleeve() {
  const initials = `${profile.firstName[0] ?? ''}${profile.lastName[0] ?? ''}`
  return (
    <div data-reveal className="group relative mx-auto aspect-[4/5] w-full max-w-[340px]">
      <div
        className="vinyl absolute left-[6%] top-1/2 aspect-square w-[88%] -translate-y-1/2 translate-x-[14%] shadow-[0_0_0_1px_rgb(242_233_220/0.12),0_20px_40px_-10px_rgb(0_0_0/0.8)] transition-[translate] duration-[900ms] ease-[var(--ease-out-expo)] group-hover:translate-x-[28%]"
        data-playing="true"
      />
      <div className="absolute inset-0 overflow-hidden rounded-xl bg-bg-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95)] ring-1 ring-line">
        {profile.photo ? (
          <>
            {/* warm "film print" treatment so the white studio wall sits in the dark theme */}
            <img
              src={asset(profile.photo)}
              alt={`${profile.firstName} ${profile.lastName}`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-[filter,transform] duration-700 ease-[var(--ease-out-expo)] [filter:sepia(0.22)_saturate(0.9)_contrast(1.05)_brightness(0.86)] group-hover:scale-[1.03] group-hover:[filter:sepia(0.08)_saturate(1)_contrast(1.03)_brightness(0.95)]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#e8a54b] opacity-[0.16] mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(14_12_10/0.85)_0%,rgb(14_12_10/0.15)_38%,transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_60px_rgb(14_12_10/0.45)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <p className="font-heading text-lg font-semibold leading-tight tracking-tight text-ink">
                  {profile.firstName} {profile.lastName}
                </p>
                <p className="mt-0.5 text-xs text-ink-2">{profile.location.en.split(',')[0]}, ID</p>
              </div>
              <span className="accent text-2xl leading-none text-amber">hi!</span>
            </div>
          </>
        ) : (
          <div className="relative h-full w-full bg-[radial-gradient(90%_70%_at_30%_20%,rgb(232_165_75/0.45),transparent_70%)]">
            <span className="display absolute bottom-[8%] left-[8%] text-[clamp(4rem,7vw,6.5rem)] text-ink">{initials}</span>
          </div>
        )}
      </div>
    </div>
  )
}
