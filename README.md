# Laporan Tugas Praktikum Pemrograman Mobile
**MODUL I: BASIC COMPONENT, LAYOUTING, STYLING**

---

## 1. Jawaban Tugas Pendahuluan

### Pertanyaan 1: Apa itu Flexbox?
**Jawaban:**
Flexbox (*Flexible Box Layout*) adalah model pengaturan tata letak antarmuka yang dirancang untuk mendistribusikan ruang dan menyejajarkan (*align*) elemen-elemen di dalam sebuah container secara konsisten di berbagai ukuran layar.
Pada framework React Native, Flexbox merupakan fondasi utama sistem layouting, dengan beberapa karakteristik:
- Arah utama (*flexDirection*) default adalah `column` (berbeda dengan CSS di web yang default-nya `row`).
- Nilai `flex` pada React Native menerima angka tunggal yang merepresentasikan proporsi ruang relatif terhadap elemen saudaranya.

### Pertanyaan 2: Sebutkan minimal 2 (dua) component library framework React Native!
**Jawaban:**
1. **React Native Paper** – Library komponen UI berbasis pedoman Material Design dari Google yang kaya fitur dan mudah dikustomisasi.
2. **React Native Elements** – Toolkit UI lintas platform yang menyediakan beragam komponen siap pakai (*Button, Card, Avatar, Input, dll.*).
3. *(Alternatif)*: **NativeBase** dan **UI Kitten**.

---

## 2. Implementasi Tugas Mandiri

### Tugas 1: Button Alert "Primakara Luar Biasa"
- Menggunakan komponen `TouchableOpacity` dan fungsi `Alert.alert()`.
- Saat tombol ditekan, aplikasi memunculkan dialog pop-up bertuliskan **"Primakara Luar Biasa"**.

### Tugas 2: Button Menampilkan 10 Gambar dari Galeri Menggunakan CameraRoll
- Menggunakan implementasi modul `CameraRoll` yang meminta izin akses galeri (`PermissionsAndroid` / Media Library).
- Mengambil **10 gambar pertama** dari galeri perangkat melalui metode `getPhotos({ first: 10, assetType: 'Photos' })`.
- Menampilkan foto-foto tersebut dalam bentuk **Grid 2 kolom** menggunakan Flexbox (`flexDirection: 'row'`, `flexWrap: 'wrap'`, `justifyContent: 'space-between'`).

---

## 3. Cara Menjalankan Aplikasi

1. Buka folder proyek ini di **Visual Studio Code**:
   ```
   C:\Users\alex_\.gemini\antigravity\scratch\tugas_modul1
   ```
2. Buka terminal di VS Code, lalu jalankan:
   ```bash
   npx expo start
   ```
3. **Pilihan Menjalankan:**
   - **Di HP Asli (Paling Cepat & Mudah):**
     Install aplikasi **Expo Go** dari Google Play Store di HP Android, lalu scan QR Code yang muncul di terminal.
   - **Di Android Studio Emulator:**
     Nyalakan emulator Android dari Android Studio (AVD Manager), lalu tekan huruf `a` di terminal.

