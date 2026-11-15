# Vixel - Play Game by Mood (Tugas Minggu 6 & 7 WebPro)

Vixel adalah platform prototipe kurasi video game berbasis *mood* dan atmosfer emosional. Proyek ini terintegrasi dengan RESTful API eksternal untuk menampilkan data dinamis secara asinkron.

Vixel adalah platform purwarupa (*prototype*) kurasi video game yang berbasis pada *mood* dan atmosfer emosional. Berbeda dengan katalog tradisional yang mengelompokkan game secara kaku berdasarkan genre teknis (seperti RPG, FPS, atau Strategi), Vixel dirancang untuk membantu pemain menemukan pengalaman bermain yang sesuai dengan perasaan atau nuansa yang sedang mereka cari (misalnya: *atmospheric, relaxing, dark, atau emotional*).

## Fitur Utama
* **Katalog Kurasi Emosional:** Menampilkan daftar game yang menonjolkan atmosfer dan kekuatan naratif (seperti *Life is Strange*, *A Space for the Unbound*, dll).
* **Data Dinamis (API Integration):** Terintegrasi dengan database game global untuk menarik data game bernuansa *atmospheric* secara langsung.
* **Manajemen Antarmuka Asinkron:** Dilengkapi dengan *state* penanganan UI yang rapi saat sistem sedang memuat data (*skeleton/loading*) maupun saat jaringan terputus (*error handling* dengan opsi *retry*).
* **Kalkulasi Data Real-time:** Menampilkan ringkasan total game yang saat ini ada di dalam katalog kurasi.

## Teknologi yang Digunakan
* **Frontend:** React.js (dengan fungsionalitas Hooks `useState` dan `useEffect`)
* **Styling:** Vanilla CSS / CSS Modules
* **Sumber Data:** [RAWG Video Games Database API](https://rawg.io/apidocs)

## Pemenuhan Syarat Tugas Minggu 7

### 1. Endpoint API yang Digunakan dan Alasannya
Proyek ini mengonsumsi data dari **RAWG Video Games Database API**, secara spesifik menggunakan endpoint `GET https://api.rawg.io/api/games`. 

**Alasan Pemilihan:** RAWG API menyediakan parameter filter `tags` (seperti *atmospheric*, *relaxing*, *dark*). Mengingat Vixel berfokus pada penemuan game berdasarkan *mood* dan nuansa emosional alih-alih genre tradisional, endpoint ini sangat ideal karena memungkinkan kurasi data yang secara akurat merepresentasikan atmosfer game tersebut.

### 2. Implementasi Pola Loading & Error
Manajemen *state* asinkron ditangani di dalam komponen utama `App.jsx` menggunakan hook `useState` dari React.
- **Fungsi Penanganan:** Proses ini berjalan di dalam fungsi asinkron `fetchGames()`.
- **Logika State:** 
  - Saat `fetchGames` dipanggil, state `isLoading` diubah menjadi `true`. Antarmuka akan merender teks indikator *"Memuat atmosfer game..."*
  - Jika terjadi kegagalan jaringan atau URL salah, blok `catch` akan menangkap *exception* dan mengubah state `isError` menjadi `true`. UI akan menampilkan pesan error beserta tombol interaktif **"Coba Lagi"** yang mengeksekusi ulang fungsi `fetchGames()`.
  - Blok `finally` memastikan `isLoading` dikembalikan ke `false` apa pun hasil akhirnya.
- Data yang berhasil di-*fetch* kemudian disesuaikan (*mapping*) struktur propertinya agar kompatibel dengan komponen `GameCard.jsx` yang sudah ada, lalu di-render secara dinamis menggunakan `.map()` dengan *key* berupa ID game.

## Cara Menjalankan Proyek di Komputer Lokal
1. Clone repository ini dengan cara:
   ```bash
   git clone [https://github.com/USERNAME_KAMU/vixel-app.git](https://github.com/USERNAME_KAMU/vixel-app.git)
2. Buka terminal di direktori proyek dan jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka tautan `http://localhost:5173` di browser.

*(Catatan Pengumpulan: Screenshot untuk kondisi Loading, Success, dan Error sudah dilampirkan secara terpisah pada portal pengumpulan tugas).*