# Sultan Tirta — Lofi Portfolio

Landing page portfolio bertema lofi: intro, musik lofi, ambient mixer,
command palette (Ctrl/⌘ + K), dan dua bahasa (ID/EN).

Situs: https://sultantirta.github.io/sultantirta/

## Menjalankan di komputer

```powershell
npm install      # sekali saja (atau setelah package.json berubah)
npm run dev      # buka http://localhost:5173
```

## Mengganti konten

| Yang mau diganti | File |
| --- | --- |
| Nama, jabatan, domisili, nomor, email, summary, pengalaman, pendidikan, skills, sertifikat, portofolio | `src/data/profile.ts` |
| Foto profil | taruh di `public/images/`, isi `photo` di `profile.ts` |
| Gambar sertifikat | taruh di `public/images/certificates/`, isi `image` di sertifikatnya |
| Cover & galeri portofolio | taruh di `public/images/portfolio/`, isi `cover` dan `gallery` di proyeknya |
| Daftar lagu & suara ambient | `src/data/tracks.ts` + file di `public/music`, `public/ambient` |
| Teks UI (tombol, label) | `src/i18n/ui-strings.ts` |
| Warna & font | `src/styles/index.css` (blok `@theme`) |

- Teks dua bahasa ditulis sebagai `{ id: '...', en: '...' }`.
- Path gambar ditulis mulai dari `/images/...` (tanpa kata `public`).
- Nama file gambar: huruf kecil, tanpa spasi (pakai `-`). GitHub membedakan huruf besar/kecil.
- Usahakan gambar < ±400 KB supaya situs cepat dibuka.

## Update ke GitHub (pull & push)

Setiap push ke branch `main` otomatis membangun ulang situs (GitHub Actions),
dan situs ter-update dalam ±1–2 menit. Progresnya terlihat di tab **Actions** di repo.

### Cara 1 — lewat terminal VS Code (Terminal → New Terminal)

```powershell
# 1. Ambil perubahan terbaru dulu (wajib kalau pernah edit langsung di github.com)
git pull

# 2. Lihat file apa saja yang berubah
git status

# 3. Masukkan semua perubahan
git add .

# 4. Simpan dengan pesan singkat
git commit -m "Update portofolio"

# 5. Kirim ke GitHub
git push
```

### Cara 2 — lewat tombol di VS Code (tanpa mengetik perintah)

1. Klik ikon **Source Control** di sidebar kiri (ikon cabang, atau `Ctrl+Shift+G`).
2. Klik **⋯ → Pull** untuk mengambil perubahan terbaru.
3. Di daftar **Changes**, klik **+** (Stage All Changes).
4. Tulis pesan di kotak atas, misalnya `Update portofolio`, lalu klik **Commit**.
5. Klik **Sync Changes** (atau **⋯ → Push**).

### Kebiasaan yang aman

- **Selalu `git pull` sebelum mulai mengedit**, terutama setelah mengedit file lewat github.com.
- Kalau `git push` ditolak dengan pesan *rejected / fetch first*, jalankan `git pull` lalu `git push` lagi.
- Kalau `git pull` menampilkan *conflict*, buka file yang ditandai di VS Code, pilih
  **Accept Current / Incoming / Both**, simpan, lalu `git add .`, `git commit`, `git push`.
- Sebelum push, cek dulu tampilan di `npm run dev` supaya tidak ada yang rusak.

## Kredit musik

Musik & ambient dari [Mixkit](https://mixkit.co) (Mixkit Free License).
