import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { SectionHead } from '../components/SectionHead'
import { IconPin } from '../components/icons'

export function Education() {
  const { t } = useLang()
  return (
    <section id="education" className="relative px-4 py-24 md:px-10 md:py-40">
      <SectionHead title={t('sec_education')} />

      <div className="grid gap-6">
        {profile.education.map((ed, i) => (
          <article
            key={i}
            data-reveal
            className="group relative grid gap-10 overflow-hidden rounded-3xl bg-bg-2 p-6 md:grid-cols-12 md:p-12"
          >
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber/10 blur-3xl" />

            <div className="relative md:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-amber/12 px-3.5 py-1.5 text-xs font-medium text-amber">
                {ed.start} — {ed.end}
              </span>
              <h3 className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05] text-ink">{t(ed.degree)}</h3>
              <p className="mt-3 text-lg text-ink-2">{ed.school}</p>
              {ed.location && (
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <IconPin size={15} /> {ed.location}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-6 md:col-span-5">
              {ed.gpa && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{t('edu_gpa')}</p>
                  <p className="display mt-1 text-[clamp(2.8rem,5vw,4.4rem)] text-amber">{ed.gpa.split('/')[0].trim()}</p>
                  <p className="text-sm text-muted">/ {ed.gpa.split('/')[1]?.trim()}</p>
                </div>
              )}
              {ed.note && <p className="rounded-2xl bg-bg-3 p-5 text-[15px] leading-relaxed text-ink-2">{t(ed.note)}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
