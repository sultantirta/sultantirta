import { profile } from '../data/profile'
import { useLang } from '../i18n/LanguageProvider'
import { copyEmail, mailUrl, telUrl, whatsappUrl } from '../lib/actions'
import { SplitHeading } from '../components/SectionHead'
import { Magnetic } from '../components/Magnetic'
import { IconArrowUpRight, IconChat, IconCopy, IconMail, IconPhone } from '../components/icons'

export function Contact() {
  const { t } = useLang()

  const channels = [
    { label: t('contact_whatsapp'), value: profile.phone, href: whatsappUrl(), icon: <IconChat size={18} />, external: true },
    { label: t('contact_phone'), value: profile.phone, href: telUrl(), icon: <IconPhone size={18} /> },
    { label: t('contact_email'), value: profile.email, href: mailUrl(), icon: <IconMail size={18} /> },
  ]

  return (
    <section id="contact" className="relative overflow-hidden px-4 pb-16 pt-24 md:px-10 md:pt-40">
      <div className="window-light -bottom-[40vmax] -left-[25vmax]" />
      <div className="relative border-t border-line pt-6">
        <h2 className="sr-only">Get in Touch</h2>
        <div aria-hidden className="display text-[clamp(3.6rem,13vw,12rem)] leading-[0.95] text-ink">
          <SplitHeading as="p" text="Get in" />
          <SplitHeading as="p" text="Touch." className="accent pl-[14vw] text-[1.12em] leading-[0.95] text-amber" />
        </div>

        <div className="mt-14 grid grid-cols-12 gap-x-6">
          <div data-reveal className="col-span-12 md:col-span-8 md:col-start-5">
            <Magnetic strength={0.2} className="w-full">
              <button
                data-cursor={t('contact_copy')}
                onClick={() => copyEmail(t('contact_copied'))}
                className="group flex w-full items-center justify-between gap-4 rounded-full border border-line px-6 py-5 text-left transition-colors duration-500 hover:border-amber hover:bg-amber md:px-9 md:py-7"
              >
                <span className="truncate font-heading text-[clamp(1.2rem,2.8vw,2.3rem)] font-medium tracking-tight text-ink transition-colors group-hover:text-bg">
                  {profile.email}
                </span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors group-hover:text-bg">
                  <IconCopy size={16} /> <span className="hidden sm:inline">{t('contact_copy')}</span>
                </span>
              </button>
            </Magnetic>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-line p-5 transition-colors duration-300 hover:border-ink/30 hover:bg-bg-2"
                  >
                    <span className="flex items-center justify-between text-ink-2">
                      {c.icon}
                      <IconArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span>
                      <span className="label block">{c.label}</span>
                      <span className="mt-1 block truncate text-sm text-ink">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-ink-2 hover:text-ink">
                    {s.label} <IconArrowUpRight size={14} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
