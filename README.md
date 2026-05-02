# 📌 SIPemru Frontend

Sistem Peminjaman Ruangan Kampus berbasis **React + Vite + Tailwind CSS** dengan arsitektur modular (feature-based).

---

## 🚀 Deskripsi

Aplikasi ini digunakan untuk:

* Menampilkan daftar ruangan kampus
* Melakukan booking ruangan
* Monitoring penggunaan ruangan melalui dashboard
* Mengelola tampilan admin

---

## 🧠 Arsitektur Project

Project ini menggunakan pendekatan:

👉 **Feature-Based Architecture**
Setiap fitur dipisah berdasarkan domain, bukan berdasarkan jenis file.

Keuntungan:

* Mudah scale ke project besar
* Kode lebih terorganisir
* Cocok untuk tim development

---

## 📁 Struktur Folder (Detail)

```bash
src/
│
├── api/
│   └── # Konfigurasi komunikasi ke backend (axios / fetch)
│
├── features/
│   │
│   ├── Admin/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Header admin (topbar)
│   │   │   └── Sidebar.jsx       # Sidebar navigasi admin
│   │   │
│   │   ├── config/
│   │   │   └── sidebarMenu.js    # Konfigurasi menu sidebar (dynamic menu)
│   │   │
│   │   └── hooks/
│   │       └── useDarkMode.js    # Custom hook untuk dark mode toggle
│   │
│   ├── app/
│   │   └── Home/
│   │       ├── components/
│   │       │   ├── bookingForm.jsx  # Form booking ruangan
│   │       │   ├── hero.jsx         # Section hero / landing
│   │       │   ├── navbar.jsx       # Navbar user
│   │       │   ├── roomList.jsx     # List ruangan + booking button
│   │       │   └── stats.jsx        # Statistik ruangan
│   │       │
│   │       └── Pages/
│   │           ├── Home.jsx         # Halaman utama user
│   │           ├── Booking.jsx      # Halaman booking
│   │           └── History.jsx      # Riwayat booking
│   │
│   ├── dashboard/
│   │   ├── hooks/
│   │   │   └── useDashboard.js     # Logic data dashboard (fetch + state)
│   │   │
│   │   ├── pages/
│   │   │   └── DashboardPage.jsx   # Tampilan utama dashboard
│   │   │
│   │   └── services/
│   │       └── dashboardService.js # API service untuk dashboard
│
├── layouts/
│   └── AdminLayout.jsx             # Layout utama admin (wrapper sidebar + content)
│
├── store/
│   └── # Global state (context / redux / zustand)
│
├── utils/
│   └── # Helper functions (formatter, reusable logic)
│
├── App.jsx                         # Root routing aplikasi
├── main.jsx                        # Entry point React
├── index.css                       # Global styling (Tailwind)
```

---

## 🔄 Alur Data (Flow Sederhana)

1. **UI (components/pages)**
   ⬇
2. **Hooks (logic & state)**
   ⬇
3. **Services (API call)**
   ⬇
4. **Backend API**

---

## ⚙️ Teknologi yang Digunakan

* React (UI Library)
* Vite (Build Tool)
* Tailwind CSS (Styling)
* React Router (Routing)
* Custom Hooks (State Logic)
* Axios / Fetch (API Integration)

---

## 🛠️ Instalasi

```bash
npm install
npm run dev
```

---

## 🌐 Environment

```env
VITE_API_URL=http://localhost:3000
```

---

## 📌 Best Practices yang Digunakan

* ✅ Feature-based folder structure
* ✅ Separation of concerns (UI, logic, service)
* ✅ Reusable components
* ✅ Custom hooks untuk logic
* ✅ Modular & scalable

---

## 🔥 Highlight Project

* Struktur sudah siap untuk scale ke aplikasi besar
* Sudah memisahkan:

  * UI (components)
  * Logic (hooks)
  * API (services)
* Clean code & maintainable

---

## 👨‍💻 Author

Septian Angga Saputra
