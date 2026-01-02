# Generator Alamat Dompet HD (BIP44)

Generator Alamat Dompet HD adalah script berbasis Node.js untuk menghasilkan alamat dompet **Hierarchical Deterministic (HD)** dari sebuah mnemonic (seed phrase) menggunakan standar **BIP44**.

Project ini ditujukan **hanya untuk keperluan edukasi, pengujian, dan pengembangan** serta **tidak menyimpan data pengguna apa pun**.

---

## ✨ Fitur

- Menghasilkan banyak alamat dompet dari satu seed phrase
- Jumlah alamat dapat diatur (dengan batas maksimum)
- Opsi **ON / OFF** untuk menampilkan private key
- Menggunakan standar derivasi **BIP44**
- Proses cepat dan sederhana
- Tidak ada penyimpanan atau pencatatan data

---

## 🛠 Teknologi yang Digunakan

- Node.js
- ethers.js
- Express (untuk keep-alive / endpoint web)
- node-telegram-bot-api (opsional, jika digunakan sebagai bot Telegram)

---

## 📦 Instalasi

Clone repository ini atau unggah ke server Anda, kemudian instal dependensi:

```bash
npm install
