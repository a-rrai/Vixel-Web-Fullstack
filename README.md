# Vixel — Game Discovery & Personal Collection (Fullstack)

**Vixel** adalah aplikasi web untuk menemukan rekomendasi video game berdasarkan atmosfer/mood (menggunakan RAWG API) sekaligus mengelola daftar koleksi game pribadi melalui layanan REST API backend yang dibangun dengan **NestJS** dan arsitektur **MVC**.

---

## Struktur Proyek

```text
vixel-fullstack/
├── vixel-backend/       # REST API Backend (NestJS + TypeScript + ValidationPipe)
├── vixel-react/         # Frontend Web Application (React + Vite)
├── docs/
│   └── screenshots/     # Dokumentasi hasil pengujian REST Client & integrasi frontend
└── README.md
```

---

## Fitur Utama Backend (NestJS)

* **Arsitektur MVC & Dependency Injection:** Memisahkan pengelolaan routing (`GamesController`), logika bisnis (`GamesService`), dan struktur data (`Game` Entity).
* **CRUD In-Memory Lengkap:** Mendukung `POST /games`, `GET /games`, `GET /games/:id`, `PATCH /games/:id`, dan `DELETE /games/:id` dengan penyimpanan sementara di memori.
* **Validasi Input (DTO & Global ValidationPipe):** Menggunakan `class-validator` (`@IsString`, `@MinLength`, `@IsIn`, `@IsNumber`, `@IsBoolean`, `@IsDateString`, `@IsOptional`) untuk memvalidasi payload sebelum diproses.
* **Exception Handling:**
  * `409 Conflict` (`ConflictException`): Mencegah duplikasi judul game yang sudah terdaftar di koleksi.
  * `404 Not Found` (`NotFoundException`): Menangani permintaan data berdasarkan ID yang tidak ditemukan.
  * `400 Bad Request`: Menolak input yang tidak memenuhi aturan validasi DTO.

---

## Cara Menjalankan Aplikasi

### 1. Menjalankan Backend (`vixel-backend`)
```bash
cd vixel-backend
npm install
npm run start:dev
```
Server backend akan berjalan di `http://localhost:3000`.

### 2. Menjalankan Frontend (`vixel-react`)
Buka terminal baru, lalu jalankan:
```bash
cd vixel-react
npm install
npm run dev
```
Aplikasi frontend akan berjalan di `http://localhost:5173`.

---

## Dokumentasi & Screenshot Pengujian

### 1. Pengujian Endpoint Backend (REST Client)
* **POST `/games` (Tambah Data Sukses):**
  ![POST Games](docs/screenshots/post-games.png)

* **GET `/games` (Ambil Semua Data):**
  ![GET All Games](docs/screenshots/get-all-games.png)

* **GET `/games/:id` (Ambil Detail Satu Data):**
  ![GET One Game](docs/screenshots/get-one-game.png)

* **PATCH `/games/:id` (Ubah Data):**
  ![PATCH Game](docs/screenshots/patch-game.png)

* **DELETE `/games/:id` (Hapus Data):**
  ![DELETE Game](docs/screenshots/delete-game.png)

* **Penanganan Error (`400 Bad Request` / `404 Not Found` / `409 Conflict`):**
  ![Error Handling](docs/screenshots/error-handling.png)

### 2. Integrasi Frontend React & Backend NestJS
* **Alur Tambah, Ubah Status, dan Hapus Game pada Frontend:**
  ![Integrasi Frontend](docs/screenshots/frontend-integration.png)