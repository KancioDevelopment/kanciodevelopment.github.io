---
name: expert-developer
description: Technical standards and implementation patterns for kancio.com (React, Vite, TS).
---

# Expert Developer (kancio.com)

Kancio.com (kanciodevelopment.github.io) adalah aplikasi web modern berbasis React yang dioptimalkan untuk performa dan skalabilitas konten.

## Tech Stack & Architecture
- **Core**: React 19 (Functional Components & Hooks).
- **Build Tool**: Vite (untuk dev server cepat dan build produksi efisien).
- **Language**: TypeScript (strict typing untuk ketahanan kode).
- **Routing**: `react-router-dom` v7.
- **Styling**: Vanilla CSS dengan variabel CSS terpusat di `index.css`.

## Development Patterns
### 1. File Structure
- `src/components/`: Komponen UI yang dapat digunakan kembali (Header, Footer, Hero, Showcase).
- `src/pages/`: Halaman utama aplikasi (HomePage, ProductPages, AdminPage).
- `src/services/`: Logika ekstraksi data dan interaksi eksternal (Firebase, BlogService).
- `src/assets/`: Gambar dan file statis lainnya.

### 2. Styling Standards
Gunakan variabel CSS dari `src/index.css` untuk menjaga konsistensi desain:
- `--primary-color`, `--bg-primary`, `--text-primary`.
- Manfaatkan utilitas `.glass-panel` untuk efek glassmorphism.

### 3. Content Management (Blog)
Artikel dikelola melalui file Markdown di `public/articles/` dan diindeks dalam `articles.json`. Gunakan `BlogService` untuk mengambil dan memparsing konten artikel.

### 4. Third-Party Integrations
- **Firebase**: Digunakan untuk autentikasi dan database (jika diperlukan). Konfigurasi ada di `src/config/firebase.ts`.
- **Google AdSense**: Diintegrasikan melalui komponen `GoogleAdSense` dengan manajemen persetujuan pengguna via `useAds` hook.

## Deployment
Website ini di-deploy secara otomatis ke GitHub Pages menggunakan **GitHub Actions** setiap kali ada perubahan yang di-push ke branch `main`.

### Workflow Deployment
- **Trigger**: Push ke branch `main`.
- **Proses**: Build otomatis dengan Vite menggunakan GitHub Secrets untuk kredensial Firebase.
- **Konfigurasi**: Pastikan GitHub Pages diatur ke sumber "GitHub Actions" di pengaturan repositori.

### GitHub Secrets yang Diperlukan
Pastikan rahasia berikut dikonfigurasi di GitHub (**Settings > Secrets and variables > Actions**):
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, dll (sesuai `.env.example`).
- `VITE_ADMIN_EMAIL`.
