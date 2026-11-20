import type { UIKey } from '../i18n/ui-strings'

/** Sections double as the album's tracklist. Durations are decorative. */
export const SECTIONS: { id: string; key: UIKey; no: string; length: string }[] = [
  { id: 'about', key: 'sec_about', no: '01', length: '2:14' },
  { id: 'experience', key: 'sec_experience', no: '02', length: '3:48' },
  { id: 'education', key: 'sec_education', no: '03', length: '1:56' },
  { id: 'skills', key: 'sec_skills', no: '04', length: '2:32' },
  { id: 'certificates', key: 'sec_certificates', no: '05', length: '2:05' },
  { id: 'portfolio', key: 'sec_portfolio', no: '06', length: '4:20' },
  { id: 'contact', key: 'sec_contact', no: '07', length: '1:30' },
]
