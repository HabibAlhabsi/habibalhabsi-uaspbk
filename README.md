# ☕ Aplikasi Kasir Café

Aplikasi ini adalah **sistem kasir sederhana untuk café**, dibuat menggunakan **Vue 3 + Pinia**. Aplikasi memungkinkan pengguna untuk memilih menu, mengatur pesanan, menyimpan transaksi, melihat riwayat, dan melihat laporan total penjualan.

---

## 🚀 Fitur Utama

- 📋 **Transaksi Kasir**
  - Pilih menu berdasarkan kategori.
  - Tambah atau kurangi item ke keranjang.
  - Hitung total otomatis.
  - Pilih varian (misalnya "Panas" atau "Dingin" untuk minuman).

- 📜 **Riwayat Transaksi**
  - Menampilkan daftar transaksi yang telah dilakukan.
  - Menampilkan detail pesanan per transaksi.
  - Transaksi terbaru tampil di atas.

- 📊 **Laporan Penjualan**
  - Total pendapatan keseluruhan.
  - Jumlah total transaksi.
  - Jumlah item yang terjual.

---

## 🗂️ Struktur Menu

### ✅ Kategori
- **Minuman**
  - Kopi Susu, Americano, Matcha Latte, Lemon Tea, dll.
- **Makanan Ringan**
  - Roti Bakar, Donat, French Fries, dll.
- **Dessert**
  - Tiramisu, Red Velvet, Cheesecake, Cookies, dll.

> Data disimpan secara statis dalam `menuStore`.

---

## 🌐 Routing

Aplikasi menggunakan `vue-router` dengan 3 rute utama:

| Route       | Path         | Komponen         | Deskripsi                     |
|-------------|--------------|------------------|-------------------------------|
| Transaksi   | `/`          | `Transaksi.vue`  | Halaman utama pemesanan       |
| Riwayat     | `/riwayat`   | `Riwayat.vue`    | Melihat riwayat transaksi     |
| Laporan     | `/laporan`   | `Laporan.vue`    | Melihat rekap data penjualan  |

---

## 🔗 Endpoint Backend (JSON Server)

Menggunakan **JSON Server** sebagai backend simulasi untuk menyimpan transaksi.

### 📌 Endpoints

| Method | URL                      | Deskripsi                             |
|--------|--------------------------|----------------------------------------|
| `GET`  | `/transaksi`             | Ambil semua transaksi yang tersimpan   |
| `POST` | `/transaksi`             | Simpan transaksi baru                  |

> File `db.json` digunakan untuk menyimpan data transaksi pada sisi server lokal.

---

## ⚙️ Tools & Teknologi

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [Vitest](https://vitest.dev/) (unit testing)

---

## 📦 Cara Menjalankan

```bash
# Install dependency
npm install

# Jalankan JSON Server di port 3000
npx json-server --watch db.json --port 3000

# Jalankan aplikasi Vue
npm run dev
