# Laporan Praktikum Pemrograman Mobile
**MODUL III: Props, State, Method**

---

## 1. Jawaban Tugas Pendahuluan

### Pertanyaan 1: Apa perbedaan props dengan state?
**Jawaban:**
- **Props (Properties)**: Merupakan parameter konfigurasi yang dikirimkan dari komponen *parent* (induk) ke komponen *child* (anak). Props bersifat *read-only* (tidak dapat diubah oleh komponen penerima).
- **State**: Merupakan variabel data internal yang dikelola langsung oleh komponen itu sendiri. State bersifat dinamis dan dapat berubah sepanjang siklus hidup komponen melalui pemanggilan `setState` untuk memperbarui tampilan UI (*re-render*).

### Pertanyaan 2: Bagaimanakah cara merubah state?
**Jawaban:**
Pada Class Component, state diubah dengan memanggil fungsi `this.setState()`, misalnya:
```javascript
this.setState({ namaState: nilaiBaru });
```
Atau menggunakan *updater function* jika perubahan bergantung pada state sebelumnya:
```javascript
this.setState((prevState) => ({
  counter: prevState.counter + 1
}));
```
Mengubah state tidak boleh dilakukan secara langsung melalui mutasi (misalnya `this.state.x = y`), karena React tidak akan mendeteksi perubahan tersebut untuk me-*render* ulang UI.

---

## 2. Implementasi Tugas Mandiri

### Tugas 1: Toggle Teks "Hello World"
- Disediakan tombol dengan label dinamis: **"Tampilkan"** / **"Sembunyikan"**.
- Menggunakan state `isHelloVisible` untuk mengatur visibilitas komponen `DisplayCard` (komponen anak yang menerima teks via **props**).
- Menggunakan **method** `toggleHello` untuk membalikkan nilai boolean pada state.

### Tugas 2: Input Text dan Submit
- Disediakan komponen `TextInput` dan tombol **Submit**.
- Input dikontrol menggunakan state `inputText` via event `onChangeText`.
- Ketika tombol Submit ditekan, **method** `handleSubmit` memvalidasi input dan menyimpan nilainya ke state `submittedText`.
- Komponen `ResultCard` menerima nilai submitted text melalui **props** dan menampilkannya, dilengkapi aksi hapus/reset.

---

## 3. Cara Menjalankan

1. Buka folder ini di terminal atau VS Code:
   ```bash
   cd C:\Users\alex_\Documents\PemrogramanMobile\tugas_modul2
   ```
2. Jalankan aplikasi menggunakan Expo:
   ```bash
   npx expo start
   ```
3. Tekan **`a`** untuk membuka di emulator Android.
