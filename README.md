# Mini Project Fullstack UTS

## 📌 Deskripsi Proyek
Proyek ini adalah aplikasi berbasis **Node.js** dengan **Express.js** sebagai backend dan **EJS** sebagai template engine untuk frontend. Aplikasi ini memungkinkan pengguna untuk mengelola tugas mahasiswa dengan fitur CRUD.

---

## 🛠️ Persyaratan
Pastikan Anda telah menginstal software berikut sebelum menjalankan proyek:
- **Node.js** (versi terbaru direkomendasikan)
- **MySQL** (jika menggunakan database MySQL) atau **MongoDB** (jika menggunakan database NoSQL)

---

## ⚙️ Cara Mengatur Database

### **1. Menggunakan MongoDB:**
1. Pastikan MongoDB telah terinstal dan berjalan di komputer Anda.
2. Edit file **.env** dan sesuaikan konfigurasi database:
   ```env
   MONGO_URI=mongodb://localhost:27017/mini_project
   ```

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone repositori** atau ekstrak file proyek.
   ```sh
   git clone https://github.com/VerrelAngkasa/mini-project-fullstack-uts.git
   cd mini-project-fullstack-uts
   ```
2. **Instal dependensi** yang dibutuhkan.
   ```sh
   npm install
   ```
3. **Jalankan server** dengan perintah berikut:
   ```sh
   npm start
   ```
   atau jika menggunakan nodemon:
   ```sh
   nodemon server.js
   ```
4. **Akses aplikasi** melalui browser di `http://localhost:3000`

---

## ✨ Fitur Utama
- **CRUD Tasks:** Tambah, baca, perbarui, dan hapus tugas.
- **Autentikasi Pengguna:** Menggunakan JSON Web Token (JWT).
- **Template Engine:** Menggunakan EJS untuk tampilan dinamis.
- **Middleware Keamanan:** Menggunakan bcrypt dan cookie-parser.

---

## 📝 Lisensi
Proyek ini dibuat untuk keperluan akademik dan pengembangan pribadi. Bebas digunakan dengan menyertakan kredit kepada pembuat aslinya.

---

## 📩 Kontak
Jika ada pertanyaan atau kendala, silakan hubungi:
📧 Email: verrelangkasa20@gmail.com

