# Jungut Fresh Cendol - Mobile App (UTS Pemrograman Mobile)

Aplikasi pemesanan cendol tradisional khas Bali berbasis **React Native** dan **Expo**. Proyek ini merupakan konversi dan pengembangan antarmuka (UI) dari aplikasi web **Jungut Fresh Cendol** yang telah dibuat pada mata kuliah Pemrograman Web.

---

## 📱 Daftar Halaman Aplikasi (15 Layar)

Sesuai rubrik penilaian UTS (kategori Sangat Baik / Nilai 5: 7–15 stack page):

### 1. Autentikasi & Keamanan (Security)
1. **Splash Screen (`SplashScreen.js`)** - Animasi pembuka dengan logo daun 🍃, branding "Tradisi Sejak 1987", dan transisi otomatis.
2. **Login Screen (`LoginScreen.js`)** - Form masuk akun dengan show/hide password, opsi login tamu, dan navigasi lupa password.
3. **Register Screen (`RegisterScreen.js`)** - Pendaftaran pengguna baru lengkap (Nama, Email, No. HP, Password, Konfirmasi).
4. **Forgot Password Screen (`ForgotPasswordScreen.js`)** - Fitur pemulihan kata sandi via email terdaftar.

### 2. Layar Utama (Bottom Tab Navigator)
5. **Beranda / Home (`HomeScreen.js`)** - Hero banner promosi, statistik penjualan, panduan 6-langkah pesan, carousel menu unggulan, dan ulasan pelanggan.
6. **Daftar Menu (`MenuScreen.js`)** - Katalog produk dengan pencarian instan dan filter kategori (Semua, Cendol, Minuman, Topping).
7. **Keranjang Belanja (`CartScreen.js`)** - Pengelolaan jumlah item, input kode voucher promo (`CENDOL10`, `BALI20`), dan rincian subtotal.
8. **Riwayat Pesanan (`OrderHistoryScreen.js`)** - Daftar invoice dengan filter status (Semua, Berlangsung, Selesai) dan pencarian nomor pesanan.
9. **Profil Pengguna (`ProfileScreen.js`)** - Data diri pelanggan, kartu badge keanggotaan, shortcut bantuan, dan tombol logout.

### 3. Alur Transaksi & Eksplorasi (Stack Navigator)
10. **Detail Produk (`ProductDetailScreen.js`)** - Informasi lengkap menu, pemilihan topping tambahan, catatan khusus, dan kalkulasi harga unit.
11. **Checkout & Pengiriman (`CheckoutScreen.js`)** - Form alamat, pemilih zona pengantaran Bali (Denpasar, Badung, Gianyar, Tabanan, dll.), dan pemilihan metode pembayaran (QRIS, VA, COD).
12. **Konfirmasi Sukses (`OrderSuccessScreen.js`)** - Bukti pembuatan pesanan, invoice ID, rincian biaya, dan tombol langsung ke pelacakan.
13. **Lacak Pengiriman (`OrderTrackScreen.js`)** - Timeline pelacakan 5 tahap (Menunggu Bayar → Dikonfirmasi → Dikirim → Sampai → Selesai) dan fitur modal **Chat Langsung dengan Kurir Gus Ryan**.
14. **Tentang Kami (`AboutScreen.js`)** - Cerita sejarah tradisi sejak 1987, komitmen kualitas bahan alami, dan perkenalan tim pengembang.
15. **Kontak Outlet (`ContactScreen.js`)** - Informasi alamat outlet Kesiman, kontak WhatsApp, jam operasional, dan form kirim pesan.

---

## 🎨 Palet Warna & Identitas Brand

- **Primary Green:** `#2fa855` (Warna utama alam & kesegaran)
- **Dark Green:** `#134a28` (Warna daun pandan & aksen hero)
- **Light Green:** `#e8f5ed` (Background badge & card aktif)
- **Warm Cream:** `#f7f3ee` (Background dasar aplikasi)
- **Accent Yellow:** `#ffd93d` (Bintang ulasan & badge populer)

---

## 🚀 Cara Menjalankan Aplikasi

1. Buka folder proyek di terminal:
   ```bash
   cd C:\Users\alex_\Documents\PemrogramanMobile\JungutFreshCendol
   ```
2. Jalankan server Metro Expo:
   ```bash
   npx expo start
   ```
3. Tekan huruf **`a`** di terminal untuk membuka langsung di Emulator Android Studio, atau scan QR code melalui aplikasi **Expo Go** di HP fisik Anda.
