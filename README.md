# 📌 SIPemru - Sistem Informasi Peminjaman Ruangan

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)

SIPemru adalah aplikasi web untuk manajemen peminjaman ruangan kampus berbasis **React + Vite + Tailwind CSS** dengan arsitektur modular berbasis fitur (Feature-Based Architecture).

---

## 🎯 Core Features

- 📚 Room Catalog - Informasi ruangan & ketersediaan
- 📅 Booking System - Sistem peminjaman dengan validasi jadwal
- 🧑‍💼 Admin Dashboard - Monitoring & manajemen peminjaman
- 👥 User Management - Manajemen akun pengguna
- 📊 Schedule Management - Visualisasi jadwal ruangan
- 📱 Responsive Design - Support desktop & mobile

---

## 🏗️ Architecture

Project ini menggunakan **Feature-Based Architecture**, di mana setiap fitur dibuat modular berdasarkan domain bisnis.

### Data Flow

```

UI Component → Hooks / State → Service Layer → API → Backend

```

---

## 📁 Project Structure

```

src/
│
├── api/                  # API configuration
├── assets/               # Static assets
│
├── components/           # Shared UI components
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/             # Business features
│   ├── admin/
│   ├── user/
│   ├── auth/
│   └── dashboard/
│
├── hooks/                # Global hooks
├── layouts/              # Layout wrapper
├── store/                # Global state
├── utils/                # Helper functions
└── App.jsx

```

---

## ⚙️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand

---

## 🚀 Deployment

Project ini sudah dioptimalkan untuk deployment menggunakan **Vercel** dengan build static menggunakan Vite.

- Build output: `dist/`
- Compatible dengan Vercel static hosting

---

## 🧠 Architecture Principles

- Feature-based modular structure
- Separation of concerns (UI / Logic / Service)
- Reusable components
- Scalable folder structure
- Clean code principles

---

## 📌 Key Modules

| Module | Description |
|--------|-------------|
| Booking | Peminjaman ruangan |
| Schedule | Manajemen jadwal |
| Rooms | Data ruangan |
| Users | Manajemen user |
| Approval | Persetujuan booking |
| Dashboard | Monitoring sistem |

---

## 🎨 UI/UX Principles

- Mobile-first responsive design
- Tailwind utility-first styling
- Consistent design system
- Clean and minimal UI
- Accessible components

---

## 🔐 Security

- JWT Authentication
- Role-based access control
- Protected routes
- Input validation
- Secure API communication

---

## 📊 Performance

- Code splitting per feature
- Lazy loading components
- Optimized Vite build
- Minimal re-rendering
- Lightweight bundle size

---

## 👨‍💻 Development Guidelines

- Functional components only
- Feature isolation required
- Reusable components preferred
- API separated from UI
- Consistent naming convention

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

**Kelompok 8 - Web Based Application Project**

| Name | Role |
|------|------|
| Member 1 | QA / Testing |
| Member 2 | Backend Developer |
| Member 3 | Frontend Developer |

---

## 📌 Status

- Version: 1.0.0
- Status: Active Development
- Last Update: May 2026
```

