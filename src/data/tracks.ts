/**
 * Daftar musik lofi & suara ambient.
 * File audio disimpan di /public/music dan /public/ambient.
 * Tambah / ganti track cukup di sini.
 *
 * Sumber: Mixkit (https://mixkit.co) — Mixkit Free License,
 * boleh dipakai gratis tanpa atribusi wajib (kredit tetap ditampilkan di footer).
 */

export type Track = {
  title: string
  artist: string
  src: string
  /** halaman sumber, untuk kredit */
  source?: string
  license?: string
}

const MIXKIT = 'Mixkit Free License'

export const tracks: Track[] = [
  { title: 'Lo-Fi 01', artist: 'Lily J', src: '/music/lofi-01.mp3', source: 'https://mixkit.co/free-stock-music/chillout/', license: MIXKIT },
  { title: 'Sleepy Cat', artist: 'Alejandro Magaña', src: '/music/sleepy-cat.mp3', source: 'https://mixkit.co/free-stock-music/tag/lo-fi/', license: MIXKIT },
  { title: 'Sweet September', artist: 'Arulo', src: '/music/sweet-september.mp3', source: 'https://mixkit.co/free-stock-music/tag/lo-fi/', license: MIXKIT },
  { title: 'Lo-Fi 02', artist: 'Lily J', src: '/music/lofi-02.mp3', source: 'https://mixkit.co/free-stock-music/chillout/', license: MIXKIT },
  { title: 'Serene View', artist: 'Arulo', src: '/music/serene-view.mp3', source: 'https://mixkit.co/free-stock-music/chillout/', license: MIXKIT },
  { title: 'Lo-Fi 04', artist: 'Lily J', src: '/music/lofi-04.mp3', source: 'https://mixkit.co/free-stock-music/chillout/', license: MIXKIT },
]

export type AmbientKey = 'rain' | 'cafe' | 'fire'

export const ambient: Record<AmbientKey, Track> = {
  rain: { title: 'Light rain looping', artist: 'Mixkit', src: '/ambient/rain.mp3', source: 'https://mixkit.co/free-sound-effects/rain/', license: MIXKIT },
  cafe: { title: 'Restaurant crowd talking ambience', artist: 'Mixkit', src: '/ambient/cafe.mp3', source: 'https://mixkit.co/free-sound-effects/restaurant/', license: MIXKIT },
  fire: { title: 'Campfire crackles', artist: 'Mixkit', src: '/ambient/fire.mp3', source: 'https://mixkit.co/free-sound-effects/fire/', license: MIXKIT },
}
