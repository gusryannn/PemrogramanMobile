# Laporan Praktikum Pemrograman Mobile
**MODUL IV: Screen Navigation with React Navigation Package**

---

## 1. Jawaban Tugas Pendahuluan

### Pertanyaan 1: Apa itu React Navigation (package)?
**Jawaban:**
React Navigation adalah library perutean (*routing*) dan navigasi mandiri standar untuk aplikasi React Native. Library ini memungkinkan pengembang mengelola alur perpindahan antar layar (screen), riwayat navigasi (*history stack*), serta menyediakan berbagai pola navigasi umum seperti *Stack Navigation*, *Drawer Navigation*, dan *Bottom Tab Navigation* dengan transisi yang mulus.

### Pertanyaan 2: Bagaimana cara menginstall package pada project react-native?
**Jawaban:**
Paket tambahan diinstal melalui terminal pada direktori proyek menggunakan package manager:
- Menggunakan **npm**:
  ```bash
  npm install <nama-package>
  ```
- Menggunakan **yarn**:
  ```bash
  yarn add <nama-package>
  ```
- Pada proyek **Expo**:
  ```bash
  npx expo install <nama-package>
  ```

---

## 2. Implementasi Tugas Mandiri

### Tugas: Membuat Tab Navigation Menggunakan Package React Navigation
- Menggunakan paket resmi `@react-navigation/native` dan `@react-navigation/bottom-tabs`.
- Membagi aplikasi menjadi 3 layar utama dalam Tab Navigator:
  1. **Home (`Home.js`)**: Halaman beranda dengan kartu aksi navigasi langsung.
  2. **Explore (`Explore.js`)**: Halaman eksplorasi interaksi UI.
  3. **About (`About.js`)**: Halaman profil pengembang dan rincian modul.
- Setiap tab dilengkapi dengan label judul, ikon status aktif/inaktif, dan penyesuaian header antarmuka.

---

## 3. Cara Menjalankan

1. Buka folder ini di terminal:
   ```bash
   cd C:\Users\alex_\Documents\PemrogramanMobile\tugas_modul4
   ```
2. Jalankan aplikasi:
   ```bash
   npx expo start
   ```
3. Tekan **`a`** untuk membuka di emulator Android.
