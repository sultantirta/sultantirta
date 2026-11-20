import { useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { fmtMonth, pad2 } from '../lib/format'
import { SectionHead } from '../components/SectionHead'
import { CertificateCard } from '../components/Artwork'
import { TiltCard } from '../components/TiltCard'
import { Sheet } from '../components/Sheet'
import { IconArrowUpRight } from '../components/icons'

export function Certificates() {
  const { t, lang } = useLang()
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [lastIdx, setLastIdx] = useState(0)
  const certs = profile.certificates
  const cur = certs[openIdx ?? lastIdx]

  return (
    <section id="certificates" className="relative px-4 py-24 md:px-10 md:py-40">
      <SectionHead title={t('sec_certificates')} aside={<span className="label">{pad2(certs.length)} total</span>} />

      {/* gallery wall: staggered columns of framed prints */}
      <ul className="grid items-start gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <li
            key={i}
            data-reveal
            className={`${i % 2 === 1 ? 'sm:mt-14' : ''} ${i % 3 === 1 ? 'lg:mt-20' : 'lg:mt-0'}`}
          >
            <button
              data-cursor={t('work_view')}
              onClick={() => {
                setLastIdx(i)
                setOpenIdx(i)
              }}
              className="group block w-full text-left"
            >
              <TiltCard className="aspect-[1.414] w-full">
                <div className="h-full w-full rounded-lg border border-line bg-bg-3 p-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)] transition-[border-color,box-shadow] duration-500 group-hover:border-amber/50 group-hover:shadow-[0_40px_80px_-30px_rgb(232_165_75/0.35)] md:p-4">
                  <div className="h-full w-full overflow-hidden rounded-[3px]">
                    <CertificateCard cert={c} className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                  </div>
                </div>
              </TiltCard>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted">
                    <span className="text-amber">{pad2(i + 1)}</span> · {fmtMonth(c.date, lang)} · {c.issuer}
                  </p>
                  <p className="display mt-2 text-[clamp(1.25rem,1.8vw,1.6rem)] leading-[1.15] text-ink transition-colors duration-300 group-hover:text-amber">
                    {c.title}
                  </p>
                </div>
                <span className="mt-1 shrink-0 text-ink-2 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber">
                  <IconArrowUpRight size={20} />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Sheet open={openIdx !== null} onClose={() => setOpenIdx(null)} label={t('sec_certificates')}>
        {cur && (
          <div>
            <div className="aspect-[1.414] w-full overflow-hidden rounded-lg">
              <CertificateCard cert={cur} />
            </div>
            <h3 className="display mt-8 text-[clamp(1.8rem,4vw,2.8rem)] text-ink">{cur.title}</h3>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="label">Issuer</dt>
                <dd className="mt-2 text-ink">{cur.issuer}</dd>
              </div>
              <div>
                <dt className="label">{t('cert_issued')}</dt>
                <dd className="mt-2 text-ink">{fmtMonth(cur.date, lang)}</dd>
              </div>
              {cur.credentialId && (
                <div className="col-span-2">
                  <dt className="label">{t('cert_id')}</dt>
                  <dd className="mt-2 font-mono text-sm text-ink">{cur.credentialId}</dd>
                </div>
              )}
            </dl>
            {cur.credentialUrl && (
              <a
                href={cur.credentialUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                {t('cert_view')} <IconArrowUpRight size={16} />
              </a>
            )}
          </div>
        )}
      </Sheet>
    </section>
  )
}
