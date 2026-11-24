# Nova AI Chat

Website chat karakter Nova/Tigergod dengan:
- Groq Chat Completions API melalui Cloudflare Worker.
- API key tidak ditaruh di frontend, ZIP, atau repository.
- Riwayat chat disimpan di browser menggunakan `localStorage`.
- Ekspor riwayat JSON dan hapus riwayat.
- Mode Nova dan Tigergod yang dapat berubah mengikuti percakapan.
- Permintaan maaf yang tulus dan mengakui kesalahan dapat membuat Tigergod kembali menjadi Nova; permintaan maaf sarkastis tidak.

## Struktur

- `index.html`, `style.css`, `app.js`: frontend GitHub Pages.
- `worker/index.js`: API proxy Cloudflare Worker.
- `worker/wrangler.toml`: konfigurasi Worker.
- `.github/workflows/deploy-worker.yml`: deployment Worker dari GitHub Actions.

## 1. Siapkan akun dan API key

1. Buat API key Groq dari dashboard Groq.
2. Buat akun Cloudflare dan aktifkan Workers.
3. Buat repository GitHub baru, lalu upload seluruh isi ZIP ini ke root repository.

**Jangan pernah menulis API key di `app.js`, HTML, file konfigurasi frontend, atau commit Git.**

## 2. Tambahkan GitHub Repository Secrets

Di repository GitHub, buka **Settings → Secrets and variables → Actions → New repository secret**. Tambahkan:

| Nama secret | Isi |
|---|---|
| `GROQ_API_KEY` | API key Groq kamu |
| `CLOUDFLARE_API_TOKEN` | Token Cloudflare dengan izin deploy/edit Workers |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID Cloudflare |

Ketiga nilai ini tidak perlu ditulis ke file proyek.

## 3. Atur alamat GitHub Pages yang diizinkan

Edit `worker/wrangler.toml`:

`ALLOWED_ORIGIN = "https://YOUR-GITHUB-USERNAME.github.io"`

Ganti dengan origin GitHub Pages milikmu. Untuk project site, origin tetap `https://USERNAME.github.io` (bukan path `/nama-repo`).

## 4. Deploy API Worker

1. Pastikan branch utama repository bernama `main`.
2. Buka tab **Actions** di GitHub.
3. Pilih workflow **Deploy Nova Chat API**.
4. Tekan **Run workflow**.
5. Tunggu sampai berhasil.

Cloudflare Worker bernama `nova-ai-chat-api` akan dibuat. URL biasanya berbentuk:

`https://nova-ai-chat-api.SUBDOMAIN-AKUN.workers.dev`

Salin URL Worker dari dashboard Cloudflare → Workers & Pages.

## 5. Hubungkan website ke Worker

Buka `app.js`, cari baris:

`const API_URL = "https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev";`

Ganti URL contoh itu dengan URL Worker milikmu, tanpa garis miring di akhir. Simpan dan push perubahan ke GitHub.

## 6. Aktifkan GitHub Pages

1. Buka **Settings → Pages**.
2. Pada **Build and deployment**, pilih **Deploy from a branch**.
3. Pilih branch `main` dan folder `/ (root)`.
4. Simpan, lalu tunggu website diterbitkan.
5. Buka alamat GitHub Pages yang diberikan GitHub.

Jika memakai custom domain, ubah `ALLOWED_ORIGIN` di `worker/wrangler.toml` menjadi origin custom domain tersebut, lalu jalankan ulang workflow deploy Worker.

## Riwayat chat

Riwayat disimpan pada browser/perangkat yang digunakan. Riwayat tidak otomatis sinkron ke perangkat lain dan dapat hilang jika data situs/browser dihapus. Gunakan tombol **Ekspor riwayat** untuk menyimpan salinan JSON.

## Catatan keamanan

- Browser hanya mengetahui URL Worker, bukan Groq API Key.
- Worker membaca `GROQ_API_KEY` dari secret Cloudflare yang disetel melalui GitHub Actions.
- Jangan membagikan repository dengan secret yang terekspos di log atau kode. GitHub menyamarkan secret di log, tetapi hindari mencetak nilainya.
- Endpoint publik tetap dapat menerima request dari pengunjung website. Batasi penggunaan/kuota di dashboard Groq dan pantau pemakaian.
- CORS membatasi origin browser, tetapi bukan sistem login atau perlindungan penuh dari penyalahgunaan request non-browser.
- Jangan masukkan data pribadi atau rahasia ke chat.

## Mengubah model Groq

Worker saat ini menggunakan `openai/gpt-oss-20b`. Jika model tersebut tidak tersedia untuk akun atau berubah status, ganti nilai `model` di `worker/index.js` dengan model chat aktif yang tersedia pada akun Groq-mu, lalu deploy ulang.

Dokumentasi:
- Groq API: https://console.groq.com/docs/api-reference
- Groq models: https://console.groq.com/docs/models
- Cloudflare Worker secrets: https://developers.cloudflare.com/workers/configuration/secrets/
- Cloudflare GitHub Actions: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
