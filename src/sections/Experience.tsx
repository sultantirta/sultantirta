import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { fmtDuration, fmtPeriod, pad2 } from '../lib/format'
import { SectionHead } from '../components/SectionHead'
import { IconBriefcase, IconCheck, IconPin } from '../components/icons'

/**
 * Each job: a sticky "profile" column on the left, responsibilities as
 * soft numbered cards on the right, and additional assignments as a
 * highlighted panel. No divider lines.
 */
export function Experience() {
  const { t, lang } = useLang()

  return (
    <section id="experience" className="relative px-4 py-24 md:px-10 md:py-40">
      <SectionHead title={t('sec_experience')} />

      <div className="space-y-28">
        {profile.experience.map((e, i) => (
          <article key={i} className="grid gap-10 md:grid-cols-12 md:gap-12">
            <aside className="md:col-span-4">
              <div data-reveal className="md:sticky md:top-28">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber/12 px-3.5 py-1.5 text-xs font-medium text-amber">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  {fmtPeriod(e.start, e.end, lang)}
                </span>
                <p className="mt-2 pl-1 text-xs text-muted">{fmtDuration(e.start, e.end, lang)}</p>

                <h3 className="display mt-6 text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.08] text-ink">{e.company}</h3>
                <p className="accent mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-tight text-amber">{t(e.role)}</p>

                <p className="mt-5 flex items-center gap-2 text-sm text-ink-2">
                  <IconPin size={15} className="text-muted" /> {e.location}
                  <span className="text-muted">·</span> {t(e.type)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {e.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-bg-3 px-3 py-1.5 text-xs text-ink-2">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="md:col-span-8">
              {e.summary && (
                <p data-reveal className="font-heading text-[clamp(1.2rem,1.9vw,1.6rem)] font-normal leading-[1.45] tracking-[-0.015em] text-ink">
                  {t(e.summary)}
                </p>
              )}

              <p className="label mb-5 mt-12">{t('exp_duties')}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {e.points.map((p, j) => (
                  <li
                    key={j}
                    data-reveal
                    className="group rounded-2xl bg-bg-2 p-5 transition-colors duration-300 hover:bg-bg-3 sm:[&:last-child:nth-child(odd)]:col-span-2 md:p-6"
                  >
                    <span className="font-heading text-sm font-semibold text-amber">{pad2(j + 1)}</span>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-2 transition-colors group-hover:text-ink">{t(p)}</p>
                  </li>
                ))}
              </ul>

              {e.assignments?.map((a, k) => (
                <div
                  key={k}
                  data-reveal
                  className="mt-10 rounded-3xl bg-gradient-to-br from-amber/15 via-amber/5 to-transparent p-6 ring-1 ring-amber/20 md:p-9"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber text-bg">
                      <IconBriefcase size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-amber">{t('exp_extra')}</p>
                      <h4 className="display mt-1 text-[clamp(1.4rem,2.2vw,1.9rem)] text-ink">{t(a.role)}</h4>
                      <p className="mt-1 text-sm text-ink-2">{a.team}</p>
                    </div>
                  </div>
                  <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {a.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                        <IconCheck size={16} className="mt-1 shrink-0 text-amber" />
                        {t(p)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
