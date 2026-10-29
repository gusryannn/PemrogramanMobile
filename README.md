# UTS Pemrograman Mobile - Jungut Fresh Cendol

Aplikasi pemesanan cendol tradisional khas Bali berbasis React Native dan Expo. Proyek ini merupakan konversi dan pengembangan antarmuka (UI) dari aplikasi web Jungut Fresh Cendol yang telah dibuat sebelumnya pada mata kuliah Pemrograman Web.

## Fitur dan Halaman Aplikasi

Aplikasi memiliki total 15 layar yang terbagi ke dalam alur navigasi Stack dan Bottom Tab:

### 1. Autentikasi
- **Splash Screen (`SplashScreen.js`)**: Layar pembuka logo brand dan transisi otomatis ke login.
- **Login (`LoginScreen.js`)**: Form login, opsi masuk sebagai tamu, dan link ke registrasi/lupa password.
- **Register (`RegisterScreen.js`)**: Form pendaftaran akun baru (nama, email, no hp, password).
- **Lupa Password (`ForgotPasswordScreen.js`)**: Form reset/pemulihan kata sandi via email.

### 2. Menu Utama (Bottom Tab)
- **Beranda (`HomeScreen.js`)**: Banner promo, ringkasan produk unggulan, panduan pesan, dan ulasan.
- **Menu (`MenuScreen.js`)**: Katalog menu dengan pencarian dan filter kategori (Cendol, Minuman, Topping).
- **Keranjang (`CartScreen.js`)**: Daftar pesanan, penyesuaian jumlah item, input voucher promo, dan rincian harga.
- **Riwayat (`OrderHistoryScreen.js`)**: Daftar status pesanan (aktif/selesai) beserta nomor invoice.
- **Profil (`ProfileScreen.js`)**: Info akun pengguna, riwayat akun, dan tombol logout.

### 3. Detail & Transaksi (Stack)
- **Detail Produk (`ProductDetailScreen.js`)**: Deskripsi menu, pilihan varian/topping, dan catatan pesanan.
- **Checkout (`CheckoutScreen.js`)**: Input alamat pengiriman wilayah Bali dan pilihan metode pembayaran (QRIS, VA, COD).
- **Pesanan Berhasil (`OrderSuccessScreen.js`)**: Bukti transaksi berhasil dan invoice ID pesanan.
- **Lacak Pesanan (`OrderTrackScreen.js`)**: Status tahapan pengiriman pesanan dan fitur kontak kurir.
- **Tentang Kami (`AboutScreen.js`)**: Informasi latar belakang dan profil usaha Jungut Fresh Cendol.
- **Kontak (`ContactScreen.js`)**: Info kontak WhatsApp, lokasi outlet Kesiman, dan form pesan.

## Teknologi yang Digunakan

- React Native & Expo (SDK 58)
- React Navigation (Native Stack & Bottom Tabs)
- Context API (State Management Keranjang & Pesanan)

## Cara Menjalankan

1. Pastikan dependencies sudah terinstall:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npx expo start
   ```
3. Tekan **`a`** di terminal untuk membuka di Android Emulator, atau scan QR code menggunakan aplikasi **Expo Go** di HP.
