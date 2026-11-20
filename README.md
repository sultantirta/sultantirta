# Sultan Tirta — Lofi Portfolio

Landing page portfolio bertema "the site is an album": intro gate, musik lofi, ambient mixer,
command palette (Ctrl/⌘ + K), bilingual ID/EN, custom cursor.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil di folder dist/ (siap deploy ke Vercel / Netlify)
```

## Mengganti konten

| Yang mau diganti | File |
| --- | --- |
| Nama, jabatan, domisili, nomor, email, summary, pengalaman, pendidikan, skills, sertifikat, portofolio | `src/data/profile.ts` |
| Foto profil | taruh di `public/images/`, isi `photo` di `profile.ts` |
| Cover portofolio / gambar sertifikat | taruh di `public/images/...`, isi `cover` / `image` (kosong = artwork otomatis) |
| Daftar lagu & suara ambient | `src/data/tracks.ts` + file di `public/music`, `public/ambient` |
| Teks UI (tombol, label) | `src/i18n/ui-strings.ts` |
| Warna & font | `src/styles/index.css` (blok `@theme`) |

Semua teks yang punya versi dua bahasa ditulis sebagai `{ id: '...', en: '...' }`.

## Kredit musik

Musik & ambient dari [Mixkit](https://mixkit.co) (Mixkit Free License).
