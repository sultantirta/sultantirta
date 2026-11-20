import { useEffect, type ReactNode } from 'react'
import { Command } from 'cmdk'
import { useLang } from '../i18n/LanguageProvider'
import { useAudio } from '../audio/useAudioStore'
import { useUI } from '../lib/ui-store'
import { scrollToTarget } from '../lib/motion'
import { SECTIONS } from '../lib/sections'
import { copyEmail, mailUrl, whatsappUrl } from '../lib/actions'
import { IconChat, IconCopy, IconCup, IconFlame, IconGlobe, IconHash, IconMail, IconNext, IconPlay, IconRain } from './icons'

function Item({ icon, children, onSelect, hint, keywords }: { icon: ReactNode; children: ReactNode; onSelect: () => void; hint?: string; keywords?: string[] }) {
  return (
    <Command.Item onSelect={onSelect} keywords={keywords}>
      <span className="text-muted">{icon}</span>
      <span className="flex-1">{children}</span>
      {hint && <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{hint}</span>}
      <span className="cmdk-arrow -translate-x-1 text-amber opacity-0 transition-all">→</span>
    </Command.Item>
  )
}

export function CommandPalette() {
  const { t, toggleLang } = useLang()
  const open = useUI((s) => s.paletteOpen)
  const setOpen = useUI((s) => s.setPaletteOpen)
  const entered = useUI((s) => s.entered)
  const push = useUI((s) => s.pushOverlay)
  const pop = useUI((s) => s.popOverlay)
  const audio = useAudio()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (useUI.getState().entered) setOpen(!useUI.getState().paletteOpen)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (!open) return
    push()
    return () => pop()
  }, [open, push, pop])

  const run = (fn: () => void) => () => {
    setOpen(false)
    // let the dialog close (and smooth scroll resume) before acting
    setTimeout(fn, 60)
  }

  if (!entered) return null

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Command menu" loop>
      <Command.Input placeholder={t('cmd_placeholder')} />
      <Command.List>
        <Command.Empty>{t('cmd_empty')}</Command.Empty>

        <Command.Group heading={t('cmd_nav')}>
          {SECTIONS.map((s) => (
            <Item key={s.id} icon={<IconHash size={15} />} hint={s.no} onSelect={run(() => scrollToTarget(`#${s.id}`))} keywords={[s.id]}>
              {t('cmd_goto')} {t(s.key)}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading={t('cmd_contact')}>
          <Item icon={<IconCopy size={15} />} onSelect={run(() => copyEmail(t('contact_copied')))} keywords={['email', 'copy']}>
            {t('cmd_copy_email')}
          </Item>
          <Item icon={<IconMail size={15} />} onSelect={run(() => (window.location.href = mailUrl()))} keywords={['mail']}>
            {t('cmd_send_email')}
          </Item>
          <Item icon={<IconChat size={15} />} onSelect={run(() => window.open(whatsappUrl(), '_blank', 'noopener'))} keywords={['wa', 'whatsapp', 'chat']}>
            {t('cmd_open_wa')}
          </Item>
        </Command.Group>

        <Command.Group heading={t('cmd_music')}>
          <Item icon={<IconPlay size={15} />} hint={audio.playing ? 'on' : 'off'} onSelect={run(audio.toggle)} keywords={['music', 'play', 'pause', 'lofi']}>
            {t('cmd_toggle_play')}
          </Item>
          <Item icon={<IconNext size={15} />} onSelect={run(audio.next)} keywords={['skip', 'next']}>
            {t('cmd_next')}
          </Item>
          <Item icon={<IconRain size={15} />} hint={audio.volumes.rain > 0 ? 'on' : 'off'} onSelect={run(() => audio.toggleChannel('rain'))} keywords={['rain', 'hujan', 'ambient']}>
            {t('cmd_ambient')} {t('mix_rain')}
          </Item>
          <Item icon={<IconCup size={15} />} hint={audio.volumes.cafe > 0 ? 'on' : 'off'} onSelect={run(() => audio.toggleChannel('cafe'))} keywords={['cafe', 'kafe', 'ambient']}>
            {t('cmd_ambient')} {t('mix_cafe')}
          </Item>
          <Item icon={<IconFlame size={15} />} hint={audio.volumes.fire > 0 ? 'on' : 'off'} onSelect={run(() => audio.toggleChannel('fire'))} keywords={['fire', 'api', 'ambient']}>
            {t('cmd_ambient')} {t('mix_fire')}
          </Item>
        </Command.Group>

        <Command.Group heading={t('cmd_prefs')}>
          <Item icon={<IconGlobe size={15} />} hint="ID/EN" onSelect={run(toggleLang)} keywords={['language', 'bahasa', 'english', 'indonesia']}>
            {t('cmd_lang')}
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
