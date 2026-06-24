# Racik API

Backend aplikasi **Racik** (Tugas Akhir Mobile Programming) — pencari resep berbasis bahan.
Dibuat oleh **Raihan Haykal**.

Stack: **Express + TypeScript + Prisma + PostgreSQL**.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env          # sesuaikan DATABASE_URL
npm run prisma:generate
npm run prisma:push           # buat tabel di database
npm run seed                  # isi data resep
npm run dev                   # jalan di http://localhost:4000
```

## Endpoint

Base URL produksi: `https://api-mp.wedison.tech`

| Method | Path | Keterangan |
|--------|------|------------|
| GET | `/api/health` | Cek API hidup |
| GET | `/api/categories` | Daftar kategori |
| GET | `/api/ingredients?search=` | Daftar bahan (untuk pemilih stok) |
| GET | `/api/recipes?category=&search=` | Daftar resep |
| GET | `/api/recipes/:id` | Detail resep |
| POST | `/api/recipes/match` | Body `{ "ingredientIds": [1,2,3] }` → resep diranking by kecocokan |
| GET | `/api/recipes/:id/reviews` | Daftar ulasan |
| POST | `/api/recipes/:id/reviews` | Tambah ulasan (header `X-Device-Id`; nama & rating wajib) |
| GET | `/api/favorites` | Favorit (header `X-Device-Id`) |
| POST/DELETE | `/api/favorites/:recipeId` | Tambah/hapus favorit |
| GET | `/api/pantry` | Stok bahan milik device |
| POST | `/api/pantry` | Tambah/perbarui stok `{ ingredientId, note?, selected? }` |
| PUT | `/api/pantry/:ingredientId` | Ubah catatan/pilihan |
| DELETE | `/api/pantry/:ingredientId` | Hapus dari stok |

Identitas tanpa login: tiap perangkat mengirim header `X-Device-Id` (UUID).
Aturan ulasan: 1 ulasan per resep per device; nama & rating wajib, komentar opsional.

## Deploy produksi (ringkas)

```bash
npm install
npm run build
npm run prisma:generate
npm run prisma:push
npm run seed
pm2 start dist/index.js --name racik-api
```

Lalu pasang Nginx reverse proxy + SSL (Let's Encrypt) untuk `api-mp.wedison.tech` → `localhost:4000`.
